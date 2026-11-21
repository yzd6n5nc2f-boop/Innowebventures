const { test } = require('node:test');
const assert = require('node:assert/strict');
const { questions, validateAnswers, assess, reportText } = require('../lib/readinessAssessment');
const { createHandler } = require('../lib/assessmentHandler');
const all = index => Object.fromEntries(questions.map(q=>[q.id,index]));
function withScore(target) {
 let states = new Map([[0,{}]]);
 for(const q of questions){const next=new Map();for(const [sum,answers] of states)for(let i=0;i<q.options.length;i++)next.set(sum+q.options[i].score,{...answers,[q.id]:i});states=next;}
 return states.get(target);
}
test('12 questions span five dimensions, with validated option-based scores',()=>{
 assert.equal(questions.length,12);assert.equal(new Set(questions.map(q=>q.category)).size,5);
 assert.equal(assess(all(0)).score,0);assert.equal(assess(all(3)).score,36);
 for(const [score,band] of [[0,'foundations'],[14,'foundations'],[15,'pilot'],[26,'pilot'],[27,'rollout'],[36,'rollout']]){
  const result=assess(withScore(score));assert.equal(result.score,score);assert.equal(result.band,band);assert.equal(result.dimensions.reduce((n,d)=>n+d.score,0),score);assert.equal(result.dimensions.reduce((n,d)=>n+d.max,0),36);
 }
});
test('documented local, private-cloud and cloud needs receive equal treatment',()=>{
 for(const hostingNeeds of [1,2,3])assert.equal(assess({...all(3),hostingNeeds}).score,36);
 assert.equal(assess({...all(3),hostingNeeds:0}).score,33);
});
test('weakest dimensions drive priorities; critical governance and privacy gaps are visible even in high bands',()=>{
 const result=assess({...all(3),humanReview:0,privacyHandling:0});
 assert.equal(result.band,'rollout');assert.equal(result.safeguards.length,2);assert.equal(result.priorities[0].area,'Privacy');
 assert.match(result.disclaimer,/not an independent audit/);
 const text=reportText({...all(3),humanReview:0,privacyHandling:0},result);assert.match(text,/30\/36/);assert.match(text,/Where|Human|human/);assert.match(text,/review/);
});
test('rejects skipped, extra, string, negative and out-of-range answers',()=>{
 for(const input of [null,[],{}, {...all(3),dataAccess:'3'},{...all(3),dataAccess:-1},{...all(3),dataAccess:4},{...all(3),extra:3}])assert.throws(()=>validateAnswers(input));
 const skipped=all(3);delete skipped.dataQuality;assert.throws(()=>validateAnswers(skipped));
});
test('readiness result is calculated on the server and delivered to participant and team only after consent',async()=>{
 let time=1800000000000;const messages=[],notices=[];let reservations=0;
 const handler=createHandler({config:{ready:true},secret:'test-secret',allowedOrigins:['https://www.innowebventures.com'],now:()=>time,reserve:async()=>{reservations++;return true;},deliver:async m=>messages.push(m),notify:async m=>notices.push(m)});
 const request=(method,body)=>({method,headers:new Headers({origin:'https://www.innowebventures.com'}),text:async()=>JSON.stringify(body)});const ctx={error(){},warn(){}};
 const token=(await handler(request('GET'),ctx)).jsonBody.token;time+=3000;
 const body={token,assessmentType:'readiness',answers:all(0),name:'Example Owner',email:'owner@example.com',company:'Example SME',requestResults:false,followUp:false,result:{score:36}};
 assert.equal((await handler(request('POST',body),ctx)).status,400);assert.equal(reservations,0);assert.equal(messages.length,0);
 body.requestResults=true;const response=await handler(request('POST',body),ctx);
 assert.equal(response.status,200);assert.equal(response.jsonBody.result.score,0);assert.equal(response.jsonBody.result.band,'foundations');
 assert.equal(messages[0].assessmentType,'readiness');assert.match(messages[0].text,/Your AI readiness assessment/);assert.equal(notices[0].email,'owner@example.com');assert.equal(notices[0].assessmentType,'readiness');assert.equal(notices[0].followUp,false);
 assert.equal((await handler(request('POST',{...body,assessmentType:'unknown'}),ctx)).status,400);
});
