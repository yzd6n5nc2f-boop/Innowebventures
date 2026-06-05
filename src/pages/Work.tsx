import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

export default function Work() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Work</div>
          <h1>Example systems are coming soon.</h1>
          <p>
            We are preparing this section so it reflects the right standard and the right story. For now, the Work
            area is being held back until example systems can be published properly.
          </p>
        </div>

        <article className={styles.summaryCard}>
          <h2>Coming soon</h2>
          <p>
            When this section goes live, it will show carefully selected example systems and delivery patterns
            without overstating where the business is today.
          </p>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "See Example Systems",
            to: "/solutions",
            description: "See the solution stack behind these delivery outcomes.",
          },
          {
            label: "View Delivery Method",
            to: "/delivery-method",
            description: "See the delivery method that takes these systems into operation.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Bring your use case and leave with clear next actions.",
          },
        ]}
      />
    </SiteShell>
  );
}
