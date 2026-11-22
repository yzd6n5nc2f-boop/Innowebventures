import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const evidence=JSON.parse(await readFile('src/content/articleEvidence.json','utf8'));
const config=JSON.parse(await readFile('dist/staticwebapp.config.json','utf8'));
async function html(route){const file=config.routes.find(r=>r.route===route)?.rewrite;assert.ok(file,route);return readFile('dist'+file,'utf8');}
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'");

test('all articles render their byline, true review date, FAQs and two to four checked sources',async()=>{
 const routes=config.routes.filter(r=>r.route.startsWith('/blog/')&&r.rewrite).map(r=>r.route);
 assert.deepEqual(routes.sort(),Object.keys(evidence.articles).map(s=>'/blog/'+s).sort());
 for(const [slug,review] of Object.entries(evidence.articles)){
  const doc=await html('/blog/'+slug);
  assert.match(doc,/data-article-byline="true"[^>]*>By /);
  assert.ok(doc.includes('data-article-updated="true" dateTime="'+review.reviewedAt+'"')||doc.includes('data-article-updated="true" datetime="'+review.reviewedAt+'"'));
  assert.match(doc,/data-article-faq="true"/);assert.ok(review.faq.length>=2);
  for(const item of review.faq){assert.ok(decode(doc).includes(item.question));assert.ok(decode(doc).includes(item.answer));}
  assert.ok(review.sourceIds.length>=2&&review.sourceIds.length<=4);
  for(const id of review.sourceIds){const s=evidence.sources[id];assert.ok(s&&s.checkedAt&&s.supports);assert.ok(decode(doc).includes('href="'+s.url+'"'));}
  const body=doc.match(/data-article-content="true"[^>]*>([\s\S]*?)<\/div>/)?.[1];assert.ok(body);
  assert.doesNotMatch(body,/\d+(?:\.\d+)?\s*(?:%|percent)|[£$€]\s*\d/i);
  assert.doesNotMatch(body,/<blockquote\b|<q\b/);
 }
});

test('Article and FAQ structured data match visible company attribution and questions',async()=>{
 for(const [slug,review] of Object.entries(evidence.articles)){
  const doc=await html('/blog/'+slug);
  const graphs=[...doc.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j];});
  const article=graphs.find(j=>j['@type']==='Article');assert.ok(article,slug);
  assert.equal(article.author['@type'],'Organization');assert.equal(article.author.name,'InnoWeb Ventures');assert.equal(article.dateModified,review.reviewedAt);
  const faq=graphs.find(j=>j['@type']==='FAQPage');assert.ok(faq,slug);
  assert.deepEqual(faq.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),review.faq);
 }
});
