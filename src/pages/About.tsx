import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

const principles = [
  "Ship useful systems quickly, then improve in controlled cycles.",
  "Design for operators, not just dashboards.",
  "Treat cost, security, and governance as first-class constraints.",
];

export default function About() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>About</div>
          <h1>InnoWeb Ventures Limited</h1>
          <p>
            We are a UK-led engineering collective focused on practical AI and automation systems for real operational
            workflows.
          </p>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>Our story</h2>
            <p>
              We started InnoWeb Ventures to close the gap between ambitious digital strategy and day-to-day execution.
              Our model combines focused product capability with delivery services that keep risk low and momentum high.
            </p>
          </article>

          <article className={styles.infoCard}>
            <h2>Principles</h2>
            <ul className={styles.cleanList}>
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <NextSteps
        steps={[
          {
            label: "See Products",
            to: "/products",
            description: "Understand what we have already built and deployed.",
          },
          {
            label: "Review Services",
            to: "/services",
            description: "Choose your preferred delivery entry point.",
          },
          {
            label: "Contact InnoWeb",
            to: "/contact",
            description: "Start a direct conversation about your workflow goals.",
          },
        ]}
      />
    </SiteShell>
  );
}
