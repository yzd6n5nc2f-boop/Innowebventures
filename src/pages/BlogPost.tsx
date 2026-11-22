import { articleEvidence, sourceEvidence } from "../content/articleEvidence";
import { getRenderTime } from "../content/renderTime";
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

  const review = articleEvidence[slug];
  const reviewLabel = new Date(review.reviewedAt + "T12:00:00Z").toLocaleDateString("en-GB", {day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});
  const publishedAt = new Date(post.published + " 00:00:00 GMT").toISOString();
  const origin = "https://www.innowebventures.com";
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"Article",headline:post.title,author:{"@type":"Organization","@id":origin+"/#organization",name:"InnoWeb Ventures",url:origin+"/"},publisher:{"@id":origin+"/#organization"},datePublished:publishedAt,dateModified:review.reviewedAt,image:origin+(post.image||"/branding/social/default-share.jpg"),mainEntityOfPage:origin+"/blog/"+slug,citation:review.sourceIds.map(id=>sourceEvidence[id].url)},
    {"@type":"FAQPage",mainEntity:review.faq.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))}
  ]};

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replaceAll("<","\\u003c")}} />
      <article className={styles.articlePage}>
        <Link className={styles.backLink} to="/blog">← Back to insights</Link>
        <header className={`${styles.articleHeader} ${post.image ? styles.articleHeaderWithImage : ""}`}>
          <div>
          <div className={styles.articleMeta}>
            <span>{post.category}</span>
            <span>{new Date(publishedAt).getTime() > getRenderTime() ? "Scheduled publication" : "Published"} {post.published}</span>
            <span data-article-byline="true">By <Link to="/about">InnoWeb Ventures</Link></span>
            <time data-article-updated="true" dateTime={review.reviewedAt}>Updated {reviewLabel}</time>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <p className={styles.reviewNote}>InnoWeb Ventures perspective · no client outcomes are claimed in this article.</p>
          </div>
          {post.image && <img className={styles.articleImage} src={post.image} alt={post.imageAlt ?? post.title} width={1024} height={1280} />}
        </header>

        <div className={styles.articleBody} data-article-content="true">
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

        <section className={styles.evidencePanel} aria-labelledby="article-faq-title" data-article-faq="true">
          <h2 id="article-faq-title">Frequently asked questions</h2>
          {review.faq.map(item=><div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
        </section>
        <section className={styles.evidencePanel} aria-labelledby="article-sources-title" data-article-sources="true">
          <h2 id="article-sources-title">Sources and supporting guidance</h2>
          <p>References checked {reviewLabel}. Guidance supports the relevant technical and governance points; it does not verify InnoWeb client results.</p>
          <ul>{review.sourceIds.map(id=>{const source=sourceEvidence[id];return <li key={id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a><span> — {source.supports}</span>{id==="ico"&&<p className={styles.reviewNote}>{source.note}</p>}</li>;})}</ul>
        </section>

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
