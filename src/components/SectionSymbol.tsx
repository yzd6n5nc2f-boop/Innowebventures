import styles from '../styles/coralAccent.module.css';
export type SectionSymbolKind='services'|'work'|'method'|'insights'|'about';
export default function SectionSymbol({kind}:{kind:SectionSymbolKind}){
 return <span className={styles.symbol} data-kind={kind} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
  {kind==='services'?<><path d="m3 11 13-7 13 7-13 7Z"/><path d="m3 16 13 7 13-7M3 21l13 7 13-7"/></>:kind==='work'?<><rect x="3" y="5" width="26" height="18" rx="2"/><path d="M16 23v5M10 28h12"/></>:kind==='insights'?<><rect x="5" y="3" width="22" height="26" rx="2"/><path d="M11 3v26M15 10h7M15 15h7M15 20h5"/></>:kind==='about'?<><circle cx="16" cy="9" r="4"/><path d="M8 28v-3a8 8 0 0 1 16 0v3M5 8a3 3 0 0 0 0 6M27 8a3 3 0 0 1 0 6M3 24v-2a5 5 0 0 1 3-4M29 24v-2a5 5 0 0 0-3-4"/></>:<><circle cx="16" cy="6" r="3"/><path d="M16 9v7M6 23v-4a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4"/><rect x="2" y="23" width="8" height="7" rx="1.5"/><rect x="22" y="23" width="8" height="7" rx="1.5"/></>}
 </svg></span>;
}
