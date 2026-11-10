const {chromium}=require('playwright'); const fs=require('node:fs/promises');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{
 const p=await b.newPage({viewport:{width:1440,height:1000}}),events=[];
 p.on('console',m=>{if(m.type()==='error'||m.text().startsWith('contact_verification'))events.push({type:'console',message:m.text().replace(/[A-Za-z0-9_-]{45,}/g,'[redacted]')});});
 p.on('requestfailed',r=>events.push({type:'failed',origin:new URL(r.url()).origin,path:new URL(r.url()).pathname.split('/').slice(0,4).join('/'),error:r.failure()?.errorText}));
 p.on('response',r=>{if(r.url().includes('challenges.cloudflare.com'))events.push({type:'cloudflare_response',status:r.status(),path:new URL(r.url()).pathname.split('/').slice(0,4).join('/')});});
 await p.goto('https://deploy-preview-1--sprightly-horse-c6240e.netlify.app/',{waitUntil:'domcontentloaded'});await p.locator('form').first().scrollIntoViewIfNeeded();
 await p.waitForFunction(()=>document.querySelector('iframe[src*="challenges.cloudflare.com"]')||document.querySelector('form [role="alert"]'),{timeout:20000}).catch(()=>{});
 await p.waitForTimeout(5000);
 const result={events,scripts:await p.locator('script[src]').evaluateAll(nodes=>nodes.map(x=>new URL(x.src).origin+new URL(x.src).pathname)),iframes:[],formText:await p.locator('form').first().innerText()};
 for(const f of p.frames())if(f.url().includes('challenges.cloudflare.com'))result.iframes.push({text:await f.locator('body').innerText().catch(()=>'<unreadable>')});
 const dir=process.env.QA_LIVE_EVIDENCE_DIR||'test-results/h2-preview/normal';
 await fs.mkdir(dir,{recursive:true});await p.screenshot({path:`${dir}/form.png`});await fs.writeFile(`${dir}/diagnostics.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await b.close();}})().catch(e=>{console.error(e.message);process.exit(1)});
