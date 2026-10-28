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
  const seenTitles = new Map();
  const seenDescriptions = new Map();
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
      const liveTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
      const liveDescription = html.match(/<meta name="description" content="([^"]*)"/i)?.[1];
      assert.ok(liveTitle && !seenTitles.has(liveTitle), route + ": duplicate title with " + seenTitles.get(liveTitle));
      assert.ok(liveDescription && !seenDescriptions.has(liveDescription), route + ": duplicate description with " + seenDescriptions.get(liveDescription));
      seenTitles.set(liveTitle, route);
      seenDescriptions.set(liveDescription, route);
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
  const productRedirects = config.routes.filter((rule) => rule.route.startsWith("/products/") && rule.redirect);
  assert.equal(productRedirects.length, 6);
  for (const rule of productRedirects) {
    const response = await fetch(origin + rule.route, {
      redirect: "manual", headers: { "Cache-Control": "no-cache" }, signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 301, rule.route + ": permanent product redirect");
    assert.equal(new URL(response.headers.get("location"), origin).href, origin + rule.redirect, rule.route + ": destination");
    assert.ok(!routes.includes(rule.route), rule.route + ": alias leaked into sitemap");
    await response.arrayBuffer();
  }
  console.log("LIVE METADATA VERIFIED: " + seenTitles.size + " unique titles and " + seenDescriptions.size +
    " unique descriptions; all six product aliases return 301 to their Forge Suite pages.");
  const llms = await get("/llms.txt");
  assert.equal(llms.response.status, 200, "llms.txt");
  assert.match(llms.response.headers.get("content-type"), /^text\/plain\b/i);
  assert.equal(llms.html, await readFile("dist/llms.txt", "utf8"), "live Markdown differs from build");
  assert.ok(llms.html.split("\n").length < 150);
  console.log("LIVE llms.txt VERIFIED: plain Markdown, " + llms.html.split("\n").length + " lines, exact build match.");
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
