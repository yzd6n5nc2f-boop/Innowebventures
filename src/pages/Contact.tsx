import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

const CONTACT_EMAIL = "mauricio.jardim1@gmail.com";

export default function Contact() {
  const handleQuickFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const challenge = String(formData.get("challenge") ?? "").trim();

    const subject = `20-min Build Review Enquiry${company ? ` - ${company}` : ""}`;
    const body = [
      "New enquiry from the website quick form:",
      "",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Company: ${company || "-"}`,
      "",
      "Challenge:",
      challenge || "-",
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <SiteShell>
      <section className={styles.pageSection}>
        <div className={styles.pageIntro}>
          <div className={styles.sectionKicker}>Contact</div>
          <h1>Book a 20-min Build Review</h1>
          <p>Bring one workflow challenge. We will map a practical low-risk next step.</p>
        </div>

        <article className={styles.summaryCard}>
          <h2>Booking</h2>
          <p>Use this quick option to schedule the review directly with our team.</p>
          <a className={styles.primaryButton} href={`mailto:${CONTACT_EMAIL}?subject=20-min%20Build%20Review`}>
            Book now via email
          </a>
        </article>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>Quick form</h2>
            <form className={styles.formGrid} onSubmit={handleQuickFormSubmit}>
              <label className={styles.formField}>
                Name
                <input className={styles.formInput} type="text" name="name" autoComplete="name" required />
              </label>
              <label className={styles.formField}>
                Email
                <input className={styles.formInput} type="email" name="email" autoComplete="email" required />
              </label>
              <label className={styles.formField}>
                Company
                <input className={styles.formInput} type="text" name="company" autoComplete="organization" />
              </label>
              <label className={styles.formField}>
                What are you trying to improve?
                <textarea className={styles.formInput} name="challenge" rows={4} />
              </label>
              <button className={styles.secondaryButton} type="submit">
                Send enquiry
              </button>
            </form>
          </article>

          <article className={styles.infoCard}>
            <h2>What happens next</h2>
            <ul className={styles.cleanList}>
              <li>We confirm goals and current constraints.</li>
              <li>We suggest the most suitable entry service.</li>
              <li>We define timeline, guardrails, and first milestone.</li>
            </ul>
            <Link className={styles.inlineCta} to="/how-we-build">
              See how we build
            </Link>
          </article>
        </div>
      </section>

      <NextSteps
        steps={[
          {
            label: "Browse Products",
            to: "/products",
            description: "Review product options before the call.",
          },
          {
            label: "Review Services",
            to: "/services",
            description: "Select the service track you want to discuss.",
          },
          {
            label: "Read Case Studies",
            to: "/work",
            description: "See outcome examples relevant to your challenge.",
          },
        ]}
      />
    </SiteShell>
  );
}
