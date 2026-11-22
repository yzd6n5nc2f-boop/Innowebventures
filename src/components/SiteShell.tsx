import NeuralLattice from "./NeuralLattice";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE_URL } from "../content/runtimeConfig";
import styles from "../styles/home.module.css";
import backdropStyles from "../styles/siteBackdrop.module.css";
import shellStyles from "../styles/shellPolish.module.css";

type SiteShellProps = {
  children: ReactNode;
};

const primaryNav = [
  { label: "Sectors", to: "/sectors" },
  { label: "Free Assessments", to: "/ai-readiness-assessment" },
  { label: "Applications", to: "/work" },
  { label: "How We Build", to: "/delivery-method" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

export default function SiteShell({ children }: SiteShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const backdrop = location.pathname === "/work" ? "robotics" :
    ["/delivery-method", "/ai-readiness-assessment", "/workflow-assessment", "/contact", "/about"].includes(location.pathname) ||
    location.pathname.startsWith("/sectors") || location.pathname.startsWith("/case-studies") ? "workflow" : "code";
  const neuralPage = ["/", "/about", "/work", "/delivery-method", "/blog", "/sectors", "/services", "/forge-suite", "/solutions", "/platform", "/contact", "/ai-readiness-assessment", "/workflow-assessment"].includes(location.pathname) || location.pathname.startsWith("/services/") || location.pathname.startsWith("/sectors/");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    if (!isMenuOpen) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const brandContent = (
    <>
      <img
        className={styles.brandLogo}
        src={`${import.meta.env.BASE_URL}branding/logo/innoweb-logo.png`}
        alt="InnoWeb Ventures logo"
        loading="eager"
      />
      <span className={styles.brandText}>InnoWeb Ventures</span>
    </>
  );

  return (
    <div className={styles.page}>
      <header className={`${styles.topNav} ${shellStyles.topNav}`}>
        {SITE_URL ? (
          <a className={styles.brand} href={SITE_URL}>
            {brandContent}
          </a>
        ) : (
          <Link className={styles.brand} to="/">
            {brandContent}
          </Link>
        )}

        <nav className={styles.navLinks} aria-label="Primary">
          {primaryNav.map((link) => (
            <NavLink
              key={link.label}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Link className={`${styles.headerCta} ${shellStyles.headerCta}`} to="/contact">
            Start a Project
          </Link>

          <div className={styles.menuWrapper} ref={menuRef}>
            <button
              className={`${styles.menuButton} ${shellStyles.menuButton} ${isMenuOpen ? shellStyles.menuButtonOpen : ""}`}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={shellStyles.mobileOverlay} id="site-menu" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className={shellStyles.mobileMenu}>
            <div className={shellStyles.mobileEyebrow}>InnoWeb Ventures</div>
            <p className={shellStyles.mobileIntro}>AI engineering systems for real-world workflows, with people in control.</p>
            <nav className={shellStyles.mobileNav} aria-label="Mobile primary">
              {primaryNav.map((link, index) => (
                <Link key={link.label} className={shellStyles.mobileNavItem} to={link.to}>
                  <span>0{index + 1}</span>
                  {link.label}
                  <strong aria-hidden>→</strong>
                </Link>
              ))}
            </nav>
            <Link className={shellStyles.mobileProjectCta} to="/contact">
              Start a Project <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}

      <main className={`${styles.mainContent} ${backdropStyles.main}`} data-site-main="true" data-heading-style="assessment" data-backdrop={backdrop} style={{ position: "relative" }} data-neural-page={neuralPage ? "true" : undefined}>
        {neuralPage && <NeuralLattice />}
        {children}
      </main>

      <footer className={`${styles.footer} ${shellStyles.footer}`}>
        <div>InnoWeb Ventures Limited</div>
        <div>Logic-led systems. AI-assisted delivery. Human-controlled operation.</div>
        <a className={styles.inlineCta} href="/privacy-policy">Privacy policy</a>
      </footer>
    </div>
  );
}
