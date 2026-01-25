import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";

export default function Login() {
  return (
    <SiteShell>
      <section className={`${styles.capabilitiesSection} ${styles.sectionAnchor}`} id="login">
        <div className={styles.loginSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionKicker}>Login</div>
            <h2>Access your InnoWeb workspace.</h2>
          </div>
          <form className={styles.loginCard}>
            <label className={styles.formField}>
              Email
              <input className={styles.formInput} type="email" name="email" placeholder="you@company.com" />
            </label>
            <label className={styles.formField}>
              Password
              <input className={styles.formInput} type="password" name="password" placeholder="••••••••" />
            </label>
            <button className={styles.formButton} type="submit">
              Sign in
            </button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
