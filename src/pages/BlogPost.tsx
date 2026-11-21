import RelatedArticles, { ContextualText } from "../components/RelatedArticles";
import { articleLinks } from "../content/internalLinks";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import SiteShell from "../components/SiteShell";
import { getBlogPost } from "../content/blogPosts";
import { getInnowebCapabilityPost } from "../content/innowebCapabilityPosts";
import { getRealWorldAutomationPost } from "../content/realWorldAutomationPosts";
import { getNovemberPartnershipPost } from "../content/novemberPartnershipPosts";
import styles from "../styles/blog.module.css";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug) ?? getInnowebCapabilityPost(slug) ?? getRealWorldAutomationPost(slug) ?? getNovemberPartnershipPost(slug);

  const links = articleLinks[slug];

  if (!post) {
    return <NotFound />;
  }

  return (
    <SiteShell>
      <article className={styles.articlePage}>
        <Link className={styles.backLink} to="/blog">← Back to insights</Link>
        <header className={`${styles.articleHeader} ${post.image ? styles.articleHeaderWithImage : ""}`}>
          <div>
          <div className={styles.articleMeta}>
            <span>{post.category}</span>
            <span>{post.published}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          </div>
          {post.image && <img className={styles.articleImage} src={post.image} alt={post.imageAlt ?? post.title} width={1024} height={1280} />}
        </header>

        <div className={styles.articleBody}>
          {post.sections.map((section, index) => (
            <section key={`${post.slug}-${index}`}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraph}><ContextualText text={paragraph} links={links?.body.filter(link => link.section === (section.heading || "Introduction") && link.paragraph === paragraphIndex) ?? []} /></p>
              ))}
              {links?.extra.filter(link => link.section === (section.heading || "Introduction")).map(link => <p key={link.text}><ContextualText text={link.text} links={[link]} /></p>)}
            </section>
          ))}
        </div>

        <RelatedArticles articles={links?.related ?? []} source={`/blog/${slug}`} title="Related" />

        <footer className={styles.articleFooter}>
          <div>
            <div className={styles.eyebrow}>InnoWeb Ventures</div>
            <h2>Turn one valuable workflow into a better system.</h2>
            <p>We design tailored agentic AI systems around the task, the users and the controls that matter.</p>
          </div>
          <Link to="/workflow-assessment" className={styles.projectCta}>Assess your workflow →</Link>
        </footer>
      </article>
    </SiteShell>
  );
}
