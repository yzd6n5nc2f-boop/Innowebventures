import { readFile, writeFile, mkdir } from "node:fs/promises";

const posts = JSON.parse(await readFile("src/content/novemberPartnershipPosts.json", "utf8"));
const template = await readFile("dist/index.html", "utf8");
const origin = "https://www.innowebventures.com";
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));

for (const post of posts) {
  const url = `${origin}/blog/${post.slug}`;
  const image = `${origin}${post.image}`;
  const metadata = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="InnoWeb Ventures" />`,
    `<meta property="og:title" content="${escape(post.title)}" />`,
    `<meta property="og:description" content="${escape(post.excerpt)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escape(post.imageAlt)}" />`,
    `<meta property="article:published_time" content="${post.publishAt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(post.title)}" />`,
    `<meta name="twitter:description" content="${escape(post.excerpt)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join("\n    ");
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(post.title)} · InnoWeb Ventures</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(post.excerpt)}" />`)
    .replace("</head>", `    ${metadata}\n  </head>`);
  const directory = `dist/blog/${post.slug}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
  config.routes ??= [];
  config.routes.push({ route: `/blog/${post.slug}`, rewrite: `/blog/${post.slug}/index.html` });
}

await writeFile("dist/staticwebapp.config.json", JSON.stringify(config, null, 2) + "\n");
console.log(`Built ${posts.length} campaign pages with article-specific sharing metadata.`);
