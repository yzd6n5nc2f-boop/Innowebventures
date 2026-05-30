import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { getProductBySlug, products } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <SiteShell>
        <section className={styles.pageSection}>
          <Breadcrumbs items={[{ label: "Forge Suite", to: "/forge-suite" }, { label: "Not found" }]} />
          <article className={styles.summaryCard}>
            <h1>Product not found</h1>
            <p>The requested Forge Suite product does not exist.</p>
            <Link className={styles.inlineCta} to="/forge-suite">
              Back to Forge Suite
            </Link>
          </article>
        </section>
      </SiteShell>
    );
  }

  const relatedProducts = products.filter((item) => product.relatedProductSlugs.includes(item.slug));

  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <Breadcrumbs items={[{ label: "Forge Suite", to: "/forge-suite" }, { label: product.name }]} />

        <div
          className={`${styles.pageIntro} ${styles.productHero}`}
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
                loading="eager"
              />
            </div>
            <div>
              <div className={styles.productBrandLine}>{product.brandLine}</div>
              <h1>{product.name}</h1>
            </div>
          </div>
          <p className={styles.productTagline}>{product.tagline}</p>
          <p className={styles.productRole}>{product.role}</p>
          <p className={styles.productPositioning}>{product.positioning}</p>
          <p>{product.summary}</p>
          <p>
            <strong>Who it serves:</strong> {product.audience}
          </p>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>What it does</h2>
            <ul className={styles.cleanList}>
              {product.whatItDoes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.infoCard}>
            <h2>Why it matters</h2>
            <ul className={styles.cleanList}>
              {product.whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>Role in the Forge Suite</h2>
            <p>{product.roleInSuite}</p>
          </article>

          <article className={styles.infoCard}>
            <h2>Used for</h2>
            <ul className={styles.cleanList}>
              {product.usedFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <article className={styles.summaryCard}>
          <h2>Core outcomes</h2>
          <ul className={styles.cleanList}>
            {product.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          <div className={styles.heroActionsInline}>
            <Link className={styles.primaryButton} to="/contact?intent=workflow-review">
              Book a Workflow Review
            </Link>
            <Link className={styles.secondaryButton} to="/work">
              See Example Systems
            </Link>
            <Link className={styles.secondaryButton} to="/delivery-method">
              View Delivery Method
            </Link>
          </div>
        </article>

        <section className={styles.relatedSection}>
          <div className={styles.sectionHeaderCompact}>
            <h2>Works alongside</h2>
          </div>
          <div className={styles.miniGrid}>
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                className={styles.miniCardLink}
                to={`/forge-suite/${item.slug}`}
                style={
                  {
                    ["--product-accent" as const]: item.accent,
                    ["--product-accent-soft" as const]: item.accentSoft,
                    ["--product-secondary" as const]: item.secondaryAccent,
                  } as CSSProperties
                }
              >
                <div className={styles.relatedProductTop}>
                  <div className={styles.relatedProductGlyph}>
                    <img
                      className={styles.relatedProductLogoImage}
                      src={`${import.meta.env.BASE_URL}${item.logoImage}`}
                      alt={`${item.name} official logo`}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className={styles.productBrandLine}>{item.brandLine}</div>
                    <div className={styles.productRole}>{item.role}</div>
                  </div>
                </div>
                <h3>{item.name}</h3>
                <p className={styles.productTagline}>{item.tagline}</p>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <NextSteps
        steps={[
          {
            label: "See Example Systems",
            to: "/work",
            description: "See how the wider stack fits around this layer of the final solution.",
          },
          {
            label: "View Delivery Method",
            to: "/delivery-method",
            description: "Review how we combine the layers into tailored deployments.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Talk through your current processes and where tailored automation may help.",
          },
        ]}
      />
    </SiteShell>
  );
}
