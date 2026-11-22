import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/askAI.module.css';
type Message={role:'user'|'assistant';content:string};
const prompts=['What could you improve in my workflow?','How do you keep people in control?','When would private AI make sense?'];
export default function AskAI(){
 const [open,setOpen]=useState(false),[messages,setMessages]=useState<Message[]>([]),[draft,setDraft]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const input=useRef<HTMLTextAreaElement>(null),launcher=useRef<HTMLButtonElement>(null),end=useRef<HTMLDivElement>(null),controller=useRef<AbortController>();
 const close=()=>{setOpen(false);launcher.current?.focus();};
 useEffect(()=>{if(open)input.current?.focus();},[open]);
 useEffect(()=>{if(open&&messages.length)end.current?.scrollIntoView({block:'nearest'});},[messages,busy,open]);
 useEffect(()=>()=>controller.current?.abort(),[]);
 async function send(text=draft){
  if(busy||!text.trim())return;
  const history=[...messages,{role:'user' as const,content:text.trim()}].slice(-7);
  setBusy(true);setError('');setDraft('');controller.current=new AbortController();
  try{
   const response=await fetch('/api/forge-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history}),signal:controller.current.signal});
   const data=await response.json();if(!response.ok)throw Error(data.error||'Please try again later.');
   setMessages([...history,{role:'assistant',content:data.answer}]);
  }catch(e){if(!(e instanceof Error&&e.name==='AbortError')){setError(e instanceof Error?e.message:'The chat is unavailable. Please try again.');setDraft(text);}}
  finally{setBusy(false);input.current?.focus();}
 }
 return <aside className={styles.widget} aria-label="Forge AI chat">
  {open&&<section className={styles.panel} role="dialog" aria-modal="false" aria-labelledby="forge-chat-title" onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();close();}}}>
   <header className={styles.header}><div><h2 id="forge-chat-title">Ask Forge AI</h2><p>Focused on InnoWeb Ventures</p></div><button className={styles.iconButton} onClick={close} aria-label="Close AI chat">×</button></header>
   <div className={styles.notice}>Public demo · text only. Don’t share personal or confidential information. <a href="/privacy-policy#website-chat">Privacy</a></div>
   <div className={styles.messages} role="log" aria-live="polite" aria-relevant="additions text">
    <div className={styles.assistant}>Hello! Ask about our services, workflow approach or human controls. I use an approved company brief; if a policy or detail isn’t confirmed, I’ll say so.</div>
    {!messages.length&&<div className={styles.prompts}>{prompts.map(p=><button key={p} disabled={busy} onClick={()=>send(p)}>{p}</button>)}</div>}
    {messages.map((m,i)=><div key={i} className={m.role==='user'?styles.user:styles.assistant}><span className={styles.speaker}>{m.role==='user'?'You':'Forge AI'}</span>{m.content}</div>)}
    {busy&&<p className={styles.status} role="status">Forge AI is thinking…</p>}<div ref={end}/>
   </div>
   {error&&<p className={styles.error} role="alert">{error}</p>}
   <form className={styles.form} onSubmit={e=>{e.preventDefault();void send();}}>
    <label className={styles.label} htmlFor="forge-chat-message">Your question</label>
    <div className={styles.composer}><textarea ref={input} id="forge-chat-message" rows={2} maxLength={1200} value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Ask about a business workflow…" disabled={busy} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();void send();}}}/><button className={styles.send} type="submit" disabled={busy||!draft.trim()}>Send</button></div>
   </form>
   <footer className={styles.footer}><button disabled={busy} onClick={()=>{setMessages([]);setError('');setDraft('');input.current?.focus();}}>New chat</button><Link to="/contact" onClick={close}>Talk to a person →</Link><span>Powered by Forge Brain · AI can make mistakes</span></footer>
  </section>}
  <button ref={launcher} className={styles.launcher} aria-expanded={open} aria-haspopup="dialog" onClick={()=>open?close():setOpen(true)}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-6 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 9h8M8 13h5"/></svg>Ask AI</button>
 </aside>;
}
