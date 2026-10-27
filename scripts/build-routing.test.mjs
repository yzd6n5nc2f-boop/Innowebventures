import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

test("production routes serve every real URL and never accept unknown paths or slugs", async () => {
  const configText = await readFile("dist/staticwebapp.config.json", "utf8");
  const config = JSON.parse(configText);
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const rules = new Map(config.routes.map((rule) => [rule.route, rule]));
  assert.equal(config.navigationFallback, undefined);
  assert.deepEqual(config.responseOverrides["404"], { rewrite: "/404.html" });
  assert.ok(Buffer.byteLength(configText) < 20_000);
  assert.equal(paths.length, 52);
  assert.ok(!paths.includes("/404.html"));
  for (const route of paths) {
    const rule = rules.get(route);
    assert.ok(rule?.rewrite, `Missing SPA/static rewrite for ${route}`);
    await readFile(`dist${rule.rewrite}`);
  }
  const normalized = config.routes.map((rule) => rule.route.replace(/\/$/, "") || "/");
  assert.equal(new Set(normalized).size, normalized.length, "Azure treats trailing-slash variants as duplicate routes");
  for (const route of ["/does-not-exist", "/blog/not-a-real-post", "/services/not-a-service", "/products/not-a-product", "/forge-suite/not-a-product", "/work/not-a-case-study", "/services/extra/path", "/assets/missing.js", "/branding/missing.png"]) {
    assert.ok(!rules.has(route), `${route} must reach Azure's real 404 handling`);
    await assert.rejects(readFile(`dist${route}`));
  }
  assert.ok(!config.routes.some((rule) => /[:*]/.test(rule.route)), "No wildcard/pattern can serve invalid slugs as 200");
  for (const [route, target] of [["/products", "/solutions"], ["/capabilities", "/platform"], ["/how-it-works", "/delivery-method"], ["/how-we-build", "/delivery-method"], ["/work/operational-build-layer", "/work"]]) {
    assert.equal(rules.get(route)?.redirect, target);
    assert.equal(rules.get(route)?.statusCode, 301);
  }
  for (const rule of config.routes.filter((rule) => rule.route.startsWith("/blog/") && rule.rewrite !== "/index.html" && rule.rewrite)) {
    assert.match(await readFile(`dist${rule.rewrite}`, "utf8"), /property="og:type" content="article"/);
  }
  const html = await readFile("dist/404.html", "utf8");
  assert.match(html, /404.*Page not found/i);
  assert.match(html, /name="robots" content="noindex"/);
  assert.doesNotMatch(html, /<script/i, "The 404 must be useful without JavaScript");
  for (const href of ["/services", "/blog", "/contact", "/"]) assert.ok(html.includes(`href="${href}"`));
  assert.match(await readFile("src/App.tsx", "utf8"), /path="\*" element=\{<NotFound \/>\}/);
  const workflow = await readFile(".github/workflows/azure-static-web-apps-gray-bay-0d8f29410.yml", "utf8");
  assert.match(workflow, /app_location: "dist"/);
  assert.match(workflow, /skip_app_build: true/);
  assert.match(workflow, /config_file_location: "dist"/);
  for (const file of ["BlogPost", "ProductDetail", "ServiceDetail"]) assert.match(await readFile(`src/pages/${file}.tsx`, "utf8"), /return <NotFound \/>/);
});

test("newly discovered public URLs automatically receive exact hosting rules", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "innoweb-routing-"));
  const generator = pathToFileURL(path.resolve("scripts/build-routing.mjs")).href;
  try {
    await mkdir(path.join(directory, "dist"));
    await mkdir(path.join(directory, "src"));
    await writeFile(path.join(directory, "dist/staticwebapp.config.json"), JSON.stringify({ navigationFallback: { rewrite: "/index.html" }, routes: [{ route: "/privacy-policy", rewrite: "/privacy-policy/index.html" }] }));
    await writeFile(path.join(directory, "dist/sitemap.xml"), '<urlset><url><loc>https://www.innowebventures.com/new-page</loc></url><url><loc>https://www.innowebventures.com/blog/new-post</loc></url><url><loc>https://www.innowebventures.com/privacy-policy</loc></url></urlset>');
    await writeFile(path.join(directory, "src/App.tsx"), 'export default function App() { return <Routes><Route path="/old" element={<Navigate to="/new-page" replace />} /></Routes>; }');
    execFileSync(process.execPath, ["--input-type=module", "-e", `const {buildRouting} = await import(${JSON.stringify(generator)}); await buildRouting();`], { cwd: directory });
    const config = JSON.parse(await readFile(path.join(directory, "dist/staticwebapp.config.json"), "utf8"));
    for (const route of ["/new-page", "/blog/new-post"]) assert.equal(config.routes.find((rule) => rule.route === route).rewrite, "/index.html");
    assert.equal(config.routes.find((rule) => rule.route === "/privacy-policy").rewrite, "/privacy-policy/index.html");
    assert.equal(config.routes.find((rule) => rule.route === "/old").redirect, "/new-page");
    assert.equal(config.navigationFallback, undefined);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
