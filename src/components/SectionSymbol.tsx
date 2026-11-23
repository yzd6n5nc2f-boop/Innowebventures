import styles from '../styles/coralAccent.module.css';
export type SectionSymbolKind='services'|'work'|'method';
export default function SectionSymbol({kind}:{kind:SectionSymbolKind}){
 return <span className={styles.symbol} data-kind={kind} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
  {kind==='services'?<><path d="m3 11 13-7 13 7-13 7Z"/><path d="m3 16 13 7 13-7M3 21l13 7 13-7"/></>:kind==='work'?<><rect x="3" y="5" width="26" height="18" rx="2"/><path d="M16 23v5M10 28h12"/></>:<><circle cx="16" cy="6" r="3"/><path d="M16 9v7M6 23v-4a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4"/><rect x="2" y="23" width="8" height="7" rx="1.5"/><rect x="22" y="23" width="8" height="7" rx="1.5"/></>}
 </svg></span>;
}
