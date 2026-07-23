import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import styles from "../styles/landingShowcase.module.css";
import refinements from "../styles/landingRefinement.module.css";

const applicationExamples = [
  {
    name: "TenderRadar",
    description: "Find relevant tender opportunities faster with focused search and intelligent filtering.",
    url: "https://applications.innowebventures.com/TenderRadar/",
    status: "Live",
  },
  {
    name: "CalRivoRecon",
    description: "Automate reconciliation, validation and exception handling across complex datasets.",
    url: "https://applications.innowebventures.com/calrivorecon/",
    status: "Live",
  },
  {
    name: "Pathfinder",
    description: "Guide users through complex decisions with structured, intelligent workflow support.",
    url: "https://applications.innowebventures.com/pathfinder/",
    status: "Live",
  },
  {
    name: "Workbook Timesheet",
    description: "A streamlined timesheet workflow for recording, reviewing and managing workbook-based time entries.",
    url: "https://applications.innowebventures.com/workbooktimesheet",
    status: "Live",
  },
];

const trustItems = [
  ["Tailored workflows", "Agentic systems are configured around the organisation, task and people using them."],
  ["Clear user experience", "Complex orchestration is presented through interfaces that remain simple and practical to use."],
  ["Visible agent activity", "Users can understand, monitor and review the agentic flow behind each task."],
  ["Measured AI cost", "Token usage and model spend are tracked so AI resources are used efficiently."],
  ["Private deployment", "Local server or AI PC deployment is available where security, privacy or GDPR requires it."],
];

const stackHighlights = [
  [
    "Tailored agentic workflows",
    "We customise the workflow around the individual organisation and task, connecting the right agents, tools, data and approval points rather than imposing a generic AI assistant.",
  ],
  [
    "Simple, observable interfaces",
    "Users work through a clear interface while retaining insight into the task plan, agent actions, progress, exceptions and points requiring human approval.",
  ],
  [
    "Hybrid model routing",
    "Local LLMs can handle focused, repeatable or sensitive steps, while larger proprietary models are reserved for the reasoning tasks where their additional capability creates value.",
  ],
  [
    "Token and output efficiency",
    "Token use, model calls and task outcomes are monitored together so the system can balance output quality, speed, privacy and operating cost.",
  ],
  [
    "Private local AI",
    "Where GDPR, confidentiality or security is a concern, models and supporting data services can run locally on organisational servers or a dedicated AI PC.",
  ],
  [
    "Human-controlled operation",
    "The user can monitor the agentic flow, inspect important outputs and remain responsible for approvals and decisions while automation handles repeatable work.",
  ],
];

const deliverySteps = [
  ["01", "Understand", "Map the real task, users, data, controls and points where human judgement must remain."],
  ["02", "Design", "Shape a tailored agentic workflow and an interface that keeps the process easy to use."],
  ["03", "Route", "Choose local or proprietary models for each step based on capability, privacy, latency and cost."],
  ["04", "Observe", "Expose progress, agent actions, approvals, token use and exceptions through the operational interface."],
  ["05", "Improve", "Compare output quality with cost and refine prompts, tools, planners and model routing over time."],
];

export default function Landing() {
  return (
    <SiteShell>
      <div className={styles.landing}>
        <section className={styles.hero} style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
          <div className={styles.heroCopy} style={{ maxWidth: "860px" }}>
            <div className={styles.eyebrow}>InnoWeb Ventures · Agentic AI Systems</div>
            <h1>
              Intelligent workflows tailored for <span>real-world use.</span>
            </h1>
            <p className={styles.heroLead}>
              We design agentic AI systems around the organisation, workflow and people using them. Complex planning,
              model routing and automation sit behind an interface that remains clear to the user, while progress, agent
              activity, approvals and token usage stay visible and measurable.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="#forge-suite">
                Explore the development stack →
              </a>
            </div>
            <div className={styles.heroProof}>
              <div>Customise the workflow rather than forcing users into a generic AI product.</div>
              <div>Give users insight into the plan, agent actions, progress and approvals.</div>
              <div>Use local and proprietary models together to balance quality, privacy and cost.</div>
            </div>
          </div>
        </section>

        <section className={`${styles.trustBar} ${refinements.networkPanel}`} aria-label="Agentic AI system benefits">
          {trustItems.map(([title, description]) => (
            <div key={title} className={styles.trustItem}>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          ))}
        </section>

        <section className={`${styles.lightSection} ${refinements.networkSection}`} id="forge-suite">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <div>
                <div className={styles.sectionEyebrow}>Development stack</div>
                <h2>Agentic systems designed around the individual workflow.</h2>
                <p className={styles.sectionIntro}>
                  The system is tailored at workflow level: planners coordinate the task, specialist agents use the right
                  tools and models, and the user sees a simple operational interface with visibility into what the agents are
                  doing. Cost, token use and output quality are treated as part of the design rather than an afterthought.
                </p>
              </div>
              <Link className={styles.secondary} to="/delivery-method">
                Explore development stack
              </Link>
            </div>

            <div className={styles.suiteGrid}>
              {stackHighlights.map(([title, description]) => (
                <article key={title} className={`${styles.suiteCard} ${refinements.clearTextCard}`}>
                  <div className={styles.suiteRole}>Agentic engineering</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.darkSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <div>
                <div className={styles.sectionEyebrow}>How the system works</div>
                <h2>From a real task to a visible, governed agentic workflow.</h2>
                <p className={styles.sectionIntro}>
                  Each workflow is configured around its users, with model choice, privacy, cost and human control designed
                  into every stage.
                </p>
              </div>
            </div>
            <div className={styles.flow}>
              {deliverySteps.map(([number, title, description]) => (
                <article key={number} className={`${styles.flowStep} ${refinements.clearFlowCard}`}>
                  <div className={styles.flowNumber}>{number}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.lightSection} ${refinements.networkSection}`} id="applications">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <div>
                <div className={styles.sectionEyebrow}>Working examples</div>
                <h2>Practical applications built around specific workflows.</h2>
                <p className={styles.sectionIntro}>
                  Each example demonstrates a focused user interface placed over a tailored operational workflow, with the
                  underlying automation designed for the task rather than presented as a generic chatbot.
                </p>
              </div>
              <Link className={styles.secondary} to="/work">
                View all applications
              </Link>
            </div>

            <div className={`${styles.appGrid} ${refinements.compactAppGrid}`}>
              {applicationExamples.map((application) => (
                <a
                  key={application.name}
                  className={`${styles.appCard} ${refinements.applicationCard}`}
                  href={application.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.appPreview} aria-hidden>
                    <iframe src={application.url} title="" tabIndex={-1} loading="lazy" />
                  </div>
                  <div className={styles.appBody}>
                    <div className={styles.appTopline}>
                      <h3>{application.name}</h3>
                      <span className={styles.status}>{application.status}</span>
                    </div>
                    <p>{application.description}</p>
                    <span className={styles.appCta}>Open example ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.ctaBand} ${refinements.clearCtaBand}`}>
          <div>
            <h2>Ready to customise an agentic workflow?</h2>
            <p>Start with one valuable task and design the right interface, agents, models and controls around it.</p>
          </div>
          <Link className={styles.smallButton} to="/contact">
            Start a Project →
          </Link>
        </section>
      </div>
    </SiteShell>
  );
}
