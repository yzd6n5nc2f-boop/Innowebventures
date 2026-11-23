import SectionSymbol from "../components/SectionSymbol";
import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import styles from "../styles/applications.module.css";

const applications = [
  {
    name: "TenderRadar",
    description: "A focused tender discovery workflow that reduces search effort and helps teams prioritise relevant opportunities.",
    url: "https://applications.innowebventures.com/TenderRadar/",
    category: "Opportunity Intelligence",
  },
  {
    name: "InnoWeb AI Workspace",
    description: "A tailored agentic AI workspace that brings planning, specialist assistance and guided workflows into one practical interface.",
    url: "https://applications.innowebventures.com/BrainForge/forgepilot",
    category: "Agentic AI Workspace",
  },
  {
    name: "Pathfinder",
    description: "A logic-led application that guides users through complex choices using structured steps and AI-assisted context.",
    url: "https://applications.innowebventures.com/pathfinder/",
    category: "Decision Support",
  },
  {
    name: "Workbook Timesheet",
    description: "A streamlined timesheet workflow for recording, reviewing and managing workbook-based time entries.",
    url: "https://applications.innowebventures.com/workbooktimesheet",
    category: "Time Management",
  },
];

export default function Work() {
  return (
    <SiteShell>
      <div className={styles.page}>
        <section className={styles.intro} data-neural-intro="true">
          <SectionSymbol kind="work" />
          <div className={styles.eyebrow}>Our Work</div>
          <h1>Practical systems built around real workflows.</h1>
          <p>
            These live applications demonstrate how InnoWeb Ventures combines clear business logic, targeted automation and
            AI assistance. Each system is designed around a specific workflow, with people retaining oversight of important
            actions and decisions.
          </p>
        </section>

        <section className={styles.grid} aria-label="Explore our work">
          <article className={styles.card}><div className={styles.cardBody}>
            <div className={styles.category}>Our framework</div><h2>The Forge Suite</h2>
            <p>Our proprietary software framework supports tailored workflows, system connections and human control. Explore how it relates to the applications below.</p>
            <Link className={styles.launch} to="/forge-suite">Explore the Forge Suite →</Link>
          </div></article>
          <article className={styles.card}><div className={styles.cardBody}>
            <div className={styles.category}>Development case study</div><h2>Coffee equipment management</h2>
            <p>An anonymised account of a management system in development for ordering, supply and monitoring of coffee machines. Completed outcomes are not claimed.</p>
            <Link className={styles.launch} to="/case-studies/coffee-equipment-management">View the development case study →</Link>
          </div></article>
        </section>

        <section className={styles.grid} aria-label="Live applications">
          {applications.map((application) => (
            <article className={styles.card} key={application.name}>
              <div className={styles.previewWrap}>
                <iframe
                  className={styles.preview}
                  src={application.url}
                  title={`${application.name} live preview`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                <div className={styles.previewOverlay} aria-hidden />
                <span className={styles.liveBadge}><i /> Live</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.category}>{application.category}</div>
                <h2>{application.name}</h2>
                <p>{application.description}</p>
                <a href={application.url} target="_blank" rel="noreferrer" className={styles.launch}>
                  Launch application <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section id="coffee-equipment-management" aria-label="Application in development" style={{ scrollMarginTop: "100px" }}>
          <article className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.category}>In development · anonymised project</div>
              <h2>Coffee equipment management</h2>
              <p>A management system in development for ordering, supply and monitoring of coffee machines for an equipment business in Australia.</p>
              <p>A public application link and client-approved screenshots have not been supplied for this overview.</p>
              <a href="/case-studies/coffee-equipment-management" className={styles.launch}>Read the development case study →</a>
            </div>
          </article>
        </section>

        <section className={styles.closing}>
          <div>
            <div className={styles.eyebrow}>Built to fit</div>
            <h2>Every workflow needs its own logic.</h2>
          </div>
          <p>
            We do not force organisations into a generic AI product. We collaborate across professional services to
            understand the workflow first, then build the right combination of rules, interfaces, automation and AI support.
          </p>
          <a href="/contact" className={styles.projectCta}>Start a project →</a>
        </section>
      </div>
    </SiteShell>
  );
}
