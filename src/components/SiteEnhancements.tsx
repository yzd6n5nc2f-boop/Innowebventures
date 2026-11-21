import { useEffect } from "react";
import { setRenderTime } from "../content/renderTime";

export default function SiteEnhancements() {
  useEffect(() => {
    setRenderTime(Date.now());
    document.documentElement.dataset.hydrated = "true";
  }, []);
  return null;
}
