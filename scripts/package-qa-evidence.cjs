const sharp = require('sharp');
const fs = require('node:fs/promises');
(async()=>{
 await fs.mkdir('context/qa/evidence',{recursive:true});
 const names=['baseline-home-375','baseline-home-1440','home-375','home-430','home-768','home-1440','services-water-damage-restoration-375','services-water-damage-restoration-1440','services-air-duct-cleaning-375','services-air-duct-cleaning-1440','service-areas-jacksonville-375','service-areas-jacksonville-1440','service-areas-orange-park-water-damage-restoration-375','service-areas-orange-park-water-damage-restoration-1440','ads-emergency'];
 for(const name of names){
  const src=`context/qa/screenshots/${name}.png`;
  try {
   const meta=await sharp(src).metadata();
   await sharp(src).webp({quality:82}).toFile(`context/qa/evidence/${name}.webp`);
   if(['home-1440','services-water-damage-restoration-375','service-areas-orange-park-water-damage-restoration-1440','ads-emergency'].includes(name))await sharp(src).extract({left:0,top:0,width:meta.width,height:Math.min(1000,meta.height)}).toFile(`context/qa/screenshots/${name}-top.png`);
   if(name==='home-1440')for(const [tag,top] of [['projects',1700],['bottom',Math.max(0,meta.height-1000)]])await sharp(src).extract({left:0,top,width:meta.width,height:Math.min(1000,meta.height-top)}).toFile(`context/qa/screenshots/home-${tag}.png`);
  }catch(e){if(e.code!=='ENOENT')throw e;}
 }
 console.log('Review evidence packaged.');
})();
