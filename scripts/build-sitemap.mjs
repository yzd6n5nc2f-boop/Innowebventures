import { readFile, readdir, writeFile, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import ts from "typescript";

// Sitemap policy lives here. Routes and content are discovered from the app.
export const origin = "https://www.innowebventures.com";
export const excludedPath = /(?:^|\/)(?:admin|api|test|tests|preview|previews|thank-you|thankyou|thank_you)(?:[\/.\-_]|$)/i;
const dynamicCollections = {
  ProductDetail: "products",
  ServiceDetail: "services",
  BlogPost: "posts",
};
const root = process.cwd();
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const sourceCache = new Map();
const historyCache = new Map();
const revisionCache = new Map();
const itemDateCache = new Map();

function parse(file, text) {
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true,
    file.endsWith(".json") ? ts.ScriptKind.JSON : file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}

function property(node, key) {
  return node.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText().replaceAll('"', "").replaceAll("'", "") === key);
}

function objects(file, text) {
  const result = new Map();
  const source = parse(file, text);
  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === "Route") {
      const route = node.attributes.properties.find((attr) => ts.isJsxAttribute(attr) && attr.name.getText(source) === "path")?.initializer;
      if (route && ts.isStringLiteral(route)) {
        const slug = `route:${route.text}`;
        result.set(slug, { slug, kind: "routes", file, signature: node.getText(source) });
      }
    }
    if (ts.isObjectLiteralExpression(node)) {
      const slug = property(node, "slug")?.initializer;
      if (slug && ts.isStringLiteral(slug)) {
        const kind = property(node, "sections") ? "posts"
          : property(node, "relatedProductSlugs") ? "products"
          : property(node, "duration") ? "services" : null;
        if (kind) result.set(slug.text, { slug: slug.text, kind, file, signature: node.getText(source) });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return result;
}

async function source(file) {
  if (!sourceCache.has(file)) sourceCache.set(file, await readFile(path.join(root, file), "utf8"));
  return sourceCache.get(file);
}

async function resolveImport(from, specifier) {
  if (!specifier.startsWith(".")) return null;
  const base = path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
  for (const file of [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`]) {
    try { if ((await stat(path.join(root, file))).isFile()) return file; } catch (error) {
      if (error.code !== "ENOENT" && error.code !== "ENOTDIR") throw error;
    }
  }
  throw new Error(`Cannot resolve ${specifier} from ${from}`);
}

async function dependencies(file, found = new Set()) {
  if (found.has(file)) return found;
  found.add(file);
  if (!/\.(?:tsx?|json)$/.test(file)) return found;
  const ast = parse(file, await source(file));
  for (const statement of ast.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const imported = await resolveImport(file, statement.moduleSpecifier.text);
      if (imported) await dependencies(imported, found);
    }
    if (ts.isExportDeclaration(statement) && statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)) {
      const imported = await resolveImport(file, statement.moduleSpecifier.text);
      if (imported) await dependencies(imported, found);
    }
  }
  return found;
}

function history(file) {
  if (!historyCache.has(file)) {
    const log = git("log", "--format=%H%x09%cI", "--", file);
    historyCache.set(file, log ? log.split("\n").map((line) => {
      const [sha, date] = line.split("\t");
      return { sha, date };
    }) : []);
  }
  return historyCache.get(file);
}

function lastChanged(file) {
  return history(file)[0]?.date ?? new Date().toISOString();
}

// Compare each article/product/service object through Git history, so changing
// one article does not give every article in its collection a new lastmod.
function itemLastChanged(item) {
  const key = `${item.file}:${item.slug}`;
  if (itemDateCache.has(key)) return itemDateCache.get(key);
  let date;
  for (const revision of history(item.file)) {
    const revisionKey = `${revision.sha}:${item.file}`;
    if (!revisionCache.has(revisionKey)) {
      try { revisionCache.set(revisionKey, objects(item.file, git("show", revisionKey))); } catch { break; }
    }
    const previous = revisionCache.get(revisionKey).get(item.slug);
    if (!previous || previous.signature !== item.signature) break;
    date = revision.date;
  }
  const result = date ?? new Date().toISOString();
  itemDateCache.set(key, result);
  return result;
}

function latest(dates) {
  return dates.reduce((a, b) => Date.parse(a) >= Date.parse(b) ? a : b).slice(0, 10);
}

export async function generateSitemap() {
  // CI must fetch full history; invented build dates are not valid lastmods.
  if (git("rev-parse", "--is-shallow-repository") === "true") {
    throw new Error("Sitemap lastmod requires full Git history. Set actions/checkout fetch-depth: 0.");
  }
  const appFile = "src/App.tsx";
  const app = parse(appFile, await source(appFile));
  const imports = new Map();
  for (const statement of app.statements) {
    if (ts.isImportDeclaration(statement) && statement.importClause?.name) {
      imports.set(statement.importClause.name.text, await resolveImport(appFile, statement.moduleSpecifier.text));
    }
  }
  const routes = [];
  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(app) === "Route") {
      const attrs = node.attributes.properties;
      const route = attrs.find((attr) => ts.isJsxAttribute(attr) && attr.name.getText(app) === "path")?.initializer;
      const element = attrs.find((attr) => ts.isJsxAttribute(attr) && attr.name.getText(app) === "element")?.initializer;
      if (route && ts.isStringLiteral(route) && element && ts.isJsxExpression(element)) {
        const component = element.expression?.tagName?.getText(app);
        if (component && component !== "Navigate" && !/^(?:Admin|Test|Preview|ThankYou)/.test(component) && route.text !== "*" && !excludedPath.test(route.text)) {
          routes.push({ route: route.text, component, signature: node.getText(app) });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(app);

  const entries = new Map();
  function add(route, dates) {
    if (excludedPath.test(route)) return;
    const url = new URL(route, origin);
    if (url.origin !== origin || url.search || url.hash || /[:*]/.test(url.pathname)) throw new Error(`Invalid sitemap route: ${route}`);
    entries.set(url.href, latest(dates));
  }

  for (const { route, component, signature } of routes) {
    const file = imports.get(component);
    if (!file) throw new Error(`Missing source import for ${component}`);
    const files = await dependencies(file);
    const items = new Map();
    for (const dependency of files) {
      if (dependency.startsWith("src/content/") && /\.(?:ts|json)$/.test(dependency)) {
        for (const item of objects(dependency, await source(dependency)).values()) items.set(item.slug, item);
      }
    }
    const layoutDates = [...files].filter((dependency) => !dependency.startsWith("src/content/"))
      .map(lastChanged);
    layoutDates.push(lastChanged("index.html"), lastChanged("src/main.tsx"), lastChanged("src/styles/global.css"));
    for (const match of (await source("index.html")).matchAll(/(?:src|href)=["'](\/[^"'?]+)(?:\?[^"']*)?["']/g)) {
      try {
        const asset = `public${match[1]}`;
        if ((await stat(asset)).isFile()) layoutDates.push(lastChanged(asset));
      } catch (error) { if (error.code !== "ENOENT") throw error; }
    }
    layoutDates.push(itemLastChanged({ slug: `route:${route}`, file: appFile, signature }));
    if (route.includes(":")) {
      const kind = dynamicCollections[component];
      if (!kind || !route.endsWith("/:slug")) throw new Error(`Register the new dynamic route in scripts/build-sitemap.mjs: ${route}`);
      const collection = [...items.values()].filter((item) => item.kind === kind);
      if (!collection.length) throw new Error(`No content discovered for ${route}`);
      for (const item of collection) add(route.replace(":slug", encodeURIComponent(item.slug)), [...layoutDates, itemLastChanged(item)]);
    } else {
      add(route, [...files].map(lastChanged).concat(layoutDates));
    }
  }

  // Standalone public HTML pages are outside React Router. Asset/preview HTML
  // is deliberately excluded; the privacy policy is discovered automatically.
  async function publicPages(directory = "public") {
    for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
      const file = `${directory}/${entry.name}`;
      if (entry.name.startsWith(".") || /^public\/(?:assets|branding)(?:\/|$)/.test(file) || excludedPath.test(file)) continue;
      if (entry.isDirectory()) await publicPages(file);
      else if (entry.name.endsWith(".html")) {
        if (/<meta\s[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(await source(file))) continue;
        const route = file.slice("public".length).replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
        add(route, [lastChanged(file)]);
      }
    }
  }
  await publicPages();
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + [...entries].sort(([a], [b]) => a.localeCompare(b)).map(([url, date]) => `  <url><loc>${escape(url)}</loc><lastmod>${date}</lastmod></url>`).join("\n")
    + "\n</urlset>\n";
  await writeFile("dist/sitemap.xml", xml);
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`Generated sitemap.xml with ${entries.size} public URLs and source-history lastmod dates.`);
  return entries;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/build-sitemap.mjs")) await generateSitemap();
