import RelatedArticles from "../components/RelatedArticles";
import { pageLinks } from "../content/internalLinks";
import LlmCostCalculator from "../components/LlmCostCalculator";
import NotFound from "./NotFound";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { getServiceBySlug } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <NotFound />;

  return (
    <SiteShell>
      {service.slug === "private-local-llm" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Service", "@id": "https://www.innowebventures.com/services/private-local-llm#service", name: service.name, serviceType: "Private and local LLM deployment", description: service.summary, provider: { "@id": "https://www.innowebventures.com/#organization" }, areaServed: { "@type": "Country", name: "United Kingdom" } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.innowebventures.com/" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://www.innowebventures.com/services" }, { "@type": "ListItem", position: 3, name: service.name, item: "https://www.innowebventures.com/services/private-local-llm" }] }] }).replaceAll("<", "\\u003c") }} />}
      <section className={styles.pageSection}>
        <Breadcrumbs items={[{ label: "Deployment pathways", to: "/services" }, { label: service.name }]} />

        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Deployment pathway</div>
          <h1>{service.name}</h1>
          <p>{service.summary}</p>
        </div>

        {service.slug === "private-local-llm" && <LlmCostCalculator />}

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

        <RelatedArticles articles={pageLinks[`/services/${service.slug}`] ?? []} source={`/services/${service.slug}`} />
        <article className={styles.summaryCard}>
          <h2>Ready to map this pathway?</h2>
          <p>We will align the right platform entry point, deployment sequence, and governance checkpoints.</p>
          <Link className={styles.primaryButton} to="/contact?intent=workflow-review">
            Book a Workflow Review
          </Link>
        </article>
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
            description: "Pair this pathway with the right internal platform layer.",
          },
          {
            label: "View Delivery Method",
            to: "/delivery-method",
            description: "Review how we combine the stack into a tailored route.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Start with a conversation about your operation and what could be improved.",
          },
        ]}
      />
    </SiteShell>
  );
}
