import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { platformLayers, products } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Products() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Forge Suite</div>
          <h1>The proprietary platform stack behind how we build tailored AI and automation solutions.</h1>
          <p>
            The Forge Suite is developed and owned by InnoWeb. It is the connected delivery stack we use to understand
            workflow, shape automation, and build the solution that best fits a client's business, from one controlled
            workflow to wider operational deployment. It is designed to help established organisations move from legacy
            operating models into the new world of AI without losing accountability, control, or human leadership.
          </p>
        </div>

        <figure className={styles.forgeSuiteVisual}>
          <img
            src={`${import.meta.env.BASE_URL}branding/forge-suite/forge-suite-overview.png`}
            alt="The Forge Suite by InnoWeb, showing six connected layers across ForgeOps, NeuralForge, Forge Coder, Game Forge Studio, Forge Robotics Lab, and Forge Media Studio."
            loading="eager"
          />
        </figure>

        <div className={styles.forgeSuiteNarrative}>
          <article className={styles.infoCard}>
            <h2>Built around the modern workplace</h2>
            <p>
              We begin with the way people already work: handoffs, approvals, data, tools, exceptions, and daily
              pressure points. The Forge Suite gives us a structured way to turn that workflow understanding into
              practical automation and software without forcing the business into a generic product.
            </p>
          </article>
          <article className={styles.infoCard}>
            <h2>Scales in controlled stages</h2>
            <p>
              Adoption can start with one process, one team, or one automation path, then expand as the business gains
              confidence. The same stack can support small, medium, and large operating environments because rollout is
              staged around the client's risk, budget, and operational readiness.
            </p>
          </article>
          <article className={styles.infoCard}>
            <h2>Human control at the centre</h2>
            <p>
              Automation is designed with human review, approval, override paths, and visible checkpoints. Critical
              actions do not move into live operation without the right person in the loop and accountable oversight in
              place.
            </p>
          </article>
        </div>

        <div className={styles.architectureGrid}>
          {platformLayers.map((layer) => (
            <article
              key={layer.title}
              className={styles.architectureCard}
              style={
                {
                  ["--product-accent" as const]: layer.accent,
                  ["--product-accent-soft" as const]: layer.accentSoft,
                  ["--product-secondary" as const]: layer.accent,
                } as CSSProperties
              }
            >
              <div className={styles.sectionKicker}>{layer.title}</div>
              <h3>{layer.summary}</h3>
              <p>{layer.detail}</p>
            </article>
          ))}
        </div>

        <div className={styles.suiteGrid}>
          {products.map((product) => (
            <article
              key={product.slug}
              className={styles.productCard}
              style={
                {
                  ["--product-accent" as const]: product.accent,
                  ["--product-accent-soft" as const]: product.accentSoft,
                  ["--product-secondary" as const]: product.secondaryAccent,
                } as CSSProperties
              }
            >
              <div className={styles.productCardHeader}>
                <div className={styles.productGlyph}>
                  <img
                    className={styles.productLogoImage}
                    src={`${import.meta.env.BASE_URL}${product.logoImage}`}
                    alt={`${product.name} official logo`}
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className={styles.productBrandLine}>{product.brandLine}</div>
                  <h2>{product.name}</h2>
                </div>
              </div>
              <p className={styles.productTagline}>{product.tagline}</p>
              <p className={styles.productRole}>{product.role}</p>
              <p>
                <strong>Who it serves:</strong> {product.audience}
              </p>
              <p>
                <strong>What it is:</strong> {product.summary}
              </p>
              <p>
                <strong>Role in the stack:</strong> {product.roleInSuite}
              </p>
              <Link className={styles.inlineCta} to={`/forge-suite/${product.slug}`}>
                View product architecture
              </Link>
            </article>
          ))}
        </div>

        <article className={styles.summaryCard}>
          <h2>Stack architecture</h2>
          <p>
            NeuralForge shapes the bespoke brain, including robotic intelligence foundations. Forge Coder builds the
            software and interface layer around it. ForgeOps governs live operations with human oversight in control.
            Game Forge Studio and Forge Media Studio operate as specialist engagement and content streams connected to
            the same controlled suite.
          </p>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "See Example Systems",
            to: "/work",
            description: "Review how we combine this stack into tailored operational deployments.",
          },
          {
            label: "View Delivery Method",
            to: "/delivery-method",
            description: "See how we assess, design, and deploy around the client's real workflow.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Discuss your organisation and get an initial view of where we could add value.",
          },
        ]}
      />
    </SiteShell>
  );
}
