import { useEffect } from "react";
import { setRenderTime } from "../content/renderTime";

export default function SiteEnhancements() {
  useEffect(() => {
    setRenderTime(Date.now());
    // The visual enhancer mutates the DOM. Start it only after React has
    // hydrated the initial HTML, so it cannot cause a hydration mismatch.
    if (!document.getElementById("neural-enhancement")) {
      const script = document.createElement("script");
      script.id = "neural-enhancement";
      script.src = "/assets/neural.js?v=synced-3d";
      script.async = true;
      document.body.append(script);
    }
    document.documentElement.dataset.hydrated = "true";
  }, []);
  return null;
}
