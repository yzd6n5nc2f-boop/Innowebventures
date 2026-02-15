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
          <Breadcrumbs items={[{ label: "Products", to: "/products" }, { label: "Not found" }]} />
          <article className={styles.summaryCard}>
            <h1>Product not found</h1>
            <p>The requested product does not exist in this catalogue.</p>
            <Link className={styles.inlineCta} to="/products">
              Back to products
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
        <Breadcrumbs items={[{ label: "Products", to: "/products" }, { label: product.name }]} />

        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Product detail</div>
          <h1>{product.name}</h1>
          <p>{product.summary}</p>
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>Key outcomes</h2>
            <ul className={styles.cleanList}>
              {product.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>

          <article className={styles.infoCard}>
            <h2>How it works</h2>
            <ol className={styles.cleanList}>
              {product.howItWorks.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>

        <article className={styles.summaryCard}>
          <h2>Inputs and outputs</h2>
          <p>{product.inputsOutputs}</p>
          <div className={styles.heroActionsInline}>
            <Link className={styles.primaryButton} to="/contact?intent=demo">
              Book a demo
            </Link>
            <Link className={styles.secondaryButton} to="/contact?intent=build-review">
              Book a 20-min Build Review
            </Link>
          </div>
        </article>

        <section className={styles.relatedSection}>
          <div className={styles.sectionHeaderCompact}>
            <h2>Related products</h2>
          </div>
          <div className={styles.miniGrid}>
            {relatedProducts.map((item) => (
              <Link key={item.slug} className={styles.miniCardLink} to={`/products/${item.slug}`}>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <NextSteps
        steps={[
          {
            label: "Choose Delivery Service",
            to: "/services",
            description: "Select the engagement model for this product.",
          },
          {
            label: "Review Similar Work",
            to: "/work",
            description: "See how similar builds performed in practice.",
          },
          {
            label: "Book Build Review",
            to: "/contact",
            description: "Get a scoped recommendation in 20 minutes.",
          },
        ]}
      />
    </SiteShell>
  );
}
