const {test,expect}=require('@playwright/test');
const fs=require('node:fs/promises');

test('real local network keeps QA dataLayer but never loads production tracking',async({page})=>{
  const tracking=[];
  page.on('request',request=>{if(/googletagmanager\.com|google-analytics\.com|googleadservices\.com|doubleclick\.net/.test(new URL(request.url()).hostname)) tracking.push(request.url());});
  const response=await page.goto('/?utm_source=phase2_qa');
  await expect.poll(()=>page.evaluate(()=>(window.dataLayer||[]).filter(x=>x.event==='page_view').length)).toBe(1);
  await page.locator('header a[href="/contact"]').click();await expect(page).toHaveURL(/\/contact$/);
  await page.waitForTimeout(1500);
  expect(tracking).toEqual([]);
  await expect(page.locator('iframe[src*="googletagmanager"],script[src*="googletagmanager"]')).toHaveCount(0);
  expect(response.headers()['x-robots-tag']).toContain('noindex');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',/noindex/);
});

for(const width of [375,430,1440])test(`populated review cards, source links and keyboard browsing at ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));await page.goto('/');
  const section=page.locator('[data-google-reviews]').first();
  const cards=section.locator('[data-review-id]');await expect(cards).toHaveCount(22);
  expect(await cards.evaluateAll(nodes=>new Set(nodes.map(node=>node.dataset.reviewId)).size)).toBe(22);
  await expect(cards.first()).toContainText('Steve Sierra');await expect(cards.nth(1)).toContainText('Justin Andrade');
  expect(await section.locator('img').count()).toBe(0); // No invented reviewer photos.
  expect(await section.locator('[aria-hidden="true"] a,[aria-hidden="true"] button').count()).toBe(0);
  await expect(section).not.toContainText('23 reviews');
  await expect(section.getByRole('button',{name:/automatic scrolling/})).toHaveCount(0);
  const track=section.locator(width>=768?'.review-row':'.review-viewport').first();
  await track.focus();const before=await track.evaluate(node=>node.scrollLeft);await page.keyboard.press('ArrowRight');
  await expect.poll(()=>track.evaluate(node=>node.scrollLeft)).toBeGreaterThan(before+50);
  await section.getByRole('button',{name:'Previous reviews'}).click();
  await expect.poll(()=>track.evaluate(node=>node.scrollLeft)).toBeLessThan(50);
  const read=section.getByRole('button',{name:'Read full review by Justin Andrade'});await read.click();
  await expect(page.getByRole('dialog')).toContainText('Justin Andrade');await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);await expect(read).toBeFocused();
  if(width<768){
    const sizes=await section.locator('.review-viewport').evaluate(node=>({scroll:node.scrollWidth,client:node.clientWidth}));expect(sizes.scroll).toBeGreaterThan(sizes.client);
    expect(await cards.first().evaluate(node=>node.clientWidth)).toBeLessThan(width-40);
  }
  await fs.mkdir('context/qa/screenshots/h2',{recursive:true});
  await section.screenshot({path:`context/qa/screenshots/h2/reviews-${width}.png`});
  expect(errors).toEqual([]);
});

test('desktop review motion opposes, pauses on hover/focus/touch, and respects reduced motion',async({page})=>{
  await page.setViewportSize({width:1440,height:1100});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
  const section=page.locator('[data-google-reviews]').first();await section.scrollIntoViewIfNeeded();
  await page.mouse.move(0,0);
  const positions=()=>section.locator('.review-row').evaluateAll(nodes=>nodes.map(node=>node.scrollLeft));
  await expect.poll(async()=> (await positions())[0]).toBeGreaterThan(3);
  const first=await positions();await page.waitForTimeout(400);const second=await positions();expect(second[0]).toBeGreaterThan(first[0]);expect(second[1]).toBeLessThan(first[1]);
  await section.locator('.review-viewport').hover();const hover=await positions();await page.waitForTimeout(300);expect(await positions()).toEqual(hover);
  await section.locator('.review-row').first().focus();await page.mouse.move(0,0);const focus=await positions();await page.waitForTimeout(300);expect(await positions()).toEqual(focus);
  await section.locator('.review-viewport').dispatchEvent('pointerdown',{pointerType:'touch'});
  await page.locator('h1').click();await page.mouse.move(0,0);const touch=await positions();await page.waitForTimeout(300);expect(await positions()).toEqual(touch);
  await expect(section.getByRole('button',{name:'Resume automatic scrolling'})).toHaveAttribute('aria-pressed','true');
  await section.getByRole('button',{name:'Resume automatic scrolling'}).click();
  await page.emulateMedia({reducedMotion:'reduce'});const reduced=await positions();await page.waitForTimeout(300);expect(await positions()).toEqual(reduced);
});

test('restrained service imagery and photo-free processes render without repeated scenes',async({page})=>{
  await page.setViewportSize({width:375,height:900});
  for(const slug of ['emergency-services','mold-remediation','air-duct-cleaning','fire-and-smoke-restoration','cleaning-and-sanitization']){
    await page.goto(`/services/${slug}`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const process=page.locator('section').filter({has:page.getByRole('heading',{name:/How .* is planned/})});
    await expect(process.locator('img')).toHaveCount(0);
    await expect(process.locator('ol li')).toHaveCount(4);
    for(const img of await page.locator('main img').all()){await expect(img).toHaveAttribute('alt',/.+/);}
  }
  await page.goto('/services/emergency-services');await page.screenshot({path:'context/qa/screenshots/h2/emergency-375.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'context/qa/screenshots/h2/emergency-1440.png',fullPage:true});
});

test('mocked challenge error has a call alternative; retry and non-JSON edge rejection never count as a lead',async({page})=>{
 await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*',route=>route.fulfill({contentType:'application/javascript',body:`
  window.turnstile={render:(container,options)=>{window.__turnstileOptions=options;setTimeout(()=>options['error-callback']('110200'),0);return 'mock-widget';},reset:()=>{setTimeout(()=>window.__turnstileOptions.callback('mock-token'),0);},remove:()=>{},getResponse:()=> 'mock-token',isExpired:()=>false,ready:fn=>fn()};
  const cb=new URL(document.currentScript.src).searchParams.get('onload');if(cb&&window[cb])window[cb]();
 `}));
 await page.route('**/api/contact',route=>route.fulfill({status:429,contentType:'text/plain',body:'Too Many Requests'}));
 await page.goto('/');const form=page.locator('form[data-analytics-form="StandardContactForm"]');
 await expect(form.getByRole('alert')).toContainText('Verification is unavailable on this website');
 await expect(form.getByRole('alert').getByRole('link',{name:'Call (904) 434-6318'})).toHaveAttribute('href','tel:+19044346318');
 await expect(form.locator('button[type="submit"]')).toBeDisabled();
 await form.getByRole('button',{name:'Retry verification'}).click();
 await form.locator('#standard-name').fill('QA Test');await form.locator('#standard-phone').fill('9045551234');await form.locator('#standard-service').selectOption('Water Damage Restoration');
 await expect(form.locator('button[type="submit"]')).toBeEnabled();await form.locator('button[type="submit"]').click();
 await expect(form.getByRole('alert')).toContainText('Too many attempts. Please call (904) 434-6318.');
 await page.waitForTimeout(200); // Mock token refresh must not clear the server's error.
 await expect(form.getByRole('alert')).toContainText('Too many attempts.');
 expect(await page.evaluate(()=>(window.dataLayer||[]).filter(event=>event.event==='generate_lead').length)).toBe(0);
});
