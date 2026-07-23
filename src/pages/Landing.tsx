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
  ["Tailored workflows", "Agentic systems configured around the organisation, task and people using them."],
  ["Clear user experience", "Complex orchestration presented through simple, practical interfaces."],
  ["Visible agent activity", "Users can monitor task plans, agent actions, progress and approvals."],
  ["Measured AI cost", "Token usage and model spend tracked against the value of each outcome."],
  ["Private deployment", "Local server or AI PC deployment where privacy, GDPR or security requires it."],
];

const stackHighlights = [
  [
    "Tailored workflows",
    "We shape the system around the real task, connecting the right agents, tools, data and approval points instead of imposing a generic AI assistant.",
  ],
  [
    "Observable interfaces",
    "Users work through a clear interface while seeing the task plan, agent actions, progress, exceptions and points requiring human approval.",
  ],
  [
    "Hybrid model routing",
    "Local LLMs handle focused, repeatable or sensitive steps, while larger proprietary models are reserved for reasoning tasks where they add measurable value.",
  ],
  [
    "Cost-aware operation",
    "Token use, model calls and task outcomes are monitored together so the system can balance quality, speed, privacy and operating cost.",
  ],
  [
    "Private local AI",
    "Where GDPR, confidentiality or security is a concern, models and supporting data services can run locally on organisational servers or a dedicated AI PC.",
  ],
  [
    "Human control",
    "People remain responsible for approvals and important decisions while agents handle repeatable research, preparation, transformation and coordination work.",
  ],
];

const deliverySteps = [
  ["01", "Understand", "Map the task, users, data, controls and points where human judgement must remain."],
  ["02", "Design", "Shape the agentic workflow and the interface users will work through."],
  ["03", "Route", "Choose local or proprietary models for each step based on capability, privacy and cost."],
  ["04", "Observe", "Make progress, agent actions, approvals, token use and exceptions visible."],
  ["05", "Improve", "Compare output quality with cost and refine the workflow using real operating results."],
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
              We design agentic AI systems around the organisation, workflow and people using them. Planning, model routing
              and automation sit behind a clear user interface, while progress, agent activity, approvals and token usage
              remain visible and measurable.
            </p>
            <div className={styles.heroActions}>
              <a className={`${styles.primary} ${refinements.heroButton}`} href="#forge-suite">
                <span>See how it works</span>
                <strong aria-hidden>↘</strong>
              </a>
            </div>
            <div className={styles.heroProof}>
              <div>Designed around the workflow rather than a generic AI product.</div>
              <div>Clear visibility into plans, agent actions, progress and approvals.</div>
              <div>Local and proprietary models balanced for quality, privacy and cost.</div>
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
                <div className={styles.sectionEyebrow}>01 · The system</div>
                <h2>One tailored workflow, connected end to end.</h2>
                <p className={`${styles.sectionIntro} ${refinements.brightIntro}`}>
                  Planners coordinate the task, specialist agents use the right tools and models, and the user works through
                  one clear operational interface. Cost, token use, privacy and output quality are designed into the workflow
                  from the start.
                </p>
              </div>
              <Link className={`${styles.secondary} ${refinements.sectionButton}`} to="/delivery-method">
                <span>How it works</span>
                <strong aria-hidden>→</strong>
              </Link>
            </div>

            <div className={styles.suiteGrid}>
              {stackHighlights.map(([title, description]) => (
                <article key={title} className={`${styles.suiteCard} ${refinements.clearTextCard}`}>
                  <div className={styles.suiteRole}>Agentic system</div>
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
                <div className={styles.sectionEyebrow}>02 · The workflow</div>
                <h2>From a real task to a visible, governed operation.</h2>
                <p className={`${styles.sectionIntro} ${refinements.brightIntro}`}>
                  Each stage follows naturally from the one before it, keeping the system understandable for users and
                  measurable for the organisation.
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
                <div className={styles.sectionEyebrow}>03 · Working examples</div>
                <h2>Focused applications built on the same approach.</h2>
                <p className={`${styles.sectionIntro} ${refinements.brightIntro}`}>
                  Each application places a straightforward user experience over a tailored workflow. The interface changes
                  with the task, while the underlying principles of visibility, control and efficient model use remain the same.
                </p>
              </div>
              <Link className={`${styles.secondary} ${refinements.sectionButton}`} to="/work">
                <span>View applications</span>
                <strong aria-hidden>→</strong>
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
                    <span className={styles.appCta}>Open application ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.ctaBand} ${refinements.clearCtaBand}`}>
          <div>
            <div className={styles.sectionEyebrow}>04 · Start with one workflow</div>
            <h2>Ready to design a tailored agentic system?</h2>
            <p>Identify one valuable task, then shape the right interface, agents, models and controls around it.</p>
          </div>
          <Link className={`${styles.smallButton} ${refinements.projectButton}`} to="/contact">
            <span>Start a project</span>
            <strong aria-hidden>↗</strong>
          </Link>
        </section>
      </div>
    </SiteShell>
  );
}
