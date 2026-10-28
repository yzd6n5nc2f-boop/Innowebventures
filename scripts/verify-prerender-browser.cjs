const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");
const { chromium } = require("playwright");

async function main() {
  const config = JSON.parse(await fs.readFile("dist/staticwebapp.config.json", "utf8"));
  const xml = await fs.readFile("dist/sitemap.xml", "utf8");
  const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const contentTypes = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css",
    ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".webp": "image/webp", ".svg": "image/svg+xml", ".xml": "application/xml" };
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURI(new URL(req.url, "http://localhost").pathname);
      const route = pathname.replace(/\/$/, "") || "/";
      const rule = config.routes.find((item) => item.route === route ||
        (item.route.endsWith("*") && route.startsWith(item.route.slice(0, -1))));
      if (rule?.redirect) { res.writeHead(rule.statusCode || 302, { Location: rule.redirect }); res.end(); return; }
      let status = rule?.statusCode || 200;
      let relative = rule?.rewrite || pathname;
      if (status === 404) relative = "/404.html";
      if (relative === "/") relative = "/index.html";
      const file = path.resolve("dist", "." + relative);
      if (!file.startsWith(path.resolve("dist") + path.sep)) throw new Error("Invalid path");
      let data;
      try { data = await fs.readFile(file); }
      catch { status = 404; relative = "/404.html"; data = await fs.readFile("dist/404.html"); }
      res.writeHead(status, { "Content-Type": contentTypes[path.extname(relative)] || "application/octet-stream" });
      res.end(data);
    } catch (error) { res.writeHead(500); res.end(String(error)); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = "http://127.0.0.1:" + server.address().port;
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  async function context(javaScriptEnabled) {
    const context = await browser.newContext({ javaScriptEnabled });
    await context.route("**/*", (route) => {
      const request = route.request();
      if (!request.url().startsWith(origin + "/")) return route.abort();
      if (request.isNavigationRequest() && request.frame().parentFrame()) return route.abort();
      return route.continue();
    });
    return context;
  }
  try {
    const plain = await context(false);
    const interactive = await context(true);
    const rawPage = await plain.newPage();
    const page = await interactive.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && /hydration|did not match|Minified React error/i.test(message.text())) errors.push(message.text());
    });
    for (const route of routes) {
      const response = await rawPage.goto(origin + route);
      assert.equal(response.status(), 200, route);
      const snapshot = await rawPage.locator("main").evaluate((node) => ({
        headings: [...node.querySelectorAll("h1,h2,h3")].map((el) => el.textContent),
        paragraphs: [...node.querySelectorAll("p")].map((el) => el.textContent),
      }));
      assert.equal(await rawPage.locator("h1").count(), 1, route);
      assert.ok(await rawPage.locator('a[href="/contact"]').count(), route);
      await page.goto(origin + route);
      if (route !== "/privacy-policy") await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
      const hydrated = await page.locator("main").evaluate((node) => ({
        headings: [...node.querySelectorAll("h1,h2,h3")].map((el) => el.textContent),
        paragraphs: [...node.querySelectorAll("p")].map((el) => el.textContent),
      }));
      assert.deepEqual(hydrated, snapshot, route + ": content changed during hydration");
    }
    await page.goto(origin + "/");
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
    await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "About", exact: true }).click();
    await page.waitForURL(origin + "/about");
    assert.match(await page.title(), /InnoWeb/);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://www.innowebventures.com/about");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open navigation", exact: true }).click();
    await page.getByRole("dialog", { name: "Navigation" }).getByRole("link", { name: /Start a Project/ }).click();
    await page.waitForURL(origin + "/contact");
    // Mock the API: never send a real enquiry during verification.
    await page.route("**/api/**", (route) => route.fulfill({ status: 200, contentType: "application/json",
      body: JSON.stringify({ success: true, message: "Test enquiry accepted" }) }));
    await page.getByLabel("Name", { exact: true }).fill("Build verification");
    await page.getByLabel("Email", { exact: true }).fill("verification@example.com");
    await page.locator('textarea[name="challenge"]').fill("Local build test; no message sent.");
    await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
    await page.getByRole("status").filter({ hasText: "Test enquiry accepted" }).waitFor();
    assert.deepEqual(errors, [], "Browser or hydration errors");
    const missing = await rawPage.goto(origin + "/this-page-does-not-exist");
    assert.equal(missing.status(), 404);
    assert.ok(await rawPage.locator('a[href="/services"]').count());
    console.log("Verified all " + routes.length + " public pages without JavaScript and after hydration; navigation, mobile menu, mocked form and 404 passed.");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
