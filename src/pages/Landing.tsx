import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { homePaths, homeSummary, homeTrustChips } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Landing() {
  return (
    <SiteShell>
      <section className={`${styles.pageSection} ${styles.heroSection}`}>
        <div className={styles.heroPanel}>
          <div className={styles.kicker}>High-tech engineering collect</div>
          <h1>
            Engineering digital systems for the next industrial era. <span>Secure. Scalable. Visionary.</span>
          </h1>
          <p className={styles.subtitle}>AI-assisted. Cost-aware. Human-centred.</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/contact">
              Book a 20-min Build Review
            </Link>
            <Link className={styles.secondaryButton} to="/products">
              See Products
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.pageSection}>
        <div className={styles.trustChipRow}>
          {homeTrustChips.map((chip) => (
            <div key={chip} className={styles.trustChip}>
              {chip}
            </div>
          ))}
        </div>

        <article className={styles.summaryCard}>
          <h2>What we do</h2>
          <p>{homeSummary}</p>
        </article>

        <div className={styles.pathGrid}>
          {homePaths.map((path) => (
            <article key={path.title} className={styles.pathCard}>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <Link className={styles.inlineCta} to={path.to}>
                {path.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <NextSteps
        steps={[
          {
            label: "Browse Products",
            to: "/products",
            description: "Start with the app catalogue and pick your best-fit workflow.",
          },
          {
            label: "Compare Services",
            to: "/services",
            description: "Choose a low-risk engagement from audit to build.",
          },
          {
            label: "Review Case Studies",
            to: "/work",
            description: "See proof of delivery and measurable outcomes.",
          },
        ]}
      />
    </SiteShell>
  );
}
