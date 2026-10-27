// Shared by the static HTML build and React navigation.
export function getSocialMetadata(config, route, metadata) {
  const url = new URL(config.siteUrl);
  url.pathname = route;
  const selected = config.images[route];
  const image = new URL(selected?.image ?? config.defaultImage, config.siteUrl).href;
  const alt = selected?.alt ?? config.defaultImageAlt;
  return {
    canonical: url.href,
    properties: {
      "og:type": route.startsWith("/blog/") ? "article" : "website",
      "og:site_name": "InnoWeb Ventures",
      "og:title": metadata.title,
      "og:description": metadata.description,
      "og:url": url.href,
      "og:image": image,
      "og:image:secure_url": image,
      "og:image:type": "image/jpeg",
      "og:image:width": String(config.width),
      "og:image:height": String(config.height),
      "og:image:alt": alt,
    },
    names: {
      "twitter:card": "summary_large_image",
      "twitter:title": metadata.title,
      "twitter:description": metadata.description,
      "twitter:url": url.href,
      "twitter:image": image,
      "twitter:image:alt": alt,
    },
  };
}
