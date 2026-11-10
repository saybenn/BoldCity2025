const {chromium}=require('playwright');
const fs=require('node:fs/promises');
(async()=>{
 const bases=['https://deploy-preview-1--boldcity2025.netlify.app','https://deploy-preview-1--sprightly-horse-c6240e.netlify.app'];
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const evidence=[];
 try{for(const base of bases){
  const name=new URL(base).hostname.split('.')[0];const dir=`test-results/h2-preview/${name}`;await fs.mkdir(dir,{recursive:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[],failed=[],analytics=[];
  page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text().replace(/[A-Za-z0-9_-]{45,}/g,'[redacted]'));});
  page.on('pageerror',err=>errors.push(err.message));
  page.on('requestfailed',req=>failed.push({origin:new URL(req.url()).origin,path:new URL(req.url()).pathname,error:req.failure()?.errorText}));
  page.on('request',req=>{const url=new URL(req.url());if(/googletagmanager|google-analytics|googleadservices|doubleclick/.test(url.hostname))analytics.push({host:url.hostname,path:url.pathname});});
  await page.addInitScript(()=>{
   window.__h2Widget={events:[]};let api;
   Object.defineProperty(window,'turnstile',{configurable:true,get:()=>api,set(value){api=value;if(value?.render){const render=value.render.bind(value);value.render=(target,options)=>{window.__h2Widget.action=options.action;const failure=options['error-callback'],success=options.callback;options['error-callback']=(code)=>{window.__h2Widget.events.push({type:'error',code});return failure?.(code);};options.callback=(token)=>{window.__h2Widget.events.push({type:'success'});return success?.(token);};return render(target,options);};}}});
  });
  const response=await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
  await page.locator('form').first().scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>window.__h2Widget?.events?.length,{timeout:20000}).catch(()=>{});
  const data=await page.evaluate(()=>({title:document.title,widget:window.__h2Widget,text:document.querySelector('form')?.innerText,gtmScript:!!document.querySelector('script[src*="googletagmanager.com"]'),noscriptGtm:document.documentElement.innerHTML.includes('ns.html?id=GTM-55RZQMX7'),enabledSubmit:!!document.querySelector('form button[type="submit"]:not(:disabled)')}));
  await page.screenshot({path:`${dir}/form.png`,fullPage:false});
  const frames=[];for(const frame of page.frames()){if(frame.url().includes('challenges.cloudflare.com'))frames.push({origin:new URL(frame.url()).origin,text:await frame.locator('body').innerText().catch(()=>'<not readable>')});}
  const item={base,status:response.status(),headers:Object.fromEntries(Object.entries(await response.allHeaders()).filter(([k])=>/robots|content-security|server|netlify|x-nf/.test(k))),...data,frames,errors,failed,analytics};
  await fs.writeFile(`${dir}/diagnostics.json`,JSON.stringify(item,null,2));evidence.push(item);await page.close();
 }
 await fs.writeFile('test-results/h2-preview/summary.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence,null,2));
 }finally{await browser.close();}
})().catch(err=>{console.error(err.message);process.exit(1)});
