import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

const principles = [
  "Build operational software that stays useful under real-world conditions.",
  "Keep humans in command of decisions, approvals, and escalation paths.",
  "Treat governance, security, and cost control as product architecture requirements.",
];

export default function About() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>About</div>
          <h1>InnoWeb Ventures Limited</h1>
          <p>
            InnoWeb Ventures Limited is a UK-led AI infrastructure and operational software company. We build the
            systems, governance layers, and intelligence frameworks that help organisations move into the next
            generation of AI-enabled operations with real control.
          </p>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>Our direction</h2>
            <p>
              The company is being built around the Forge Suite: a platform family that supports software build,
              governed operations, and specialised intelligence for serious operational environments.
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
            label: "Explore the Forge Suite",
            to: "/forge-suite",
            description: "See the proprietary stack behind how we build tailored client solutions.",
          },
          {
            label: "See the Platform",
            to: "/platform",
            description: "Review how we approach intelligence, software, and operations together.",
          },
          {
            label: "Contact InnoWeb",
            to: "/contact",
            description: "Start a direct conversation about your business workflows and improvement opportunities.",
          },
        ]}
      />
    </SiteShell>
  );
}
