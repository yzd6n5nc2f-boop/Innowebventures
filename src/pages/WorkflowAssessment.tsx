import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import SiteShell from '../components/SiteShell';
import { CONTACT_ENDPOINT } from '../content/runtimeConfig';
import styles from '../styles/assessment.module.css';

const endpoint = CONTACT_ENDPOINT.replace(/\/contact$/, '/workflow-assessment');
type Answers = { workflow: string; steps: string; systems: string; frequency: string; minutes: number; pain: string; sensitivity: string; approval: string };
type Result = { title: string; opportunity: string; monthlyHours: number; method: string; controls: string; privacy: string; pilot: string; next: string; disclaimer: string };
const teasers: Record<string, string> = {
 reentry: 'Repeated entry is worth investigating. A connected source of information and validation rules may help reduce duplication.',
 waiting: 'Your handovers deserve a closer look. Clear ownership, reminders and approval steps may help work move forward.',
 reporting: 'Report preparation may offer a useful first pilot. Start with reliable source data and a consistent report structure.',
 finding: 'Finding approved information may be your starting point. Organise sources and access permissions before adding an AI assistant.',
 errors: 'Your first improvement may be better validation. Clear fields and rules can help prevent avoidable corrections.',
};
const faqs = [
 { question: 'Is the workflow assessment free?', answer: 'Yes. You can complete the questionnaire and request your initial assessment by email at no charge. Any further discovery, development or support would be scoped and agreed separately.' },
 { question: 'Who is this for?', answer: 'It is designed for UK SME owners and managers who want to improve a recurring business process. You can assess reporting, enquiries, order handling, information searches or another workflow you know well.' },
 { question: 'Is a consultant reviewing my answers?', answer: 'The immediate assessment uses structured rules based on your answers; it is not a consultant-reviewed audit. You can separately ask us to discuss the findings and understand your process in more detail.' },
 { question: 'Will it tell me how much money I can save?', answer: 'It estimates your current monthly workload using the frequency and time you enter. It does not predict savings, implementation costs or a return on investment; those need evidence from your actual process.' },
 { question: 'Do I need to share confidential information?', answer: 'No. Describe the process in general terms and leave out customer names, financial details, passwords and personal or commercially sensitive records. You do not need to upload any documents.' },
 { question: 'What happens to my contact details?', answer: 'We use your details to email the assessment and notify the InnoWeb team of your request. You can optionally request a discussion; receiving the assessment does not subscribe you to marketing emails.' },
];
export default function WorkflowAssessment() {
 const [answers, setAnswers] = useState<Answers | null>(null);
 const [result, setResult] = useState<Result | null>(null);
 const [token, setToken] = useState('');
 const [busy, setBusy] = useState(false);
 const [error, setError] = useState('');
 const [tokenReady, setTokenReady] = useState(false);
 const [refresh, setRefresh] = useState(0);
 const resultRef = useRef<HTMLDivElement>(null);
 useEffect(() => {
  if (!answers) return;
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout>;
  setToken(''); setTokenReady(false); setError('');
  fetch(endpoint, { headers: { Accept: 'application/json' }, cache: 'no-store' })
   .then(async response => { const data = await response.json(); if (!response.ok || !data.token) throw Error(data.error || 'Email delivery is unavailable. Please try again later.'); return data.token as string; })
   .then(value => { if (!cancelled) { setToken(value); timer = setTimeout(() => { if (!cancelled) setTokenReady(true); }, 2200); } })
   .catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : 'Email delivery is unavailable. Please try again later.'); });
  return () => { cancelled = true; clearTimeout(timer); };
 }, [answers, refresh]);
 useEffect(() => { if (answers) resultRef.current?.focus(); }, [answers, result]);
 function complete(event: FormEvent<HTMLFormElement>) {
  event.preventDefault(); const data = new FormData(event.currentTarget);
  const get = (key: string) => String(data.get(key) || '').trim();
  setResult(null);
  setAnswers({ workflow:get('workflow'), steps:get('steps'), systems:get('systems'), frequency:get('frequency'), minutes:Number(data.get('minutes')), pain:get('pain'), sensitivity:get('sensitivity'), approval:get('approval') });
 }
 async function emailResults(event: FormEvent<HTMLFormElement>) {
  event.preventDefault(); if (!answers || busy || !tokenReady) return;
  const data = new FormData(event.currentTarget);
  setBusy(true); setError('');
  try {
   const response = await fetch(endpoint, { method:'POST', headers: { 'Content-Type':'application/json', Accept:'application/json' }, body:JSON.stringify({ answers, token, name:data.get('name'), email:data.get('email'), company:data.get('company'), website:data.get('website'), requestResults:data.get('requestResults') === 'on', followUp:data.get('followUp') === 'on' }) });
   const payload = await response.json();
   if (!response.ok || payload.success !== true) throw Error(payload.error || 'We could not send your assessment. Please try again later.');
   setResult(payload.result);
  } catch(e) { setError(e instanceof Error ? e.message : 'We could not send your assessment. Please try again later.'); }
  finally { setBusy(false); }
 }
 const graph = { '@context':'https://schema.org', '@graph':[
  { '@type':'Service', '@id':'https://www.innowebventures.com/workflow-assessment#service', name:'Free initial workflow assessment', serviceType:'Business workflow assessment', description:'A free rules-based initial workflow assessment for UK SME owners and managers, with tailored findings delivered by email.', provider:{ '@id':'https://www.innowebventures.com/#organization' }, areaServed:{ '@type':'Country', name:'United Kingdom' } },
  { '@type':'FAQPage', mainEntity:faqs.map(f=>({ '@type':'Question', name:f.question, acceptedAnswer:{ '@type':'Answer', text:f.answer } })) },
  { '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem', position:1, name:'Home', item:'https://www.innowebventures.com/' },{ '@type':'ListItem', position:2, name:'Free workflow assessment', item:'https://www.innowebventures.com/workflow-assessment' }] },
 ] };
 return <SiteShell><div className={styles.page}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(graph).replaceAll('<','\\u003c') }} />
  <header className={styles.intro}><span className={styles.kicker}>A practical place to start</span><h1>Free workflow assessment for your business</h1><p>Find a useful first step towards less repetitive work. Tell us how one process works, see an initial finding and request your fuller assessment by email.</p><div className={styles.tags}><span>About 5 minutes</span><span>No payment required</span><span>No obligation</span></div></header>
  <div className={styles.layout}>
   <div className={styles.panel}>
    {!answers ? <form onSubmit={complete}>
     <h2>1. Tell us about one workflow</h2><p>Choose a process you know well. Use general descriptions and leave out confidential information, personal records and passwords.</p>
     <label>What process would you like to improve?<input name="workflow" required minLength={3} maxLength={160} placeholder="For example, preparing customer quotations" /></label>
     <label>What are its main steps?<textarea name="steps" required minLength={10} maxLength={1600} rows={4} placeholder="An enquiry arrives, we gather information, prepare a draft and ask a manager to approve it…" /></label>
     <label>Which systems or tools do you use?<input name="systems" required minLength={2} maxLength={400} placeholder="For example, email, spreadsheets and an order system" /></label>
     <div className={styles.pair}><label>How often does the process run?<select name="frequency" required defaultValue=""><option value="" disabled>Choose frequency</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></label><label>Minutes of active work per run<input type="number" name="minutes" min={1} max={10080} step="1" required placeholder="For example, 45" /><small>Use combined staff effort. Exclude waiting time.</small></label></div>
     <label>What is the biggest difficulty?<select name="pain" required defaultValue=""><option value="" disabled>Choose the main difficulty</option><option value="reentry">Entering the same information repeatedly</option><option value="waiting">Chasing people and waiting for approvals</option><option value="reporting">Preparing reports and updates manually</option><option value="finding">Finding reliable information</option><option value="errors">Errors, inconsistencies and rework</option></select></label>
     <label>What kind of information is involved?<select name="sensitivity" required defaultValue=""><option value="" disabled>Choose the closest description</option><option value="ordinary">General business information</option><option value="confidential">Commercially confidential information</option><option value="personal">Personal, health or other sensitive information</option></select></label>
     <label>Which decisions need a person’s approval?<select name="approval" required defaultValue=""><option value="" disabled>Choose the closest description</option><option value="routine">Routine internal administration</option><option value="commercial">Prices, payments, commitments or customer communications</option><option value="regulated">Regulated, safety-related or high-impact decisions</option></select></label>
     <button className={styles.primary} type="submit">See my initial finding →</button><noscript><p>This interactive assessment needs JavaScript. You can also <a href="/contact">request a discussion</a>.</p></noscript>
    </form> : <div ref={resultRef} tabIndex={-1}>
     {result ? <><p className={styles.kicker}>Assessment requested</p><h2>Your assessment has been sent</h2><p role="status">Check your inbox and spam folder. Your findings are also shown below.</p><h3>{result.title}</h3><p>{result.opportunity}</p><h3>Current workload: approximately {result.monthlyHours} hours per month</h3><p>{result.method}</p><h3>Where people stay in control</h3><p>{result.controls}</p><h3>Data and deployment</h3><p>{result.privacy}</p><h3>Your first pilot</h3><p>{result.pilot}</p><p className={styles.notice}>{result.disclaimer}</p><Link className={styles.primary} to="/contact?intent=assessment-results">Discuss your results →</Link></> : <>
      <p className={styles.kicker}>Your initial finding</p><h2>A starting point for {answers.workflow}</h2><p className={styles.finding}>{teasers[answers.pain]}</p><p>This is a rules-based starting point, not a consultant-reviewed audit.</p>
      <h2>2. Email me my workflow assessment</h2><p>Receive a fuller assessment covering an improvement opportunity, your estimated current workload, human controls, data considerations and a suggested pilot.</p>
      <form onSubmit={emailResults}>
       <label>Your name<input name="name" required maxLength={120} autoComplete="name" /></label><label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email" /></label><label>Company (optional)<input name="company" maxLength={160} autoComplete="organization" /></label>
       <div className={styles.trap} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
       <label className={styles.check}><input name="requestResults" type="checkbox" required />Email me my assessment using the details and answers I have provided.</label>
       <label className={styles.check}><input name="followUp" type="checkbox" />I would also like InnoWeb Ventures to contact me to discuss these results (optional).</label>
       <p className={styles.notice}>We use your details to deliver your assessment and notify our team of the request. This does not subscribe you to marketing. Read our <Link to="/privacy-policy">privacy policy</Link>.</p>
       <button className={styles.primary} disabled={busy || !tokenReady} type="submit">{busy ? 'Sending your assessment…' : tokenReady ? 'Email my assessment →' : 'Preparing secure email form…'}</button>
       {error && <div className={styles.error} role="alert"><p>{error}</p><button type="button" onClick={()=>setRefresh(v=>v+1)}>Refresh email form</button><p>Or <Link to="/contact">contact us</Link> to discuss the process.</p></div>}
      </form>
     </>}
     <button className={styles.back} type="button" disabled={busy} onClick={()=>{setAnswers(null);setResult(null);setError('');}}>← Assess another workflow</button>
    </div>}
   </div>
   <aside className={styles.aside}><h2>What you will receive</h2><ul><li>An improvement opportunity matched to your main difficulty.</li><li>A transparent estimate of current workload—not promised savings.</li><li>Human approval and data considerations.</li><li>A practical first step to test.</li></ul><h3>Built around your business</h3><p>The best improvement may involve clearer rules, connected software or AI assistance. The assessment helps start that conversation.</p><Link to="/work">Explore our application demonstrations →</Link><h3>Prefer a conversation?</h3><Link to="/contact">Tell us about your workflow →</Link></aside>
  </div>
  <section className={styles.faq}><h2>Before you start</h2>{faqs.map(f=><details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</section>
 </div></SiteShell>;
}
