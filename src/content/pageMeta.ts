import data from "./pageMeta.json";

// Search titles and descriptions live in pageMeta.json, so the React pages and
// the build script that writes each page's HTML (scripts/build-page-meta.mjs) use the same text.
export type PageMeta = { title: string; description: string };

const pages: Record<string, PageMeta> = data.pages;
const canonicals: Record<string, string> = data.canonical;
export const SITE_ORIGIN = data.origin;
export const DEFAULT_META: PageMeta = {
  title: "InnoWeb Ventures · Intelligent Workflows",
  description: "Tailored agentic AI systems around your organisation, workflows and people. InnoWeb Ventures connects intelligence, software and human control.",
};

// /products/<slug> shows the same page as /forge-suite/<slug>; the Forge Suite URL is the main one.
export function canonicalPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return canonicals[path] ?? path.replace(/^\/products\//, "/forge-suite/");
}

export function getPageMeta(pathname: string): PageMeta | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  return pages[path] ?? pages[path.replace(/^\/products\//, "/forge-suite/")];
}
