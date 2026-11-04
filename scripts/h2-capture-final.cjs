const {chromium}=require('playwright');const sharp=require('sharp');const fs=require('node:fs/promises');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--renderer-process-limit=2','--disable-gpu']});
 try{const page=await browser.newPage();await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [375,430,1440]){
   await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:3000/');await page.evaluate(()=>document.fonts.ready);
   for(const image of await page.locator('main img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(image=>image.decode().catch(()=>{}));}
   await page.evaluate(()=>scrollTo(0,0));
   const section=await page.locator('[data-google-reviews]').first().boundingBox();const file=`context/qa/screenshots/h2/home-final-${width}.png`;
   await page.screenshot({path:file,fullPage:true});
   const metadata=await sharp(file).metadata();
   await sharp(file).extract({left:0,top:Math.floor(section.y),width,height:Math.min(Math.ceil(section.height),metadata.height-Math.floor(section.y))}).webp({quality:85}).toFile(`context/qa/h2-evidence/reviews-${width}.webp`);
   await sharp(file).webp({quality:82}).toFile(`context/qa/h2-evidence/home-${width}.webp`);
   await page.screenshot({path:`context/qa/h2-evidence/home-top-${width}.png`});
  }
  for(const width of [375,1440]){
   await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:3000/services/emergency-services');
   for(const image of await page.locator('main img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(image=>image.decode().catch(()=>{}));}
   await page.evaluate(()=>scrollTo(0,0));const file=`context/qa/screenshots/h2/emergency-final-${width}.png`;
   await page.screenshot({path:file,fullPage:true});await sharp(file).webp({quality:82}).toFile(`context/qa/h2-evidence/emergency-${width}.webp`);
  }
  await sharp('context/qa/screenshots/h2-live/form.png').webp({quality:85}).toFile('context/qa/h2-evidence/live-form-domain-error.webp');
  await fs.copyFile('context/qa/screenshots/h2-live/diagnostics.json','context/qa/h2-live-turnstile.json');
 }finally{await browser.close();}
 console.log('Final screenshots captured with loaded photos and no sticky-header overlap in the review crops.');
})().catch(error=>{console.error(error.message);process.exit(1);});
