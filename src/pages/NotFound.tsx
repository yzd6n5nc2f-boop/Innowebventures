import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

export default function NotFound() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>404 · Page not found</div>
          <h1>Let’s find your next step.</h1>
          <p>The page you’re looking for doesn’t exist, or its address may have changed. Check the address, or explore one of these pages.</p>
        </div>
        <nav aria-label="Helpful pages" className={styles.heroActionsInline}>
          <a className={styles.primaryButton} href="/services">Our services</a>
          <a className={styles.secondaryButton} href="/blog">Insights</a>
          <a className={styles.secondaryButton} href="/contact">Contact us</a>
        </nav>
        <p><a className={styles.inlineCta} href="/">← Back to the home page</a></p>
      </section>
    </SiteShell>
  );
}
