import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { caseStudies } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Work() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Case studies</div>
          <h1>Proof-focused delivery snapshots.</h1>
          <p>Scan each build by problem, implementation approach, and outcome.</p>
        </div>

        <div className={styles.cardGrid}>
          {caseStudies.map((study) => (
            <article key={study.slug} className={styles.infoCard}>
              <h2>{study.name}</h2>
              <p>
                <strong>Problem:</strong> {study.problem}
              </p>
              <p>
                <strong>Build:</strong> {study.build}
              </p>
              <p>
                <strong>Result:</strong> {study.result}
              </p>
              <Link className={styles.inlineCta} to={`/work/${study.slug}`}>
                Read case study
              </Link>
            </article>
          ))}
        </div>
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
