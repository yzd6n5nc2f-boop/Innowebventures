import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const plan=JSON.parse(await readFile('src/content/internalLinks.json','utf8'));
const config=JSON.parse(await readFile('dist/staticwebapp.config.json','utf8'));
const metadata=JSON.parse(await readFile('src/content/pageMetadata.json','utf8'));
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
const anchors=s=>[...s.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(m=>({to:decode(m[1].match(/href="([^"]+)"/)[1]),anchor:decode(m[2].replace(/<[^>]*>/g,'')),attrs:m[1]}));
async function html(route){const file=config.routes.find(r=>r.route===route)?.rewrite;assert.ok(file,route);return readFile('dist'+file,'utf8');}
function related(document,route){return document.match(/<aside\b[^>]*data-related-source="[^"]+"[^>]*>([\s\S]*?)<\/aside>/)?.[1] ?? assert.fail('Missing Related: '+route);}
test('all 30 articles render their 64 approved contextual links inside paragraphs',async()=>{
 assert.equal(Object.keys(plan.posts).length,30);let count=0;
 for(const [slug,p] of Object.entries(plan.posts)){
  const doc=await html('/blog/'+slug);const actual=[...doc.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].flatMap(m=>anchors(m[1]).filter(a=>a.attrs.includes('data-contextual-link="true"')));
  const expected=[...p.body,...p.extra].map(l=>({anchor:l.anchor,to:l.to}));assert.equal(actual.length,expected.length,slug);
  for(const l of expected){assert.equal(actual.filter(a=>a.anchor===l.anchor&&a.to===l.to).length,1,slug+': '+l.anchor);assert.ok(metadata[l.to],l.to);assert.notEqual(l.anchor.toLowerCase(),'click here');}
  assert.ok(actual.length>=2&&actual.length<=5,slug);count+=actual.length;
 }assert.equal(count,64);
});
test('all articles contain exactly the approved two-link Related block',async()=>{
 let count=0;for(const [slug,p] of Object.entries(plan.posts)){
  const route='/blog/'+slug,doc=await html(route),block=related(doc,route);
  assert.deepEqual(anchors(block).map(({anchor,to})=>({title:anchor,to})),p.related,slug);count+=p.related.length;
 }assert.equal(count,60);
});
test('all service and sector pages include their three approved related articles',async()=>{
 assert.equal(Object.keys(plan.pages).length,8);let count=0;
 for(const [route,expected] of Object.entries(plan.pages)){
  const doc=await html(route);assert.deepEqual(anchors(related(doc,route)).map(({anchor,to})=>({title:anchor,to})),expected,route);count+=expected.length;
 }assert.equal(count,24);
});
test('recommendations never reveal currently hidden or future articles',async()=>{
 const blog=await html('/blog'),listed=new Set(anchors(blog).map(a=>a.to).filter(t=>t.startsWith('/blog/')));
 for(const p of Object.values(plan.posts))for(const r of p.related)assert.ok(listed.has(r.to),'Unlisted Related target: '+r.to);
 for(const rs of Object.values(plan.pages))for(const r of rs)assert.ok(listed.has(r.to),'Unlisted service/sector target: '+r.to);
});
