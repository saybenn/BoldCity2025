const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function consent(raw=null,blocked=false){
 const values=new Map(raw?[['bc_analytics_choice_v1',raw]]:[]),deleted=[];
 const window=new EventTarget();Object.assign(window,{localStorage:{getItem:k=>{if(blocked)throw Error('Storage blocked');return values.get(k)||null;},setItem:(k,v)=>{if(blocked)throw Error('Storage blocked');values.set(k,v);}},location:{hostname:'www.boldcityiaq.com',reload:()=>{window.reloaded=true;window.reloadCount=(window.reloadCount||0)+1;}}});
 const document={get cookie(){return '_ga=old; _ga_9G03529W5P=old-session; essential=keep';},set cookie(v){deleted.push(v);}};
 const mod={exports:{}};const code=ts.transpileModule(fs.readFileSync('lib/analytics-consent.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(`(function(module,exports){${code}\n})`,{window,document,Event,Date})(mod,mod.exports);
 return {...mod.exports,window,deleted,values};
}
test('only a valid unexpired saved choice grants analytics; bad or unavailable storage fails closed',()=>{
 for(const raw of [null,'broken',JSON.stringify({choice:'granted',at:Date.now()+60000}),JSON.stringify({choice:'granted',at:Date.now()-181*86400000}),JSON.stringify({choice:'yes',at:Date.now()})])assert.equal(consent(raw).getAnalyticsConsent(),'unknown');
 assert.equal(consent(JSON.stringify({choice:'granted',at:Date.now()})).getAnalyticsConsent(),'granted');
 const blocked=consent(null,true);assert.equal(blocked.getAnalyticsConsent(),'unknown');blocked.setAnalyticsConsent('granted');assert.equal(blocked.getAnalyticsConsent(),'granted');blocked.setAnalyticsConsent('denied');assert.equal(blocked.getAnalyticsConsent(),'denied');
});
test('cross-tab withdrawal reloads once even when several components subscribe',()=>{
 const c=consent(JSON.stringify({choice:'granted',at:Date.now()}));let notified=0;
 const offA=c.subscribeAnalyticsConsent(()=>notified++),offB=c.subscribeAnalyticsConsent(()=>notified++);
 c.window.bcGtmLoaded=true;c.values.set('bc_analytics_choice_v1',JSON.stringify({choice:'denied',at:Date.now()}));
 c.window.dispatchEvent(Object.assign(new Event('storage'),{key:'bc_analytics_choice_v1'}));
 assert.equal(notified,2);assert.equal(c.window.reloadCount,1);assert.equal(c.getAnalyticsConsent(),'denied');offA();offB();
});
test('consent initializes denied, keeps advertising denied, and withdrawal disables/unloads an existing container',()=>{
 const c=consent();c.setAnalyticsConsent('granted');
 const commands=c.window.dataLayer.map(x=>Array.from(x));
 assert.equal(commands[0][0],'consent');assert.equal(commands[0][1],'default');assert.equal(commands[0][2].analytics_storage,'denied');
 assert.equal(commands[2][2].analytics_storage,'granted');
 for(const cmd of commands.filter(x=>x[0]==='consent'))for(const key of ['ad_storage','ad_user_data','ad_personalization'])assert.equal(cmd[2][key],'denied');
 c.window.bcGtmLoaded=true;c.setAnalyticsConsent('denied');assert.equal(c.window['ga-disable-G-9G03529W5P'],true);assert.equal(c.window.reloaded,true);
 assert.ok(c.deleted.some(x=>x.startsWith('_ga=')));assert.ok(c.deleted.some(x=>x.startsWith('_ga_9G03529W5P=')));assert.ok(c.deleted.every(x=>!x.startsWith('essential=')));
});
