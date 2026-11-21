import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ArticleLink, TextLink } from '../content/internalLinks';
import styles from '../styles/relatedArticles.module.css';
export function ContextualText({text,links}:{text:string;links:TextLink[]}){
 const matches=links.map(link=>({...link,start:text.indexOf(link.anchor)})).sort((a,b)=>a.start-b.start);
 const parts:ReactNode[]=[];let cursor=0;
 for(const link of matches){
  if(link.start<cursor)throw new Error('Missing or overlapping contextual anchor: '+link.anchor);
  parts.push(text.slice(cursor,link.start));
  parts.push(<Link key={`${link.start}-${link.to}`} to={link.to} data-contextual-link="true">{link.anchor}</Link>);
  cursor=link.start+link.anchor.length;
 }
 parts.push(text.slice(cursor));return <>{parts.map((part,i)=><Fragment key={i}>{part}</Fragment>)}</>;
}
export default function RelatedArticles({articles,source,title='Related articles'}:{articles:ArticleLink[];source:string;title?:string}){
 if(!articles.length)return null;
 return <aside className={styles.related} aria-label={title} data-related-source={source}><h2>{title}</h2><ul>{articles.map(article=><li key={article.to}><Link to={article.to}>{article.title}</Link></li>)}</ul></aside>;
}
