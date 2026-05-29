import type { CSSProperties } from "react";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { deliveryPhases, howWeBuildPillars, platformLayers } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function Platform() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Platform</div>
          <h1>A platform architecture designed for real-world AI adoption.</h1>
          <p>
            InnoWeb Ventures is building infrastructure for industry to adopt AI with control. The platform approach
            is grounded in three connected layers: system build, operational governance, and specialized intelligence.
          </p>
        </div>

        <div className={styles.architectureGrid}>
          {platformLayers.map((layer) => (
            <article
              key={layer.title}
              className={styles.architectureCard}
              style={
                {
                  ["--product-accent" as const]: layer.accent,
                  ["--product-accent-soft" as const]: layer.accentSoft,
                  ["--product-secondary" as const]: layer.accent,
                } as CSSProperties
              }
            >
              <div className={styles.sectionKicker}>{layer.title}</div>
              <h2>{layer.summary}</h2>
              <p>{layer.detail}</p>
            </article>
          ))}
        </div>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>Human-controlled automation</h2>
            <p>
              The platform is not designed for uncontrolled automation. Human review, approval logic, override paths,
              and runtime visibility are treated as core infrastructure requirements, not optional extras.
            </p>
          </article>

          <article className={styles.infoCard}>
            <h2>Operational deployment model</h2>
            <p>
              Deployment is staged and measurable. Systems move from architecture and setup into live operation with
              clear checkpoints around cost, governance, and runtime accountability.
            </p>
          </article>
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
          <h2>Infrastructure for industry adoption</h2>
          <p>
            Organisations do not move into the next AI generation through isolated tools alone. They need a stack
            that supports build velocity, governance discipline, and specialized intelligence together.
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
            label: "Explore the Forge Suite",
            to: "/forge-suite",
            description: "Review the proprietary stack behind the solutions we engineer.",
          },
          {
            label: "Learn How It Works",
            to: "/how-it-works",
            description: "See how we assess, shape, and deploy around the client workflow.",
          },
          {
            label: "Request a Free Assessment",
            to: "/contact",
            description: "Talk through your operation and get an initial view of where we could add value.",
          },
        ]}
      />
    </SiteShell>
  );
}
