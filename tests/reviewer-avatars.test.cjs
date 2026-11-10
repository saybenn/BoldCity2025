const {test}=require('node:test');
const assert=require('node:assert/strict');
const records=require('../lib/review-records.json');
const review=records.find(r=>r.name==='Steve Sierra');
// Synthetic metadata for contract tests only. No portrait or Google review ID
// has been retrieved; none of these values is passed to the real homepage.
const photoUrl='https://lh3.googleusercontent.com/a/TEST_ONLY_AVATAR';
const now=Date.parse('2026-11-08T12:00:00Z');
function source(){return {recordId:review.id,source:'google_business_profile_api',verified:true,deliveryApproved:true,reviewId:'TEST_ONLY_NOT_A_GOOGLE_REVIEW_ID',rating:5,comment:review.text,reviewer:{displayName:review.name,isAnonymous:false,profilePhotoUrl:photoUrl},verifiedAt:'2026-11-08T11:00:00Z',expiresAt:'2026-11-09T11:00:00Z',imageValidation:{url:photoUrl,valid:true,contentType:'image/jpeg',bytes:2048,width:96,height:96},attribution:{required:false}};}

test('reviewer portraits require the complete authorized identity association',async()=>{
  const {verifiedReviewerAvatar}=await import('../lib/reviewer-avatars.js');
  assert.equal(verifiedReviewerAvatar(review,source(),now).matchedBy,'exact_text_rating_name');
  const identified={...review,googleReviewId:'TEST_ONLY_NOT_A_GOOGLE_REVIEW_ID'};
  assert.equal(verifiedReviewerAvatar(identified,source(),now).matchedBy,'exact_review_id');
  for(const mutate of [s=>{s.recordId='other-record';},s=>{s.reviewer.displayName='Steve';},s=>{s.comment='I highly recommend BCIAQ.';},s=>{s.rating=4;},s=>{s.reviewer.isAnonymous=true;},s=>{delete s.reviewer.isAnonymous;},s=>{s.verified=false;},s=>{s.deliveryApproved=false;},s=>{s.source='google_maps_scrape';}]){
    const candidate=source();mutate(candidate);assert.equal(verifiedReviewerAvatar(review,candidate,now),null);
  }
  assert.equal(verifiedReviewerAvatar({...review,googleReviewId:'DIFFERENT_KNOWN_ID'},source(),now),null);
  assert.equal(verifiedReviewerAvatar(review,null,now),null);
});

test('portrait URLs, validation and source attribution fail closed',async()=>{
  const {verifiedReviewerAvatar,safeReviewerPhotoUrl}=await import('../lib/reviewer-avatars.js');
  for(const url of ['http://lh3.googleusercontent.com/a/TEST','https://lh3.googleusercontent.com.evil.test/a/TEST','https://example.com/avatar.jpg','https://user:secret@lh3.googleusercontent.com/a/TEST','https://lh3.googleusercontent.com:444/a/TEST','https://lh3.googleusercontent.com/a/TEST?key=secret','data:image/png;base64,AAA','javascript:alert(1)'])assert.equal(safeReviewerPhotoUrl(url),null);
  assert.equal(safeReviewerPhotoUrl(`${photoUrl}?sz=96`),`${photoUrl}?sz=96`);
  assert.equal(safeReviewerPhotoUrl(`${photoUrl}?sz=1024`),null);
  for(const mutate of [s=>{s.imageValidation.valid=false;},s=>{s.imageValidation.url+='-different';},s=>{s.imageValidation.bytes=65537;},s=>{s.imageValidation.width=1024;},s=>{s.imageValidation.contentType='image/svg+xml';},s=>{s.attribution={required:true};},s=>{s.attribution={authorUrl:'https://evil.test/'};}]){
    const candidate=source();mutate(candidate);assert.equal(verifiedReviewerAvatar(review,candidate,now),null);
  }
  const withLinks=source();withLinks.attribution={required:true,authorUrl:'https://www.google.com/maps/contrib/TEST_ONLY',reviewUrl:'https://www.google.com/maps/reviews/TEST_ONLY'};
  assert.ok(verifiedReviewerAvatar(review,withLinks,now));
});

test('stale, future and excessive retention windows never enable portraits',async()=>{
  const {verifiedReviewerAvatar,reviewerInitials}=await import('../lib/reviewer-avatars.js');
  for(const dates of [['2026-11-01T00:00:00Z','2026-11-08T12:00:00Z'],['2026-11-09T00:00:00Z','2026-11-10T00:00:00Z'],['2026-11-01T00:00:00Z','2026-12-02T00:00:00Z'],['not-a-date','2026-11-09T00:00:00Z']]){
    const candidate=source();[candidate.verifiedAt,candidate.expiresAt]=dates;assert.equal(verifiedReviewerAvatar(review,candidate,now),null);
  }
  assert.equal(reviewerInitials('  Steve Sierra '),'SS');assert.equal(reviewerInitials('Rachel'),'R');assert.equal(reviewerInitials(''),'');
  assert.equal(records.length,23);assert.equal(records.filter(r=>r.text&&r.excerpt).length,22);
  assert.ok(records.every(r=>r.photoUrl===null));
});
