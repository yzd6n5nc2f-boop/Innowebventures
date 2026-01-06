import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.topNav}>
        <div className={styles.brand}>
          <div className={styles.logoMark} />
          <span>InnoWeb Ventures Ltd</span>
        </div>
        <div className={styles.navBadge}>AI-first systems partner</div>
      </header>

      <main className={styles.hero}>
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
        </div>
      </main>

      <footer className={styles.footer}>© 2026 InnoWeb Ventures Ltd</footer>
    </div>
  );
}
