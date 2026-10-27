import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import metadata from "../content/pageMetadata.json";
import socialConfig from "../content/socialMetadata.json";
import { getSocialMetadata } from "../content/socialMetadata.mjs";

type Metadata = { title: string; description: string };
const pages: Record<string, Metadata> = metadata;

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const route = decodeURI(pathname).replace(/\/$/, "") || "/";
    const page = pages[route] ?? pages["/404.html"];
    document.title = page.title;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = page.description;
    const social = getSocialMetadata(socialConfig, route, page);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = social.canonical;
    for (const [attribute, tags] of [["property", social.properties], ["name", social.names]] as const) {
      for (const [key, value] of Object.entries(tags)) {
        let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute(attribute, key);
          document.head.append(tag);
        }
        tag.content = value;
      }
    }

    const managedRobots = document.querySelector<HTMLMetaElement>('meta[data-page-metadata="robots"]');
    if (!pages[route] || route === "/404.html") {
      const robots = managedRobots ?? document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex";
      robots.dataset.pageMetadata = "robots";
      if (!managedRobots) document.head.append(robots);
    } else managedRobots?.remove();
  }, [pathname]);
  return null;
}
