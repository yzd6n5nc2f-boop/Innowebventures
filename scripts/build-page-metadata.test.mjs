import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";
import { applyMetadata } from "./build-page-metadata.mjs";
import { getSocialMetadata } from "../src/content/socialMetadata.mjs";

const unescape = (value) => value.replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"))?.[2];

test("every public document contains exactly the approved searchable title and description without JavaScript", async () => {
  const metadata = JSON.parse(await readFile("src/content/pageMetadata.json", "utf8"));
  const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
  const socialConfig = JSON.parse(await readFile("src/content/socialMetadata.json", "utf8"));
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  for (const route of [...paths, "/404.html"]) {
    const approved = metadata[route];
    assert.ok(approved, `Missing approved metadata for ${route}`);
    assert.ok(approved.title.length < 60, route);
    assert.ok(approved.description.length < 155, route);
    const file = route === "/404.html" ? "/404.html" : config.routes.find((rule) => rule.route === route).rewrite;
    const html = await readFile(`dist${file}`, "utf8");
    const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    const descriptions = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).filter((tag) => attribute(tag, "name")?.toLowerCase() === "description");
    assert.equal(titles.length, 1, route);
    assert.equal(descriptions.length, 1, route);
    assert.equal(unescape(titles[0][1]), approved.title, route);
    assert.equal(unescape(attribute(descriptions[0], "content")), approved.description, route);
    const canonicals = (html.match(/<link\b[^>]*>/gi) ?? []).filter((tag) => attribute(tag, "rel") === "canonical");
    assert.equal(canonicals.length, 1, route);
    assert.equal(attribute(canonicals[0], "href"), `https://www.innowebventures.com${route}`, route);
    const expectedSocial = getSocialMetadata(socialConfig, route, approved);
    for (const [attr, values] of [["property", expectedSocial.properties], ["name", expectedSocial.names]]) {
      for (const [key, value] of Object.entries(values)) {
        const tags = (html.match(/<meta\b[^>]*>/gi) ?? []).filter((tag) => attribute(tag, attr) === key);
        assert.equal(tags.length, 1, `${route}: ${key}`);
        assert.equal(unescape(attribute(tags[0], "content")), value, `${route}: ${key}`);
      }
    }
    for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
      const kind = attribute(tag, "property") ?? attribute(tag, "name");
      if (["og:title", "twitter:title"].includes(kind)) assert.equal(unescape(attribute(tag, "content")), approved.title, route);
      if (["og:description", "twitter:description"].includes(kind)) assert.equal(unescape(attribute(tag, "content")), approved.description, route);
    }
  }
  assert.equal(config.routes.find((rule) => rule.route === "/assets/page-metadata/*").statusCode, 404);
  assert.equal(config.routes.find((rule) => rule.route === "/assets/page-metadata/*").headers["X-Robots-Tag"], "noindex");
  for (const rule of config.routes) if (rule.rewrite) assert.equal(rule.statusCode, undefined, "Azure forbids statusCode on rewrite rules");
  assert.equal(config.routes.find((rule) => rule.route === "/404.html").statusCode, 404);
  assert.match(await readFile("dist/404.html", "utf8"), /name="robots" content="noindex"/);
  assert.ok(!sitemap.includes("/404.html"));
  for (const file of ["privacy-policy/index.html", "404.html"]) {
    const body = (html) => html.match(/<body\b[^>]*>[\s\S]*<\/body>/i)?.[0];
    assert.equal(body(await readFile(`dist/${file}`, "utf8")), body(await readFile(`public/${file}`, "utf8")));
  }
});

test("default and article sharing images are real 1200 by 630 JPEG assets", async () => {
  const config = JSON.parse(await readFile("src/content/socialMetadata.json", "utf8"));
  const images = new Set([config.defaultImage, ...Object.values(config.images).map((item) => item.image)]);
  for (const image of images) {
    const data = await readFile(`public${image}`);
    assert.equal(data.readUInt16BE(0), 0xffd8, image);
    let dimensions;
    for (let offset = 2; offset < data.length;) {
      assert.equal(data[offset], 0xff, image);
      const marker = data[offset + 1];
      if ([0xc0, 0xc1, 0xc2].includes(marker)) {
        dimensions = [data.readUInt16BE(offset + 7), data.readUInt16BE(offset + 5)];
        break;
      }
      offset += data.readUInt16BE(offset + 2) + 2;
    }
    assert.deepEqual(dimensions, [1200, 630], image);
  }
});

