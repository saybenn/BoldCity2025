const {chromium}=require('playwright');
const fs=require('node:fs/promises');
(async()=>{
 const baseline=JSON.parse(await fs.readFile('context/media/h2-route-image-usage.json','utf8'));
 const browser=await chromium.launch({channel:'chrome',headless:true});const rows=[];
 const routes=[...new Set(baseline.rows.map(row=>row.route))];
 try{const page=await browser.newPage({viewport:{width:1440,height:1000}});
  for(const route of routes){
   await page.goto(`${process.env.QA_BASE_URL||'http://127.0.0.1:3000'}${route}`,{waitUntil:'domcontentloaded'});
   await page.locator('h1').waitFor();
   rows.push(...await page.locator('main img').evaluateAll((images,route)=>images.map(image=>{
    const url=new URL(image.getAttribute('src'),location.href);const source=url.pathname==='/_next/image'?url.searchParams.get('url'):url.pathname;
    return {route,image:source,alt:image.alt,section:image.closest('section')?.querySelector('h1,h2,h3')?.textContent?.trim()||'Other main content'};
   }).filter(row=>row.image?.startsWith('/images/')&&!/logo|badge|5-star|certified|acorn/i.test(row.image)),route));
  }
 }finally{await browser.close();}
 const counts={};for(const row of rows){const key=row.route+' '+row.image;counts[key]=(counts[key]||0)+1;}
 const repeats=Object.entries(counts).filter(([,count])=>count>1).map(([key,count])=>({key,count}));
 await fs.writeFile('context/media/h2-route-image-final.json',JSON.stringify({kind:'Browser DOM inventory; source URLs, not proof of distinct jobs',base:process.env.QA_BASE_URL||'http://127.0.0.1:3000',routesChecked:routes,routesWithPhotos:new Set(rows.map(row=>row.route)).size,rows,withinRouteRepeats:repeats},null,2)+'\n');
 console.log(JSON.stringify({rows:rows.length,withinRouteRepeats:repeats}));
})().catch(error=>{console.error(error.message);process.exit(1);});
