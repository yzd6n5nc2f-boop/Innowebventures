import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import { deliveryPhases, howWeBuildPillars, platformLayers } from "../content/siteContent";
import styles from "../styles/home.module.css";

export default function HowWeBuild() {
  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>How It Works</div>
          <h1>How the Forge Suite works in controlled operational deployment.</h1>
          <p>
            The platform is designed to connect build, governance, and intelligence without losing runtime control.
            Adoption stays measurable, staged, and anchored in real workflows.
          </p>
        </div>

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
            Organisations adopt the platform in a measured sequence: align the workflow, deploy the right platform
            layer, bring governance into the runtime, and refine intelligence where specialist capability is needed.
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
            description: "Review the internal stack we use to shape intelligence, build systems, and run operations.",
          },
          {
            label: "See the Platform",
            to: "/platform",
            description: "Understand how we translate that stack into tailored operational deployment.",
          },
          {
            label: "Request a Free Assessment",
            to: "/contact",
            description: "Discuss your current workflows and where we could improve flow, systems, and control.",
          },
        ]}
      />
    </SiteShell>
  );
}
