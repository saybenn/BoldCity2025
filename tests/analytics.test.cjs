const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function analytics() {
  const window = { dataLayer: [], gtag: () => { throw Error('Parallel transport'); } }, testModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync('lib/analytics.ts','utf8'), { compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022} }).outputText;
  vm.runInNewContext(`(function(require,module,exports){${code}\n})`, { window })(() => ({ ALLOWED_SERVICES:new Set(['Water Damage Restoration']) }),testModule,testModule.exports);
  return { ...testModule.exports, events:window.dataLayer };
}

test('analytics uses one data-layer transport and excludes contact details and URL queries', () => {
  const a = analytics();
  a.track('phone_click',{page_path:'/contact?email=private@example.test',page_location:'https://boldcityiaq.com/contact?name=Private',phone_number:'+19044346318',name:'Private',email:'private@example.test',phone:'9045551234',message:'Private message',href:'mailto:private@example.test'});
  assert.equal(a.events.length,1);
  assert.equal(a.events[0].event,'phone_click');
  assert.equal(a.events[0].page_path,'/contact');
  assert.equal(a.events[0].page_location,'https://boldcityiaq.com/contact');
  assert.equal(a.events[0].phone_number,'+19044346318');
  for (const key of ['name','email','phone','message','href']) assert.equal(key in a.events[0],false);
});

test('a later accepted form clears optional context from an earlier accepted form', () => {
  const a = analytics();
  a.trackFormSubmit({form_id:'StandardContactForm',form_name:'Standard Contact Form',service_requested:'Water Damage Restoration'});
  a.trackFormSubmit({form_id:'ModalContactForm',form_location:'ModalContactForm',page:'/'});
  assert.equal(a.events.length,2);
  assert.equal(a.events[1].event,'generate_lead');
  assert.equal(a.events[1].form_id,'ModalContactForm');
  assert.equal(a.events[1].service_requested,null);
  assert.equal(a.events[1].form_name,null);
});
