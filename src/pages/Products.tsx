import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { products } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Products() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Products</div>
          <h1>App catalogue for workflow-first delivery.</h1>
          <p>Choose a product, review fit, and move to a focused demo quickly.</p>
        </div>

        <div className={styles.cardGrid}>
          {products.map((product) => (
            <article key={product.slug} className={styles.infoCard}>
              <h2>{product.name}</h2>
              <p>
                <strong>Who it is for:</strong> {product.audience}
              </p>
              <p>
                <strong>What it does:</strong> {product.summary}
              </p>
              <p className={styles.ioText}>
                <strong>Inputs/Outputs:</strong> {product.inputsOutputs}
              </p>
              <Link className={styles.inlineCta} to={`/products/${product.slug}`}>
                View product
              </Link>
            </article>
          ))}
        </div>
      </section>

      <NextSteps
        steps={[
          {
            label: "Pick a Service",
            to: "/services",
            description: "Match your chosen product to the right delivery option.",
          },
          {
            label: "See Work Proof",
            to: "/work",
            description: "Review recent builds and delivery outcomes.",
          },
          {
            label: "Book Build Review",
            to: "/contact",
            description: "Discuss your use case in a 20-minute call.",
          },
        ]}
      />
    </SiteShell>
  );
}
