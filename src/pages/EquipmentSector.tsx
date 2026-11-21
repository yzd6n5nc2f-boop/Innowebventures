import { Link } from 'react-router-dom';
import SiteShell from '../components/SiteShell';
import Breadcrumbs from '../components/Breadcrumbs';
import { equipmentFaqs } from '../content/equipmentSector';
import styles from '../styles/home.module.css';
const url='https://www.innowebventures.com/sectors/equipment-suppliers-installers';
export default function EquipmentSector(){
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'FAQPage',mainEntity:equipmentFaqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
  {'@type':'BreadcrumbList',itemListElement:[{name:'Home',item:'https://www.innowebventures.com/'},{name:'Sectors',item:'https://www.innowebventures.com/sectors'},{name:'Equipment suppliers and installers',item:url}].map((item,i)=>({'@type':'ListItem',position:i+1,...item}))}
 ]};
 return <SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replaceAll('<','\\u003c')}}/>
 <section className={styles.pageSection}><Breadcrumbs items={[{label:'Sectors',to:'/sectors'},{label:'Equipment suppliers and installers'}]}/>
 <div className={styles.pageIntro}><div className={styles.sectionKicker}>Equipment suppliers and installers · UK SMEs</div><h1>AI and automation for equipment suppliers and installers</h1><p>Keep orders, equipment records and installation handovers moving. InnoWeb builds tailored workflow systems for owners, operations managers, service coordinators and installation teams who need clearer information and less repeated administration.</p><Link className={styles.primaryButton} to="/ai-readiness-assessment">Take the free AI readiness assessment →</Link></div>
 <article className={styles.summaryCard}><h2>The operational problems to solve first</h2><p>Order details can sit across emails, spreadsheets and separate systems. Re-entering them makes it harder to keep equipment, customer and job records aligned. A missing site detail or unclear handover can hold up an installation or customer update.</p><p>Adding AI brings its own questions: which records can it trust, what may it change, and who checks the result? We start with those workflow boundaries before introducing an agent. These are use cases to explore with your team, rather than assumptions about every business in the sector.</p></article>
 <h2>Use cases InnoWeb can deliver</h2><div className={styles.detailGrid}>
 <article className={styles.infoCard}><h3>Order intake and checks</h3><p>Extract proposed order details from emails or forms, check required fields and send incomplete or conflicting information to a member of staff before records are updated.</p></article>
 <article className={styles.infoCard}><h3>Equipment and installation records</h3><p>Build a shared view of equipment, customer locations and job status. Give coordinators a clear record of what has been ordered, what needs checking and the next agreed action.</p></article>
 <article className={styles.infoCard}><h3>Handovers and follow-ups</h3><p>Track outstanding installation details, assign responsibility and prepare reminders. Keep scheduling commitments and technical approval with the people responsible.</p></article>
 <article className={styles.infoCard}><h3>Customer updates and reporting</h3><p>Prepare draft progress messages and operational summaries from approved records. Staff review messages before sending, and check exceptions against the source information.</p></article></div>
 <article className={styles.summaryCard}><h2>Services that support this work</h2><ul className={styles.cleanList}>
 <li><Link to="/services/platform-discovery">Platform Discovery</Link> — map one process, its information sources and approval points.</li>
 <li><Link to="/services/deployment-sprint">Deployment Sprint</Link> — scope and test one controlled workflow before expanding it.</li>
 <li><Link to="/services/integration-rollout">Integration &amp; Rollout</Link> — connect the agreed workflow with existing systems and plan the handover.</li>
 <li><Link to="/services/private-local-llm">Private and local LLM for business</Link> — compare local, cloud and hybrid options around information needs, performance and running costs.</li></ul></article>
 <article className={styles.summaryCard}><h2>Where Forge Suite fits</h2><p>We select the components needed for the job; these are possible delivery tools, not claims that every component is already deployed in the example below.</p><ul className={styles.cleanList}>
 <li><Link to="/forge-suite/forge-coder">Forge Coder</Link> — the build layer for tailored screens and workflow software.</li>
 <li><Link to="/forge-suite/forgeops">ForgeOps</Link> — the operational layer for controlled automation and oversight.</li>
 <li><Link to="/forge-suite/neuralforge">NeuralForge</Link> — specialist intelligence configuration where understanding sector language or approved knowledge is useful.</li></ul></article>
 <article className={styles.summaryCard}><div className={styles.sectionKicker}>Relevant work · in development</div><h2>A coffee equipment management system</h2><p>InnoWeb is working on a management system for an equipment business in Australia, focused on ordering, supply and monitoring of coffee machines. It is a relevant development example for this sector; it is not a completed UK deployment or a verified savings claim.</p><Link className={styles.primaryButton} to="/case-studies/coffee-equipment-management">Read the anonymised development case study →</Link></article>
 <h2>Frequently asked questions</h2><div className={styles.detailGrid}>{equipmentFaqs.map(f=><article className={styles.infoCard} key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div>
 <article className={styles.summaryCard}><h2>Find a practical starting point</h2><p>Use our free assessment to review your data, processes, team skills, governance and privacy needs. Then discuss one workflow worth improving.</p><Link className={styles.primaryButton} to="/ai-readiness-assessment">Take the free AI readiness assessment →</Link></article>
 </section></SiteShell>;
}
