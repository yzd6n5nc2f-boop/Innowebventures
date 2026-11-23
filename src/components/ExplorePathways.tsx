import { Link } from 'react-router-dom';
import SectionSymbol from './SectionSymbol';
import type { SectionSymbolKind } from './SectionSymbol';
import styles from '../styles/coralAccent.module.css';
const paths:{title:string;to:string;kind:SectionSymbolKind;description:string}[]=[
 {title:'Services',to:'/services',kind:'services',description:'Tailored AI workflows, agent systems and practical automation, designed around your organisation, tasks and people.'},
 {title:'Our Work',to:'/work',kind:'work',description:'Explore application examples, our Forge Suite framework and clearly labelled projects in development.'},
 {title:'How We Work',to:'/delivery-method',kind:'method',description:'A collaborative approach from discovery and design to build, review and ongoing improvement, with people in control.'}
];
export default function ExplorePathways(){return <section className={styles.pathways} aria-label="Explore InnoWeb Ventures">{paths.map((p,i)=><article className={styles.card} data-kind={p.kind} key={p.to}>
 <div className={styles.number} aria-hidden="true">0{i+1}<span/></div>
 <div className={styles.cardContent}><SectionSymbol kind={p.kind}/><div className={styles.copy}><h2>{p.title}</h2><p>{p.description}</p><Link to={p.to} aria-label={`Explore ${p.title}`}>Explore <span aria-hidden="true">→</span></Link></div></div>
 </article>)}</section>;}
