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
    name: "CalRivoRecon",
    description: "A reconciliation workflow that supports validation, exception handling and human review across complex datasets.",
    url: "https://applications.innowebventures.com/calrivorecon/",
    category: "Reconciliation",
  },
  {
    name: "Pathfinder",
    description: "A logic-led application that guides users through complex choices using structured steps and AI-assisted context.",
    url: "https://applications.innowebventures.com/pathfinder/",
    category: "Decision Support",
  },
];

export default function Work() {
  return (
    <SiteShell>
      <div className={styles.page}>
        <section className={styles.intro}>
          <div className={styles.eyebrow}>Applications</div>
          <h1>Practical systems built around real workflows.</h1>
          <p>
            These live applications demonstrate how InnoWeb Ventures combines clear business logic, targeted automation and
            AI assistance. Each system is designed around a specific workflow, with people retaining oversight of important
            actions and decisions.
          </p>
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
