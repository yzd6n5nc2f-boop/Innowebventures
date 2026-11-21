const questions = require('./readinessQuestions.json');
const bands = [
 { max:14, id:'foundations', label:'Build the foundations', summary:'Your answers suggest there is useful preparation to do before committing to an AI pilot. Clearer information, ownership and controls can make the first project easier to scope and evaluate.', next:'Book a review call to choose one process and agree the most important preparation steps.' },
 { max:26, id:'pilot', label:'Prepare a focused pilot', summary:'Your answers suggest some foundations are in place, with gaps to resolve before live use. A narrow pilot with clear checks and a named owner is a practical next step.', next:'Book a review call to define one pilot, its success measures, dependencies and human approval points.' },
 { max:36, id:'rollout', label:'Plan a controlled rollout', summary:'Your answers indicate stronger reported foundations for a controlled AI project. Validate these foundations against a real workflow, test the proposed system and resolve any remaining gaps before expanding.', next:'Book a review call to validate your readiness and plan a staged pilot or rollout with agreed checkpoints.' },
];
const advice = {
 Data:'Confirm approved sources, assign information owners and check a representative sample for errors, duplicates and outdated records.',
 Processes:'Choose one recurring process. Map its inputs, handovers, exceptions and approvals, and record a baseline before changing it.',
 'Team skills':'Nominate a workflow owner, agree time for a pilot and give staff practical guidance on checking and challenging AI outputs.',
 Governance:'Document approved tools, human approval points, incident ownership and a way to stop or fall back when an automation fails.',
 Privacy:'Map personal and confidential information, review access and retention needs, and document requirements before choosing local, cloud or hybrid processing.',
};
function validateAnswers(input) {
 if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Please answer all 12 readiness questions.');
 if (Object.keys(input).length !== questions.length) throw new Error('Please answer all 12 readiness questions.');
 const answers = {};
 for (const q of questions) {
  const index = input[q.id];
  if (!Number.isInteger(index) || index < 0 || index >= q.options.length) throw new Error('Please check your answer to: ' + q.question);
  answers[q.id] = index;
 }
 return answers;
}
function assess(input) {
 const answers = validateAnswers(input);
 const dimensions = [];
 let score=0;
 for(const q of questions) {
  const points=q.options[answers[q.id]].score;
  score+=points;
  let dimension=dimensions.find(d=>d.name===q.category);
  if(!dimension){dimension={name:q.category,score:0,max:0};dimensions.push(dimension);}
  dimension.score+=points;dimension.max+=3;
 }
 for(const d of dimensions)d.percentage=Math.round(d.score/d.max*100);
 const band=bands.find(b=>score<=b.max);
 const priorities=[...dimensions].sort((a,b)=>a.score/a.max-b.score/b.max).slice(0,3).map(d=>({area:d.name,action:advice[d.name]}));
 const safeguards=[];
 if(questions.find(q=>q.id==='humanReview').options[answers.humanReview].score<2)safeguards.push('Agree human approval rules before any live AI-assisted actions.');
 if(answers.privacyHandling<2)safeguards.push('Review personal and confidential data before sharing it with any new tool.');
 if(answers.hostingNeeds===0)safeguards.push('Clarify where data may be processed before choosing hosting or a model provider.');
 return { score,maxScore:36,band:band.id,title:band.label,summary:band.summary,next:band.next,dimensions,priorities,safeguards,
  disclaimer:'This is a rules-based self-assessment using your answers, not an independent audit, compliance certification or guarantee of project success. A higher score does not remove the need to validate data, privacy, security and human controls.',
  method:'Each question contributes 0–3 points, for a maximum of 36. Bands: 0–14 foundations; 15–26 focused pilot; 27–36 controlled rollout. Local, private-cloud and public-cloud requirements receive equal points when requirements are documented.',
 };
}
function reportText(answers,result) {
 const lines=['Your AI readiness assessment — InnoWeb Ventures','',`${result.title}: ${result.score}/${result.maxScore}`,result.summary,'','Your five areas'];
 for(const d of result.dimensions)lines.push(`${d.name}: ${d.score}/${d.max} (${d.percentage}%)`);
 lines.push('','Recommended priorities');for(const p of result.priorities)lines.push(`${p.area}: ${p.action}`);
 if(result.safeguards.length)lines.push('','Before live use',...result.safeguards);
 lines.push('','Recommended next step',result.next,'https://www.innowebventures.com/contact?intent=ai-readiness-review','','Your answers');
 for(const q of questions)lines.push(q.question,q.options[answers[q.id]].label,'');
 lines.push(result.method,'',result.disclaimer);return lines.join('\n');
}
module.exports={validateAnswers,assess,reportText,questions};
