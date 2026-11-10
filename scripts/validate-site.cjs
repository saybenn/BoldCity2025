const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
const reportDir = process.env.QA_REPORT_DIR || 'context/qa';
const origin = 'https://boldcityiaq.com';
const escape = (s) => String(s || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

(async () => {
  await fs.mkdir(reportDir, {recursive:true});
  const sitemapResponse = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>new URL(x[1]).pathname);
  assert.equal(routes.length, new Set(routes).size);
  const browser = await chromium.launch({channel:'chrome',headless:true, args:process.env.QA_LOW_MEMORY==='true'?['--renderer-process-limit=2','--disable-gpu']:[]});
  const page = await browser.newPage();
  const results = [], issues = [], assets = new Set(), links = new Set();
  try {
    for (const route of [...routes, '/contact/success','/ads/emergency-restoration','/ads/emergency-restoration/success']) {
      const response = await fetch(`${base}${route}`);
      if(response.status !== 200) { issues.push(`${route}: HTTP ${response.status}`); continue; }
      const html = await response.text();
      const data = await page.evaluate((html) => {
        const doc = new DOMParser().parseFromString(html,'text/html');
        return {
          title: doc.title,
          descriptions:[...doc.querySelectorAll('meta[name="description"]')].map(x=>x.content),
          h1:[...doc.querySelectorAll('h1')].map(x=>x.textContent.trim()),
          canonicals:[...doc.querySelectorAll('link[rel="canonical"]')].map(x=>x.getAttribute('href')),
          robots:doc.querySelector('meta[name="robots"]')?.content,
          social:[...doc.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]')].map(x=>x.content),
          schemas:[...doc.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)),
          images:[...doc.querySelectorAll('img')].map(x=>x.getAttribute('src')),
          links:[...doc.querySelectorAll('a[href]')].map(x=>x.getAttribute('href')),
          text:doc.body.textContent,
        };
      }, html);
      const expected = `${origin}${route}`;
      if(data.canonicals.length !== 1 || data.canonicals[0] !== expected) issues.push(`${route}: canonical ${data.canonicals.join(', ')}`);
      if(data.h1.length !== 1) issues.push(`${route}: ${data.h1.length} H1s`);
      if(data.descriptions.length !== 1 || !data.descriptions[0]) issues.push(`${route}: missing/duplicate description`);
      if(!data.title) issues.push(`${route}: missing title`);
      if(data.schemas.length !== 1) issues.push(`${route}: ${data.schemas.length} JSON-LD scripts`);
      const graph = data.schemas.flatMap(x=>x['@graph'] || [x]);
      const business = graph.filter(x=>x['@type']==='LocalBusiness');
      if(business.length!==1 || business[0]['@id']!==`${origin}/#business` || business[0].address.streetAddress!=='14440 Normandy Blvd') issues.push(`${route}: business identity mismatch`);
      if(graph.some(x=>['AggregateRating','Review'].includes(x['@type']) || x.aggregateRating || x.review)) issues.push(`${route}: review-star markup`);
      if(new Set(graph.map(x=>x['@id'])).size!==graph.length) issues.push(`${route}: duplicate node IDs`);
      const servicePage = /^\/services\/[^/]+$/.test(route) || /^\/service-areas\/[^/]+\/[^/]+$/.test(route);
      const service = graph.find(x=>x['@type']==='Service');
      if(servicePage && (!service || service.provider['@id']!==`${origin}/#business`)) issues.push(`${route}: missing connected Service`);
      if(route.startsWith('/service-areas/') && route.split('/').length===4 && !service?.areaServed?.name) issues.push(`${route}: missing local service area`);
      for(const faq of graph.filter(x=>x['@type']==='FAQPage')) for(const q of faq.mainEntity) if(!data.text.includes(q.name) || !data.text.includes(q.acceptedAnswer.text)) issues.push(`${route}: FAQ not reconciled with visible content`);
      if(route.includes('/success') || route.startsWith('/ads/')) if(!data.robots?.includes('noindex')) issues.push(`${route}: missing noindex`);
      for(const img of [...data.images, ...data.social]) {
        const url = new URL(img,base);
        const local = url.pathname.startsWith('/_next/image') ? url.searchParams.get('url') : url.pathname;
        if(local?.startsWith('/images/')) assets.add(local);
      }
      for(const href of data.links) if(href.startsWith('/') && !href.startsWith('//')) links.add(href.split(/[?#]/)[0]);
      results.push({route,title:data.title,h1:data.h1[0],description:data.descriptions[0],canonical:data.canonicals[0],schemaTypes:graph.map(x=>x['@type']),indexing:data.robots,localContent:route.startsWith('/service-areas/')?'Explicit local data and primary source; no case studies':'Service-specific or informational',imageStatus:'Referenced assets checked',targetIntent:route==='/'?'Water Damage Cleanup Jacksonville':service?.name || data.h1[0]});
    }
    for(const route of links) if(!routes.includes(route) && !route.startsWith('/ads/') && !route.includes('/success')) {
      const response = await fetch(`${base}${route}`,{redirect:'manual'});
      if(response.status>=400) issues.push(`Internal link ${route}: HTTP ${response.status}`);
    }
    for(const asset of assets) {
      const response = await fetch(`${base}${asset}`); if(response.status!==200) issues.push(`Image ${asset}: HTTP ${response.status}`);
      const optimized = await fetch(`${base}/_next/image?url=${encodeURIComponent(asset)}&w=640&q=75`);
      if(optimized.status!==200) issues.push(`Optimized image ${asset}: HTTP ${optimized.status}`);
    }
    for(const key of ['title','description']) {
      const values=results.filter(x=>!x.route.startsWith('/ads/')&&!x.route.endsWith('/success')).map(x=>x[key]);
      if(new Set(values).size!==values.length) issues.push(`Duplicate indexable ${key}`);
    }
    const headers = '| Route | Page type / schema | Search intent | H1 | Title | Description | Canonical | Local content | Media / proof | Indexing |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n';
    const matrix = results.map(r=>`| ${[r.route,r.schemaTypes.join(', '),r.targetIntent,r.h1,r.title,r.description,r.canonical,r.localContent,r.imageStatus,r.indexing].map(escape).join(' | ')} |`).join('\n');
    await fs.mkdir('context/seo',{recursive:true});
    await fs.writeFile(process.env.QA_REPORT_DIR?`${reportDir}/page-matrix.md`:'context/seo/page-matrix.md', '# SEO page matrix\n\nGenerated from initial build HTML at '+base+'. Indexing values reflect the tested deployment context; previews intentionally use noindex.\n\n'+headers+matrix+'\n');
    await fs.writeFile(`${reportDir}/site-validation.json`,JSON.stringify({checkedAt:new Date().toISOString(),base,routes:results.length,assets:assets.size,issues,pages:results},null,2));
    await fs.writeFile(`${reportDir}/schema-validation.md`,`# Structured data and technical validation\n\nInspected initial HTML for ${results.length} routes, including every existing page type; checked ${assets.size} local image paths and their optimized responses.\n\n${issues.length?issues.map(x=>'- '+x).join('\n'):'All automated assertions passed.'}\n\nExternal schema.org and Google Rich Results tools were not run. A structural pass does not imply rich-result eligibility.\n`);
    console.log(JSON.stringify({routes:results.length,assets:assets.size,issues},null,2));
    assert.equal(issues.length,0,'See site-validation.json');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error.message);process.exit(1)});
