import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppErrorBoundary from "./components/AppErrorBoundary";
import PageMetadata from "./components/PageMetadata";
import SiteEnhancements from "./components/SiteEnhancements";
import { setRenderTime } from "./content/renderTime";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to mount app: missing #root element in index.html");
}

const renderedAt = Number(rootElement.dataset.renderedAt);
setRenderTime(renderedAt || Date.now());

const app = (
  <React.StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <PageMetadata />
        <App />
        <SiteEnhancements />
      </BrowserRouter>
    </AppErrorBoundary>
  </React.StrictMode>
);

if (rootElement.dataset.prerendered === "true") {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
