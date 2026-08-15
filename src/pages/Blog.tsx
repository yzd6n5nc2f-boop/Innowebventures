import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import { blogPosts } from "../content/blogPosts";
import styles from "../styles/blog.module.css";

export default function Blog() {
  const visiblePosts = blogPosts.filter((post) => post.featured);
  const [featured, ...rest] = visiblePosts;

  return (
    <SiteShell>
      <div className={styles.page}>
        <section className={styles.intro}>
          <div className={styles.eyebrow}>Ideas & Insights</div>
          <h1>Practical thinking on agentic AI, automation and intelligent workflows.</h1>
          <p>
            Notes from the InnoWeb Ventures team on building useful AI systems: workflow design, model choice, cost,
            governance, privacy and the lessons that come from putting automation into real-world use.
          </p>
        </section>

        {featured && (
          <Link className={styles.featured} to={`/blog/${featured.slug}`}>
            <div className={styles.featuredMeta}>
              <span>{featured.category}</span>
              <span>{featured.published}</span>
              <span>{featured.readTime}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <strong>Read article <span aria-hidden>→</span></strong>
          </Link>
        )}

        {rest.length > 0 && (
          <section className={styles.grid} aria-label="More articles">
            {rest.map((post) => (
              <Link key={post.slug} className={styles.card} to={`/blog/${post.slug}`}>
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
            <div className={styles.eyebrow}>Built from practice</div>
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