test("HTML escaping and quote handling preserve text and existing social metadata", () => {
  const metadata = { title: 'AI & "Tools" $&', description: "A user's guide to <AI> & tools." };
  const original = `<html><head><title>Old</title><meta content="old" name="description"><meta property="og:title" content="User's old title"><meta name="twitter:description" content="Old"></head><body>Unchanged</body></html>`;
  const html = applyMetadata(original, metadata);
  assert.ok(html.includes("AI &amp; &quot;Tools&quot; $&"));
  assert.ok(!html.includes("old title"));
  assert.ok(html.endsWith("<body>Unchanged</body></html>"));
  assert.equal(applyMetadata(html, metadata), html, "Running the transformation twice should not duplicate tags or whitespace");
});

test("client navigation updates metadata, clears stale article titles, and restores indexable pages after a missing route", async () => {
  const metadata = JSON.parse(await readFile("src/content/pageMetadata.json", "utf8"));
  const socialConfig = JSON.parse(await readFile("src/content/socialMetadata.json", "utf8"));
  const elements = [];
  function element() {
    return { name: "", content: "", dataset: {}, setAttribute(key, value) { this[key] = value; }, remove() { elements.splice(elements.indexOf(this), 1); } };
  }
  const document = {
    title: "Initial",
    head: { append(node) { elements.push(node); } },
    createElement: element,
    querySelector(selector) {
      if (selector === 'meta[data-page-metadata="robots"]') return elements.find((node) => node.dataset.pageMetadata === "robots");
      const match = selector.match(/^(?:meta|link)\[(name|property|rel)="([^"]+)"\]$/);
      return match ? elements.find((node) => node[match[1]] === match[2]) : null;
    },
  };
  let pathname = "/";
  const module = { exports: {} };
  const code = ts.transpileModule(await readFile("src/components/PageMetadata.tsx", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports, document,
    require(name) {
      if (name === "react") return { useEffect: (callback) => callback() };
      if (name === "react-router-dom") return { useLocation: () => ({ pathname }) };
      if (name.endsWith("pageMetadata.json")) return metadata;
      if (name.endsWith("socialMetadata.json")) return socialConfig;
      if (name.endsWith("socialMetadata.mjs")) return { getSocialMetadata };
      throw new Error(`Unexpected import ${name}`);
    },
  });
  for (const route of ["/blog/the-work-behind-the-workflow", "/blog/the-machine-goes-in-first", "/services", "/contact/", "/blog/missing", "/"]) {
    pathname = route;
    module.exports.default();
    const expected = metadata[route.replace(/\/$/, "") || "/"] ?? metadata["/404.html"];
    assert.equal(document.title, expected.title, route);
    assert.equal(elements.filter((node) => node.name === "description").length, 1);
    assert.equal(elements.find((node) => node.name === "description").content, expected.description, route);
    assert.equal(elements.some((node) => node.name === "robots" && node.content === "noindex"), route === "/blog/missing", route);
    const normalized = route.replace(/\/$/, "") || "/";
    const url = `https://www.innowebventures.com${normalized}`;
    assert.equal(elements.find((node) => node.rel === "canonical").href, url, route);
    assert.equal(elements.find((node) => node.property === "og:url").content, url, route);
    assert.equal(elements.find((node) => node.name === "twitter:url").content, url, route);
    assert.equal(elements.find((node) => node.name === "twitter:card").content, "summary_large_image", route);
    assert.equal(elements.filter((node) => node.property === "og:image").length, 1);
    const image = socialConfig.images[normalized]?.image ?? socialConfig.defaultImage;
    assert.equal(elements.find((node) => node.property === "og:image").content, `https://www.innowebventures.com${image}`, route);
  }
  assert.ok(!(await readFile("src/pages/BlogPost.tsx", "utf8")).includes("document.title"));
});
