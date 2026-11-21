export type CostConfig = { mode:string;volume:number;days:number;inputTokens:number;outputTokens:number;callsPerTask:number;economyInput:number;economyOutput:number;economyFee:number;economyCredits:number;premiumInput:number;premiumOutput:number;premiumFee:number;premiumCredits:number;hardware:number;months:number;existingHardware:boolean;support:number;electricity:number;activeWatts:number;idleWatts:number;hoursPerDay:number;inputSpeed:number;outputSpeed:number };
export const defaults:CostConfig;
export type CloudCost={usage:number;fee:number;creditApplied:number;total:number};
export type CostResult={errors:string[];tasks?:number;calls?:number;input?:number;output?:number;economy?:CloudCost;premium?:CloudCost;local?:{hardware:number;support:number;energy:number;energyKwh:number;total:number;requiredHours:number;availableHours:number;capacityExceeded:boolean}};
export function calculateCost(config:CostConfig):CostResult;
