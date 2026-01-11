import { useEffect, useRef, useState } from "react";
import styles from "../styles/home.module.css";

const methodColumns = [
  {
    title: "Built with intent, not excess",
    items: [
      "Workflows before features.",
      "AI where it creates leverage.",
      "Cloud costs driven down.",
      "Humans in control.",
    ],
  },
  {
    title: "Intelligence, engineered",
    items: [
      "Event-driven AI.",
      "Batch processing over always-on.",
      "Clear cost ceilings by design.",
    ],
  },
  {
    title: "Globally connected, UK-led",
    locations: "London | Dublin | South Africa | APAC",
  },
];

const capabilities = [
  {
    title: "Neutral networks",
    description: "AI plus network intelligence that adapts without the noise.",
    highlight: true,
  },
  {
    title: "Automation",
    description: "Workflow-first systems that remove manual drag and error.",
  },
  {
    title: "Cloud-native delivery",
    description: "Cost-aware architecture designed to scale responsibly.",
  },
  {
    title: "Design-first experience",
    description: "Calm, usable interfaces that keep humans in control.",
  },
];

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

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.topNav}>
        <div className={styles.brand}>
          <div className={styles.logoMark} />
          <span>InnoWeb Ventures Ltd</span>
        </div>
        <button className={styles.menuButton} aria-label="Open navigation">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <section
          className={`${styles.hero} ${styles.sectionAnchor}`}
          style={{
            ["--hero-bg" as any]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-desktop.jpeg)`,
            ["--hero-bg-mobile" as any]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-mobile.jpeg)`,
          }}
        >
          <div className={styles.overlay} />
          <div className={styles.content}>
            <div className={styles.kicker}>High-tech engineering collect</div>
            <h1>
              Engineering digital systems for the next industrial era. <span>Secure. Scalable. Visionary.</span>
            </h1>
            <p className={styles.subtitle}>AI-assisted. Cost-aware. Human-centred.</p>
            <div className={styles.featureButtons}>
              <a className={styles.featureButton} href="#capabilities">
                Neutral networks
              </a>
              <a className={styles.featureButton} href="#capabilities">
                Automation
              </a>
              <a className={styles.featureButton} href="#capabilities">
                Cloud-native delivery
              </a>
              <a className={styles.featureButton} href="#capabilities">
                Design-first experience
              </a>
            </div>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">
                Explore the network
              </a>
              <a className={styles.secondaryButton} href="#method">
                How we build
              </a>
            </div>
          </div>
        </section>

        <section className={`${styles.capabilitiesSection} ${styles.sectionAnchor}`} id="capabilities">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionKicker}>Capabilities</div>
            <h2>Four focused ways we deliver calm, cost-aware engineering.</h2>
          </div>
          <div className={styles.capabilityGrid}>
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className={`${styles.capabilityCard} ${
                  capability.highlight ? styles.capabilityHighlight : ""
                }`}
              >
                <div className={styles.capabilityTitle}>{capability.title}</div>
                <p>{capability.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.methodSection} ${styles.sectionAnchor}`} id="method">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionKicker}>Method</div>
            <h2>Built with intent, not excess.</h2>
          </div>
          <div className={styles.methodGrid}>
            {methodColumns.map((column) => (
              <div key={column.title} className={styles.methodCard}>
                <div className={styles.methodTitle}>{column.title}</div>
                {column.items ? (
                  <ul>
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.locations}>{column.locations}</p>
                )}
              </div>
            ))}
          </div>
        </section>

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
      </main>

      <footer className={styles.footer}>
        <div>InnoWeb Ventures Ltd</div>
        <div>UK-registered</div>
        <div>© 2026</div>
      </footer>
    </div>
  );
}
