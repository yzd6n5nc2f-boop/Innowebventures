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
          <Breadcrumbs items={[{ label: "Deployment pathways", to: "/services" }, { label: "Not found" }]} />
          <article className={styles.summaryCard}>
            <h1>Pathway not found</h1>
            <p>The requested deployment pathway is not available.</p>
            <Link className={styles.inlineCta} to="/services">
              Back to pathways
            </Link>
          </article>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <Breadcrumbs items={[{ label: "Deployment pathways", to: "/services" }, { label: service.name }]} />

        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Deployment pathway</div>
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
            <h2>Control guardrails</h2>
            <ul className={styles.cleanList}>
              {service.guardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <article className={styles.summaryCard}>
          <h2>Ready to map this pathway?</h2>
          <p>We will align the right platform entry point, deployment sequence, and governance checkpoints.</p>
          <Link className={styles.primaryButton} to="/contact?intent=free-assessment">
            Contact us for a discussion
          </Link>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "Explore the Forge Suite",
            to: "/forge-suite",
            description: "Pair this pathway with the right internal platform layer.",
          },
          {
            label: "See the Platform",
            to: "/platform",
            description: "Review how we combine the stack into a tailored route.",
          },
          {
            label: "Contact InnoWeb",
            to: "/contact",
            description: "Start with a conversation about your operation and what could be improved.",
          },
        ]}
      />
    </SiteShell>
  );
}
