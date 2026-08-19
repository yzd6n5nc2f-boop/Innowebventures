import { Link, Navigate, useParams } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import { getBlogPost } from "../content/blogPosts";
import { getInnowebCapabilityPost } from "../content/innowebCapabilityPosts";
import styles from "../styles/blog.module.css";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug) ?? getInnowebCapabilityPost(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <SiteShell>
      <article className={styles.articlePage}>
        <Link className={styles.backLink} to="/blog">← Back to insights</Link>
        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <span>{post.category}</span>
            <span>{post.published}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>

        <div className={styles.articleBody}>
          {post.sections.map((section, index) => (
            <section key={`${post.slug}-${index}`}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <footer className={styles.articleFooter}>
          <div>
            <div className={styles.eyebrow}>InnoWeb Ventures</div>
            <h2>Turn one valuable workflow into a better system.</h2>
            <p>We design tailored agentic AI systems around the task, the users and the controls that matter.</p>
          </div>
          <Link to="/contact" className={styles.projectCta}>Start a conversation →</Link>
        </footer>
      </article>
    </SiteShell>
  );
}
