import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaults,calculateCost} from '../src/content/llmCost.mjs';
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);
test('CRM email agent uses four billed calls per email and separates existing from new hardware',()=>{
 const r=calculateCost(defaults);assert.deepEqual(r.errors,[]);assert.equal(r.tasks,2200);assert.equal(r.calls,8800);assert.equal(r.input,35200000);assert.equal(r.output,4400000);
 close(r.economy.total,183.04);close(r.premium.total,366.08);close(r.local.hardware,0);
 close(r.local.requiredHours,(35200000/300+4400000/20)/3600);
 close(r.local.energy,((r.local.requiredHours*300+(176-r.local.requiredHours)*60)/1000)*.28);
 close(r.local.total,r.local.energy);assert.equal(r.local.capacityExceeded,false);
 const purchased=calculateCost({...defaults,existingHardware:false});close(purchased.local.total,r.local.total+2500/36);
});
const legacy={...defaults,mode:'documents',volume:1000,inputTokens:4000,outputTokens:1000,callsPerTask:1,economyInput:.12,economyOutput:.35,premiumInput:2.5,premiumOutput:12,existingHardware:false,support:25};
test('daily requests use operating days and repeat model calls for agentic work',()=>{
 const r=calculateCost({...legacy,mode:'requests',volume:100,days:20,callsPerTask:3});assert.equal(r.tasks,2000);assert.equal(r.calls,6000);close(r.economy.total,4.98);close(r.premium.total,132);
});
test('subscriptions and credits apply once and cannot create a negative bill',()=>{
 const r=calculateCost({...legacy,economyFee:16,economyCredits:48,premiumFee:20,premiumCredits:10});close(r.economy.total,16);close(r.economy.creditApplied,.83);close(r.premium.total,32);
});
test('zero usage still includes idle electricity, hardware and support; existing hardware removes only purchase allocation',()=>{
 const zero=calculateCost({...legacy,volume:0});close(zero.economy.total,0);close(zero.premium.total,0);close(zero.local.energy,176*.06*.28);assert.ok(zero.local.total>0);
 const owned=calculateCost({...legacy,existingHardware:true});close(owned.local.hardware,0);close(owned.local.total,25+owned.local.energy);assert.ok(owned.local.energy>0);
});
test('capacity exceedance is flagged and single-device energy stays bounded by powered hours',()=>{
 const r=calculateCost({...legacy,volume:100000});assert.equal(r.local.capacityExceeded,true);close(r.local.energy,176*.3*.28);assert.ok(r.local.requiredHours>r.local.availableHours);
 const off=calculateCost({...legacy,hoursPerDay:0});assert.equal(off.local.capacityExceeded,true);close(off.local.energy,0);
});
test('invalid, blank and fractional count inputs produce errors rather than misleading totals',()=>{
 for(const change of [{volume:-1},{volume:NaN},{volume:.5},{days:0},{months:0},{inputSpeed:0},{outputSpeed:Infinity},{activeWatts:10,idleWatts:20},{mode:'unknown'},{economyInput:-2},{existingHardware:'yes'}]){const r=calculateCost({...legacy,...change});assert.ok(r.errors.length>0);assert.equal(r.local,undefined);}
});
test('cost per call is monotonic in usage and premium has no guaranteed relationship to quality',()=>{
 const a=calculateCost({...legacy,volume:10}),b=calculateCost({...legacy,volume:20});close(b.economy.total,2*a.economy.total);close(b.premium.total,2*a.premium.total);
 const cheapPremium=calculateCost({...legacy,premiumInput:0,premiumOutput:0});close(cheapPremium.premium.total,0);
});
