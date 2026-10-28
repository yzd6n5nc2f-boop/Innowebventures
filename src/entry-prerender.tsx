import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import AppErrorBoundary from "./components/AppErrorBoundary";
import PageMetadata from "./components/PageMetadata";
import SiteEnhancements from "./components/SiteEnhancements";
import { setRenderTime } from "./content/renderTime";

// Reuse the actual route components and CSS modules, not a second copy of the content.
export function render(url: string, renderedAt: number) {
  setRenderTime(renderedAt);
  return renderToString(
    <React.StrictMode>
      <AppErrorBoundary>
        <StaticRouter location={url}>
          <PageMetadata />
          <App />
          <SiteEnhancements />
        </StaticRouter>
      </AppErrorBoundary>
    </React.StrictMode>
  );
}
