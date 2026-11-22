import NeuralLattice from "./NeuralLattice";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "../styles/home.module.css";
import backdropStyles from "../styles/siteBackdrop.module.css";
import shellStyles from "../styles/shellPolish.module.css";

type SiteShellProps = {
  children: ReactNode;
};

const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "How We Work", to: "/delivery-method" },
  { label: "Insights", to: "/blog" },
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
        <Link className={styles.brand} to="/" aria-label="InnoWeb Ventures home">
          {brandContent}
        </Link>

        <nav className={styles.navLinks} aria-label="Primary">
          {primaryNav.map((link) => (
            <NavLink
              key={link.label}
              className={({ isActive }) => `${styles.navLink} ${isActive || (link.to === "/services" && location.pathname.startsWith("/sectors")) || (link.to === "/work" && (location.pathname.startsWith("/case-studies/") || ["/forge-suite", "/solutions"].includes(location.pathname))) ? styles.navLinkActive : ""}`}
              end={link.to === "/"}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Link className={`${styles.headerCta} ${shellStyles.headerCta}`} to="/workflow-assessment">
            Free Workflow Assessment
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
            <p className={shellStyles.mobileIntro}>Intelligent workflows for your business, with people in control.</p>
            <nav className={shellStyles.mobileNav} aria-label="Mobile primary">
              {primaryNav.map((link, index) => (
                <Link key={link.label} className={shellStyles.mobileNavItem} to={link.to}>
                  <span>0{index + 1}</span>
                  {link.label}
                  <strong aria-hidden>→</strong>
                </Link>
              ))}
            </nav>
            <Link className={shellStyles.mobileProjectCta} to="/workflow-assessment">
              Free Workflow Assessment <span aria-hidden>→</span>
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
        <nav className={shellStyles.footerLinks} aria-label="Footer">
          <Link to="/services">Services</Link>
          <Link to="/sectors">Sectors</Link>
          <Link to="/ai-readiness-assessment">AI readiness assessment</Link>
          <Link to="/contact">Start a project</Link>
          <a href="/privacy-policy">Privacy policy</a>
        </nav>
      </footer>
    </div>
  );
}
