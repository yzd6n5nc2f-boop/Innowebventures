import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { getCaseStudyBySlug } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return (
      <SiteShell>
        <section className={styles.pageSection}>
          <Breadcrumbs items={[{ label: "Work", to: "/work" }, { label: "Not found" }]} />
          <article className={styles.summaryCard}>
            <h1>Case study not found</h1>
            <p>The requested case study does not exist.</p>
            <Link className={styles.inlineCta} to="/work">
              Back to work
            </Link>
          </article>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <Breadcrumbs items={[{ label: "Work", to: "/work" }, { label: study.name }]} />

        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Case study</div>
          <h1>{study.name}</h1>
          <p>{study.context}</p>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>What was built</h2>
            <ul className={styles.cleanList}>
              {study.whatWasBuilt.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.infoCard}>
            <h2>Measurable value</h2>
            <ul className={styles.cleanList}>
              {study.measurableValue.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <section className={styles.relatedSection}>
          <div className={styles.sectionHeaderCompact}>
            <h2>Screenshots</h2>
          </div>
          <div className={styles.screenshotGrid}>
            {study.screenshots.map((shot) => (
              <figure key={shot.title} className={styles.screenshotCard}>
                <img src={`${import.meta.env.BASE_URL}${shot.imagePath}`} alt={`${study.name} - ${shot.title}`} />
                <figcaption>{shot.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <article className={styles.summaryCard}>
          <h2>Need a similar outcome?</h2>
          <p>We can scope a comparable build and define a low-risk start plan in one short session.</p>
          <Link className={styles.primaryButton} to="/contact?intent=similar-build">
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
