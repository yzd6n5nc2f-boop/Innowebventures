import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { getSocialMetadata } from "../src/content/socialMetadata.mjs";

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];

export function applyMetadata(html, metadata, social) {
  let hasTitle = false;
  let hasDescription = false;
  html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, () => {
    if (hasTitle) return "";
    hasTitle = true;
    return `<title>${escape(metadata.title)}</title>`;
  });
  html = html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const name = attribute(tag, "name")?.toLowerCase();
    const property = attribute(tag, "property")?.toLowerCase();
    if (name === "description") {
      if (hasDescription) return "";
      hasDescription = true;
      return `<meta name="description" content="${escape(metadata.description)}" />`;
    }
    const value = property === "og:title" || name === "twitter:title" ? metadata.title
      : property === "og:description" || name === "twitter:description" ? metadata.description : null;
    return value === null ? tag : tag.replace(/\bcontent\s*=\s*(["'])[\s\S]*?\1/i, () => `content="${escape(value)}"`);
  });
  if (!/<\/head>/i.test(html)) throw new Error("Cannot inject metadata: missing HTML head.");
  const missing = [
    ...(!hasTitle ? [`<title>${escape(metadata.title)}</title>`] : []),
    ...(!hasDescription ? [`<meta name="description" content="${escape(metadata.description)}" />`] : []),
  ];
  if (missing.length) html = html.replace(/<\/head>/i, () => `    ${missing.join("\n    ")}\n  </head>`);
  if (!social) return html;
  html = html.replace(/<link\b[^>]*>/gi, (tag) => attribute(tag, "rel")?.toLowerCase() === "canonical" ? "" : tag);
  html = html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const name = attribute(tag, "name")?.toLowerCase();
    const property = attribute(tag, "property")?.toLowerCase();
    return name?.startsWith("twitter:") || property?.startsWith("og:") ? "" : tag;
  });
  const tags = [
    `<link rel="canonical" href="${escape(social.canonical)}" />`,
    ...Object.entries(social.properties).map(([key, value]) => `<meta property="${key}" content="${escape(value)}" />`),
    ...Object.entries(social.names).map(([key, value]) => `<meta name="${key}" content="${escape(value)}" />`),
  ];
  return html.replace(/<\/head>/i, () => `    ${tags.join("\n    ")}\n  </head>`);
}

export async function buildPageMetadata() {
  const pages = JSON.parse(await readFile("src/content/pageMetadata.json", "utf8"));
  const socialConfig = JSON.parse(await readFile("src/content/socialMetadata.json", "utf8"));
  const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
  const xml = await readFile("dist/sitemap.xml", "utf8");
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  for (const route of [...paths, "/404.html"]) {
    const metadata = pages[route];
    if (!metadata) throw new Error(`Add a search title and description for ${route} to src/content/pageMetadata.json.`);
    if (!metadata.title?.trim() || [...metadata.title].length >= 60) throw new Error(`Title must be under 60 characters: ${route}`);
    if (!metadata.description?.trim() || [...metadata.description].length >= 155) throw new Error(`Description must be under 155 characters: ${route}`);
    const rule = config.routes.find((entry) => entry.route === route);
    const original = route === "/404.html" ? "/404.html" : rule?.rewrite;
    if (!original) throw new Error(`No HTML rewrite for public page ${route}`);
    const html = applyMetadata(await readFile(`dist${original}`, "utf8"), metadata, getSocialMetadata(socialConfig, route, metadata));
    if (original === "/index.html" && route !== "/") {
      const hash = createHash("sha256").update(route).digest("hex").slice(0, 20);
      const target = `/assets/page-metadata/${hash}.html`;
      await mkdir("dist/assets/page-metadata", { recursive: true });
      await writeFile(`dist${target}`, html);
      rule.rewrite = target;
    } else await writeFile(`dist${original}`, html);
  }
  // Internal HTML is only served through the exact public rewrites. Direct
  // requests to these implementation files must not create soft-404 URLs.
  const internalRoute = "/assets/page-metadata/*";
  config.routes = config.routes.filter((rule) => rule.route !== internalRoute);
  config.routes.unshift({ route: internalRoute, rewrite: "/404.html", statusCode: 404 });
  const json = JSON.stringify(config) + "\n";
  if (Buffer.byteLength(json) > 20_000) throw new Error("Generated Azure config exceeds 20KB.");
  await writeFile("dist/staticwebapp.config.json", json);
  console.log(`Applied approved titles and descriptions to ${paths.length} public HTML pages and the noindex 404 page.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/build-page-metadata.mjs")) await buildPageMetadata();
