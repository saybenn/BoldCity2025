const {chromium}=require('playwright');const fs=require('node:fs/promises');
// Real browser GETs only: no tracking mocks, form submissions or challenge solving.
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
 try{for(const project of ['sprightly-horse-c6240e','boldcity2025']){
  const base=`https://deploy-preview-1--${project}.netlify.app`;const page=await browser.newPage({viewport:{width:1440,height:1000}});const tracking=[],errors=[];
  page.on('request',request=>{const url=new URL(request.url());if(/googletagmanager\.com|google-analytics\.com|googleadservices\.com|doubleclick\.net/.test(url.hostname))tracking.push({host:url.hostname,path:url.pathname});});
  page.on('pageerror',error=>errors.push(error.message));
  const response=await page.goto(base,{waitUntil:'domcontentloaded'});await page.locator('[data-google-reviews]').first().waitFor();
  await page.waitForTimeout(3000);const homeEvents=await page.evaluate(()=>(window.dataLayer||[]).filter(event=>event.event==='page_view').length);
  const cards=await page.locator('[data-review-id]').count();await page.locator('header a[href="/contact"]').click();await page.waitForTimeout(2000);
  const headers=await response.allHeaders();
  results.push({base,status:response.status(),noindex:headers['x-robots-tag'],buildId:await page.evaluate(()=>window.__NEXT_DATA__?.buildId),cards,homePageViewEvents:homeEvents,trackingRequests:tracking,pageErrors:errors,gtmElements:await page.locator('script[src*="googletagmanager"],iframe[src*="googletagmanager"]').count(),canonical:await page.locator('link[rel="canonical"]').getAttribute('href')});
  await page.close();
 }}finally{await browser.close();}
 await fs.writeFile('context/qa/h2-live-preview.json',JSON.stringify({checkedAt:new Date().toISOString(),kind:'Real external browsers; no network mocks or submissions',results},null,2)+'\n');console.log(JSON.stringify(results,null,2));
 if(results.some(result=>!result.noindex?.includes('noindex')||result.cards!==22||result.trackingRequests.length||result.gtmElements||result.pageErrors.length))process.exitCode=1;
})().catch(error=>{console.error(error.message);process.exit(1);});
