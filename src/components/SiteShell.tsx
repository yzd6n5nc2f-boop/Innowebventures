import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../styles/home.module.css";

type SiteShellProps = {
  children: ReactNode;
  heroBackground?: boolean;
};

export default function SiteShell({ children, heroBackground = false }: SiteShellProps) {
  const heroStyles = heroBackground
    ? {
        ["--hero-bg" as any]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-desktop.jpeg)`,
        ["--hero-bg-mobile" as any]: `url(${import.meta.env.BASE_URL}branding/innoweb-hero-bg-mobile.jpeg)`,
      }
    : undefined;

  return (
    <div className={styles.page} style={heroStyles}>
      <header className={styles.topNav}>
        <Link className={styles.brand} to="/">
          <div className={styles.logoMark} />
          <span>InnoWeb Ventures Ltd</span>
        </Link>
        <nav className={styles.navLinks} aria-label="Primary">
          <NavLink
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
            to="/capabilities"
          >
            Capabilities
          </NavLink>
          <NavLink
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
            to="/work"
          >
            Work
          </NavLink>
        </nav>
        <button className={styles.menuButton} aria-label="Open navigation">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className={heroBackground ? undefined : styles.mainContent}>{children}</main>

      <footer className={styles.footer}>
        <div>InnoWeb Ventures Ltd</div>
        <div>UK-registered</div>
        <div>© 2026</div>
      </footer>
    </div>
  );
}
