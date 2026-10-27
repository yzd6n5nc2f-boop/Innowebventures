import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import metadata from "../content/pageMetadata.json";

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
    for (const [selector, content] of [
      ['meta[property="og:title"]', page.title],
      ['meta[property="og:description"]', page.description],
      ['meta[name="twitter:title"]', page.title],
      ['meta[name="twitter:description"]', page.description],
    ]) document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);

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
