const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const sharp = require('sharp');
const assert = require('node:assert/strict');

const selected = 'https://deploy-preview-1--sprightly-horse-c6240e.netlify.app';
const previews = [selected,'https://deploy-preview-1--boldcity2025.netlify.app'];
const publicKey = '0x4AAAAAAD9ugfKlSGrNmQaa';
const submit = process.argv.includes('--submit');
const folder = 'context/qa/trust-final';

async function publicKeyCheck(base) {
  try {
  const response=await fetch(base,{signal:AbortSignal.timeout(15000)}),html=await response.text();
  const scripts=[...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(match=>new URL(match[1].replace(/&amp;/g,'&'),base)).filter(url=>url.origin===new URL(base).origin&&url.pathname.startsWith('/_next/'));
  const results=await Promise.allSettled(scripts.map(async script=>(await fetch(script.href,{signal:AbortSignal.timeout(10000)})).text()));
  const matched=results.some(result=>result.status==='fulfilled'&&result.value.includes(publicKey));
  return {base,status:response.status,suppliedPublicKeyFound:matched,sourceFilesChecked:results.filter(result=>result.status==='fulfilled').length,sourceFetchFailures:results.filter(result=>result.status==='rejected').length,kind:'Public HTML/JavaScript GET only; production code is not executed'};
  } catch(error) {
    return {base,status:null,suppliedPublicKeyFound:null,errorCategory:'public_fetch_failed',networkCode:error.cause?.code||error.code||error.name,detail:error.message.replace(/https?:\/\/\S+/g,'[public URL]').slice(0,120)};
  }
}

(async()=>{
  await fs.mkdir(folder,{recursive:true});
  // A successful manual browser test also consumes the one approved email.
  // Never repeat it merely because its spent token was not captured.
  if(submit){
    const prior=await fs.readFile(`${folder}/live-accepted.json`,'utf8').then(JSON.parse).catch(()=>null);
    if(prior?.submission?.performed){console.log('The approved preview submission is already recorded. No additional test lead will be sent.');return;}
  }
  const report={sourceCommit:'cdd87d292aa770ba59288d52ff6268171742d12e',checkedAt:new Date().toISOString(),kind:'Real external requests and real Chrome; no challenge, Siteverify, Postmark or analytics mocks',productionPublicKey:await publicKeyCheck('https://boldcityiaq.com'),previews:[],submission:{requested:submit,performed:false}};
  const browser=await chromium.launch({channel:'chrome',headless:!process.argv.includes('--headed'),args:['--renderer-process-limit=2','--disable-gpu']});
  let stage='preview_read',failed=false,submittedPayload=null;
  const tracking=[];
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    page.on('request',request=>{
      if(/googletagmanager\.com|google-analytics\.com|googleadservices\.com|doubleclick\.net/.test(new URL(request.url()).hostname))tracking.push(new URL(request.url()).hostname);
      if(request.method()==='POST'&&request.url()===selected+'/api/contact')submittedPayload=request.postDataJSON();
    });
    for(const base of previews){
      const response=await page.goto(base,{waitUntil:'domcontentloaded'});
      const section=page.locator('[data-google-reviews]');await section.waitFor({state:'visible'});
      await page.evaluate(()=>document.fonts.ready);
      const observation={base,status:response.status(),robots:(await response.allHeaders())['x-robots-tag'],meta:await page.locator('meta[name="robots"]').getAttribute('content'),publicKey:await publicKeyCheck(base),views:[]};
      assert.equal(response.status(),200);assert.ok(observation.robots.includes('noindex'));assert.ok(observation.meta.includes('noindex'));
      for(const width of [1440,375]){
        await page.setViewportSize({width,height:1000});
        const cards=section.locator('[data-review-id]');
        assert.equal(await cards.count(),22);assert.equal(await cards.locator('a,button').count(),0);
        assert.equal(await cards.locator('figcaption p').count(),22);
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
        const track=section.locator(width>=768?'.review-row':'.review-viewport').first();
        assert.equal(await track.evaluate(node=>getComputedStyle(node).scrollbarWidth),'none');
        const height=(await section.boundingBox()).height;assert.ok(height<=(width>=768?600:390));
        observation.views.push({width,semanticReviews:22,sectionHeight:height,overflow,scrollbar:'hidden'});
        await sharp(await section.screenshot()).webp({quality:85}).toFile(`${folder}/hosted-${base===selected?'selected':'secondary'}-${width}.webp`);
      }
      await page.waitForTimeout(1000);
      observation.widgetSiteKeyMatched=page.frames().some(frame=>frame.url().includes(publicKey));
      assert.equal(tracking.length,0);
      report.previews.push(observation);
    }
      if(submit){
        await page.goto(selected,{waitUntil:'domcontentloaded'});
        stage='challenge_readiness';
        await page.setViewportSize({width:1440,height:650});
        const form=page.locator('form[data-analytics-form="StandardContactForm"]');
        stage='form_visibility';
        await form.scrollIntoViewIfNeeded();
        const button=form.locator('button[type="submit"]');
        await button.scrollIntoViewIfNeeded();
        stage='challenge_readiness';
        const deadline=Date.now()+(process.argv.includes('--headed')?600000:45000);
        console.log(JSON.stringify({stage:'waiting_for_real_turnstile',base:selected,headed:process.argv.includes('--headed')}));
        // Observe real automatic verification. Never click a CAPTCHA or invent
        // a token. A headed retry permits the owner to complete an interaction.
        while(!await button.isEnabled()&&Date.now()<deadline)await page.waitForTimeout(1000);
        if(!await button.isEnabled()){
          report.submission={requested:true,performed:false,status:'Real managed challenge did not become ready; human interaction or hostname/configuration review required'};
          await sharp(await page.screenshot()).webp({quality:85}).toFile(`${folder}/live-challenge-pending.webp`);
          throw new Error('challenge_not_ready');
        }
        const testId='BCIAQ-QA-'+Date.now();
        await form.locator('#standard-name').fill(testId+' integration check, not a customer lead');
        await form.locator('#standard-phone').fill('9045550142');
        await form.locator('#standard-service').selectOption('General Restoration Request');
        await page.waitForTimeout(1200);
        stage='single_submission';
        const pending=page.waitForResponse(response=>response.url()===selected+'/api/contact'&&response.request().method()==='POST');
        await button.click();const acceptedResponse=await pending,body=await acceptedResponse.json();
        report.submission={requested:true,performed:true,testId,recipient:'Configured preview-only CONTACT_TEST_RECIPIENT',status:acceptedResponse.status(),accepted:body.ok===true&&body.accepted===true};
        assert.equal(acceptedResponse.status(),200);assert.equal(report.submission.accepted,true);
        await page.getByRole('heading',{name:'Request received',exact:true}).waitFor({state:'visible'});
        const leadEvents=await page.evaluate(()=>(window.dataLayer||[]).filter(item=>item.event==='generate_lead').length);
        assert.equal(leadEvents,1);report.submission.generateLeadEvents=leadEvents;
        await sharp(await page.screenshot()).webp({quality:85}).toFile(`${folder}/live-lead-accepted.webp`);
        assert.ok(submittedPayload&&submittedPayload.turnstileToken);
        stage='spent_token_replay';
        const replay=await page.request.post(selected+'/api/contact',{headers:{Origin:selected},data:submittedPayload});
        const replayBody=await replay.json();
        report.submission.replay={status:replay.status(),accepted:replayBody.accepted===true,error:replayBody.error};
        assert.equal(replay.status(),400);assert.notEqual(replayBody.accepted,true);assert.match(replayBody.error,/verification failed|expired/i);
        assert.equal(await page.evaluate(()=>(window.dataLayer||[]).filter(item=>item.event==='generate_lead').length),1);
        report.submission.postmark='Existing API accepted the notification; dashboard delivery confirmation pending';
        submittedPayload=null;
      }
    report.productionTrackingRequests=tracking.length;stage='complete';
  }catch(error){
    failed=true;report.failureStage=stage;report.error='Verification did not complete; raw errors and token-bearing payloads are intentionally omitted';
    report.failureCategory=error.name;
    if(!submittedPayload&&stage!=='single_submission'&&stage!=='spent_token_replay')report.preSubmissionDiagnostic=error.message.split('\n').filter(line=>!/https?:|token|challenges\.cloudflare/i.test(line)).slice(0,5).join('\n').slice(0,500);
  }finally{
    report.productionTrackingRequests=tracking.length;
    submittedPayload=null;await browser.close();
    await fs.writeFile(`${folder}/${submit?'live-form-attempt':'live-previews'}.json`,JSON.stringify(report,null,2)+'\n');
  }
  console.log(JSON.stringify(report,null,2));
  if(failed)process.exitCode=1;
})().catch(()=>{console.error('Integration preflight failed before browser verification. No raw payloads are logged.');process.exit(1)});
