import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { track } from "@/lib/analytics";
import { captureUTMs } from "@/lib/utm";
import { getAnalyticsConsent, subscribeAnalyticsConsent } from "@/lib/analytics-consent";

export default function AnalyticsLifecycle() {
  const router = useRouter();
  const lastPath = useRef("");
  const started = useRef(new WeakSet<HTMLFormElement>());
  useEffect(() => {
    window.bcDelegatedTracking = true;
    function pageView() {
      const path = window.location.pathname;
      captureUTMs();
      if (getAnalyticsConsent() !== "granted") { lastPath.current = ""; return; }
      if (path === lastPath.current) return;
      lastPath.current = path;
      track("page_view", { page_path: path, page_location: `${window.location.origin}${path}`,
        page_title: document.title, page_type: path === "/" ? "home" : path.split("/")[1] });
    }
    function click(event: MouseEvent) {
      const link = (event.target as Element)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const cta_location = link.getAttribute("data-cta-location") || link.closest("section,header,footer,nav")?.tagName.toLowerCase() || "page";
      const hero_variant = document.querySelector("[data-hero-variant]")?.getAttribute("data-hero-variant") || "none";
      if (href.startsWith("tel:")) {
        track("phone_click", { cta_location, page_path: window.location.pathname, phone_number: href.replace("tel:", ""), hero_variant });
      } else if (/^(\/contact|\/financing|#request-service|#contact)/.test(href)) {
        track("cta_click", { cta_location, cta_label: link.textContent?.trim().slice(0, 100), href, page_path: window.location.pathname, hero_variant });
      }
    }
    function start(event: FocusEvent) {
      const input = event.target as HTMLInputElement;
      const form = input.form;
      if (!form || input.type === "hidden" || started.current.has(form)) return;
      started.current.add(form);
      track("form_start", { form_id: form.dataset.analyticsForm || form.id || "service_request", page_path: window.location.pathname });
    }
    function invalid() { track("form_error", { error_category: "validation", page_path: window.location.pathname }); }
    pageView();
    const unsubscribe = subscribeAnalyticsConsent(pageView);
    router.events.on("routeChangeComplete", pageView);
    document.addEventListener("click", click);
    document.addEventListener("focusin", start);
    document.addEventListener("invalid", invalid, true);
    return () => {
      unsubscribe();
      router.events.off("routeChangeComplete", pageView);
      document.removeEventListener("click", click);
      document.removeEventListener("focusin", start);
      document.removeEventListener("invalid", invalid, true);
      window.bcDelegatedTracking = false;
    };
  }, [router.events]);
  return null;
}
