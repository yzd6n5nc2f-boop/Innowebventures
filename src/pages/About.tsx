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
        <div className={styles.pageIntro} data-neural-intro="true">
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
              The Forge Suite is our proprietary software framework for building tailored workflows, connecting business systems
              and keeping people in control. We choose the approach around each client’s actual needs.
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
            label: "See Example Systems",
            to: "/solutions",
            description: "See the proprietary stack behind how we build tailored client solutions.",
          },
          {
            label: "View Delivery Method",
            to: "/delivery-method",
            description: "Review how we approach intelligence, software, and operations together.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Start a direct conversation about your business workflows and improvement opportunities.",
          },
        ]}
      />
    </SiteShell>
  );
}
