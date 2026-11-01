const { chromium } = require('playwright');
const fs = require('node:fs/promises');
(async () => {
 const root='context/qa'; await fs.mkdir(`${root}/screenshots`,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const inventory=[];
 try {
  for(const width of [375,1440]) {
   const page=await browser.newPage({viewport:{width,height:width===375?812:1000}});
   await page.goto('https://boldcityiaq.com/',{waitUntil:'domcontentloaded',timeout:60000});
   await page.screenshot({path:`${root}/screenshots/baseline-home-${width}.png`,fullPage:true});
   if(width===1440) inventory.push(await page.evaluate(()=>({url:location.href,title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),description:document.querySelector('meta[name="description"]')?.content,canonical:[...document.querySelectorAll('link[rel="canonical"]')].map(x=>x.href),schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)),links:[...document.querySelectorAll('a[href^="/"]')].map(x=>x.getAttribute('href'))})));
   await page.close();
  }
  const page=await browser.newPage();
  for(const path of ['/robots.txt','/sitemap.xml','/?utm_source=gmb&utm_medium=organic']) {
   const res=await page.goto('https://boldcityiaq.com'+path,{waitUntil:'domcontentloaded',timeout:60000});
   const body=await page.content();
   if(path.endsWith('.txt')||path.endsWith('.xml'))await fs.writeFile(`${root}/baseline-${path.slice(1).replace('.','-')}.txt`,await page.locator('body').innerText());
   inventory.push({path,status:res.status(),canonical:await page.locator('link[rel="canonical"]').evaluateAll(nodes=>nodes.map(x=>x.href))});
  }
  await fs.writeFile(`${root}/baseline.json`,JSON.stringify(inventory,null,2));
  console.log('Baseline home screenshots, metadata, robots, sitemap and tagged canonical captured.');
 }finally {await browser.close();}
})().catch(e=>{console.error(e.message);process.exit(1)});
