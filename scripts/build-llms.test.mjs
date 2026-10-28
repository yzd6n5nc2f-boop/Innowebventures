import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { generateLlms, literalRecords } from "./build-llms.mjs";

test("new public pages are included and articles appear on their publication date", () => {
  const metadata = Object.fromEntries(["/", "/new-page", "/blog/new-article", "/products/example", "/admin/test"]
    .map((route) => [route, { title: "Example | InnoWeb Ventures", description: "A factual description." }]));
  const input = {
    paths: Object.keys(metadata), metadata, applications: [],
    records: [{ kind: "article", slug: "new-article", title: "New article", publishAt: "2026-11-17T00:00:00Z" }],
  };
  const before = generateLlms({ ...input, now: Date.parse("2026-11-16T23:59:59Z") });
  assert.ok(before.includes("https://www.innowebventures.com/new-page"));
  assert.ok(!before.includes("/blog/new-article"));
  assert.ok(!before.includes("/products/example"));
  assert.ok(!before.includes("/admin/test"));
  const after = generateLlms({ ...input, now: Date.parse("2026-11-17T00:00:00Z") });
  assert.ok(after.includes("[New article](https://www.innowebventures.com/blog/new-article): A factual description."));
  const records = literalRecords("posts.ts", 'export const posts = [{ slug: "new-article", publishAt: "2026-11-17T00:00:00Z", sections: [] }];');
  assert.equal(records.find((item) => item.slug === "new-article").kind, "article");
});

test("deployed Markdown stays short, describes each link and points only to public pages or listed applications", async () => {
  const markdown = await readFile("dist/llms.txt", "utf8");
  const xml = await readFile("dist/sitemap.xml", "utf8");
  const publicUrls = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  const applications = literalRecords("src/pages/Work.tsx", await readFile("src/pages/Work.tsx", "utf8")).filter((item) => item.url);
  const allowed = new Set([...publicUrls, ...applications.map((item) => item.url)]);
  assert.ok(markdown.startsWith("# InnoWeb Ventures\n\n> "));
  assert.ok(markdown.split("\n").length < 150);
  assert.ok(!/<(?:html|script)\b/i.test(markdown));
  const links = [...markdown.matchAll(/^- \[[^\n]+\]\((https:\/\/[^)]+)\): ([^\n]+)$/gm)];
  assert.equal(links.length, (markdown.match(/^- /gm) || []).length);
  assert.equal(new Set(links.map((item) => item[1])).size, links.length);
  for (const link of links) assert.ok(allowed.has(link[1]), "Unknown link: " + link[1]);
  for (const route of ["/services", "/forge-suite", "/work", "/about", "/contact"]) assert.ok(markdown.includes("](" + "https://www.innowebventures.com" + route + ")"));
  assert.ok(markdown.includes("/forge-suite/neuralforge"));
  for (const application of applications) assert.ok(markdown.includes("](" + application.url + ")"));
});
