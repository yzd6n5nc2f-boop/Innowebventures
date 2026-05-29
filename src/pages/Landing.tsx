import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import ProductGlyph from "../components/ProductGlyph";
import SiteShell from "../components/SiteShell";
import { homePaths, homeSummary, homeTrustChips, platformLayers, products } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Landing() {
  return (
    <SiteShell>
      <section className={`${styles.pageSection} ${styles.heroSection}`}>
        <div className={styles.heroPanel}>
          <div className={styles.kicker}>AI infrastructure for the next generation</div>
          <h1>InnoWeb Ventures builds the infrastructure for the next AI generation.</h1>
          <p className={styles.subtitle}>
            We help organisations engineer tailored automation, software, and AI systems using our own proprietary
            platform stack, specialist sector knowledge, and a controlled delivery model built around real workflows.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/forge-suite">
              Explore the Forge Suite
            </Link>
            <Link className={styles.secondaryButton} to="/contact">
              Request a free assessment
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.pageSection}>
        <div className={styles.trustChipRow}>
          {homeTrustChips.map((chip) => (
            <div key={chip} className={styles.trustChip}>
              {chip}
            </div>
          ))}
        </div>

        <article className={styles.summaryCard}>
          <h2>Forge Suite</h2>
          <p>{homeSummary}</p>
        </article>

        <figure className={styles.forgeSuiteVisual}>
          <img
            src={`${import.meta.env.BASE_URL}branding/forge-suite/forge-suite-overview.png`}
            alt="The Forge Suite by InnoWeb, showing six connected layers for a connected automation ecosystem."
            loading="lazy"
          />
        </figure>

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
                  <ProductGlyph slug={product.slug} className={styles.productGlyphSvg} />
                </div>
                <div>
                  <div className={styles.productBrandLine}>{product.brandLine}</div>
                  <h3>{product.name}</h3>
                </div>
              </div>
              <p className={styles.productTagline}>{product.tagline}</p>
              <p className={styles.productRole}>{product.role}</p>
              <p>{product.summary}</p>
              <Link className={styles.inlineCta} to={`/forge-suite/${product.slug}`}>
                View product architecture
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.pathGrid}>
          {homePaths.map((path) => (
            <article key={path.title} className={styles.pathCard}>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <Link className={styles.inlineCta} to={path.to}>
                {path.cta}
              </Link>
            </article>
          ))}
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

        <article className={styles.summaryCard}>
          <h2>Why InnoWeb</h2>
          <p>
            We do not approach this as a generic software sale. We use our own stack, our own methods, and the right
            mix of technical and sector understanding to shape a solution around each business. That can include
            software, automation, intelligence shaping, hardware integration, and operational rollout, depending on
            what the workflow actually needs.
          </p>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "Explore the Forge Suite",
            to: "/forge-suite",
            description: "See the internal stack we use to shape intelligence, build systems, and run operations.",
          },
          {
            label: "See the Platform",
            to: "/platform",
            description: "Review how we turn your workflows into tailored operational solutions.",
          },
          {
            label: "Request a Free Assessment",
            to: "/contact",
            description: "Discuss your processes and get an initial view of where we could improve flows and systems.",
          },
        ]}
      />
    </SiteShell>
  );
}
