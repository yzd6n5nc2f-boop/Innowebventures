import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { deliveryPhases, howWeBuildPillars } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function HowWeBuild() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>How we build</div>
          <h1>A short, controlled delivery model designed for clarity.</h1>
          <p>We optimize for workflow value, governance, and predictable cost boundaries.</p>
        </div>

        <div className={styles.cardGrid}>
          {howWeBuildPillars.map((pillar) => (
            <article key={pillar.title} className={styles.infoCard}>
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>

        <article className={styles.summaryCard}>
          <h2>Delivery phases</h2>
          <div className={styles.phaseRow}>
            {deliveryPhases.map((phase) => (
              <span key={phase} className={styles.phaseChip}>
                {phase}
              </span>
            ))}
          </div>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "Start with Services",
            to: "/services",
            description: "Pick a delivery option that matches your readiness.",
          },
          {
            label: "See Work Examples",
            to: "/work",
            description: "Review how the method performs in real builds.",
          },
          {
            label: "Book Build Review",
            to: "/contact",
            description: "Get a practical recommendation for your workflow.",
          },
        ]}
      />
    </SiteShell>
  );
}
