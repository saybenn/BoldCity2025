const fs=require('node:fs/promises');const sharp=require('sharp');
(async()=>{
 const target='context/qa/h2-evidence';await fs.mkdir(target,{recursive:true});
 for(const [folder,names] of [['context/qa/screenshots/h2',['reviews-375','reviews-430','reviews-1440','emergency-375','emergency-1440']],['context/qa/screenshots',['home-375','home-430','home-1440']]]){
  for(const name of names){await sharp(`${folder}/${name}.png`).webp({quality:82}).toFile(`${target}/${name}.webp`);}
 }
 try {
  await fs.access('test-results/h2-preview/normal/form.png');
  await sharp('test-results/h2-preview/normal/form.png').webp({quality:82}).toFile(`${target}/baseline-live-form-failure.webp`);
 } catch {
  // Playwright clears test-results between suites. Preserve the supplied failure
  // screenshot with a source label instead of mislabeling it as our capture.
  await sharp('.qa-lock/phase2-handoff/Sources/boldform.png').webp({quality:82}).toFile(`${target}/owner-supplied-form-failure.webp`);
 }
 console.log('Phase 2 review evidence packaged separately from phase 1.');
})().catch(error=>{console.error(error.message);process.exit(1);});
