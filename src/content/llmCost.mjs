export const defaults = {
 mode:'documents',volume:1000,days:22,inputTokens:4000,outputTokens:1000,callsPerTask:1,
 economyInput:.12,economyOutput:.35,economyFee:0,economyCredits:0,
 premiumInput:2.5,premiumOutput:12,premiumFee:0,premiumCredits:0,
 hardware:2500,months:36,existingHardware:false,support:25,electricity:.28,
 activeWatts:300,idleWatts:60,hoursPerDay:8,inputSpeed:300,outputSpeed:20,
};
const limits={volume:[0,1000000],days:[1,31],inputTokens:[0,1000000],outputTokens:[0,1000000],callsPerTask:[1,100],economyInput:[0,10000],economyOutput:[0,10000],economyFee:[0,1000000],economyCredits:[0,1000000],premiumInput:[0,10000],premiumOutput:[0,10000],premiumFee:[0,1000000],premiumCredits:[0,1000000],hardware:[0,1000000],months:[1,120],support:[0,1000000],electricity:[0,5],activeWatts:[0,10000],idleWatts:[0,10000],hoursPerDay:[0,24],inputSpeed:[.01,1000000],outputSpeed:[.01,1000000]};
export function calculateCost(c){
 const errors=[];
 if(!['documents','requests'].includes(c.mode))errors.push('Choose documents per month or requests per day.');
 for(const [key,[min,max]] of Object.entries(limits))if(typeof c[key]!=='number'||!Number.isFinite(c[key])||c[key]<min||c[key]>max)errors.push(`Check ${key}: enter a value from ${min} to ${max}.`);
 for(const key of ['volume','days','inputTokens','outputTokens','callsPerTask','months'])if(Number.isFinite(c[key])&&!Number.isInteger(c[key]))errors.push(`Check ${key}: enter a whole number.`);
 if(c.activeWatts<c.idleWatts)errors.push('Active power must be at least idle power.');
 if(typeof c.existingHardware!=='boolean')errors.push('Choose whether hardware is already owned.');
 if(errors.length)return {errors};
 const tasks=c.mode==='documents'?c.volume:c.volume*c.days;
 const calls=tasks*c.callsPerTask,input=calls*c.inputTokens,output=calls*c.outputTokens;
 const cloud=(inputRate,outputRate,fee,credit)=>{const usage=input/1e6*inputRate+output/1e6*outputRate;return {usage,fee,creditApplied:Math.min(usage,credit),total:fee+Math.max(0,usage-credit)};};
 const economy=cloud(c.economyInput,c.economyOutput,c.economyFee,c.economyCredits),premium=cloud(c.premiumInput,c.premiumOutput,c.premiumFee,c.premiumCredits);
 const availableHours=c.days*c.hoursPerDay;
 const requiredHours=(input/c.inputSpeed+output/c.outputSpeed)/3600;
 const capacityExceeded=requiredHours>availableHours+1e-9;
 const activeHours=Math.min(requiredHours,availableHours),idleHours=Math.max(0,availableHours-activeHours);
 const energyKwh=(activeHours*c.activeWatts+idleHours*c.idleWatts)/1000;
 const energy=energyKwh*c.electricity,hardware=c.existingHardware?0:c.hardware/c.months;
 const local={hardware,support:c.support,energy,energyKwh,total:hardware+c.support+energy,requiredHours,availableHours,capacityExceeded};
 return {errors:[],tasks,calls,input,output,economy,premium,local};
}
