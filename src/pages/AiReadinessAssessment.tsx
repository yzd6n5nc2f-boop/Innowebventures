import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import SiteShell from '../components/SiteShell';
import { CONTACT_ENDPOINT } from '../content/runtimeConfig';
import questions from '../../api/lib/readinessQuestions.json';
import base from '../styles/assessment.module.css';
import styles from '../styles/readiness.module.css';

type Answers = Record<string, number>;
type Result = { score:number; maxScore:number; band:string; title:string; summary:string; next:string; dimensions:{name:string;score:number;max:number;percentage:number}[]; priorities:{area:string;action:string}[]; safeguards:string[]; disclaimer:string; method:string };
const endpoint=CONTACT_ENDPOINT.replace(/\/contact$/, '/workflow-assessment');
const stepNames=['How work happens','People and review','Controls and privacy'];
export default function AiReadinessAssessment() {
 const [step,setStep]=useState(0);
 const [answers,setAnswers]=useState<Answers>({});
 const [result,setResult]=useState<Result|null>(null);
 const [token,setToken]=useState('');
 const [ready,setReady]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [refresh,setRefresh]=useState(0);
 const panel=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(step>0||result)panel.current?.focus();},[step,result]);
 useEffect(()=>{
  if(step!==3||result)return;
  let cancelled=false;let timer:ReturnType<typeof setTimeout>;
  setToken('');setReady(false);setError('');
  fetch(endpoint,{headers:{Accept:'application/json'},cache:'no-store'})
   .then(async r=>{const data=await r.json();if(!r.ok||!data.token)throw Error(data.error||'Email delivery is temporarily unavailable. Please try again later.');return data.token as string;})
   .then(value=>{if(!cancelled){setToken(value);timer=setTimeout(()=>{if(!cancelled)setReady(true);},2200);}})
   .catch(e=>{if(!cancelled)setError(e instanceof Error?e.message:'We could not prepare the email form. Please try again.');});
  return ()=>{cancelled=true;clearTimeout(timer);};
 },[step,result,refresh]);
 function next(event:FormEvent<HTMLFormElement>){event.preventDefault();setError('');setStep(current=>current+1);}
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy||!ready)return;
  const form=new FormData(event.currentTarget);setBusy(true);setError('');
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({assessmentType:'readiness',answers,token,name:String(form.get('name')||'').trim(),email:String(form.get('email')||'').trim(),company:String(form.get('company')||'').trim(),website:form.get('website'),requestResults:form.get('requestResults')==='on',followUp:form.get('followUp')==='on'})});
   const data=await response.json();if(!response.ok||data.success!==true||!data.result?.band)throw Error((data.error||'We could not complete your assessment. Please try again later.')+(data.deliveryCode?' Reference: '+data.deliveryCode:''));
   setResult(data.result);
  }catch(e){setError(e instanceof Error?e.message:'We could not submit your assessment. Please try again later.');}
  finally{setBusy(false);}
 }
 function restart(){setResult(null);setAnswers({});setStep(0);setError('');}
 const completed=Object.keys(answers).length;
 return <SiteShell><div className={base.page}>
  <header className={base.intro}><span className={base.kicker}>A clear starting point for UK SMEs</span><h1>AI readiness assessment</h1><p>How prepared is your business to put AI to practical use? Answer 12 questions about your data, processes, team, governance and privacy needs to identify your next step.</p><div className={base.tags}><span>12 multiple-choice questions</span><span>About 5 minutes</span><span>Free, with no obligation</span></div></header>
  <div className={base.layout}>
   <div className={base.panel} ref={panel} tabIndex={-1}>
    {result ? <>
     <span className={base.kicker}>Your readiness result</span><h2>{result.title}</h2><div className={styles.score} aria-label={`Score ${result.score} out of ${result.maxScore}`}><strong>{result.score}</strong><span>/ {result.maxScore}</span></div><p>{result.summary}</p><p role="status">A copy of your result has been sent to the email address you provided. Please check your inbox and spam folder.</p>
     <h3>Readiness across five areas</h3><div className={styles.dimensions}>{result.dimensions.map(d=><div key={d.name}><span>{d.name}</span><strong>{d.score} / {d.max}</strong><meter min={0} max={d.max} value={d.score} aria-label={`${d.name}: ${d.score} out of ${d.max}`}/></div>)}</div>
     <h3>Your recommended priorities</h3><ol className={styles.priorities}>{result.priorities.map(p=><li key={p.area}><strong>{p.area}</strong><p>{p.action}</p></li>)}</ol>
     {result.safeguards.length>0&&<div className={base.notice}><h3>Before live use</h3><ul>{result.safeguards.map(item=><li key={item}>{item}</li>)}</ul></div>}
     <h3>Your next step</h3><p>{result.next}</p><Link className={base.primary} to="/contact?intent=ai-readiness-review">Book a review call →</Link><p><small>Send us a call request and we will agree a suitable time. No appointment is booked automatically.</small></p><details className={styles.method}><summary>How your score is calculated</summary><p>{result.method}</p></details><p className={base.notice}>{result.disclaimer}</p><button className={base.back} type="button" onClick={restart}>Start a new assessment</button>
    </> : <>
     <div className={styles.progress}><p className={base.kicker}>{step<3?`Step ${step+1} of 4 · ${stepNames[step]}`:'Step 4 of 4 · Your result'}</p><progress max={12} value={completed} aria-label={`${completed} of 12 questions answered`}/><span>{completed} of 12 questions answered</span></div>
     {step<3 ? <form key={step} onSubmit={next}>
      <h2>{stepNames[step]}</h2><p>Choose the answer that best describes your business today. If you are unsure, select the first option; it helps identify where a review could be useful.</p>
      {questions.slice(step*4,step*4+4).map((q,index)=><fieldset className={styles.question} key={q.id}><legend><span className={styles.category}>{q.category} · Question {step*4+index+1}</span>{q.question}</legend>{q.options.map((option,optionIndex)=><label className={`${styles.option} ${answers[q.id]===optionIndex?styles.selected:''}`} key={option.label}><input type="radio" name={q.id} value={optionIndex} required checked={answers[q.id]===optionIndex} onChange={()=>setAnswers(current=>({...current,[q.id]:optionIndex}))}/><span>{option.label}</span></label>)}</fieldset>)}
      <div className={styles.actions}>{step>0&&<button className={base.back} type="button" onClick={()=>setStep(current=>current-1)}>← Previous questions</button>}<button className={base.primary} type="submit">{step===2?'Continue to my result →':'Next questions →'}</button></div>
     </form> : <>
      <h2>Your answers are complete</h2><p>Enter your name and email to see your full readiness result and receive a copy. It includes your band, scores across five areas, recommended priorities and a next step.</p>
      <form onSubmit={submit}>
       <label>Your name<input name="name" autoComplete="name" required maxLength={120}/></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254}/></label><label>Company (optional)<input name="company" autoComplete="organization" maxLength={160}/></label>
       <div className={base.trap} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
       <label className={base.check}><input type="checkbox" name="requestResults" required/>I agree to InnoWeb Ventures using my details and answers to provide and email my assessment result and notify its team of my request.</label>
       <label className={base.check}><input type="checkbox" name="followUp"/>I would also like someone to contact me about my results (optional).</label>
       <p className={base.notice}>Read our <Link to="/privacy-policy#ai-readiness">privacy policy</Link> for how we use your information and your rights. Requesting a result does not subscribe you to marketing emails.</p>
       <button className={base.primary} type="submit" disabled={busy||!ready}>{busy?'Preparing and emailing your result…':ready?'See and email my full result →':'Preparing secure form…'}</button>
       {error&&<div role="alert" className={base.error}><p>{error}</p><button type="button" onClick={()=>setRefresh(current=>current+1)}>Refresh email form</button><p>You can also <Link to="/contact?intent=ai-readiness-review">request a review call</Link>.</p></div>}
      </form><button className={base.back} type="button" disabled={busy} onClick={()=>setStep(2)}>← Review my answers</button>
     </>}
    </>}
   </div>
   <aside className={base.aside}><h2>What your result covers</h2><ul><li>Data quality, access and ownership.</li><li>Processes, exceptions and clear priorities.</li><li>Team skills and responsibility for delivery.</li><li>Human review, tool approval and incident planning.</li><li>Privacy and local, cloud or hybrid requirements.</li></ul><h3>Three practical starting points</h3><p><strong>Build the foundations:</strong> 0–14 points.</p><p><strong>Prepare a focused pilot:</strong> 15–26 points.</p><p><strong>Plan a controlled rollout:</strong> 27–36 points.</p><p>This is a self-assessment, not an audit or certification. Your result is calculated from your answers using fixed rules.</p><h3>Already have a process in mind?</h3><p>Our <Link to="/workflow-assessment">workflow assessment</Link> looks at one recurring task in more detail.</p><Link to="/contact?intent=ai-readiness-review">Ask about a review call →</Link></aside>
  </div><section className={base.faq}><h2>A useful conversation, grounded in your business</h2><p>A readiness score helps organise the discussion. Before any live deployment, we still need to understand your actual data, systems, responsibilities and risks. We will agree the scope and cost of any further work before it begins.</p><p>Keep your answers general. You do not need to share customer records, passwords, financial documents or other confidential material to complete this assessment.</p><noscript><p>This assessment requires JavaScript. You can <a href="/contact?intent=ai-readiness-review">request a review call</a> instead.</p></noscript></section>
 </div></SiteShell>;
}
