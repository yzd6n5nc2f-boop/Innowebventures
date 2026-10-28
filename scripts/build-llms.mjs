import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { origin, excludedPath } from "./build-sitemap.mjs";

// Editorial order for the most useful starting points; all other published
// articles are discovered automatically and listed below these.
export const priorityArticles = [
  "useful-ai-starts-with-the-workflow",
  "agentic-ai-is-not-a-chatbot",
  "when-should-a-business-run-ai-locally",
  "why-smaller-ai-models-may-matter-more-than-people-think",
  "human-in-the-loop-is-good-system-design",
  "the-hidden-cost-of-ai-token-usage",
  "how-innoweb-turns-one-workflow-into-an-intelligent-system",
  "why-ai-projects-fail-when-they-start-with-technology",
];

export function literalRecords(file, text) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true,
    file.endsWith(".json") ? ts.ScriptKind.JSON : file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const records = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const fields = {};
      let isArticle = false;
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = property.name.getText(source).replace(/^["']|["']$/g, "");
        if (key === "sections") isArticle = true;
        if (ts.isStringLiteral(property.initializer) || ts.isNoSubstitutionTemplateLiteral(property.initializer)) {
          fields[key] = property.initializer.text;
        }
      }
      if (isArticle) fields.kind = "article";
      records.push(fields);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return records;
}

const clean = (value) => String(value).replace(/\s+/g, " ").trim();
const label = (value) => clean(value).replace(/[\\[\]]/g, "\\$&");

export function generateLlms({ paths, metadata, records, applications, now = Date.now() }) {
  const sections = new Map([
    ["Main pages", []],
    ["Services", []],
    ["Forge Suite products", []],
    ["Live applications", []],
    ["Useful articles", []],
    ["More published articles", []],
  ]);
  const articleRecords = new Map(records.filter((item) => item.kind === "article" && item.slug).map((item) => [item.slug, item]));
  const named = new Map(records.filter((item) => item.slug && item.name).map((item) => [item.slug, item]));
  const listed = new Set();
  function add(section, route, title, description) {
    if (listed.has(route)) return;
    const url = new URL(route, origin);
    if (url.protocol !== "https:") throw new Error("llms.txt links must use HTTPS: " + route);
    if (!title || !description) throw new Error("Missing llms.txt title or description for " + route);
    sections.get(section).push("- [" + label(title) + "](" + url.href + "): " + clean(description));
    listed.add(route);
  }
  const articles = [];
  for (const route of paths) {
    // Use Forge Suite URLs rather than duplicating the existing product aliases.
    if (excludedPath.test(route) || route === "/404.html" || route.startsWith("/products/")) continue;
    const page = metadata[route];
    if (!page) throw new Error("Missing public metadata for llms.txt: " + route);
    const title = page.title.replace(/\s*\|\s*InnoWeb Ventures$/, "");
    if (route.startsWith("/blog/")) {
      const slug = route.slice("/blog/".length);
      const article = articleRecords.get(slug);
      const publishedAt = article?.publishAt || (article?.published ? article.published + " 00:00:00 GMT" : null);
      const published = publishedAt ? Date.parse(publishedAt) : 0;
      if (publishedAt && !Number.isFinite(published)) throw new Error("Invalid article publication date: " + slug);
      if (published > now) continue;
      articles.push({ route, slug, title: article?.title || title, description: page.description, published });
      continue;
    }
    let section = "Main pages";
    if (route === "/services" || route.startsWith("/services/")) section = "Services";
    if (route === "/forge-suite" || route.startsWith("/forge-suite/")) section = "Forge Suite products";
    if (route === "/work") section = "Live applications";
    if (route === "/blog") section = "Useful articles";
    const item = named.get(route.split("/").at(-1));
    add(section, route, item?.name || title, page.description);
  }
  for (const application of applications) add("Live applications", application.url, application.name, application.description);
  articles.sort((a, b) => {
    const rank = (slug) => priorityArticles.includes(slug) ? priorityArticles.indexOf(slug) : priorityArticles.length;
    return rank(a.slug) - rank(b.slug) || b.published - a.published || a.slug.localeCompare(b.slug);
  });
  for (const article of articles) add(priorityArticles.includes(article.slug) ? "Useful articles" : "More published articles",
    article.route, article.title, article.description);
  const lines = [
    "# InnoWeb Ventures",
    "",
    "> InnoWeb Ventures is a UK-led AI and software company building tailored workflows for organisations. Its work combines agentic AI, automation and software with human oversight, operational governance and attention to privacy and running costs.",
    "",
  ];
  for (const [heading, entries] of sections) {
    if (!entries.length) continue;
    lines.push("## " + heading, "", ...entries, "");
  }
  if (lines.length >= 150) throw new Error("llms.txt must stay under 150 lines; review the article selection before publishing.");
  return lines.join("\n");
}

export async function buildLlms() {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const metadata = JSON.parse(await readFile("src/content/pageMetadata.json", "utf8"));
  const records = [];
  async function content(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await content(file);
      else if (/\.(?:ts|tsx|json)$/.test(file)) records.push(...literalRecords(file, await readFile(file, "utf8")));
    }
  }
  await content("src/content");
  const applications = literalRecords("src/pages/Work.tsx", await readFile("src/pages/Work.tsx", "utf8"))
    .filter((item) => item.url && item.name && item.description);
  const markdown = generateLlms({ paths, metadata, records, applications });
  await writeFile("dist/llms.txt", markdown);
  console.log("Generated llms.txt: " + markdown.split("\n").length + " lines, " + (markdown.match(/^- \[/gm) || []).length + " described links; future articles excluded.");
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/build-llms.mjs")) await buildLlms();
