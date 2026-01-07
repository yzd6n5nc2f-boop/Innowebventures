import styles from "../styles/home.module.css";

const methodColumns = [
  {
    title: "Built with intent, not excess",
    items: [
      "Workflows before features.",
      "AI where it creates leverage.",
      "Cloud costs driven down.",
      "Humans in control.",
    ],
  },
  {
    title: "Intelligence, engineered",
    items: [
      "Event-driven AI.",
      "Batch processing over always-on.",
      "Clear cost ceilings by design.",
    ],
  },
  {
    title: "Globally connected, UK-led",
    locations: "London | Dublin | South Africa | APAC",
  },
];

const workItems = [
  {
    title: "Concordia",
    subtitle: "Contract intelligence for infrastructure",
    badge: "LIVE",
    badgeTone: "live",
  },
  {
    title: "TAD",
    subtitle: "Trading clarity without noise",
  },
  {
    title: "Workflow Engine",
    subtitle: "Designing operations before they break",
    badge: "LIVE",
    badgeTone: "live",
  },
  {
    title: "Compliance Lens",
    subtitle: "Seeing risk before it’s cost",
    badge: "CONCEPT",
    badgeTone: "concept",
  },
];

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.topNav}>
        <div className={styles.brand}>
          <div className={styles.logoMark} />
          <span>InnoWeb Ventures Ltd</span>
        </div>
        <button className={styles.menuButton} aria-label="Open navigation">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <div className={styles.kicker}>High-tech engineering collective</div>
            <h1>
              Engineering digital systems for the next industrial era. <span>Secure. Scalable. Visionary.</span>
            </h1>
            <p className={styles.subtitle}>AI-assisted. Cost-aware. Human-centred.</p>
            <div className={styles.highlights}>
              <div className={styles.highlightItem}>Neural networks & automation</div>
              <div className={styles.highlightItem}>Cloud-native delivery</div>
              <div className={styles.highlightItem}>Design-first experience</div>
            </div>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">
                Explore the work
              </a>
              <a className={styles.secondaryButton} href="#method">
                How we build
              </a>
            </div>
          </div>
        </section>

        <section className={styles.methodSection} id="method">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionKicker}>Method</div>
            <h2>Built for clarity, accountability and cost control.</h2>
          </div>
          <div className={styles.methodGrid}>
            {methodColumns.map((column) => (
              <div key={column.title} className={styles.methodCard}>
                <div className={styles.methodTitle}>{column.title}</div>
                {column.items ? (
                  <ul>
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.locations}>{column.locations}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.workSection} id="work">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionKicker}>Our Work in Action</div>
            <h2>Programmes delivered with pace, rigor and measurable value.</h2>
          </div>
          <div className={styles.workGrid}>
            {workItems.map((item) => (
              <article key={item.title} className={styles.workCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleGroup}>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                  {item.badge && (
                    <span
                      className={`${styles.statusBadge} ${
                        item.badgeTone === "concept" ? styles.badgeConcept : styles.badgeLive
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className={styles.cardThumbnail} aria-hidden />
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>InnoWeb Ventures Ltd</div>
        <div>UK-registered</div>
        <div>© 2026</div>
      </footer>
    </div>
  );
}
