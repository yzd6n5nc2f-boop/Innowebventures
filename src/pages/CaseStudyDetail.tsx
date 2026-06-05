import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

export default function CaseStudyDetail() {
  const { slug } = useParams();

  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <Breadcrumbs items={[{ label: "Work", to: "/work" }, { label: "Coming soon" }]} />

        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Work</div>
          <h1>Example system details are coming soon.</h1>
          <p>
            This route is being reserved for future work examples. We are not publishing case studies, screenshots,
            or delivery claims here yet.
          </p>
        </div>

        <article className={styles.summaryCard}>
          <h2>Start with your workflow</h2>
          <p>
            If you want to discuss what a suitable system could look like for your operation, we can review the
            workflow first and define the right starting point together.
          </p>
          <Link className={styles.primaryButton} to={`/contact?intent=workflow-review${slug ? `&reference=${slug}` : ""}`}>
            Book a Workflow Review
          </Link>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "See Example Systems",
            to: "/solutions",
            description: "Review the product capabilities used in these projects.",
          },
          {
            label: "View Delivery Method",
            to: "/delivery-method",
            description: "Choose the most suitable engagement route.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Align scope, timeline, and budget guardrails.",
          },
        ]}
      />
    </SiteShell>
  );
}
