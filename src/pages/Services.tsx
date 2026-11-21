import RelatedArticles from "../components/RelatedArticles";
import { pageLinks } from "../content/internalLinks";
import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { services } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Services() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Deployment pathways</div>
          <h1>Practical AI and automation services for your business.</h1>
          <p>
            Start with one workflow, agree a focused pilot and build around the people using it. Our services cover
            discovery, integration, private AI deployment and ongoing improvement, with clear scope and human controls.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {services.map((service) => (
            <article key={service.slug} className={styles.infoCard}>
              <h2>{service.name}</h2>
              <p>
                <strong>Timeline:</strong> {service.duration}
              </p>
              <p>{service.summary}</p>
              <Link className={styles.inlineCta} to={`/services/${service.slug}`}>
                View pathway
              </Link>
            </article>
          ))}
        </div>
        <RelatedArticles articles={pageLinks["/services"] ?? []} source={"/services"} />
        <article className={styles.summaryCard}>
          <h2>How ready is your business for AI?</h2>
          <p>Answer 12 questions about data, processes, team skills, governance and privacy. Get your readiness band and a practical next step, with no obligation.</p>
          <Link className={styles.primaryButton} to="/ai-readiness-assessment">Take the free AI readiness assessment →</Link>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "See Example Systems",
            to: "/solutions",
            description: "See the internal stack these delivery pathways are built around.",
          },
          {
            label: "View Delivery Method",
            to: "/delivery-method",
            description: "Review how we structure tailored deployment and control.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Discuss your current setup and how we could evaluate improvements.",
          },
        ]}
      />
    </SiteShell>
  );
}
