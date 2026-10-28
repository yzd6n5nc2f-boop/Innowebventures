import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const decode = (value) => value.replaceAll("&quot;", '"').replaceAll("&#x27;", "'")
  .replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
const text = (value) => decode(value.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
async function documentFor(route) {
  const file = config.routes.find((rule) => rule.route === route)?.rewrite;
  assert.ok(file, "Missing exact route: " + route);
  return readFile("dist" + file, "utf8");
}
async function collection(file, name) {
  const module = { exports: {} };
  const code = ts.transpileModule(await readFile(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports: module.exports, module });
  return module.exports[name];
}

test("every public URL has readable headings, text, navigation and metadata before JavaScript", async () => {
  for (const route of paths) {
    const html = await documentFor(route);
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
    assert.ok(body, route);
    assert.equal((body.match(/<h1\b/g) ?? []).length, 1, route + ": one main heading");
    assert.match(body, /<main\b/, route);
    assert.match(body, /href="\/contact"/, route);
    assert.match(body, /href="\/blog"/, route);
    assert.ok(text(body).length > 400, route + ": full body text");
    assert.match(html, /<title>[^<]+<\/title>/, route);
    assert.match(html, /name="description" content="[^"]+"/, route);
    assert.ok(html.includes('rel="canonical" href="https://www.innowebventures.com' + route + '"'), route);
    assert.match(html, /property="og:title"/, route);
    if (route !== "/privacy-policy") {
      assert.match(html, /data-prerendered="true" data-rendered-at="\d+"/, route);
      assert.ok(!html.includes('<div id="root"></div>'), route);
    }
    for (const match of body.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
      const href = decode(match[1]);
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const target = new URL(href, "https://www.innowebventures.com").pathname.replace(/\/$/, "") || "/";
      assert.ok(paths.includes(target) || config.routes.some((rule) => rule.route === target && rule.redirect),
        route + ": unresolved local link " + href);
    }
  }
});

test("every blog article includes its full title, section headings and all paragraphs", async () => {
  const posts = [
    ...await collection("src/content/blogPosts.ts", "blogPosts"),
    ...await collection("src/content/innowebCapabilityPosts.ts", "innowebCapabilityPosts"),
    ...await collection("src/content/realWorldAutomationPosts.ts", "realWorldAutomationPosts"),
    ...JSON.parse(await readFile("src/content/novemberPartnershipPosts.json", "utf8")),
  ];
  for (const post of posts) {
    const html = await documentFor("/blog/" + post.slug);
    const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(article, post.slug);
    const content = text(article);
    assert.ok(content.includes(text(post.title)), post.slug + ": title");
    for (const section of post.sections) {
      if (section.heading) assert.ok(content.includes(text(section.heading)), post.slug + ": " + section.heading);
      for (const paragraph of section.paragraphs) {
        assert.ok(content.includes(text(paragraph)), post.slug + ": missing paragraph " + paragraph.slice(0, 60));
      }
    }
  }
  assert.equal(posts.length, paths.filter((route) => route.startsWith("/blog/")).length);
});

test("homepage product names and links are static HTML, not dependent on the old injected gallery", async () => {
  const html = await documentFor("/");
  for (const slug of ["neuralforge", "forge-coder", "forgeops", "forge-robotics-lab", "game-forge-studio", "forge-media-studio"]) {
    assert.ok(html.includes('href="/forge-suite/' + slug + '"'), slug);
  }
  assert.ok(!html.includes('src="/assets/showcase.js'));
  assert.ok(!html.includes('src="/assets/neural.js'), "DOM enhancement must start after hydration");
});
