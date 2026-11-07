const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function app({ result = { success: true, hostname: 'boldcityiaq.com', action: 'contact_standard' }, outage = false, mailFailure = false, secret = 'test-secret', envOverrides = {}, contextIP = '203.0.113.10' } = {}) {
  let sends = 0;
  const messages = [];
  let trustedIP = contextIP;
  const cache = new Map();
  const env = { CONTACT_DEPLOY_CONTEXT:'production', TURNSTILE_SECRET_KEY: secret, POSTMARK_SERVER_TOKEN: 'mock', CONTACT_EMAIL_FROM: 'test@example.test', CONTACT_EMAIL_TO: 'business@example.test', ...envOverrides };
  function load(file) {
    file = path.resolve(file);
    if (!path.extname(file)) file += fs.existsSync(file + '.ts') ? '.ts' : '.js';
    if (cache.has(file)) return cache.get(file).exports;
    const mod = { exports: {} }; cache.set(file, mod);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    const requireMock = (id) => id === 'postmark' ? { ServerClient: class { async sendEmailWithTemplate(message) { if (mailFailure) throw Error('mock failure'); sends++; messages.push(message); } } }
      : id === '@netlify/functions' ? { getContext: () => { if (trustedIP === null) throw Error('missing context'); return {ip:trustedIP}; } }
      : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
    vm.runInNewContext(`(function(require,module,exports){${code}\n})`, { process: { env }, console: { error() {} }, URL, URLSearchParams, AbortSignal, Date, fetch: async () => { if (outage) throw Error('offline'); return { ok: true, json: async () => result }; } })(requireMock, mod, mod.exports);
    return mod.exports;
  }
  const handler = load('pages/api/contact.ts').default;
  async function submit(body = {}, headers = {}, ip = '127.0.0.1', method = 'POST') {
    const response = { code: 0, body: null, headers: {}, setHeader(k,v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
    await handler({ method, headers: { 'content-type': 'application/json', host: 'boldcityiaq.com', ...headers }, socket: { remoteAddress: ip }, body: { name: 'Test Person', phone: '9045551234', service: 'Water Damage Restoration', turnstileToken: 'mock-token', ...body } }, response);
    return response;
  }
  return { submit, sends: () => sends, messages, setContextIP: (value) => { trustedIP = value; }, load };
}
test('every advertised service and legacy selection reaches mocked Postmark once', async () => {
  const a = app();
  const { CONTACT_SERVICES } = a.load('lib/contact-services.js');
  for (const [i, service] of [...CONTACT_SERVICES, 'Water', 'Fire/Smoke', 'Mold', 'Storm', 'Cleaning/Sanitization'].entries()) {
    const res = await a.submit({ service }, {}, `192.0.2.${i + 1}`);
    assert.equal(res.code, 200, service); assert.equal(res.body.accepted, true);
  }
  assert.equal(a.sends(), CONTACT_SERVICES.length + 5);
});
test('all form actions are verified, including modal and emergency ZIP validation', async () => {
  for (const formType of ['standard','ad','modal','lead']) {
    const a = app({ result: { success:true, hostname:'boldcityiaq.com', action:`contact_${formType}` } });
    const res = await a.submit({ formType, email:'test@example.test', message:'Test request', zip:'32234' });
    assert.equal(res.body.accepted, true); assert.equal(a.sends(), 1);
    if (formType === 'lead') assert.equal((await a.submit({ formType })).code, 400);
  }
});
test('bad, expired, wrong-host and wrong-action tokens never deliver', async () => {
  for (const result of [{ success:false, 'error-codes':['timeout-or-duplicate'] }, { success:true, hostname:'attacker.test', action:'contact_standard' }, { success:true, hostname:'boldcityiaq.com', action:'contact_ad' }]) {
    const a = app({ result }); assert.equal((await a.submit()).code,400); assert.equal(a.sends(),0);
  }
  const missing = app(); assert.equal((await missing.submit({turnstileToken:''})).code,400); assert.equal(missing.sends(),0);
});
test('verification outage and missing configuration fail closed', async () => {
  for (const opts of [{outage:true}, {secret:''}]) { const a=app(opts); assert.equal((await a.submit()).code,503); assert.equal(a.sends(),0); }
});
test('validation, honeypot, timing, content-type and origin rejection never deliver', async () => {
  for (const body of [{ service:'Not a service' },{name:'A'},{phone:'bad'},{email:'invalid'}, {companyWebsite:'spam'}, {formStartedAt:new Date().toISOString()}]) {
    const a=app(); const res=await a.submit(body); assert.equal(res.code,400); assert.notEqual(res.body.accepted,true); assert.equal(a.sends(),0);
  }
  const a=app(); assert.equal((await a.submit({}, {origin:'https://attacker.test'})).code,403);
  assert.equal((await a.submit({}, {'content-type':'text/plain'})).code,415);
  assert.equal((await a.submit({}, {}, 'test','GET')).code,405); assert.equal(a.sends(),0);
});
test('mail failure never returns accepted and throttled requests have Retry-After', async () => {
  const failure=app({mailFailure:true}); assert.equal((await failure.submit()).code,500);
  const a=app(); for(let i=0;i<10;i++) await a.submit();
  const res=await a.submit(); assert.equal(res.code,429); assert.equal(res.headers['Retry-After'],'600'); assert.equal(a.sends(),10);
});

test('Netlify uses validated request context; forged forwarding headers cannot evade the shared handler limit', async () => {
  const a=app({envOverrides:{NETLIFY:'true',CONTEXT:'production'}});
  for(let i=0;i<10;i++) assert.equal((await a.submit({}, {'x-forwarded-for':`192.0.2.${i}`, 'x-nf-client-connection-ip':`198.51.100.${i}`})).code,200);
  assert.equal((await a.submit({}, {'x-forwarded-for':'203.0.113.99'})).code,429);
  a.setContextIP('2001:db8::2'); assert.equal((await a.submit()).code,200);
  assert.equal(a.sends(),11);
  for(const contextIP of [null,'','not-an-ip','203.0.113.2,203.0.113.3']) {
    const missing=app({contextIP,envOverrides:{NETLIFY:'true',CONTEXT:'production'}});
    assert.equal((await missing.submit({}, {'x-forwarded-for':'203.0.113.4','x-nf-client-connection-ip':'203.0.113.4'})).code,503);
    assert.equal(missing.sends(),0);
  }
});

test('preview requires explicit hostname and binds Siteverify host/action to the request', async () => {
  const host='deploy-preview-1--sprightly-horse-c6240e.netlify.app';
  const preview={NETLIFY:'true',CONTEXT:'deploy-preview',CONTACT_TEST_RECIPIENT:'staging@example.test',TURNSTILE_ALLOWED_HOSTNAMES:host};
  const good=app({envOverrides:preview,result:{success:true,hostname:host,action:'contact_standard'}});
  assert.equal((await good.submit({}, {host})).code,200);
  for(const result of [{success:true,hostname:'boldcityiaq.com',action:'contact_standard'}, {success:true,hostname:host,action:'contact_ad'}]) {
    const a=app({envOverrides:preview,result}); assert.equal((await a.submit({}, {host})).code,400); assert.equal(a.sends(),0);
  }
  const wrongRequest=app({envOverrides:preview,result:{success:true,hostname:host,action:'contact_standard'}});
  assert.equal((await wrongRequest.submit()).code,400);
  const missing=app({envOverrides:{...preview,TURNSTILE_ALLOWED_HOSTNAMES:''}});
  assert.equal((await missing.submit({}, {host})).code,503); assert.equal(missing.sends(),0);
});

test('nonproduction sends only to configured test recipient and never confirms to the visitor', async () => {
  const envOverrides={CONTACT_DEPLOY_CONTEXT:'deploy-preview',TURNSTILE_ALLOWED_HOSTNAMES:'boldcityiaq.com',CONTACT_TEST_RECIPIENT:'staging@example.test',CONTACT_RECEIVER_BACKUP:'backup@example.test',SEND_VISITOR_CONFIRMATION:'true',CONTACT_EDGE_VERIFIED:'true'};
  const a=app({envOverrides}); assert.equal((await a.submit({email:'visitor@example.test'})).code,200);
  assert.equal(a.messages.length,1); assert.equal(a.messages[0].To,'staging@example.test');
  const missing=app({envOverrides:{...envOverrides,CONTACT_TEST_RECIPIENT:''}});
  assert.equal((await missing.submit()).code,500); assert.equal(missing.sends(),0);
  const unverified=app({envOverrides:{SEND_VISITOR_CONFIRMATION:'true'}});
  assert.equal((await unverified.submit({email:'visitor@example.test'})).code,200); assert.equal(unverified.sends(),1);
});

test('production notifications retain business recipients and exclude the development inbox in every configured list', async () => {
  const a = app({envOverrides:{
    CONTACT_EMAIL_TO:'business@example.test, SAYBENCODES@gmail.com',
    CONTACT_RECEIVER_BACKUP:'say.ben.codes+leads@googlemail.com; backup@example.test; business@example.test',
    CONTACT_TEST_RECIPIENT:'saybencodes@gmail.com',
  }});
  const response = await a.submit();
  assert.equal(response.body.accepted,true);
  assert.equal(a.messages.length,1);
  assert.equal(a.messages[0].To,'business@example.test,backup@example.test');
  assert.equal(a.messages[0].Cc,undefined);
  assert.equal(a.messages[0].Bcc,undefined);
  for(const envOverrides of [
    {CONTACT_EMAIL_TO:'saybencodes@gmail.com'},
    {CONTACT_RECEIVER_BACKUP:'invalid-address'},
  ]) {
    const invalid = app({envOverrides});
    assert.equal((await invalid.submit()).code,500);
    assert.equal(invalid.sends(),0);
  }
});

test('preview keeps its explicitly configured test inbox even when it is excluded from production', async () => {
  const a = app({envOverrides:{CONTACT_DEPLOY_CONTEXT:'deploy-preview',TURNSTILE_ALLOWED_HOSTNAMES:'boldcityiaq.com',CONTACT_TEST_RECIPIENT:'saybencodes@gmail.com',CONTACT_RECEIVER_BACKUP:'business-backup@example.test'}});
  assert.equal((await a.submit()).body.accepted,true);
  assert.equal(a.messages.length,1);
  assert.equal(a.messages[0].To,'saybencodes@gmail.com');
});
