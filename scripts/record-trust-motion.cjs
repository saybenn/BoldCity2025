const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');

(async () => {
  const folder = 'context/qa/trust-final/motion';
  await fs.mkdir(folder,{recursive:true});
  const browser = await chromium.launch({channel:'chrome',headless:true,args:['--renderer-process-limit=2','--disable-gpu']});
  const observations=[];
  try {
    for(const width of [1440,375]){
      const height=width<768?760:800;
      const context=await browser.newContext({viewport:{width,height},hasTouch:width<768,isMobile:width<768,recordVideo:{dir:folder,size:{width,height}},reducedMotion:'no-preference'});
      const page=await context.newPage();
      await page.goto(process.env.QA_BASE_URL||'http://127.0.0.1:3000');
      await page.evaluate(()=>document.fonts.ready);
      const section=page.locator('[data-google-reviews]');
      await section.evaluate(node=>scrollTo(0,node.getBoundingClientRect().top+scrollY-84));
      await page.mouse.move(0,0);
      const track=section.locator(width>=768?'.review-row':'.review-viewport').first();
      const position=()=>track.evaluate(node=>node.scrollLeft);
      const samples=[];
      for(let i=0;i<12;i++){
        samples.push({elapsedMs:i*250,left:await position()});
        await page.waitForTimeout(250);
      }
      assert.ok(samples.at(-1).left>samples[0].left+20,'Autoplay did not advance');
      const observation={width,kind:width<768?'Chrome mobile emulation, real native touch events':'Chrome desktop',samples};
      if(width<768){
        const box=await track.boundingBox(), session=await context.newCDPSession(page);
        const y=Math.round(box.y+box.height/2), x=width-50;
        await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
        await page.waitForTimeout(150);
        const before=await position();
        for(let i=1;i<=8;i++){
          await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-i*22,y}]});
          await page.waitForTimeout(30);
        }
        await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        await page.waitForTimeout(500);
        const afterSwipe=await position();
        assert.ok(afterSwipe>before+80,'Native swipe did not move the review band');
        await page.waitForTimeout(4000);
        const settled=await position();await page.waitForTimeout(400);
        const resumed=await position();assert.ok(resumed>settled+2,'Motion did not resume after touch');
        observation.touch={before,afterSwipe,settled,resumed};
      }
      // Exercise a cycle boundary: the same reviewer remains at the leading
      // edge while the scroll coordinate wraps to the pixel-identical copy.
      await track.focus();await page.waitForTimeout(100);
      const seam=await track.evaluate(node=>{
        const original=node.querySelector('[data-review-id]'),copy=node.querySelector('[data-review-copy]');
        const cycle=copy.getBoundingClientRect().left-original.getBoundingClientRect().left;
        node.scrollLeft=cycle-2;
        return {cycle,left:copy.getBoundingClientRect().left};
      });
      await section.locator('h2').click({position:{x:1,y:1}});
      await page.waitForTimeout(200);
      const wrapped=await track.evaluate(node=>({position:node.scrollLeft,left:node.querySelector('[data-review-id]').getBoundingClientRect().left}));
      assert.ok(wrapped.position<20,'Cycle did not wrap to its equivalent beginning');
      assert.ok(Math.abs(wrapped.left-seam.left)<10,'Cycle exposed a visual seam');
      observation.seam={...seam,wrapped};
      // A user-visible pause remains available through keyboard focus.
      const pause=section.getByRole('button',{name:'Pause review motion',exact:true});
      await pause.focus();await page.keyboard.press('Space');
      await section.locator('h2').click({position:{x:1,y:1}});
      const held=await position();await page.waitForTimeout(300);assert.equal(await position(),held);
      await section.getByRole('button',{name:'Resume review motion',exact:true}).focus();await page.keyboard.press('Space');await section.locator('h2').click({position:{x:1,y:1}});
      await page.waitForTimeout(300);assert.ok(await position()>held+2,'Keyboard resume failed');
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.waitForTimeout(100);const reduced=await position();await page.waitForTimeout(300);assert.equal(await position(),reduced);
      observation.pauseVerified=true;observation.reducedMotionVerified=true;
      const video=page.video();await context.close();
      await fs.rename(await video.path(),`${folder}/reviews-${width}.webm`);
      observations.push(observation);
    }
  } finally {await browser.close();}
  await fs.writeFile(`${folder}/verification.json`,JSON.stringify({kind:'Actual rendered Chrome video, timing samples and native mobile swipe; no network mocks',observations},null,2)+'\n');
  console.log(JSON.stringify(observations.map(({width,samples,touch})=>({width,autoplayDistance:samples.at(-1).left-samples[0].left,touch})),null,2));
})().catch(error=>{console.error(error.message);process.exit(1)});
