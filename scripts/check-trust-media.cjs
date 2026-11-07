const fs = require('node:fs/promises');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const sharp = require('sharp');

(async () => {
  const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
  const html = await (await fetch(base)).text();
  const sources = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => {
    const url = new URL(match[1].replace(/&amp;/g,'&'),base);
    return url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
  });
  const photos = sources.filter(source => source.startsWith('/images/') && !/logo|\/brands\//i.test(source));
  assert.equal(photos.filter(source => source === '/images/projects/worker-at-protected-kitchen.webp').length,1);
  assert.equal(photos.filter(source => source === '/images/moldSigue.webp').length,1);
  assert.equal(new Set(photos).size,photos.length,'A photograph is repeated on the homepage');
  const measurements = [];
  for (const source of photos) {
    const file = 'public' + source, bytes = await fs.readFile(file), metadata = await sharp(bytes).metadata();
    const pixels = await sharp(bytes).rotate().resize(16,16,{fit:'fill'}).greyscale().raw().toBuffer();
    const average = pixels.reduce((sum,value)=>sum+value,0)/pixels.length;
    measurements.push({source,width:metadata.width,height:metadata.height,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),fingerprint:[...pixels].map(value=>value>=average?1:0)});
  }
  const candidates=[];
  for(let i=0;i<measurements.length;i++)for(let j=i+1;j<measurements.length;j++){
    const left=measurements[i],right=measurements[j];
    const distance=left.fingerprint.filter((value,index)=>value!==right.fingerprint[index]).length;
    if(left.sha256===right.sha256||distance<8)candidates.push({left:left.source,right:right.source,distance});
  }
  const report={base,scope:'Rendered homepage photographs; repeated brand marks excluded',photos:measurements.map(({fingerprint,...item})=>item),potentialDuplicates:candidates,limits:'Low-resolution luminance fingerprints flag likely duplicates; visual inspection still assesses alternate crops and genuine different views of the same property.',replacement:{source:'/images/moldSigue.webp',title:'Air-handling equipment and protected cabinets',alt:'Air-handling equipment beside exposed lower wall framing beneath protected kitchen cabinets',jobClaims:'No separate job, mold species, measured air quality or completed-result claim.'}};
  await fs.mkdir('context/qa/trust-final',{recursive:true});
  await fs.writeFile('context/qa/trust-final/media-validation.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({photos:measurements.length,potentialDuplicates:candidates},null,2));
  assert.equal(candidates.length,0,'Review potential duplicate photographs');
})().catch(error=>{console.error(error.message);process.exit(1)});
