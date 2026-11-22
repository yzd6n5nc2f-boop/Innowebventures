import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const evidence=JSON.parse(await readFile('src/content/caseStudyEvidence.json','utf8'));
const config=JSON.parse(await readFile('dist/staticwebapp.config.json','utf8'));
async function html(route){const path=config.routes.find(r=>r.route===route)?.rewrite;assert.ok(path,'Missing public page: '+route);return readFile('dist'+path,'utf8');}

test('every published case study has an evidence record and reciprocal service/application links',async()=>{
 const routes=config.routes.filter(r=>r.route.startsWith('/case-studies/')&&r.rewrite).map(r=>r.route).sort();
 assert.deepEqual(routes,Object.keys(evidence).sort());
 for(const [route,item] of Object.entries(evidence)){
  const doc=await html(route);
  assert.ok(doc.includes(`href="${item.servicePath}"`),'Missing matching service: '+route);
  await html(item.servicePath);
  assert.ok(doc.includes(`href="${item.appOverviewPath}"`),'Missing app overview: '+route);
  const [app,fragment]=item.appOverviewPath.split('#');const overview=await html(app);
  if(fragment)assert.ok(overview.includes(`id="${fragment}"`),'Missing application anchor');
  assert.ok(overview.includes(`href="${route}"`),'Application does not link back to case study');
 }
});

test('unapproved client identities, quotations and screenshots are not published in the development case',async()=>{
 for(const [route,item] of Object.entries(evidence)){
  const doc=await html(route);const main=doc.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];assert.ok(main);
  if(!item.approvedClientQuote)assert.doesNotMatch(main,/<blockquote\b|<q\b/);
  const images=[...main.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(images,item.approvedScreenshotPaths);
  if(item.approvedClientName||item.approvedClientQuote||images.length)assert.ok(item.writtenPermissionEvidence,'Permission evidence required');
  if(item.status==='in-development'&&item.verifiedOutcomeFigures.length===0){
   assert.match(main,/work in progress/);
   assert.match(main,/Verified outcome figures have not been supplied/);
   assert.doesNotMatch(main,/\d+(?:\.\d+)?\s*%|[£$€]\s*\d/);
  }
 }
});
