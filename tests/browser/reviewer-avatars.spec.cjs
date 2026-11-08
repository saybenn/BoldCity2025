const {test,expect}=require('@playwright/test');
const fs=require('node:fs/promises');
const sharp=require('sharp');
const evidence='context/qa/release-prep';

test('isolated avatar fixture reserves geometry and falls back for missing, failed and rejected images',async({page})=>{
  test.skip(process.env.QA_AVATAR_FIXTURE !== 'true', 'Requires the explicitly enabled, temporary development-only avatar fixture; never installed in production.');
  const image=await sharp({create:{width:64,height:64,channels:3,background:'#237A86'}}).png().toBuffer();
  const requests=[];let releaseImage;
  const gate=new Promise(resolve=>{releaseImage=resolve;});
  await page.route('https://lh3.googleusercontent.com/**',async route=>{
    requests.push(route.request().url());
    if(route.request().url().endsWith('TEST_ONLY_BROKEN'))return route.abort();
    await gate;return route.fulfill({status:200,contentType:'image/png',body:image});
  });
  const rejected=[];await page.route('https://example.test/**',route=>{rejected.push(route.request().url());return route.abort();});
  await page.goto('/__review_avatar_qa',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  const loaded=page.locator('[data-avatar-fixture="loaded"] .review-avatar');
  await expect(loaded).toHaveAttribute('data-avatar-state','loading');
  const before=await loaded.boundingBox();releaseImage();
  await expect(loaded).toHaveAttribute('data-avatar-state','photo');
  expect(await loaded.boundingBox()).toEqual(before);
  expect(before.width).toBe(40);expect(before.height).toBe(40);
  await expect(loaded.locator('img')).toHaveAttribute('src','https://lh3.googleusercontent.com/a/TEST_ONLY_LOADED');
  await expect(loaded.locator('img')).toHaveAttribute('loading','lazy');
  await expect(loaded.locator('img')).toHaveAttribute('referrerpolicy','no-referrer');
  expect(await loaded.locator('img').evaluate(node=>getComputedStyle(node).objectFit)).toBe('cover');
  for(const id of ['broken','missing','rejected']){
    const avatar=page.locator(`[data-avatar-fixture="${id}"] .review-avatar`);
    await expect(avatar).toHaveAttribute('data-avatar-state','initials');await expect(avatar.locator('img')).toHaveCount(0);
  }
  expect(requests).toHaveLength(2);expect(rejected).toEqual([]);
  await expect(page.getByRole('main').getByRole('img')).toHaveCount(0); // Exclude development tooling outside the fixture.
  await fs.mkdir(evidence,{recursive:true});
  await page.screenshot({path:`${evidence}/avatar-fixture.png`});
  await fs.writeFile(`${evidence}/avatar-fixture.json`,JSON.stringify({kind:'Isolated actual Chrome component test; synthetic colored PNG response and failed request are mocked. Zero genuine reviewer photos.',before,after:await loaded.boundingBox(),uniqueMockRequests:requests.length,rejectedRequests:rejected.length,fixturePngBytes:image.length,pass:true},null,2)+'\n');
});

test('current homepage keeps all real records, no unverified portrait requests and no accessible repeats',async({page})=>{
  const remote=[];page.on('request',request=>{if(/googleusercontent\.com$/.test(new URL(request.url()).hostname))remote.push(request.url());});
  await page.goto('/');
  const section=page.locator('[data-google-reviews]');
  const records=require('../../lib/review-records.json').filter(r=>r.text&&r.excerpt).sort((a,b)=>a.displayPriority-b.displayPriority);
  await expect(section.locator('[data-review-id]')).toHaveCount(22);
  expect(await section.locator('[data-review-id]').evaluateAll(nodes=>nodes.map(n=>n.dataset.reviewId))).toEqual(records.map(r=>r.id));
  await expect(section.locator('.review-avatar[data-avatar-state="initials"]')).toHaveCount(44);
  await expect(section.locator('.review-avatar img')).toHaveCount(0);
  await expect(section.locator('[data-review-copy][aria-hidden="true"][inert]')).toHaveCount(22);
  expect(await section.getByRole('figure').count()).toBe(22);
  expect(remote).toEqual([]);
});
