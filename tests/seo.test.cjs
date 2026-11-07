const {test}=require('node:test');
const assert=require('node:assert/strict');
test('canonical entity and schema cover every page and local service type',async()=>{
 const {buildPageGraph,canonicalUrl}=await import('../lib/seo.js');
 const areas=['jacksonville','orange-park','ponte-vedra-beach','st-augustine','jacksonville-beach','neptune-beach','atlantic-beach'];
 const paths=['/','/about','/contact','/financing','/services','/service-areas','/services/air-duct-cleaning',...areas.flatMap(area=>[`/service-areas/${area}`,...['water-damage-restoration','mold-remediation'].map(service=>`/service-areas/${area}/${service}`)])];
 for(const path of paths){
  const data=buildPageGraph({canonical:path+'?utm_source=gmb',title:'A page',description:'A description',image:'/images/about-hero.webp'});
  const graph=data['@graph'];const business=graph.find(x=>x['@type']==='LocalBusiness');
  assert.equal(business['@id'],'https://boldcityiaq.com/#business');assert.equal(business.address.streetAddress,'14440 Normandy Blvd');
  assert.equal(graph.filter(x=>x['@type']==='LocalBusiness').length,1);assert.equal(new Set(graph.map(x=>x['@id'])).size,graph.length);
  assert.ok(!JSON.stringify(data).includes('AggregateRating'));assert.ok(!JSON.stringify(data).includes('utm_source'));
  for(const item of graph){if(item.url)assert.ok(item.url.startsWith('https://boldcityiaq.com/'));}
  if(path.split('/').length===4){const service=graph.find(x=>x['@type']==='Service');assert.ok(service.areaServed.name.endsWith(', FL'));assert.equal(service.provider['@id'],business['@id']);}
 }
 assert.equal(canonicalUrl('/?utm_source=gmb'),'https://boldcityiaq.com/');
 assert.equal(canonicalUrl('/contact/?x=y'),'https://boldcityiaq.com/contact');
});
