import { readFile, writeFile, mkdir, access } from "node:fs/promises";

// Every page with an entry in src/content/pageMeta.json gets its own HTML file with its search title,
// meta description and canonical URL already in the <head>, so search engines read them without running
// the app. /products/<slug> pages carry the /forge-suite/<slug> canonical. Campaign posts already have an
// article page from build-campaign-pages.mjs; only their title and description text are replaced.
const { origin, canonical, pages } = JSON.parse(await readFile("src/content/pageMeta.json", "utf8"));
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const exists = (file) => access(file).then(() => true, () => false);
const template = await readFile("dist/index.html", "utf8");
const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
config.routes ??= [];

function withMeta(html, path, { title, description }) {
  const url = `${origin}${canonical[path] ?? path.replace(/^\/products\//, "/forge-suite/")}`;
  html = html
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace(/(<meta (?:property="og|name="twitter):title" content=")[^"]*/g, `$1${escape(title)}`)
    .replace(/(<meta (?:property="og|name="twitter):description" content=")[^"]*/g, `$1${escape(description)}`);
  if (/<link rel="canonical"/.test(html)) return html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${path.startsWith("/blog/") ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="InnoWeb Ventures" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
  ].join("\n    ");
  return html.replace("</head>", `    ${tags}\n  </head>`);
}

const entries = Object.entries(pages);
for (const [path, meta] of entries.filter(([path]) => path.startsWith("/forge-suite/"))) entries.push([path.replace("/forge-suite/", "/products/"), meta]);
for (const [path, meta] of entries) {
  if (path === "/") { await writeFile("dist/index.html", withMeta(template, path, meta)); continue; }
  const file = `dist${path}/index.html`;
  const source = await exists(file) ? await readFile(file, "utf8") : template;
  await mkdir(`dist${path}`, { recursive: true });
  await writeFile(file, withMeta(source, path, meta));
  if (!config.routes.some((rule) => rule.route === path)) config.routes.push({ route: path, rewrite: `${path}/index.html` });
}

await writeFile("dist/staticwebapp.config.json", JSON.stringify(config, null, 2) + "\n");
console.log(`Wrote search titles and descriptions into ${entries.length} pages.`);
