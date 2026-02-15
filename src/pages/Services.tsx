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
          <div className={styles.sectionKicker}>Services</div>
          <h1>Low-risk delivery options from audit to optimisation.</h1>
          <p>Pick a service path based on certainty, speed, and integration scope.</p>
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
                View service
              </Link>
            </article>
          ))}
        </div>
      </section>

      <NextSteps
        steps={[
          {
            label: "Match with Products",
            to: "/products",
            description: "See which products fit your selected service path.",
          },
          {
            label: "See Delivery Proof",
            to: "/work",
            description: "Review case studies before starting the engagement.",
          },
          {
            label: "Book Build Review",
            to: "/contact",
            description: "Validate scope and timeline in a short call.",
          },
        ]}
      />
    </SiteShell>
  );
}
