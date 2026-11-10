const {chromium}=require('playwright');
const sharp=require('sharp');
const fs=require('node:fs/promises');
const phase=process.argv[2];
if(!['before','after'].includes(phase))throw Error('Use before or after.');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--renderer-process-limit=2','--disable-gpu']});
 const folder='context/qa/review-ui';await fs.mkdir(folder,{recursive:true});const observations=[];
 try{const page=await browser.newPage();await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [375,430,1440]){
   await page.setViewportSize({width,height:1100});await page.goto(process.env.QA_BASE_URL||'http://127.0.0.1:3000/');await page.evaluate(()=>document.fonts.ready);
   const section=page.locator('[data-google-reviews]').first();
   await page.evaluate(()=>scrollTo(0,0));const box=await section.boundingBox();
   const full=`context/qa/screenshots/review-${phase}-${width}.png`;await fs.mkdir('context/qa/screenshots',{recursive:true});
   await page.screenshot({path:full,fullPage:true});
   await sharp(full).extract({left:Math.floor(box.x),top:Math.floor(box.y),width:Math.floor(box.width),height:Math.ceil(box.height)}).webp({quality:88}).toFile(`${folder}/${phase}-${width}.webp`);
   const dimensions=await section.locator('[data-review-id]').evaluateAll(cards=>cards.map(card=>({width:card.getBoundingClientRect().width,height:card.getBoundingClientRect().height})));
   observations.push({width,cards:dimensions.length,dimensions,cardLinks:await section.locator('[data-review-id] a,[data-review-id] button').count(),buttons:await section.locator('button').count(),pageOverflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
  }
 }finally{await browser.close();}
 await fs.writeFile(`${folder}/${phase}-measurements.json`,JSON.stringify(observations,null,2)+'\n');console.log(JSON.stringify(observations.map(({width,cards,cardLinks,buttons,pageOverflow,dimensions})=>({width,cards,cardLinks,buttons,pageOverflow,card:dimensions[0]}))));
})().catch(error=>{console.error(error.message);process.exit(1);});
