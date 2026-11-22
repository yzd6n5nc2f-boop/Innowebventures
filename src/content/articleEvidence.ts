import evidence from './articleEvidence.json';
export type SourceEvidence = {title:string;url:string;checkedAt:string;supports:string;note:string};
export type ArticleEvidence = {reviewedAt:string;reviewType:string;sourceIds:string[];faq:{question:string;answer:string}[];firstHandNotesStatus:string};
export const articleEvidence:Record<string,ArticleEvidence> = evidence.articles;
export const sourceEvidence:Record<string,SourceEvidence> = evidence.sources;
