import SectionSymbol from "../components/SectionSymbol";
import accents from "../styles/coralAccent.module.css";
import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import { blogPosts } from "../content/blogPosts";
import { innowebCapabilityPosts } from "../content/innowebCapabilityPosts";
import { realWorldAutomationPosts } from "../content/realWorldAutomationPosts";
import { getPublishedPartnershipPosts } from "../content/novemberPartnershipPosts";
import styles from "../styles/blog.module.css";
import { getRenderTime } from "../content/renderTime";

const publishedTime = (published: string) => Date.parse(`${published} 00:00:00 GMT`);
const existingPosts = [...blogPosts, ...innowebCapabilityPosts, ...realWorldAutomationPosts];

export default function Blog() {
  const listedPosts = [...existingPosts.filter((post) => publishedTime(post.published) <= getRenderTime()), ...getPublishedPartnershipPosts()]
    .sort((a, b) => publishedTime(b.published) - publishedTime(a.published));
  const [featured, ...rest] = listedPosts;

  return (
    <SiteShell>
      <div className={`${styles.page} ${accents.accentPage}`} data-kind="insights">
        <section className={styles.intro} data-neural-intro="true">
          <SectionSymbol kind="insights" />
          <div className={styles.eyebrow} data-section-label="true">Ideas & Insights</div>
          <h1>Practical thinking on agentic AI, automation and intelligent workflows.</h1>
          <p>
            Notes from the InnoWeb Ventures team on building useful AI systems: workflow design, model choice, cost,
            governance, privacy and the lessons that come from putting automation into real-world use.
          </p>
        </section>

        {featured && (
          <Link className={`${styles.featured} ${accents.accentCard}`} to={`/blog/${featured.slug}`}>
            <div className={styles.featuredMeta}>
              <span>{featured.category}</span>
              <span>{featured.published}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <strong>Read article <span aria-hidden>→</span></strong>
          </Link>
        )}

        {rest.length > 0 && (
          <section className={styles.grid} aria-label="More articles">
            {rest.map((post) => (
              <Link key={post.slug} className={`${styles.card} ${accents.accentCard}`} to={`/blog/${post.slug}`}>
                <div className={styles.cardMeta}>
                  <span>{post.category}</span>
                  <span>{post.published}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <strong>Read article <span aria-hidden>→</span></strong>
              </Link>
            ))}
          </section>
        )}

        <section className={styles.closing}>
          <div>
            <div className={styles.eyebrow} data-section-label="true">Built from practice</div>
            <h2>Useful ideas, grounded in real systems.</h2>
          </div>
          <p>
            The aim of this blog is not to repeat AI headlines. It is to share practical observations from designing,
            building and operating intelligent workflows for real organisations.
          </p>
          <Link to="/contact" className={styles.projectCta}>Discuss a workflow →</Link>
        </section>
      </div>
    </SiteShell>
  );
}
