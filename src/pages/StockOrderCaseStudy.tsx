import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import Breadcrumbs from "../components/Breadcrumbs";
import study from "../content/stockOrderCaseStudy.json";
import styles from "../styles/blog.module.css";
import home from "../styles/home.module.css";

type Screenshot = { src: string; alt: string; caption: string; width: number; height: number };
const screenshots: Screenshot[] = study.screenshots;
const origin = "https://www.innowebventures.com";
const url = `${origin}/case-studies/${study.slug}`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: study.headline,
      author: { "@type": "Person", "@id": `${study.author.url}#person`, name: study.author.name, url: study.author.url },
      publisher: { "@id": `${origin}/#organization` },
      datePublished: study.datePublished,
      image: new URL(screenshots[0]?.src ?? "/branding/social/default-share.jpg", origin).href,
      about: ["Stock monitoring", "AI-supported order preparation", "Order and delivery tracking", "Human oversight of automation"]
        .map((name) => ({ "@type": "Thing", name })),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
        { "@type": "ListItem", position: 2, name: "Stock and order automation", item: url },
      ],
    },
  ],
};

export default function StockOrderCaseStudy() {
  return (
    <SiteShell>
      <article className={styles.articlePage}>
        <script id="case-study-structured-data" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Stock and order automation" }]} />
        <header className={styles.articleHeader}>
          <div>
            <div className={styles.articleMeta}><span>Working example</span><Link to="/about/mauricio">By {study.author.name}</Link></div>
            <h1>{study.headline}</h1>
          </div>
        </header>
        <aside className={home.summaryCard} aria-label="Case study summary">
          <dl>
            <dt><strong>Who it is for</strong></dt><dd>{study.summary.audience}</dd>
            <dt><strong>The challenge</strong></dt><dd>{study.summary.challenge}</dd>
            <dt><strong>The solution</strong></dt><dd>{study.summary.solution}</dd>
            <dt><strong>The result</strong></dt><dd>{study.summary.result}</dd>
          </dl>
        </aside>
        <div className={styles.articleBody}>
          {study.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {study.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          {screenshots.length > 0 && (
            <section aria-label="Application screenshots">
              <h2>The workflow in use</h2>
              {screenshots.map((screenshot) => (
                <figure key={screenshot.src}>
                  <img src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height}
                    loading="lazy" style={{ maxWidth: "100%", height: "auto" }} />
                  <figcaption>{screenshot.caption}</figcaption>
                </figure>
              ))}
            </section>
          )}
        </div>
        <footer className={styles.articleFooter}>
          <div><h2>Start with a critical workflow</h2><p>Work with us to understand your business needs and identify a focused starting point for automation.</p></div>
          <Link className={styles.projectCta} to={study.servicePath}>Explore workflow discovery →</Link>
        </footer>
      </article>
    </SiteShell>
  );
}
