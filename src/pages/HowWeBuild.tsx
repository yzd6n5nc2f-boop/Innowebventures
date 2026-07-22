import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { deliveryPhases, howWeBuildPillars, platformLayers } from "../content/siteContent";
import styles from "../styles/home.module.css";

const developmentStack = [
  {
    title: "Agentic workflow orchestration",
    summary:
      "We design agentic workflows around a defined operational task, connecting tools, data sources, approvals and human checkpoints. Each workflow has a clear objective, controlled permissions and an observable execution path.",
  },
  {
    title: "Intelligent planning",
    summary:
      "Planning layers break complex requests into smaller steps, select the appropriate tools and models, and revise the route when evidence changes. This improves reliability while keeping the process understandable and reviewable.",
  },
  {
    title: "Purpose-fit language models",
    summary:
      "We select LLMs for the work they need to perform. Reasoning quality, latency, data sensitivity, context size and price are considered together, so a workflow can use different models for planning, extraction, generation and verification.",
  },
  {
    title: "Task-level cost monitoring",
    summary:
      "Token usage and model spend are measured for each task and each workflow stage. This allows output quality, completion rate and business value to be assessed against cost rather than treating AI usage as an unmeasured overhead.",
  },
  {
    title: "Output and cost optimisation",
    summary:
      "We compare the result achieved with the cost of producing it, then refine prompts, routing, context and model choice. Expensive models are reserved for the steps where their additional capability creates measurable value.",
  },
  {
    title: "Human-controlled operation",
    summary:
      "Approval points, escalation rules and audit trails are built into the workflow. People remain responsible for important decisions while agents handle repeatable research, preparation, transformation and coordination work.",
  },
];

export default function HowWeBuild() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Development Stack</div>
          <h1>Agentic systems built for useful output, controlled operation and measurable cost.</h1>
          <p>
            The Forge development stack connects workflow design, intelligent planning, language models, software tools and
            governance. Each solution is designed around the real task, with model performance and token spend monitored as
            part of normal operation.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {developmentStack.map((item) => (
            <article key={item.title} className={styles.infoCard}>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>

        <article className={styles.summaryCard}>
          <h2>Cost is designed into the workflow</h2>
          <p>
            Every agentic workflow should make its cost visible. We monitor token consumption, model calls and completion
            outcomes at task level, then compare the value and quality of the output with the amount spent producing it. This
            supports better model routing, prevents unnecessary use of high-cost models and helps organisations forecast the
            operational cost of scaling.
          </p>
        </article>

        <div className={styles.cardGrid}>
          {platformLayers.map((layer) => (
            <article key={layer.title} className={styles.infoCard}>
              <h2>{layer.title}</h2>
              <p>{layer.summary}</p>
            </article>
          ))}
        </div>

        <div className={styles.cardGrid}>
          {howWeBuildPillars.map((pillar) => (
            <article key={pillar.title} className={styles.infoCard}>
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>

        <article className={styles.summaryCard}>
          <h2>Controlled adoption sequence</h2>
          <p>
            Organisations adopt the platform in a measured sequence: align the workflow, select the right planning and model
            layers, define cost and quality measures, bring governance into the runtime, and improve the system using observed
            operational results.
          </p>
          <div className={styles.phaseRow}>
            {deliveryPhases.map((phase) => (
              <span key={phase} className={styles.phaseChip}>
                {phase}
              </span>
            ))}
          </div>
        </article>
      </section>

      <NextSteps
        steps={[
          {
            label: "See Example Systems",
            to: "/work",
            description: "Review working applications built around focused operational workflows.",
          },
          {
            label: "Explore Forge Suite",
            to: "/forge-suite",
            description: "See the connected capabilities that support intelligence, build, operations and deployment.",
          },
          {
            label: "Book a Workflow Review",
            to: "/contact",
            description: "Discuss a workflow, its current cost and where agentic automation could add measurable value.",
          },
        ]}
      />
    </SiteShell>
  );
}
