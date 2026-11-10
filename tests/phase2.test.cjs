const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
test('all 23 genuine records are retained and 22 written excerpts are exact contiguous source text',()=>{
  const records=require('../lib/review-records.json');
  assert.equal(records.length,23);assert.equal(new Set(records.map(r=>r.id)).size,23);
  const written=records.filter(r=>r.text); assert.equal(written.length,22);
  for(const review of records){
    assert.equal(review.rating,5);assert.equal(review.publicationDate,null);assert.equal(review.individualReviewUrl,null);
    assert.equal(review.provenance.liveVerified,false);
    if(review.text) assert.ok(review.text.includes(review.excerpt),review.name);
  }
  assert.equal(records.find(r=>r.name==='Christine Lee').text,'');
  assert.ok(records.find(r=>r.name==='Rebecca BBrewer').sourceFlags.length);
  assert.deepEqual([...written].sort((a,b)=>a.displayPriority-b.displayPriority).slice(0,4).map(r=>r.name),['Steve Sierra','Justin Andrade','Susan DuBow','Kim Perry']);
  const source='.qa-lock/phase2-handoff/Sources/Google-reviews-user-supplied.txt';
  if(fs.existsSync(source)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'0bb7c5b4f75eee25fbc82c86780a8a5aca300b4855d4bce0d2d1483cfb8409c4');
});
test('production analytics require both production context and canonical public hostname',async()=>{
  const {deploymentContext,productionAnalyticsAllowed}=await import('../lib/deployment.mjs');
  for(const context of ['deploy-preview','branch-deploy','local','unknown'])assert.equal(productionAnalyticsAllowed(context,'boldcityiaq.com'),false);
  for(const hostname of ['localhost','127.0.0.1','deploy-preview-1--sprightly-horse-c6240e.netlify.app','sprightly-horse-c6240e.netlify.app'])assert.equal(productionAnalyticsAllowed('production',hostname),false);
  assert.equal(productionAnalyticsAllowed('production','boldcityiaq.com'),true);
  assert.equal(productionAnalyticsAllowed('production','www.boldcityiaq.com'),true);
  assert.equal(deploymentContext({NETLIFY:'true',CONTEXT:'deploy-preview',CONTACT_DEPLOY_CONTEXT:'production'}),'deploy-preview');
  assert.equal(deploymentContext({NETLIFY:'true',CONTEXT:'production'}),'production');
  assert.equal(deploymentContext({NODE_ENV:'production'}),'local');
});

test('compact review presentation remains a verbatim contiguous excerpt with accurate omission markers',async()=>{
  const {compactReviewExcerpt}=await import('../lib/review-presentation.js');
  for(const review of require('../lib/review-records.json').filter(review=>review.text)) {
    const excerpt=compactReviewExcerpt(review);
    assert.ok(review.text.includes(excerpt.text),review.name);
    assert.ok(excerpt.text.length<=128,review.name);
    assert.equal(excerpt.omittedBefore,review.omittedBefore);
    assert.equal(excerpt.omittedAfter,review.omittedAfter||excerpt.text.length<review.excerpt.trim().length);
  }
});
