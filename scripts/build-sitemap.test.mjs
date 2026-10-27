import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

test("discovers new routes/posts, preserves per-post lastmod, and excludes private/utility routes", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "innoweb-sitemap-"));
  const generator = pathToFileURL(path.resolve("scripts/build-sitemap.mjs")).href;
  const git = (...args) => execFileSync("git", args, { cwd: directory, encoding: "utf8" });
  async function write(file, text) {
    await mkdir(path.dirname(path.join(directory, file)), { recursive: true });
    await writeFile(path.join(directory, file), text);
  }
  function commit(message, date) {
    git("add", ".");
    execFileSync("git", ["commit", "-qm", message], {
      cwd: directory, env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
    });
  }
  try {
    git("init", "-q");
    git("config", "user.name", "Sitemap test");
    git("config", "user.email", "sitemap@example.com");
    await mkdir(path.join(directory, "dist"));
    await write("index.html", '<div id="root"></div>');
    await write("src/main.tsx", "// app bootstrap\n");
    await write("src/styles/global.css", "body {}\n");
    await write("public/assets/refined.css", "body {}\n");
    await write("src/pages/Home.tsx", "export default function Home() {}\n");
    await write("src/pages/BlogPost.tsx", 'import { posts } from "../content/posts";\nexport default function BlogPost() {}\n');
    const article = (slug, title) => `{ slug: "${slug}", title: "${title}", published: "17 November 2026", sections: [] }`;
    const first = article("first", "Original");
    const unchanged = article("unchanged", "Unchanged");
    await write("src/content/posts.ts", `export const posts = [${first}, ${unchanged}];\n`);
    const app = (extra = "") => `import Home from "./pages/Home";\nimport BlogPost from "./pages/BlogPost";\nexport default function App() { return <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/old" element={<Navigate to="/" />} />
      <Route path="/admin/settings" element={<Home />} />
      <Route path="/test" element={<Home />} />
      <Route path="/preview/demo" element={<Home />} />
      <Route path="/thank-you" element={<Home />} />
      <Route path="*" element={<Home />} />${extra}</Routes>; }`;
    await write("src/App.tsx", app());
    await write("public/privacy-policy/index.html", "<h1>Privacy</h1>");
    await write("public/assets/brain/index.html", "<h1>Preview</h1>");
    await write("public/preview/index.html", "<h1>Preview</h1>");
    await write("public/hidden.html", '<meta name="robots" content="noindex">');
    commit("Initial content", "2026-10-01T10:00:00Z");
    await write("src/content/posts.ts", `export const posts = [${article("first", "Updated")}, ${unchanged}];\n`);
    commit("Update one article", "2026-10-20T10:00:00Z");
    await write("src/content/posts.ts", `export const posts = [${article("first", "Updated")}, ${unchanged}, ${article("new-post", "New")}, ${article("preview", "Preview")}];\n`);
    await write("src/pages/New.tsx", "export default function New() {}\n");
    await write("src/App.tsx", app('<Route path="/new-page" element={<Home />} />'));
    commit("Add route and post", "2026-10-27T10:00:00Z");
    const run = () => execFileSync(process.execPath, ["--input-type=module", "-e", `const {generateSitemap} = await import(${JSON.stringify(generator)}); await generateSitemap();`], { cwd: directory, encoding: "utf8" });
    run();
    const xml = await readFile(path.join(directory, "dist/sitemap.xml"), "utf8");
    const entries = new Map([...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)].map((match) => [match[1], match[2]]));
    const origin = "https://www.innowebventures.com";
    assert.equal(entries.size, 6);
    assert.equal(entries.get(`${origin}/blog/first`), "2026-10-20");
    assert.equal(entries.get(`${origin}/blog/unchanged`), "2026-10-01");
    assert.equal(entries.get(`${origin}/blog/new-post`), "2026-10-27");
    assert.equal(entries.get(`${origin}/new-page`), "2026-10-27");
    assert.ok(entries.has(`${origin}/privacy-policy`));
    assert.ok(![...entries.keys()].some((url) => /admin|test|preview|thank-you|hidden|\/old$/.test(url)));
    assert.equal(new Set(entries.keys()).size, entries.size);
    assert.match(xml, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
    assert.match(await readFile(path.join(directory, "dist/robots.txt"), "utf8"), /Sitemap: https:\/\/www.innowebventures.com\/sitemap.xml/);
    run();
    assert.equal(await readFile(path.join(directory, "dist/sitemap.xml"), "utf8"), xml, "An unchanged rebuild must not change lastmod dates");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
