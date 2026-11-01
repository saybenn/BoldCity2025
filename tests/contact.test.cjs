const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function app({ result = { success: true, hostname: 'boldcityiaq.com', action: 'contact_standard' }, outage = false, mailFailure = false, secret = 'test-secret' } = {}) {
  let sends = 0;
  const cache = new Map();
  const env = { TURNSTILE_SECRET_KEY: secret, POSTMARK_SERVER_TOKEN: 'mock', CONTACT_EMAIL_FROM: 'test@example.test', CONTACT_EMAIL_TO: 'test@example.test' };
  function load(file) {
    file = path.resolve(file);
    if (!path.extname(file)) file += fs.existsSync(file + '.ts') ? '.ts' : '.js';
    if (cache.has(file)) return cache.get(file).exports;
    const mod = { exports: {} }; cache.set(file, mod);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    const requireMock = (id) => id === 'postmark' ? { ServerClient: class { async sendEmailWithTemplate() { if (mailFailure) throw Error('mock failure'); sends++; } } }
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
  return { submit, sends: () => sends, load };
}
test('every advertised service and legacy selection reaches mocked Postmark once', async () => {
  const a = app();
  const { CONTACT_SERVICES } = a.load('lib/contact-services.js');
  for (const [i, service] of [...CONTACT_SERVICES, 'Water', 'Fire/Smoke', 'Mold', 'Storm', 'Cleaning/Sanitization'].entries()) {
    const res = await a.submit({ service }, {}, `service-${i}`);
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
