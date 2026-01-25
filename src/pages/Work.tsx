import { useEffect, useRef, useState } from "react";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

const liveWorkItems = [
  {
    title: "TAD",
    subtitle: "Trading clarity without noise",
    badge: "LIVE",
    badgeTone: "live",
    url: "https://lively-bush-0409b5010.1.azurestaticapps.net",
    previewTitle: "TAD live preview",
  },
  {
    title: "Concordia",
    subtitle: "Contract intelligence for infrastructure",
    badge: "LIVE",
    badgeTone: "live",
    url: "https://white-mushroom-039e8e310.6.azurestaticapps.net",
    previewTitle: "Concordia live preview",
  },
  {
    title: "Luxpulse-AI",
    subtitle: "AI-powered product experience",
    badge: "LIVE",
    badgeTone: "live",
    url: "https://orange-bush-0d6e2d310.1.azurestaticapps.net",
    previewTitle: "Luxpulse-AI live preview",
  },
];

type LiveWorkItem = (typeof liveWorkItems)[number];

function LiveWorkCard({ item }: { item: LiveWorkItem }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [iframeStatus, setIframeStatus] = useState<"idle" | "loading" | "loaded" | "failed">("idle");

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldRender && iframeStatus === "idle") {
      setIframeStatus("loading");
    }
  }, [iframeStatus, shouldRender]);

  useEffect(() => {
    if (!shouldRender || iframeStatus !== "loading") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIframeStatus((current) => (current === "loaded" ? current : "failed"));
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [iframeStatus, shouldRender]);

  const showIframe = shouldRender && iframeStatus !== "failed";
  const showFallback = iframeStatus !== "loaded";
  const fallbackLabel =
    iframeStatus === "failed" ? "Preview unavailable — Open live app ↗" : "Loading live preview…";

  return (
    <a
      ref={cardRef}
      className={`${styles.workCard} ${styles.workCardLink}`}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.externalIndicator} aria-hidden>
        ↗
      </span>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </div>
        <span className={`${styles.statusBadge} ${styles.badgeLive}`}>{item.badge}</span>
      </div>
      <div className={styles.previewWindow} aria-label={`${item.title} preview`}>
        {showIframe && (
          <iframe
            className={styles.previewIframe}
            src={item.url}
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            loading="lazy"
            referrerPolicy="no-referrer"
            title={item.previewTitle}
            onLoad={() => setIframeStatus("loaded")}
            onError={() => setIframeStatus("failed")}
          />
        )}
        {showFallback && (
          <div className={styles.previewFallback}>
            <span>{fallbackLabel}</span>
          </div>
        )}
        <div className={styles.previewGradient} aria-hidden />
        <span className={styles.previewCta}>Open live app ↗</span>
        <span className={styles.previewClickShield} aria-hidden />
      </div>
      <p className={styles.deliveredWith}>
        Delivered with: <span>Pace • Rigor • Measurable</span>
      </p>
    </a>
  );
}

const secondaryWorkItems = [
  {
    title: "Workflow Engine",
    subtitle: "Designing operations before they break",
    badge: "PROTOTYPE",
    badgeTone: "concept",
  },
  {
    title: "Compliance Lens",
    subtitle: "Seeing risk before it’s cost",
    badge: "CONCEPT",
    badgeTone: "concept",
  },
];

export default function Work() {
  return (
    <SiteShell>
      <section className={`${styles.workSection} ${styles.sectionAnchor}`} id="work">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>Our Work in Action</div>
          <h2>Programmes delivered with pace, rigor and measurable value.</h2>
        </div>
        <div className={styles.workGrid}>
          {liveWorkItems.map((item) => (
            <LiveWorkCard key={item.title} item={item} />
          ))}
        </div>
        <div className={styles.secondaryWorkGrid}>
          {secondaryWorkItems.map((item) => (
            <article key={item.title} className={`${styles.workCard} ${styles.secondaryCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleGroup}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                {item.badge && (
                  <span className={`${styles.statusBadge} ${styles.badgeConcept}`}>{item.badge}</span>
                )}
              </div>
              <div className={styles.cardThumbnail} aria-hidden />
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
