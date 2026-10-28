import { build } from "vite";
import { mkdtemp, readFile, writeFile, readdir, stat, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function buildPrerender() {
  const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const temporaryDirectory = await mkdtemp(path.join(process.cwd(), ".prerender-"));
  const renderedAt = Date.now();
  let count = 0;
  try {
    await build({
      build: {
        ssr: "src/entry-prerender.tsx",
        outDir: temporaryDirectory,
        emptyOutDir: true,
        copyPublicDir: false,
        minify: false,
        rollupOptions: { output: { entryFileNames: "render.mjs" } },
      },
      ssr: { noExternal: ["react-router", "react-router-dom"] },
    });
    const { render } = await import(pathToFileURL(path.join(temporaryDirectory, "render.mjs")).href);
    for (const route of routes) {
      const file = config.routes.find((rule) => rule.route === route)?.rewrite;
      if (!file) throw new Error("No exact HTML route for " + route);
      let html = await readFile("dist" + file, "utf8");
      // Standalone HTML (currently the privacy policy) is already complete.
      if (!/<div id="root"><\/div>/.test(html)) {
        if (/<div id="root"/.test(html)) throw new Error("Unexpected root markup for " + route);
        continue;
      }
      const body = render(route, renderedAt);
      if (!/<h1\b/.test(body) || !/<main\b/.test(body) || !/<a\b/.test(body)) {
        throw new Error("Incomplete pre-rendered page: " + route);
      }
      html = html.replace(/<div id="root"><\/div>/, () =>
        '<div id="root" data-prerendered="true" data-rendered-at="' + renderedAt + '">' + body + "</div>");
      await writeFile("dist" + file, html);
      count += 1;
    }
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }

  let bytes = 0;
  let fileCount = 0;
  async function measure(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await measure(file);
      else { bytes += (await stat(file)).size; fileCount += 1; }
    }
  }
  await measure("dist");
  // Fail before deployment rather than suggesting a paid plan upgrade.
  if (bytes >= 250_000_000 || fileCount >= 15_000) {
    throw new Error("Build exceeds the Azure free-plan size/file limit; do not upgrade automatically.");
  }
  console.log("Pre-rendered " + count + " React pages; standalone HTML preserved. Deployment: " +
    (bytes / 1_000_000).toFixed(2) + " MB, " + fileCount + " files (below free-plan limits).");
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/build-prerender.mjs")) {
  await buildPrerender();
}
