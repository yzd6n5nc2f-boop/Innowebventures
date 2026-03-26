import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import NextSteps from "../components/NextSteps";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

const CONTACT_ENDPOINT = "/api/contact";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleQuickFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const challenge = String(formData.get("challenge") ?? "").trim();
    const subject = `20-min Build Review Enquiry${company ? ` - ${company}` : ""}`;
    const pageUrl = window.location.href;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          challenge,
          subject,
          pageUrl,
        }),
      });

      const responsePayload: { success?: boolean | string; message?: string; error?: string } | null = await response
        .json()
        .catch(() => null);

      const failedByStatus = !response.ok;
      const failedByPayload =
        responsePayload?.success === false || String(responsePayload?.success ?? "").toLowerCase() === "false";

      if (failedByStatus || failedByPayload) {
        const providerMessage = responsePayload?.error?.trim() || responsePayload?.message?.trim();
        throw new Error(providerMessage || `Failed to submit enquiry: ${response.status}`);
      }

      form.reset();
      setStatusMessage({
        type: "success",
        text: responsePayload?.message?.trim() || "Thanks. Your enquiry was sent successfully and we will reply soon.",
      });
    } catch (error) {
      const providerMessage = error instanceof Error ? error.message : "";
      setStatusMessage({
        type: "error",
        text: providerMessage
          ? `We could not send your enquiry right now: ${providerMessage}`
          : "We could not send your enquiry right now. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <p>Use the quick form below to send your enquiry through our secure server-side contact endpoint and save it in our linked Azure storage account.</p>
          <a className={styles.primaryButton} href="#quick-form">
            Start quick form
          </a>
        </article>

        <div className={styles.detailGrid}>
          <article className={styles.infoCard}>
            <h2>Quick form</h2>
            <p>
              Submissions are delivered to our team securely and logged to Azure Table Storage for traceability.
            </p>
            <form className={styles.formGrid} id="quick-form" onSubmit={handleQuickFormSubmit}>
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
                <textarea className={styles.formInput} name="challenge" rows={4} required />
              </label>
              <div className={styles.formActions}>
                <button className={styles.secondaryButton} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send enquiry"}
                </button>
                {statusMessage ? (
                  <p
                    className={`${styles.formStatus} ${
                      statusMessage.type === "success" ? styles.formStatusSuccess : styles.formStatusError
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {statusMessage.text}
                  </p>
                ) : null}
              </div>
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
