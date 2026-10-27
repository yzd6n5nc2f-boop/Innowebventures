import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

// Only real public URLs may receive a 200 SPA shell. Do not add a wildcard
// navigationFallback: it would hide missing pages behind HTTP 200 responses.
export async function buildRouting() {
  const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const publicPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  delete config.navigationFallback;
  config.responseOverrides = { ...config.responseOverrides, "404": { rewrite: "/404.html" } };
  const rules = new Map((config.routes ?? []).map((rule) => [rule.route, rule]));
  for (const route of publicPaths) {
    // Preserve standalone privacy and article-specific sharing HTML rewrites.
    if (!rules.has(route)) rules.set(route, { route, rewrite: "/index.html", methods: ["GET", "HEAD"] });
    if (route !== "/" && !route.endsWith(".html")) {
      rules.set(`${route}/`, { route: `${route}/`, redirect: route, statusCode: 301, methods: ["GET", "HEAD"] });
    }
  }

  // Keep explicit legacy redirects in sync with React, without accepting
  // arbitrary /work/* or other invalid content slugs.
  const text = await readFile("src/App.tsx", "utf8");
  const source = ts.createSourceFile("App.tsx", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const attribute = (node, name) => node.attributes.properties.find((attr) => ts.isJsxAttribute(attr) && attr.name.getText(source) === name)?.initializer;
  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === "Route") {
      const route = attribute(node, "path");
      const expression = attribute(node, "element")?.expression;
      if (route && ts.isStringLiteral(route) && expression && ts.isJsxSelfClosingElement(expression) && expression.tagName.getText(source) === "Navigate") {
        const target = attribute(expression, "to");
        if (/[:*]/.test(route.text)) throw new Error(`Replace broad redirect ${route.text} with explicit known URLs.`);
        if (!target || !ts.isStringLiteral(target) || !publicPaths.includes(target.text)) throw new Error(`Invalid redirect target for ${route.text}`);
        for (const alias of [route.text, `${route.text}/`]) {
          rules.set(alias, { route: alias, redirect: target.text, statusCode: 301, methods: ["GET", "HEAD"] });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  rules.set("/index.html", { route: "/index.html", redirect: "/", statusCode: 301, methods: ["GET", "HEAD"] });
  rules.set("/404.html", { route: "/404.html", statusCode: 404 });
  config.routes = [...rules.values()];
  // Compact the generated rules to stay within Azure's configuration size limit.
  const json = JSON.stringify(config) + "\n";
  if (Buffer.byteLength(json) > 20_000) throw new Error("Azure routing configuration exceeds 20KB; review route generation.");
  await writeFile("dist/staticwebapp.config.json", json);
  console.log(`Generated exact Azure routing for ${publicPaths.length} public URLs; unknown paths return the custom HTTP 404 page.`);
  return config;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/build-routing.mjs")) await buildRouting();
