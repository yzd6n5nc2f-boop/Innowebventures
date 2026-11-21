import { useState } from 'react';
import { Link } from 'react-router-dom';
import { defaults,calculateCost,type CostConfig } from '../content/llmCost.mjs';
import styles from '../styles/llmCost.module.css';
const money=(n:number)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const number=(n:number)=>new Intl.NumberFormat('en-GB',{maximumFractionDigits:1}).format(n);
type NumericKey=Exclude<keyof CostConfig,'mode'|'existingHardware'>;
export default function LlmCostCalculator(){
 const [values,setValues]=useState<Record<NumericKey,string>>(()=>Object.fromEntries(Object.entries(defaults).filter(([key])=>key!=='mode'&&key!=='existingHardware').map(([key,value])=>[key,String(value)])) as Record<NumericKey,string>);
 const [mode,setMode]=useState(defaults.mode),[existingHardware,setExistingHardware]=useState(false);
 const config={...Object.fromEntries(Object.entries(values).map(([key,value])=>[key,value.trim()===''?NaN:Number(value)])),mode,existingHardware} as CostConfig;
 const result=calculateCost(config);
 function field(key:NumericKey,label:string,min:number,max:number,step:string='any',hint?:string){return <label className={styles.field}>{label}<input type="number" min={min} max={max} step={step} value={values[key]} onChange={event=>setValues(current=>({...current,[key]:event.target.value}))}/>{hint&&<small>{hint}</small>}</label>;}
 const reset=()=>{setValues(Object.fromEntries(Object.entries(defaults).filter(([key])=>key!=='mode'&&key!=='existingHardware').map(([key,value])=>[key,String(value)])) as Record<NumericKey,string>);setMode(defaults.mode);setExistingHardware(false);};
 return <section className={styles.calculator} id="cost-calculator" aria-labelledby="calculator-title">
  <header className={styles.intro}><span>Illustrative planning tool · GBP</span><h2 id="calculator-title">Cloud API or local model: compare monthly costs</h2><p>Start with expected usage, then adjust the assumptions. These are editable working estimates, not live supplier prices or an InnoWeb quotation. All amounts are in pounds and exclude VAT.</p></header>
  <div className={styles.usage}>
   <label className={styles.field}>Usage basis<select value={mode} onChange={event=>setMode(event.target.value)}><option value="documents">Documents processed per month</option><option value="requests">Requests per day</option></select></label>
   {field('volume',mode==='documents'?'Documents per month':'Requests per day',0,1000000,'1')}
   {field('days','Operating days per month',1,31,'1','Used for daily requests and local powered hours.')}
  </div>
  <p className={styles.notice}>A local model of around 30B parameters is the target scenario. Cloud profiles represent economical open-model usage and a premium reasoning tier. They are cost scenarios with different capabilities. Compare task quality and speed as well as cost.</p>
  <details className={styles.assumptions} open><summary>Task size and calls</summary><div className={styles.fields}>
   {field('inputTokens','Input tokens per model call',0,1000000,'1','Include the document, instructions and retrieved context.')}
   {field('outputTokens','Billed output tokens per model call',0,1000000,'1','Include billed reasoning tokens where applicable.')}
   {field('callsPerTask','Model calls per document or request',1,100,'1','Allow for multi-step workflows and repeated calls.')}
  </div></details>
  <details className={styles.assumptions}><summary>Cloud assumptions · rates, fees and usage credits</summary><p>Default economical rates: £0.12 input and £0.35 output per million tokens. Default premium rates: £2.50 input and £12.00 output. These rounded GBP estimates are not tied to a named model or supplier. Both profiles start with no monthly fee or included usage credits.</p><div className={styles.fields}>
   {field('economyInput','Economical cloud: input £ per million tokens',0,10000)}{field('economyOutput','Economical cloud: output £ per million tokens',0,10000)}
   {field('economyFee','Economical cloud: monthly plan fee £',0,1000000)}{field('economyCredits','Economical cloud: included usage credit £',0,1000000,'any','Credit offsets token usage only; unused credit has no cash value.')}
   {field('premiumInput','Premium cloud: input £ per million tokens',0,10000)}{field('premiumOutput','Premium cloud: output £ per million tokens',0,10000)}
   {field('premiumFee','Premium cloud: monthly plan fee £',0,1000000)}{field('premiumCredits','Premium cloud: included usage credit £',0,1000000)}
  </div></details>
  <details className={styles.assumptions}><summary>Local assumptions · hardware, electricity and capacity</summary><p>Defaults model one £2,500 workstation spread over 36 months, £25 monthly support allowance and electricity at £0.28/kWh. Active power is 300W and idle power 60W; the machine is powered for 8 hours on each operating day. These are planning assumptions, not measured benchmarks or service prices.</p><label className={styles.check}><input type="checkbox" checked={existingHardware} onChange={event=>setExistingHardware(event.target.checked)}/>Use hardware I already own (exclude purchase allocation)</label><div className={styles.fields}>
   {field('hardware','Hardware purchase cost £',0,1000000)}{field('months','Months to spread the purchase cost',1,120,'1')}
   {field('support','Local support and maintenance allowance £/month',0,1000000)}{field('electricity','Electricity £ per kWh',0,5)}
   {field('activeWatts','Whole-system active power W',0,10000)}{field('idleWatts','Whole-system idle power W',0,10000)}
   {field('hoursPerDay','Powered hours per operating day',0,24)}
   {field('inputSpeed','Local input processing tokens/second',.01,1000000,'any','Default 300. Illustrative only; benchmark the actual hardware and context.')}
   {field('outputSpeed','Local output generation tokens/second',.01,1000000,'any','Default 20. Model, quantisation, context and hardware change performance.')}
  </div></details>
  <button className={styles.reset} type="button" onClick={reset}>Reset to working estimates</button>
  {result.errors.length>0?<div role="alert" className={styles.warning}><h3>Check your inputs</h3><ul>{result.errors.map(error=><li key={error}>{error}</li>)}</ul></div>:result.local&&result.economy&&result.premium?<>
   <div className={styles.workload}><strong>{number(result.tasks!)} tasks / month</strong><span>{number(result.calls!)} model calls</span><span>{number(result.input!)} input tokens</span><span>{number(result.output!)} output tokens</span></div>
   <div className={styles.cards} aria-live="polite" aria-atomic="true">
    <article><span>Economical cloud API</span><h3>{money(result.economy.total)}<small>/month</small></h3><p>Token usage plus plan fee, less applicable usage credit.</p></article>
    <article><span>Premium cloud API</span><h3>{money(result.premium.total)}<small>/month</small></h3><p>A higher-cost cloud profile for more demanding reasoning tasks.</p></article>
    <article><span>Local model · around 30B</span><h3>{result.local.capacityExceeded?'Capacity exceeded':money(result.local.total)}{!result.local.capacityExceeded&&<small>/month</small>}</h3><p>{result.local.capacityExceeded?'The estimated work does not fit the powered hours of this one-machine scenario.':'Hardware allocation, electricity and local support allowance.'}</p></article>
   </div>
   {result.local.capacityExceeded&&<p className={styles.warning} role="status">Estimated processing needs {number(result.local.requiredHours)} hours; this setup allows {number(result.local.availableHours)}. The single-machine budget below cannot cover all the requested work. Benchmark a different setup or consider additional hardware or hybrid routing before comparing costs.</p>}
   <div className={styles.tableWrap}><table><caption>Monthly breakdown in GBP · estimates excluding VAT</caption><thead><tr><th scope="col">Cost component</th><th scope="col">Economical cloud</th><th scope="col">Premium cloud</th><th scope="col">Local {result.local.capacityExceeded?'(insufficient capacity)':''}</th></tr></thead><tbody>
    <tr><th scope="row">Token usage</th><td>{money(result.economy.usage)}</td><td>{money(result.premium.usage)}</td><td>No token charge assumed</td></tr>
    <tr><th scope="row">Monthly plan fee / local support allowance</th><td>{money(result.economy.fee)}</td><td>{money(result.premium.fee)}</td><td>{money(result.local.support)}</td></tr>
    <tr><th scope="row">Usage credit applied</th><td>−{money(result.economy.creditApplied)}</td><td>−{money(result.premium.creditApplied)}</td><td>Not applicable</td></tr>
    <tr><th scope="row">Hardware purchase allocation</th><td>Not included</td><td>Not included</td><td>{money(result.local.hardware)}</td></tr>
    <tr><th scope="row">Local electricity</th><td>Not included</td><td>Not included</td><td>{money(result.local.energy)}</td></tr>
    <tr><th scope="row">Estimated total / one-machine budget</th><td>{money(result.economy.total)}</td><td>{money(result.premium.total)}</td><td>{money(result.local.total)}</td></tr>
   </tbody></table></div>
   <p className={styles.footnote}>Local processing: {number(result.local.requiredHours)} estimated hours against {number(result.local.availableHours)} available powered hours. Electricity: {number(result.local.energyKwh)} kWh. Throughput is a placeholder estimate; this tool does not model concurrency, queueing or task-quality differences.</p>
  </>:null}
  <details className={styles.assumptions}><summary>Method, exclusions and pricing context</summary><p>Daily requests × operating days gives monthly tasks. Tasks × model calls gives monthly calls. Cloud cost is monthly fee + max(0, input token cost + output token cost − included usage credit). Hardware allocation is purchase price ÷ months, or zero when existing hardware is selected.</p><p>Local processing hours are input tokens ÷ input speed plus output tokens ÷ output speed, divided by 3,600. Electricity combines active and remaining idle hours within the powered schedule. Idle draw is included even at zero usage; switching off the machine outside that schedule is assumed.</p><p>Excluded: VAT, exchange-rate movements, development and setup, integration, cloud application hosting, storage, OCR, retrieval services, tools, licensing charges, cooling, backup and disaster recovery unless you include them in your own allowances. Caching, batch discounts, retries and provider limits are not automatically modelled. Add repeated calls and billed reasoning tokens to the relevant inputs.</p><p>Existing-hardware mode excludes purchase cost but not electricity or support. It does not account for depreciation, replacement or the opportunity cost of using that equipment. A quantised model of around 30B parameters needs hardware and workload testing; model size alone does not establish hardware suitability or quality.</p><p>Assumptions set on 21 November 2026. The cloud figures are rounded planning estimates, not a quotation or claim about a specific model. For context, <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noreferrer">Google’s public API pricing</a> shows how cloud charges vary by model, usage and service tier. The editable GBP defaults are not live converted Google prices.</p><p>Your entries stay in this browser page and are not submitted or emailed.</p></details>
  <div className={styles.next}><h3>Want a comparison for your actual workflow?</h3><p>We can review task quality, privacy, hardware capacity and operating costs before you choose local, cloud or hybrid AI.</p><Link to="/contact?intent=local-llm-review">Discuss your LLM requirements →</Link></div>
  <noscript><p>The interactive calculator needs JavaScript. Default estimates use 1,000 tasks a month, 4,000 input and 1,000 output tokens per call, £0.12/£0.35 economical cloud rates and £2.50/£12.00 premium rates per million tokens. Local hardware is £2,500 spread over 36 months, plus support and electricity. Contact us for a comparison.</p></noscript>
 </section>;
}
