const choices = {
  frequency: { daily: 20, weekly: 4, monthly: 1 },
  pain: ['reentry', 'waiting', 'reporting', 'finding', 'errors'],
  sensitivity: ['ordinary', 'confidential', 'personal'],
  approval: ['routine', 'commercial', 'regulated'],
};
function validateAnswers(input) {
  if (!input || typeof input !== 'object') throw new Error('Please complete the workflow questions.');
  const text = (key, min, max) => {
    const value = typeof input[key] === 'string' ? input[key].trim() : '';
    if (value.length < min || value.length > max) throw new Error(`Please check ${key}.`);
    return value;
  };
  const result = { workflow: text('workflow', 3, 160), steps: text('steps', 10, 1600), systems: text('systems', 2, 400) };
  for (const key of ['frequency', 'pain', 'sensitivity', 'approval']) {
    if (!(key === 'frequency' ? Object.hasOwn(choices.frequency, input[key]) : choices[key].includes(input[key]))) throw new Error(`Please check ${key}.`);
    result[key] = input[key];
  }
  if (typeof input.minutes !== 'number' || !Number.isFinite(input.minutes) || input.minutes < 1 || input.minutes > 10080) throw new Error('Enter between 1 and 10,080 minutes per run.');
  result.minutes = input.minutes;
  return result;
}
function assess(answers) {
  const a = validateAnswers(answers);
  const monthlyHours = Math.round(a.minutes * choices.frequency[a.frequency] / 60 * 10) / 10;
  const ideas = {
    reentry: ['Connect the information once', 'Map repeated fields and identify an authoritative source. Test whether an integration or validated import can remove repeated entry.'],
    waiting: ['Make handovers and approvals visible', 'Give each stage an owner and define reminders, escalation and missing-information checks. Keep approval decisions with the responsible person.'],
    reporting: ['Prepare repeatable reports from source records', 'Agree the report structure and source data, then test preparation and consistency checks. Use AI only for interpretation or drafting where review is practical.'],
    finding: ['Organise information before adding an assistant', 'Identify approved sources, document owners and access permissions. Test retrieval with source references before relying on generated summaries.'],
    errors: ['Validate information at the point of entry', 'Start with required fields, consistent formats and clear business rules. Route conflicting or incomplete records to a person for review.'],
  };
  const [title, opportunity] = ideas[a.pain];
  const controls = a.approval === 'routine'
    ? 'A workflow owner should review the pilot and its exceptions. Agree which routine steps can run automatically only after testing.'
    : a.approval === 'commercial'
      ? 'Keep a named person responsible for prices, commitments, payments and customer-facing actions. Prepare drafts and evidence for approval before any external action.'
      : 'Keep regulated, safety-related or high-impact decisions with a suitably qualified person. Define evidence requirements, approval gates and an audit trail before deployment.';
  const privacy = a.sensitivity === 'ordinary'
    ? 'Confirm the actual data involved and supplier terms before selecting cloud, local or hybrid deployment.'
    : 'Map the sensitive data and access permissions first. Assess local, private-cloud and hybrid options; local deployment alone does not establish compliance or security.';
  const result = {
    title, opportunity, monthlyHours, controls, privacy,
    method: `Rough workload estimate: ${a.minutes} minutes per run × ${choices.frequency[a.frequency]} runs per month ÷ 60. Daily assumes 20 working days; weekly assumes four runs; monthly assumes one. This is reported workload, not predicted time saved.`,
    pilot: 'Observe a representative sample of the current process. Test one improvement and compare preparation time, review effort, errors, operating costs and user feedback before expanding.',
    next: 'Discuss these findings with InnoWeb Ventures to check the workflow, dependencies and a suitable first pilot. Further discovery or development is scoped and agreed separately.',
    disclaimer: 'Initial rules-based assessment from your answers. It has not been reviewed by a consultant and is not a quotation, compliance review or guarantee of savings.',
  };
  return result;
}
function reportText(a, result) {
  return [
    'Your free workflow assessment — InnoWeb Ventures', '',
    `Workflow: ${a.workflow}`, `Current steps: ${a.steps}`, `Systems: ${a.systems}`, '',
    result.title, result.opportunity, '',
    `Estimated current workload: ${result.monthlyHours} hours per month`, result.method, '',
    'Where people stay in control', result.controls, '', 'Data and deployment', result.privacy, '',
    'A practical first pilot', result.pilot, '', 'Next step', result.next,
    'https://www.innowebventures.com/contact', '', result.disclaimer,
  ].join('\n');
}
module.exports = { validateAnswers, assess, reportText };
