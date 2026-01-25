import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

export default function Landing() {
  return (
    <SiteShell heroBackground>
      <section className={`${styles.hero} ${styles.sectionAnchor}`}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.kicker}>High-tech engineering collect</div>
          <h1>
            Engineering digital systems for the next industrial era. <span>Secure. Scalable. Visionary.</span>
          </h1>
          <p className={styles.subtitle}>AI-assisted. Cost-aware. Human-centred.</p>
          <div className={styles.featureButtons}>
            <Link className={styles.featureButton} to="/capabilities">
              Neutral networks
            </Link>
            <Link className={styles.featureButton} to="/capabilities">
              Automation
            </Link>
            <Link className={styles.featureButton} to="/capabilities">
              Cloud-native delivery
            </Link>
            <Link className={styles.featureButton} to="/capabilities">
              Design-first experience
            </Link>
          </div>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/work">
              Explore the network
            </Link>
            <Link className={styles.secondaryButton} to="/capabilities#method">
              How we build
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
