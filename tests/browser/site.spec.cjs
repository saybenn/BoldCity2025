const {test,expect}=require('@playwright/test');
const fs=require('node:fs/promises');
async function isolate(page) {
 await page.addInitScript(()=>document.addEventListener('click',event=>{if(event.target.closest?.('a[href^="tel:"]'))event.preventDefault();},true));
 await page.route('https://www.googletagmanager.com/**',route=>route.abort());
 await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*',route=>route.fulfill({contentType:'application/javascript',body:`
  window.turnstile={render:(container,options)=>{window.__turnstileOptions=options;setTimeout(()=>options.callback('mock-token'),0);return 'mock-widget';},reset:()=>{setTimeout(()=>window.__turnstileOptions.callback('mock-token'),0);},remove:()=>{},getResponse:()=> 'mock-token',isExpired:()=>false,ready:fn=>fn(),execute:()=>{}};
  const cb=new URL(document.currentScript.src).searchParams.get('onload');if(cb&&window[cb])window[cb]();
 `}));
}
async function events(page,name){return page.evaluate(name=>(window.dataLayer||[]).filter(x=>x.event===name),name);}
for(const width of [375,430,768,1440]) {
 test(`homepage layout and gallery at ${width}px`,async({page})=>{
  await isolate(page);await page.setViewportSize({width,height:width<500?812:1000});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await expect(page.locator('h1')).toHaveText('Water Damage Cleanup in Jacksonville, FL');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('header + section #google-reviews-heading')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(width<500){ const box=await page.locator('#google-reviews-heading').boundingBox();expect(box.y).toBeLessThan(740); }
  await fs.mkdir('context/qa/screenshots',{recursive:true});
  await page.screenshot({path:`context/qa/screenshots/home-${width}.png`,fullPage:true});
  await page.getByRole('button',{name:'Open image: Equipment and exposed wall framing'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
  // Existing compare control must remain keyboard-accessible.
  await expect(page.locator('[role="slider"]').or(page.locator('input[type="range"]'))).toHaveCount(1);
  const comparison=page.getByRole('slider',{name:'Restoration preparation comparison'});await comparison.focus();await page.keyboard.press('ArrowRight');await expect(comparison).toHaveValue('51');
  expect(errors).toEqual([]);
 });
}
test('phone, CTA, review and navigation events dispatch once without gtag duplication',async({page})=>{
 await isolate(page);await page.goto('/');
 await expect.poll(async()=> (await events(page,'page_view')).length).toBe(1);
 await page.locator('header a[href^="tel:"]').click();expect((await events(page,'phone_click')).length).toBe(1);
 expect((await events(page,'generate_lead')).length).toBe(0);
 const reviewLink=page.locator('a[href*="google.com/maps?cid"]').first();await reviewLink.evaluate(el=>el.addEventListener('click',event=>event.preventDefault()));await reviewLink.click();expect((await events(page,'review_source_click')).length).toBe(1);
 await page.locator('header a[href="/contact"]').click();await expect(page).toHaveURL(/\/contact$/);
 expect((await events(page,'cta_click')).length).toBe(1);expect((await events(page,'page_view')).length).toBe(2);
 await page.goto('/contact/success');expect((await events(page,'generate_lead')).length).toBe(0);
});
test('home form rejects accepted:false then sends one accepted lead without PII',async({page})=>{
 await isolate(page);let accepted=false;let payload;
 await page.route('**/api/contact',async route=>{payload=route.request().postDataJSON();await route.fulfill({json:{ok:true,accepted}});});
 await page.goto('/?utm_source=gmb&utm_medium=organic&gclid=test-click');
 await page.locator('#standard-name').fill('Private Test Name');await page.locator('#standard-phone').fill('9045551234');
 await page.locator('#standard-service').selectOption('Air Duct Cleaning');
 const submit=page.locator('form[data-analytics-form="StandardContactForm"] button[type="submit"]');
 await expect(submit).toBeEnabled();await submit.click();await expect(page.getByRole('alert').filter({hasText:'Submission failed'})).toBeVisible();
 expect((await events(page,'generate_lead')).length).toBe(0);accepted=true;await expect(submit).toBeEnabled();await submit.click();
 await expect(page.getByRole('heading',{name:'Request received'})).toBeVisible();
 expect((await events(page,'generate_lead')).length).toBe(1);expect((await events(page,'form_start')).length).toBe(1);
 const serialized=JSON.stringify(await page.evaluate(()=>window.dataLayer));expect(serialized).not.toContain('Private Test Name');expect(serialized).not.toContain('9045551234');
 expect(payload.service).toBe('Air Duct Cleaning');expect(payload.gclid).toBe('test-click');
});
test('attribution survives navigation and contact success requires accepted lead',async({page})=>{
 await isolate(page);let payload;
 await page.route('**/api/contact',async route=>{payload=route.request().postDataJSON();await route.fulfill({json:{ok:true,accepted:true}});});
 await page.goto('/?utm_source=gmb&utm_medium=organic&gbraid=test-braid');await page.locator('header a[href="/contact"]').click();
 await page.locator('#contact-request-name').fill('Test Person');await page.locator('#contact-request-phone').fill('9045551234');
 await page.locator('#contact-request-service').selectOption('General Restoration Request');
 await page.getByRole('button',{name:'Send Request'}).click();await expect(page).toHaveURL(/\/contact\/success/);
 expect((await events(page,'generate_lead')).length).toBe(1);expect(payload.landing_page_url).toContain('/?utm_source=gmb');expect(payload.gbraid).toBe('test-braid');expect(payload.page).toBe('/contact');
});
test('campaign form keeps Postmark contract and confirmation redirect',async({page})=>{
 await isolate(page);let payload;
 await page.route('**/api/contact',async route=>{payload=route.request().postDataJSON();await route.fulfill({json:{ok:true,accepted:true}});});
 await page.goto('/ads/emergency-restoration');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'context/qa/screenshots/ads-emergency.png',fullPage:true});await page.locator('#ad-name').fill('Test Person');await page.locator('#ad-phone').fill('9045551234');await page.locator('#ad-service').selectOption('General Emergency Request');
 await page.locator('form button[type="submit"]').click();await expect(page).toHaveURL(/\/ads\/emergency-restoration\/success/);expect(payload.formType).toBe('ad');expect((await events(page,'generate_lead')).length).toBe(1);
});
test('representative service and area pages have no overflow or runtime errors',async({page})=>{
 await isolate(page);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [375,1440])for(const path of ['/services/water-damage-restoration','/services/air-duct-cleaning','/service-areas/jacksonville','/service-areas/orange-park/water-damage-restoration']){
  await page.setViewportSize({width,height:900});await page.goto(path);await expect(page.locator('h1')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`context/qa/screenshots/${path.split('/').filter(Boolean).join('-')}-${width}.png`,fullPage:true});
 }expect(errors).toEqual([]);
});

test('navigation menus and mobile call controls remain usable',async({page})=>{
 await isolate(page);await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 const services=page.getByRole('button',{name:'Services',exact:true});await services.focus();await page.keyboard.press('Enter');
 await expect(page.getByRole('link',{name:'Air Duct Cleaning',exact:true}).first()).toBeVisible();await page.keyboard.press('Escape');
 await page.setViewportSize({width:375,height:812});await page.getByRole('button',{name:/menu/i}).click();await expect(page.getByRole('link',{name:'Contact',exact:true}).first()).toBeVisible();
});
