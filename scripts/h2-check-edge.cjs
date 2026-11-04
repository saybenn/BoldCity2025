const fs=require('node:fs/promises');
const base='https://deploy-preview-1--sprightly-horse-c6240e.netlify.app';
async function probe(path,headers,body){const response=await fetch(base+path,{method:'POST',headers,body});const text=await response.text();return {path,status:response.status(),type:response.headers.get('content-type'),retryAfter:response.headers.get('retry-after'),requestId:response.headers.get('x-nf-request-id'),body:text.slice(0,200)};}
(async()=>{
 const results=[];const startedAt=new Date().toISOString();
 // Missing name/token ensures this cannot reach email. It distinguishes a
 // functioning trusted-IP context (400 validation) from missing context (503).
 results.push(await probe('/api/contact',{'content-type':'application/json'},'{}'));
 // Invalid content type is rejected before Turnstile/Postmark and the in-memory
 // throttle, so observed non-JSON 429s can qualify the deployed edge separately.
 for(let i=0;i<23;i++)results.push(await probe(i%2?'/api/contact':'/api/lead',{'content-type':'text/plain'},'phase2-invalid-probe'));
 results.push(await probe('/api/contact',{'content-type':'text/plain','x-forwarded-for':'192.0.2.100','x-nf-client-connection-ip':'192.0.2.101'},'phase2-invalid-probe'));
 const unrelated=await fetch(base+'/resources/emergency-checklist');
 const report={kind:'Real preview-only invalid requests; no challenge tokens, PII, accepted leads or email',startedAt,finishedAt:new Date().toISOString(),base,results,unrelatedPageStatus:unrelated.status,remaining:'Post-processing log acceptance and a later recovery probe must be recorded separately. A 429 alone does not prove all rule settings.'};
 await fs.writeFile('context/qa/h2-live-edge.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(error.message);process.exit(1);});
