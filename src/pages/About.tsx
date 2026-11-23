import SectionSymbol from "../components/SectionSymbol";
import accents from "../styles/coralAccent.module.css";
import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

export default function About() {
  return (
    <SiteShell>
      <section className={`${styles.pageSection} ${accents.accentPage}`} data-kind="about">
        <div className={styles.pageIntro} data-neural-intro="true">
          <SectionSymbol kind="about" />
          <div className={styles.sectionKicker} data-section-label="true">About InnoWeb Ventures</div>
          <h1>Practical AI, built around your business.</h1>
          <p>InnoWeb Ventures designs agentic AI workflows with human oversight for businesses across the United Kingdom. We help owners and managers explore how tailored software and automation could improve repetitive work, connect information and support better decisions.</p>
        </div>
        <div className={styles.detailGrid}>
          <article className={`${styles.infoCard} ${accents.accentCard}`} data-kind="method">
            <h2>Start with the work</h2>
            <p>Every business has its own systems, responsibilities and exceptions. Our approach begins by understanding how a task happens today: who does it, which information they need, where work passes between people and what requires a decision.</p>
            <p>That understanding shapes the scope of a focused pilot. We agree responsibilities and measures of success before development, so there is a clear basis for reviewing whether the proposed improvement is useful.</p>
            <Link className={styles.inlineCta} to="/delivery-method">See how we work →</Link>
          </article>
          <article className={`${styles.infoCard} ${accents.accentCard}`} data-kind="services">
            <h2>Software that fits your operation</h2>
            <p>We develop tailored software and automation around those needs, combining business rules, specialist AI agents and clear interfaces. Services include workflow discovery, focused pilot development, system integration, private and local LLM deployment, small language model training, and ongoing optimisation and governance support.</p>
            <p>The appropriate approach depends on the task. Local, cloud or hybrid processing is selected around privacy requirements, capability, performance and operating costs.</p>
            <Link className={styles.inlineCta} to="/services">Explore our services →</Link>
          </article>
          <article className={`${styles.infoCard} ${accents.accentCard}`} data-kind="about">
            <h2>People stay responsible</h2>
            <p>Automation needs clear limits. Important actions remain subject to agreed human controls, with visibility over progress and exceptions. We consider who can approve an action, what the system may access and when it must refer a decision to a person.</p>
            <p>Privacy, security and cost are part of the design conversation from the beginning. A local model or an automated step alone does not establish that a whole workflow is secure, compliant or effective; those requirements need to be assessed for the actual use.</p>
          </article>
          <article className={`${styles.infoCard} ${accents.accentCard}`} data-kind="work">
            <h2>The Forge Suite</h2>
            <p>The Forge Suite is our proprietary software framework for building tailored workflows, connecting business systems and keeping people in control. It supports our approach to creating software around a defined operational need.</p>
            <p>Our work pages distinguish application examples from projects still in development. We publish client names, quotations and screenshots only with permission, and report project results only when evidence is available.</p>
            <Link className={styles.inlineCta} to="/work">Explore our work →</Link>
          </article>
        </div>
      </section>
      <NextSteps steps={[
        { label: "Free Workflow Assessment", to: "/workflow-assessment", description: "Tell us about one recurring task so we can understand the workflow and identify possible improvements." },
        { label: "Explore Our Services", to: "/services", description: "Find the support that fits your workflow, systems and stage of development." },
        { label: "Start a Conversation", to: "/contact", description: "Discuss your business needs, privacy requirements and questions with us." },
      ]} />
    </SiteShell>
  );
}
