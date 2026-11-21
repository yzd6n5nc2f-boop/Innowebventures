import plan from './internalLinks.json';
export type ArticleLink = { title:string; to:string };
export type TextLink = { anchor:string; to:string };
export type ArticleLinkPlan = { body:(TextLink & {section:string; paragraph:number})[]; extra:(TextLink & {section:string; text:string})[]; related:ArticleLink[] };
export const articleLinks:Record<string,ArticleLinkPlan> = plan.posts;
export const pageLinks:Record<string,ArticleLink[]> = plan.pages;
