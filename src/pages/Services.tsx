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
          <h1>Structured ways to adopt the Forge Suite without losing control.</h1>
          <p>
            Services remain secondary to the platform. They exist to help organisations choose the right entry point,
            deploy responsibly, and expand with operational discipline.
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
      </section>

      <NextSteps
        steps={[
          {
            label: "Explore the Forge Suite",
            to: "/forge-suite",
            description: "See the internal stack these delivery pathways are built around.",
          },
          {
            label: "See the Platform",
            to: "/platform",
            description: "Review how we structure tailored deployment and control.",
          },
          {
            label: "Request a Free Assessment",
            to: "/contact",
            description: "Discuss your current setup and how we could evaluate improvements.",
          },
        ]}
      />
    </SiteShell>
  );
}
