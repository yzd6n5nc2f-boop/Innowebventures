import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE_URL } from "../content/runtimeConfig";
import styles from "../styles/home.module.css";
import shellStyles from "../styles/shellPolish.module.css";

type SiteShellProps = {
  children: ReactNode;
};

const primaryNav = [
  { label: "Applications", to: "/work" },
  { label: "How We Build", to: "/delivery-method" },
  { label: "About", to: "/about" },
];

export default function SiteShell({ children }: SiteShellProps) {
  const heroStyles = {
    ["--hero-bg" as const]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-desktop.jpeg)`,
    ["--hero-bg-mobile" as const]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-mobile.jpeg)`,
  } as CSSProperties;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

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
    <div className={styles.page} style={heroStyles}>
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

      <main className={styles.mainContent}>{children}</main>

      <footer className={`${styles.footer} ${shellStyles.footer}`}>
        <div>InnoWeb Ventures Limited</div>
        <div>Logic-led systems. AI-assisted delivery. Human-controlled operation.</div>
      </footer>
    </div>
  );
}
