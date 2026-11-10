const {test,expect}=require('@playwright/test');
test.use({storageState:{cookies:[],origins:[]}});
const count=(page,event)=>page.evaluate(name=>(window.dataLayer||[]).filter(item=>item.event===name).length,event);

test('a fresh visitor can decline analytics and still submit a service enquiry',async({page})=>{
 const tracking=[];page.on('request',r=>{if(/googletagmanager\.com|google-analytics\.com/.test(new URL(r.url()).hostname))tracking.push(r.url());});
 await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*',route=>route.fulfill({contentType:'application/javascript',body:`window.turnstile={render:(c,o)=>{setTimeout(()=>o.callback('mock-token'),0);return 'mock';},remove:()=>{},reset:()=>{},ready:f=>f()};const cb=new URL(document.currentScript.src).searchParams.get('onload');if(cb&&window[cb])window[cb]();`}));
 let submissions=0;
 await page.route('**/api/contact',route=>{submissions++;return route.fulfill({json:{ok:true,accepted:true}});});
 await page.goto('/contact');
 await expect(page.getByRole('heading',{name:'Your analytics choice'})).toBeVisible();
 expect(await count(page,'page_view')).toBe(0);
 await page.getByRole('button',{name:'Decline analytics'}).click();
 await expect(page.locator('[data-analytics-consent]')).toHaveCount(0);
 await page.reload();await expect(page.locator('[data-analytics-consent]')).toHaveCount(0);
 await page.locator('#contact-request-name').fill('Consent QA');await page.locator('#contact-request-phone').fill('9045551234');
 await page.locator('#contact-request-service').selectOption('General Restoration Request');
 await page.getByRole('button',{name:'Send Request',exact:true}).click();
 await expect(page).toHaveURL(/\/contact\/success/);expect(submissions).toBe(1);
 expect(await count(page,'generate_lead')).toBe(0);expect(tracking).toEqual([]);
});

test('allowing on the current route emits one current view and no earlier activity',async({page})=>{
 await page.addInitScript(()=>document.addEventListener('click',e=>{if(e.target.closest?.('a[href^="tel:"]'))e.preventDefault();},true));
 await page.goto('/');await page.getByRole('link',{name:'Navbar Call Now',exact:true}).click();
 await page.locator('header a[href="/contact"]').click();await expect(page).toHaveURL(/\/contact$/);
 expect(await count(page,'page_view')).toBe(0);expect(await count(page,'phone_click')).toBe(0);expect(await count(page,'cta_click')).toBe(0);
 await page.getByRole('button',{name:'Allow analytics'}).click();
 await expect.poll(()=>count(page,'page_view')).toBe(1);
 expect(await page.evaluate(()=>(window.dataLayer||[]).find(e=>e.event==='page_view').page_path)).toBe('/contact');
 expect(await count(page,'phone_click')).toBe(0);expect(await count(page,'cta_click')).toBe(0);
 await page.getByRole('link',{name:'Navbar Call Now',exact:true}).click();expect(await count(page,'phone_click')).toBe(1);
 await page.getByRole('button',{name:'Analytics choices',exact:true}).click();await page.getByRole('button',{name:'Decline analytics'}).click();
 await page.getByRole('link',{name:'Footer Phone Number',exact:true}).click();expect(await count(page,'phone_click')).toBe(1);
 await page.reload();expect(await count(page,'page_view')).toBe(0);
});
