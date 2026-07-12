import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "../styles/home.module.css";
import "../styles/cohesion.css";

type SiteShellProps = {
  children: ReactNode;
};

const primaryNav = [
  { label: "Forge Suite", to: "/forge-suite" },
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
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
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
      <header className={`${styles.topNav} siteHeader`}>
        <Link className={styles.brand} to="/" aria-label="InnoWeb Ventures home">
          <img
            className={styles.brandLogo}
            src={`${import.meta.env.BASE_URL}branding/logo/innoweb-logo.png`}
            alt="InnoWeb Ventures logo"
          />
          <span className={styles.brandText}>InnoWeb Ventures</span>
        </Link>

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

        <div className={styles.headerActions} ref={menuRef}>
          <Link className={`${styles.headerCta} startProjectCta`} to="/contact">
            Start a Project
          </Link>

          <button
            className={`${styles.menuButton} mobileMenuButton`}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          {isMenuOpen && (
            <div className={`${styles.dropdown} mobileNavPanel`} id="site-menu" role="menu">
              {primaryNav.map((link) => (
                <Link key={link.label} className={styles.dropdownItem} role="menuitem" to={link.to}>
                  {link.label}
                </Link>
              ))}
              <Link className={`${styles.dropdownItem} ${styles.mobileCta}`} role="menuitem" to="/contact">
                Start a Project
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className={styles.mainContent}>{children}</main>

      <footer className={`${styles.footer} siteFooter`}>
        <div>
          <strong>InnoWeb Ventures Limited</strong>
          <span>AI engineering infrastructure for human-controlled operations.</span>
        </div>
        <nav aria-label="Footer">
          {primaryNav.map((link) => (
            <Link key={link.label} to={link.to}>{link.label}</Link>
          ))}
          <Link to="/contact">Start a Project</Link>
        </nav>
      </footer>
    </div>
  );
}
