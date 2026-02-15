import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { getServiceBySlug } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <SiteShell>
        <section className={styles.pageSection}>
          <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: "Not found" }]} />
          <article className={styles.summaryCard}>
            <h1>Service not found</h1>
            <p>The requested service page is not available.</p>
            <Link className={styles.inlineCta} to="/services">
              Back to services
            </Link>
          </article>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: service.name }]} />

        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Service detail</div>
          <h1>{service.name}</h1>
          <p>{service.summary}</p>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>What you get</h2>
            <ul className={styles.cleanList}>
              {service.whatYouGet.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.infoCard}>
            <h2>Typical timeline</h2>
            <p>{service.timeline}</p>
            <p>
              <strong>Duration:</strong> {service.duration}
            </p>
          </article>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>What we need from you</h2>
            <p>{service.clientNeeds}</p>
          </article>

          <article className={styles.infoCard}>
            <h2>Cost guardrails and checkpoints</h2>
            <ul className={styles.cleanList}>
              {service.guardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <article className={styles.summaryCard}>
          <h2>Ready to scope this service?</h2>
          <p>We will align the workflow, timeline, and control checkpoints in a short working session.</p>
          <Link className={styles.primaryButton} to="/contact?intent=build-review">
            Book a 20-min Build Review
          </Link>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "Browse Products",
            to: "/products",
            description: "Pair this service with the right product capability.",
          },
          {
            label: "See Case Studies",
            to: "/work",
            description: "Review delivery examples before you commit.",
          },
          {
            label: "Contact Team",
            to: "/contact",
            description: "Start with a clear scope and next action plan.",
          },
        ]}
      />
    </SiteShell>
  );
}
