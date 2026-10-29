import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import study from "../content/stockOrderCaseStudy.json";
import styles from "../styles/home.module.css";

export default function Mauricio() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <header className={styles.pageIntro}><div className={styles.sectionKicker}>Case study author</div><h1>Mauricio</h1></header>
        <article className={styles.infoCard}>
          <h2>A practical view of workflow automation</h2>
          <p>Mauricio provides the account behind this stock and order automation case study. It describes an approach based on understanding the business, working closely with the people using the system and focusing on a critical workflow.</p>
          <p>His account emphasises continuing owner oversight, processes and guidance around automation, and ongoing involvement when issues arise. It also describes developing useful automation in a focused area before expanding into other workflows over time.</p>
          <p>The case study explains how that approach connects stock monitoring, AI-supported order preparation, order tracking and delivery updates. It focuses on the workflow and the role of the owner, without making numerical performance claims.</p>
          <Link className={styles.inlineCta} to={`/case-studies/${study.slug}`}>Read the stock and order automation case study →</Link>
        </article>
      </section>
    </SiteShell>
  );
}
