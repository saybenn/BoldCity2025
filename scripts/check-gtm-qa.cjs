const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const folder='context/qa/gtm-development';
const mode=process.argv.includes('--production')?'production':process.argv.includes('--off')?'off':'qa';
const base=`http://127.0.0.1:${mode==='qa'?3100:mode==='off'?3101:3103}`;

(async()=>{
 await fs.mkdir(folder,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--renderer-process-limit=2','--disable-gpu']});
 const report={checkedAt:new Date().toISOString(),mode,kind:'Real Chrome, no form submissions. GTM script is real except the explicitly blocked independent-event case.',cases:[]};
 try {
  for(const blockGtm of mode==='qa'?[true,false]:[false]){
   const page=await browser.newPage();
   const sentCollectors=[];
   // Abort is a second safety belt: CSP must stop these before routing. This
   // test can never transmit probe/event payloads to a production collector.
   await page.route(/https:\/\/(?:[^/]*google-analytics\.com|[^/]*googleadservices\.com|[^/]*doubleclick\.net|[^/]*googlesyndication\.com)\//,route=>{sentCollectors.push(new URL(route.request().url()).hostname);return route.abort();});
   await page.route(/https:\/\/(?:www\.)?google\.com\/(?:g\/collect|pagead|ccm)(?:[/?]|$)/,route=>{sentCollectors.push(new URL(route.request().url()).hostname);return route.abort();});
   await page.route('https://www.googletagmanager.com/static/service_worker/**',route=>{sentCollectors.push('GTM service-worker frame');return route.abort();});
   if(blockGtm)await page.route('https://www.googletagmanager.com/**',route=>route.abort());
   await page.addInitScript(()=>{
    window.__qaCsp=[];
    document.addEventListener('securitypolicyviolation',event=>window.__qaCsp.push({directive:event.effectiveDirective,blocked:event.blockedURI.split('?')[0]}));
    document.addEventListener('click',event=>{if(event.target.closest?.('a[href^="tel:"]'))event.preventDefault();},true);
   });
   const gtmResponses=[];
   page.on('response',response=>{if(response.url().startsWith('https://www.googletagmanager.com/gtm.js?'))gtmResponses.push(response.status());});
   const response=await page.goto(base,{waitUntil:'domcontentloaded',timeout:120000});
   if(mode==='qa'){
    assert.equal((await response.allHeaders())['x-gtm-qa'],'localhost-diagnostics-collection-blocked');
    assert.ok((await response.allHeaders())['content-security-policy']);
   }else assert.equal((await response.allHeaders())['x-gtm-qa'],undefined);
   await page.waitForFunction(()=>(window.dataLayer||[]).some(item=>item.event==='page_view'));
   const count=name=>page.evaluate(name=>(window.dataLayer||[]).filter(item=>item.event===name).length,name);
   assert.equal(await count('page_view'),1);
   await page.locator('header a[href^="tel:"]').click();assert.equal(await count('phone_click'),1);
   await page.locator('header a[href="/contact"]').click();await page.waitForURL('**/contact');
   await page.waitForFunction(()=>(window.dataLayer||[]).filter(item=>item.event==='page_view').length===2);
   assert.equal(await count('cta_click'),1);assert.equal(await count('generate_lead'),0);
   if(!blockGtm&&mode==='qa'){
    await page.waitForFunction(()=>!!document.querySelector('script[src*="googletagmanager.com/gtm.js"]'));
    await page.waitForTimeout(2500);
    assert.ok(gtmResponses.includes(200),'Real GTM script must load');
    await page.evaluate(async()=>{
     await fetch('https://www.google-analytics.com/g/collect?qa_probe=blocked').catch(()=>{});
     await fetch('https://www.googleadservices.com/pagead/conversion/?qa_probe=blocked').catch(()=>{});
     new Image().src='https://www.google-analytics.com/g/collect?qa_probe=blocked-image';
     const frame=document.createElement('iframe');frame.src='https://www.googletagmanager.com/static/service_worker/qa-probe.html';document.body.appendChild(frame);
    });
    await page.waitForTimeout(700);
    const violations=await page.evaluate(()=>window.__qaCsp);
    assert.ok(violations.some(item=>item.directive==='connect-src'&&item.blocked.includes('google-analytics.com')));
    assert.ok(violations.some(item=>item.directive==='img-src'&&item.blocked.includes('google-analytics.com')));
    assert.ok(violations.some(item=>item.directive==='frame-src'&&item.blocked.includes('googletagmanager.com')));
   }
   if(mode!=='qa'){
    assert.deepEqual(gtmResponses,[]);
    assert.equal(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count(),0);
   }
   assert.deepEqual(sentCollectors,[],'CSP must block collection before browser routing');
   report.cases.push({gtmExplicitlyBlocked:blockGtm,gtmResponses,events:{page_view:await count('page_view'),phone_click:await count('phone_click'),cta_click:await count('cta_click'),generate_lead:await count('generate_lead')},collectorRequestsPastCsp:sentCollectors,violations:await page.evaluate(()=>window.__qaCsp)});
   await page.screenshot({path:`${folder}/${mode==='qa'?(blockGtm?'events-without-gtm':'gtm-qa-loaded'):mode+'-suppressed'}.png`});
   await page.close();
  }
 }finally{await browser.close();await fs.writeFile(`${folder}/${mode==='qa'?'local-browser':mode+'-browser'}.json`,JSON.stringify(report,null,2)+'\n');}
 console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(error.message);process.exitCode=1;});
