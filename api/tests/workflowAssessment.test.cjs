const { test } = require('node:test');
const assert = require('node:assert/strict');
const { assess, validateAnswers, reportText } = require('../lib/workflowAssessment');
const { createHandler } = require('../lib/assessmentHandler');
const answers = { workflow:'Prepare quotations', steps:'Read enquiry, gather prices, prepare a quote and obtain approval.', systems:'Email and spreadsheets', frequency:'weekly', minutes:45, pain:'reentry', sensitivity:'confidential', approval:'commercial' };
function setup(overrides = {}) {
 let time = 1800000000000;
 const sent = [], notices = [], reserved = [];
 const handler = createHandler({ config:{ready:true}, secret:'test-only-signing-secret', allowedOrigins:['https://www.innowebventures.com'], now:()=>time,
  reserve:async input=>{reserved.push(input);return true;}, deliver:async input=>sent.push(input), notify:async input=>notices.push(input), ...overrides });
 const request = (method, body, origin='https://www.innowebventures.com') => ({ method, headers:new Headers({ origin,'x-forwarded-for':'192.0.2.1' }), text:async()=>JSON.stringify(body) });
 const context={error(){},warn(){}};
 return { sent, notices, reserved, handler, context, request, advance:ms=>time+=ms,
  async body() { const response=await handler(request('GET'),context); time+=3000; return { token:response.jsonBody.token, answers, name:'Test User', email:'test@example.com', company:'Example', requestResults:true, followUp:false }; } };
}
test('workload estimate uses explicit frequency assumptions and does not promise savings',()=>{
 assert.equal(assess(answers).monthlyHours,3);
 assert.equal(assess({...answers,frequency:'daily'}).monthlyHours,15);
 assert.equal(assess({...answers,frequency:'monthly'}).monthlyHours,.8);
 assert.match(assess(answers).method,/not predicted time saved/);
 assert.match(assess(answers).controls,/approval before any external action/);
 assert.match(assess({...answers,approval:'regulated'}).controls,/qualified person/);
 assert.match(assess(answers).privacy,/does not establish compliance/);
 assert.match(reportText(answers,assess(answers)),/not a quotation/);
});
test('every difficulty has a relevant recommendation and rejects malformed answers',()=>{
 for(const pain of ['reentry','waiting','reporting','finding','errors']) assert.ok(assess({...answers,pain}).opportunity.length>50);
 for(const input of [{...answers,frequency:'hourly'},{...answers,minutes:-5},{...answers,minutes:'45'},{...answers,minutes:Infinity},{...answers,approval:'none'},null]) assert.throws(()=>validateAnswers(input));
});
test('email request sends report, records follow-up choice, and recalculates results on server',async()=>{
 const s=setup();const body=await s.body();body.result={monthlyHours:99999};
 const response=await s.handler(s.request('POST',body),s.context);
 assert.equal(response.status,200);assert.equal(response.jsonBody.result.monthlyHours,3);
 assert.equal(s.sent.length,1);assert.equal(s.sent[0].email,'test@example.com');assert.match(s.sent[0].text,/Connect the information once/);
 assert.equal(s.notices[0].followUp,false);assert.equal(s.reserved.length,1);
});
test('rejects email-header injection, missing request consent, invalid token and disallowed origin before sending',async()=>{
 for(const change of [{email:'test@example.com\r\nBcc:other@example.com'},{requestResults:false},{token:'tampered'},{name:'Bad\nName'},{website:'spam'}]){
  const s=setup();const response=await s.handler(s.request('POST',{...await s.body(),...change}),s.context);assert.equal(response.status,400);assert.equal(s.sent.length,0);
 }
 const s=setup();assert.equal((await s.handler(s.request('POST',await s.body(),'https://other.example'),s.context)).status,403);
});
test('does not send if security storage or provider is unavailable; surfaces delivery failures honestly',async()=>{
 for(const [overrides,status] of [[{reserve:async()=>false},429],[{reserve:async()=>{throw Error();}},503],[{deliver:async()=>{throw Error('provider secret');}},502]]){
  const s=setup(overrides);const r=await s.handler(s.request('POST',await s.body()),s.context);assert.equal(r.status,status);assert.ok(!JSON.stringify(r).includes('provider secret'));assert.equal(s.notices.length,0);
 }
 const s=setup({config:{ready:false}});assert.equal((await s.handler(s.request('GET'),s.context)).status,503);assert.equal(s.sent.length,0);
});
test('rejects token replay-age and oversized request, while notification failure does not misreport successful delivery',async()=>{
 const early=setup();const token=(await early.handler(early.request('GET'),early.context)).jsonBody.token;
 assert.equal((await early.handler(early.request('POST',{token,...{answers,name:'Test',email:'test@example.com',requestResults:true,followUp:false}}),early.context)).status,400);
 const expired=setup();const body=await expired.body();expired.advance(7200001);assert.equal((await expired.handler(expired.request('POST',body),expired.context)).status,400);
 const large=setup();assert.equal((await large.handler(large.request('POST',{...await large.body(),company:'x'.repeat(15000)}),large.context)).status,413);
 const s=setup({notify:async()=>{throw Error();}});assert.equal((await s.handler(s.request('POST',await s.body()),s.context)).status,200);assert.equal(s.sent.length,1);
});
