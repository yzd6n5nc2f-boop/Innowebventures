import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.topNav}>
        <div className={styles.brand}>
          <div className={styles.logoMark} />
          <span>InnoWeb Ventures Ltd</span>
        </div>
      </header>

      <main className={styles.hero}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1>Engineering digital systems for the next industrial era.</h1>
          <p>AI-assisted. Cost-aware. Human-centred.</p>
        </div>
      </main>

      <footer className={styles.footer}>© 2026 InnoWeb Ventures Ltd</footer>
    </div>
  );
}
