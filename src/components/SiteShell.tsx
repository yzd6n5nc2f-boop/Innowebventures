import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuLinks } from "../content/siteContent";
import styles from "../styles/home.module.css";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const heroStyles = {
    ["--hero-bg" as any]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-desktop.jpeg)`,
    ["--hero-bg-mobile" as any]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-mobile.jpeg)`,
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const isLanding = location.pathname === "/";
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
    <div className={`${styles.page} ${isLanding ? styles.landingPage : ""}`} style={heroStyles}>
      <header className={styles.topNav}>
        <Link className={styles.brand} to="/">
          {!logoFailed ? (
            <img
              className={styles.brandLogo}
              src={`${import.meta.env.BASE_URL}branding/logo/innoweb-logo.png`}
              alt="InnoWeb Ventures logo"
              loading="eager"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div className={styles.logoMark} aria-hidden="true" />
          )}
          <span>InnoWeb Ventures Ltd</span>
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
              {menuLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    className={styles.dropdownItem}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                    <span aria-hidden>↗</span>
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    className={styles.dropdownItem}
                    to={link.to ?? "/"}
                    role="menuitem"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </header>

      <main className={`${styles.mainContent} ${isLanding ? styles.landingMain : ""}`}>{children}</main>

      <footer className={styles.footer}>
        <div>InnoWeb Ventures Limited</div>
      </footer>
    </div>
  );
}
