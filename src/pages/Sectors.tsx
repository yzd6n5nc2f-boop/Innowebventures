import { Link } from 'react-router-dom';
import SiteShell from '../components/SiteShell';
import Breadcrumbs from '../components/Breadcrumbs';
import styles from '../styles/home.module.css';
export default function Sectors(){return <SiteShell><section className={styles.pageSection}>
 <Breadcrumbs items={[{label:'Sectors'}]}/><div className={styles.pageIntro}><div className={styles.sectionKicker}>Built around your operation</div><h1>AI and automation by sector</h1><p>Explore how tailored software and AI can support the tasks, handovers and decisions in your business.</p></div>
 <article className={styles.summaryCard}><h2>Equipment suppliers and installers</h2><p>Connect order administration, equipment records, installation handovers and service follow-ups, with your team in control.</p><Link className={styles.primaryButton} to="/sectors/equipment-suppliers-installers">Explore equipment workflows →</Link></article>
 <article className={styles.summaryCard}><h2>Start with your business</h2><p>Assess your data, processes, team, governance and privacy needs before choosing tools.</p><Link className={styles.primaryButton} to="/ai-readiness-assessment">Take the free AI readiness assessment →</Link></article>
 </section></SiteShell>}
