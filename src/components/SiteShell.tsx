import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { headerNav } from "../content/siteContent";
import { SITE_URL } from "../content/runtimeConfig";
import styles from "../styles/home.module.css";

type SiteShellProps = {
  children: ReactNode;
};

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
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <div className={styles.page} style={heroStyles}>
      <header className={styles.topNav}>
        {SITE_URL ? (
          <a className={styles.brand} href={SITE_URL}>
            <img
              className={styles.brandLogo}
              src={`${import.meta.env.BASE_URL}branding/logo/innoweb-logo.png`}
              alt="InnoWeb Ventures logo"
              loading="eager"
            />
            <span className={styles.brandText}>InnoWeb Ventures</span>
          </a>
        ) : (
          <Link className={styles.brand} to="/">
            <img
              className={styles.brandLogo}
              src={`${import.meta.env.BASE_URL}branding/logo/innoweb-logo.png`}
              alt="InnoWeb Ventures logo"
              loading="eager"
            />
            <span className={styles.brandText}>InnoWeb Ventures</span>
          </Link>
        )}

        <nav className={styles.navLinks} aria-label="Primary">
          {headerNav.map((link) => (
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
          <Link className={styles.headerCta} to="/contact">
            Book a Workflow Review
          </Link>

          <div className={styles.menuWrapper} ref={menuRef}>
            <button
              className={styles.menuButton}
              aria-label="Open navigation"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>

            {isMenuOpen && (
              <div className={styles.dropdown} id="site-menu" role="menu">
                <Link className={`${styles.dropdownItem} ${styles.mobileCta}`} role="menuitem" to="/contact">
                  Book a Workflow Review
                </Link>
                {headerNav.map((link) => (
                  <Link key={link.label} className={styles.dropdownItem} role="menuitem" to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>{children}</main>

      <footer className={styles.footer}>
        <div>InnoWeb Ventures Limited</div>
        <div>AI infrastructure for human-controlled operations.</div>
      </footer>
    </div>
  );
}
