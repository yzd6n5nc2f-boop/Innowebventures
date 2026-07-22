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
];

const trustItems = [
  ["Enterprise ready", "Secure architecture for controlled operational use."],
  ["Accelerated delivery", "Reusable Forge capabilities reduce time from idea to deployment."],
  ["End-to-end platform", "Intelligence, software, operations, media and robotics in one ecosystem."],
  ["Trust and governance", "Human approval, monitoring and accountability built into delivery."],
  ["Human + AI", "Technology designed to strengthen teams rather than remove control."],
];

const stackHighlights = [
  [
    "Agentic workflows",
    "Purpose-built agents coordinate tools, data and approvals around the task rather than forcing every problem into one generic assistant.",
  ],
  [
    "Intelligent planners",
    "Planning layers break complex work into controlled steps, select the right route and keep execution aligned with the intended outcome.",
  ],
  [
    "Purpose-fit LLMs",
    "Models are selected for the job, balancing reasoning quality, speed, privacy and cost instead of defaulting to the largest model available.",
  ],
  [
    "Cost and output control",
    "Token spend is measured at task and workflow level so output quality, operational value and model cost can be reviewed together.",
  ],
];

const deliverySteps = [
  ["01", "Discover", "Understand the workflow, constraints and highest-value opportunities."],
  ["02", "Shape", "Select and configure the right Forge Suite capabilities."],
  ["03", "Build", "Create the tailored application, integration and user experience."],
  ["04", "Deploy", "Introduce the solution safely with monitoring and governance."],
  ["05", "Operate", "Measure performance, improve the workflow and scale with confidence."],
];

export default function Landing() {
  return (
    <SiteShell>
      <div className={styles.landing}>
        <section className={styles.hero} style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
          <div className={styles.heroCopy} style={{ maxWidth: "820px" }}>
            <div className={styles.eyebrow}>InnoWeb Ventures · Forge Suite</div>
            <h1>
              The AI engineering platform for <span>real-world impact.</span>
            </h1>
            <p className={styles.heroLead}>
              Forge Suite is InnoWeb Ventures&apos; integrated platform for designing, building, deploying and operating
              intelligent applications. It gives us a reusable engineering foundation while every client solution stays
              tailored to the workflow, organisation and people using it.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="#forge-suite">
                Explore Forge Suite →
              </a>
            </div>
            <div className={styles.heroProof}>
              <div>Build bespoke applications without starting from zero.</div>
              <div>Connect AI, software, data and operational governance.</div>
              <div>Deploy gradually while keeping people in control.</div>
            </div>
          </div>
        </section>

        <section className={`${styles.trustBar} ${refinements.networkPanel}`} aria-label="Forge Suite benefits">
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
                <h2>Agentic systems designed around the work.</h2>
                <p className={styles.sectionIntro}>
                  Forge Suite combines workflow orchestration, intelligent planning, fit-for-purpose language models and
                  operational cost controls. The homepage gives the overview; the development stack explains how these
                  layers work together in practice.
                </p>
              </div>
              <Link className={styles.secondary} to="/delivery-method">
                Explore development stack
              </Link>
            </div>

            <div className={styles.suiteGrid}>
              {stackHighlights.map(([title, description]) => (
                <article key={title} className={`${styles.suiteCard} ${refinements.networkCard}`}>
                  <div className={styles.suiteRole}>Forge engineering</div>
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
                <div className={styles.sectionEyebrow}>How the advantage works</div>
                <h2>From business problem to governed operation.</h2>
                <p className={styles.sectionIntro}>
                  Forge Suite gives InnoWeb a consistent delivery system rather than a collection of isolated tools.
                </p>
              </div>
            </div>
            <div className={styles.flow}>
              {deliverySteps.map(([number, title, description]) => (
                <article key={number} className={styles.flowStep}>
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
                <div className={styles.sectionEyebrow}>Built with Forge Suite</div>
                <h2>Practical applications. Real working examples.</h2>
                <p className={styles.sectionIntro}>
                  These examples sit behind the platform story as proof of what InnoWeb can create. They demonstrate
                  different workflows, sectors and solution types rather than defining the company itself.
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
                  className={`${styles.appCard} ${refinements.networkCard}`}
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

        <section className={styles.ctaBand}>
          <div>
            <h2>Ready to build what&apos;s next?</h2>
            <p>Let&apos;s identify one valuable workflow and show how Forge Suite could improve it.</p>
          </div>
          <Link className={styles.smallButton} to="/contact">
            Start a Project →
          </Link>
        </section>
      </div>
    </SiteShell>
  );
}
