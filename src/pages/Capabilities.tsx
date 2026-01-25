import SiteShell from "../components/SiteShell";
import { capabilities, methodColumns } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Capabilities() {
  return (
    <SiteShell>
      <section className={`${styles.capabilitiesSection} ${styles.sectionAnchor}`} id="capabilities">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>Capabilities</div>
          <h2>Four focused ways we deliver calm, cost-aware engineering.</h2>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className={`${styles.capabilityCard} ${capability.highlight ? styles.capabilityHighlight : ""}`}
            >
              <div className={styles.capabilityTitle}>{capability.title}</div>
              <p>{capability.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.methodSection} ${styles.sectionAnchor}`} id="method">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>Method</div>
          <h2>Built with intent, not excess.</h2>
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
    </SiteShell>
  );
}
