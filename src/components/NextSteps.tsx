import { Link } from "react-router-dom";
import type { NextStep } from "../content/siteContent";
import styles from "../styles/home.module.css";

type NextStepsProps = {
  title?: string;
  steps: NextStep[];
};

export default function NextSteps({ title = "Next step", steps }: NextStepsProps) {
  return (
    <section className={styles.nextSteps} aria-label={title}>
      <div className={styles.sectionHeaderCompact}>
        <h2>{title}</h2>
      </div>
      <div className={styles.nextStepGrid}>
        {steps.map((step) => (
          <Link key={step.label} className={styles.nextStepCard} to={step.to}>
            <div className={styles.nextStepTitle}>{step.label}</div>
            <p>{step.description}</p>
            <span className={styles.inlineCta}>Continue</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
