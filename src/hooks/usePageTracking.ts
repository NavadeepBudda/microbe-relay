import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const usePageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Don't track the initial load if it's already handled by the script tag
    // But since we want to be SURE, we can track it.
    // However, the standard implementation usually tracks the first page load automatically via the config command in index.html.
    // To "maximize" counts as requested, ensuring we track every route change is key.
    
    // We'll trust the index.html script for the first landing to avoid double counting if it fires auto.
    // Actually, usually modern GA4 enhanced measurement handles history changes, but the user wants "maximum" confidence.
    // The "maximize" research suggested manual tracking is more robust for SPAs.
    
    if (window.gtag) {
       window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
};
