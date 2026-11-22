import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {literalRecords} from './build-llms.mjs';
const config=JSON.parse(await readFile('dist/staticwebapp.config.json','utf8'));
const file=config.routes.find(r=>r.route==='/blog').rewrite;
const html=await readFile('dist'+file,'utf8');
const renderedAt=Number(html.match(/data-rendered-at="(\d+)"/)[1]);
const posts=[];
for(const file of ['blogPosts.ts','innowebCapabilityPosts.ts','realWorldAutomationPosts.ts','novemberPartnershipPosts.json']){
 posts.push(...literalRecords(file,await readFile('src/content/'+file,'utf8')).filter(r=>r.kind==='article'));
}
test('blog archive lists every dated article through the render date, in newest-first order',()=>{
 const expected=posts.filter(p=>Date.parse(p.publishAt||p.published+' 00:00:00 GMT')<=renderedAt).sort((a,b)=>Date.parse(b.published+' GMT')-Date.parse(a.published+' GMT'));
 const actual=[...html.matchAll(/<a\b[^>]*href="\/blog\/([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(actual,expected.map(p=>p.slug));
 assert.ok(expected.some(p=>p.published==='19 November 2026'));
 for(const date of ['22 October 2026','27 October 2026','3 November 2026','5 November 2026','10 November 2026','12 November 2026'])assert.ok(expected.some(p=>p.published===date),date);
});
test('upcoming articles follow the requested weekly Tuesday sequence without losing a post',()=>{
 const upcoming=posts.filter(p=>p.publishAt&&Date.parse(p.publishAt)>=Date.parse('2026-11-24T00:00:00Z'));
 assert.deepEqual(upcoming.map(p=>p.publishAt),['2026-11-24','2026-12-01','2026-12-08','2026-12-15','2026-12-22','2026-12-29','2027-01-05'].map(d=>d+'T00:00:00Z'));
 for(const p of upcoming)assert.equal(new Date(p.publishAt).getUTCDay(),2);
});
