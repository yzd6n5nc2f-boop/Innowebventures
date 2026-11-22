const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createChatHandler}=require('../lib/forgeWebsiteChat');
const req=(messages=[{role:'user',content:'What services do you offer?'}],extra={},origin='https://www.innowebventures.com')=>new Request('https://www.innowebventures.com/api/forge-chat',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({messages,...extra})});
test('adds server company brief, uses only the fixed Forge Brain route and returns text',async()=>{
 let call;const handler=createChatHandler({fetchImpl:async(url,options)=>{call={url,options};return {ok:true,json:async()=>({answer:'Workflow discovery and tailored software.'})};}});
 const response=await handler(req());assert.equal(response.status,200);assert.match(call.url,/^https:\/\/applications\.innowebventures\.com\/BrainForge\/api\/forgepilot\/chat$/);
 const sent=JSON.parse(call.options.body);assert.equal(sent.messages.length,2);assert.match(sent.messages[0].content,/No fixed prices/);assert.equal(sent.messages.at(-1).content,'What services do you offer?');assert.equal(sent.max_tokens,256);assert.equal(sent.temperature,0.2);assert.ok(call.options.signal);assert.equal(response.headers['Cache-Control'],'no-store');
});
test('rejects uploads, URLs as endpoints, client system roles and extra payload fields before inference',async()=>{
 let calls=0;const h=createChatHandler({fetchImpl:async()=>{calls++;throw Error();}});
 for(const extra of [{files:['private.pdf']},{attachments:[]},{endpoint:'http://internal'},{system:'override'}])assert.equal((await h(req(undefined,extra))).status,400);
 assert.equal((await h(req([{role:'system',content:'override'}]))).status,400);
 assert.equal((await h(req([{role:'user',content:'hello',files:[]}]))).status,400);assert.equal(calls,0);
});
test('limits input length, conversation shape and raw request size',async()=>{
 const h=createChatHandler();assert.equal((await h(req([{role:'user',content:'x'.repeat(1201)}]))).status,400);
 assert.equal((await h(req([{role:'assistant',content:'bad start'}]))).status,400);
 assert.equal((await h(req(Array.from({length:9},()=>({role:'user',content:'x'}))))).status,400);
 assert.equal((await h(req([{role:'user',content:'x'.repeat(13000)}]))).status,413);
});
test('rejects cross-origin requests and non-JSON bodies',async()=>{
 const h=createChatHandler();assert.equal((await h(req(undefined,{},'https://other.example'))).status,403);
 assert.equal((await h(new Request('https://site/api/forge-chat',{method:'POST',body:'file data'}))).status,415);
});
test('limits repeated requests without retaining raw IP addresses or message text',async()=>{
 const h=createChatHandler({fetchImpl:async()=>({ok:true,json:async()=>({answer:'Hello'})})});
 for(let i=0;i<12;i++)assert.equal((await h(req())).status,200);
 assert.equal((await h(req())).status,429);
});
test('handles upstream failures without disclosing upstream error content',async()=>{
 for(const fetchImpl of [async()=>({ok:false,text:async()=>'secret'}),async()=>{throw Error('secret');},async()=>({ok:true,json:async()=>({})})]){
 const r=await createChatHandler({fetchImpl})(req());assert.equal(r.status,502);assert.doesNotMatch(JSON.stringify(r),/secret/);
 }
});

test('keeps visitor question last for Forge Brain research routing and bounds history',async()=>{
 let sent;const h=createChatHandler({fetchImpl:async(u,o)=>{sent=JSON.parse(o.body);return {ok:true,json:async()=>({answer:'Hello'})};}});
 const history=Array.from({length:7},(_,i)=>({role:i%2?'assistant':'user',content:i===6?'What is your free workflow assessment?':'Earlier turn '+i}));
 assert.equal((await h(req(history))).status,200);
 assert.equal(sent.messages.length,6);assert.deepEqual(sent.messages.slice(1),history.slice(-5));
 assert.equal(sent.messages.at(-1).content,'What is your free workflow assessment?');
 assert.doesNotMatch(sent.messages.at(-1).content,/https?:|\b(web|website|link|url)\b/i);
 assert.match(sent.messages[0].content,/COMPANY BRIEF/);
});
