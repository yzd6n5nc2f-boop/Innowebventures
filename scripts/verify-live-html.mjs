import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const origin = "https://www.innowebventures.com";
const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const metadata = JSON.parse(await readFile("src/content/pageMetadata.json", "utf8"));
const main = (html) => html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const homeStructuredData = JSON.parse(await readFile("src/content/homeStructuredData.json", "utf8"));
const stamp = Date.now();
async function get(route) {
  const response = await fetch(origin + route + (route.includes("?") ? "&" : "?") + "html-verification=" + stamp,
    { headers: { "Cache-Control": "no-cache" }, signal: AbortSignal.timeout(20000) });
  return { response, html: await response.text() };
}
async function verify() {
  // Small batches avoid unnecessary load on the public site.
  for (let offset = 0; offset < routes.length; offset += 4) {
    await Promise.all(routes.slice(offset, offset + 4).map(async (route) => {
      const file = config.routes.find((rule) => rule.route === route).rewrite;
      const expected = await readFile("dist" + file, "utf8");
      const { response, html } = await get(route);
      assert.equal(response.status, 200, route);
      const graphs = [...html.matchAll(/<script\b[^>]*id="home-structured-data"[^>]*>([\s\S]*?)<\/script>/gi)];
      assert.equal(graphs.length, route === "/" ? 1 : 0, route + ": homepage JSON-LD scope");
      if (route === "/") assert.deepEqual(JSON.parse(graphs[0][1]), homeStructuredData);
      assert.ok(main(html), route + ": missing initial HTML body");
      assert.equal(main(html), main(expected), route + ": live body differs from build");
      assert.ok(html.includes("<title>" + escape(metadata[route].title) + "</title>"), route + ": title");
      assert.ok(html.includes('name="description" content="' + escape(metadata[route].description) + '"'), route + ": description");
      assert.ok(html.includes('rel="canonical" href="' + origin + route + '"'), route + ": canonical");
      for (const tag of ["og:title", "og:description", "og:url", "og:image"]) assert.ok(html.includes('property="' + tag + '"'), route + ": " + tag);
      if (route !== "/privacy-policy") assert.ok(html.includes('data-prerendered="true"'), route);
    }));
  }
  for (const route of ["/this-page-does-not-exist", "/blog/not-a-real-post", "/services/not-a-service"]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 404, route);
    assert.ok(html.includes('href="/services"') && html.includes('href="/blog"') && html.includes('href="/contact"'), route);
  }
  const robots = await get("/robots.txt");
  assert.equal(robots.response.status, 200);
  assert.ok(robots.html.trimEnd().endsWith("Sitemap: " + origin + "/sitemap.xml"));
  const liveSitemap = await get("/sitemap.xml");
  assert.equal(liveSitemap.response.status, 200);
  assert.equal((liveSitemap.html.match(/<loc>/g) || []).length, routes.length);
  console.log("LIVE VERIFIED: all " + routes.length + " public URLs deliver complete build-matching HTML and metadata; homepage JSON-LD, real 404, robots.txt and sitemap passed.");
}
let lastError;
for (let attempt = 1; attempt <= 8; attempt++) {
  try { await verify(); lastError = undefined; break; }
  catch (error) {
    lastError = error;
    console.log("Waiting for deployed HTML (" + attempt + "/8): " + error.message);
    if (attempt < 8) await new Promise((resolve) => setTimeout(resolve, 15000));
  }
}
if (lastError) throw lastError;
