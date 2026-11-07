const {chromium}=require('playwright');const fs=require('node:fs/promises');
(async()=>{
 const base='http://127.0.0.1:3001';const results=[];
 for(const path of ['/','/contact','/services/water-damage-restoration','/ads/emergency-restoration']){
  const response=await fetch(base+path);const html=await response.text();
  results.push({path,status:response.status,robotsHeader:response.headers.get('x-robots-tag'),robotsMeta:html.match(/name="robots" content="([^"]+)/)?.[1]});
 }
 const browser=await chromium.launch({channel:'chrome',headless:true});const analytics=[];
 try{for(const canonicalSimulation of [false,true]){
  const page=await browser.newPage();let gtmRequests=0;
  // Canonical-host simulation serves the local production build. GTM is mocked
  // to prevent this test from sending anything to production analytics.
  await page.route('https://www.googletagmanager.com/**',route=>{gtmRequests++;return route.fulfill({contentType:'application/javascript',body:'/* QA mock: no analytics transmitted */'});});
  await page.route('https://challenges.cloudflare.com/**',route=>route.abort());
  if(canonicalSimulation)await page.route('https://boldcityiaq.com/**',async route=>{
   const target=new URL(route.request().url());const response=await route.fetch({url:base+target.pathname+target.search});await route.fulfill({response});
  });
  await page.goto(canonicalSimulation?'https://boldcityiaq.com/':base);await page.waitForTimeout(1500);
  analytics.push({canonicalHostSimulated:canonicalSimulation,gtmNetworkMocked:true,gtmRequests});await page.close();
 }}finally{await browser.close();}
 const report={kind:'Separate local production-context build; no production deployment. Canonical browser host and GTM responses are simulated, not live analytics integration.',results,analytics};
 await fs.writeFile('context/qa/h2-production-config.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 if(results.some(x=>x.status!==200||x.robotsHeader||x.robotsMeta!==(x.path.startsWith('/ads/')?'noindex, follow':'index, follow'))||analytics[0].gtmRequests!==0||analytics[1].gtmRequests!==1)process.exitCode=1;
})().catch(error=>{console.error(error.message);process.exit(1);});
