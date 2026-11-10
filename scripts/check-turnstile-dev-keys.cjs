const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');

// Official public dummy credentials only. This fixture has no application
// contact API, no Postmark and no GTM. Production widget configuration is unused.
const sitekey='1x00000000000000000000AA';
const keys=[['pass','1x0000000000000000000000000000000AA'],['fail','2x0000000000000000000000000000000AA'],['spent','3x0000000000000000000000000000000AA']];
(async()=>{
 const server=http.createServer((_req,res)=>{res.setHeader('Content-Type','text/html');res.end(`<!doctype html><html><head><title>Official Turnstile dummy-key fixture</title></head><body><div class="cf-turnstile" data-sitekey="${sitekey}"></div><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script></body></html>`);});
 await new Promise(resolve=>server.listen(3102,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--renderer-process-limit=2','--disable-gpu']});
 const report={checkedAt:new Date().toISOString(),kind:'Real Cloudflare dummy-key widget and Siteverify requests, separate from the application/GTM; no emails',cases:[]};
 try{
  const page=await browser.newPage();await page.goto('http://127.0.0.1:3102');
  await page.waitForFunction(()=>document.querySelector('[name="cf-turnstile-response"]')?.value,{},{timeout:60000});
  const token=await page.locator('[name="cf-turnstile-response"]').inputValue();
  for(const [kind,secret] of keys){
   const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret,response:token}),signal:AbortSignal.timeout(15000)});
   const result=await response.json();assert.equal(response.status,200);
   assert.equal(result.success,kind==='pass');
   if(kind==='pass'){assert.equal(result.hostname,'example.com');assert.equal(result.action,undefined);}
   if(kind==='spent')assert.ok(result['error-codes'].includes('timeout-or-duplicate'));
   report.cases.push({kind,status:response.status,success:result.success,hostname:result.hostname||null,actionPresent:!!result.action,errorCodes:result['error-codes']});
  }
  report.applicationHostnameActionVerification='Unchanged. Dummy success has example.com/no action and cannot qualify a real accepted application lead.';
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));await fs.mkdir('context/qa/gtm-development',{recursive:true});await fs.writeFile('context/qa/gtm-development/turnstile-test-keys.json',JSON.stringify(report,null,2)+'\n');}
 console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(error.message);process.exitCode=1;});
