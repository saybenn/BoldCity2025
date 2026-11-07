import { ALLOWED_SERVICES } from "./contact-services";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    bcDelegatedTracking?: boolean;
  }
}
export type AnalyticsPayload = Record<string, unknown>;
const KEYS = new Set(["page", "page_path", "page_location", "page_type", "page_title", "cta_label", "cta_location", "href", "intent", "phone_number", "form_id", "form_name", "form_location", "service_requested", "error_category", "hero_variant", "review_source"]);
const LEGACY = { "click cta": "cta_click", "click call": "phone_click", "submit form": "generate_lead", "view page": "page_view", "lead success view": "lead_success_view" };
export function track(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined" || !eventName) return;
  const clean: AnalyticsPayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (!KEYS.has(key) || !["string", "number", "boolean"].includes(typeof value)) continue;
    if (key === "service_requested" && !ALLOWED_SERVICES.has(String(value))) continue;
    if (["page", "page_path", "href", "page_location"].includes(key)) {
      const text = String(value);
      if (text.startsWith("mailto:")) continue;
      clean[key] = text.split(/[?#]/)[0];
    } else clean[key] = value;
  }
  const event = LEGACY[eventName] || eventName;
  // GTM's data-layer model retains earlier values. A later modal/lead form may
  // omit these optional fields; null clears the preceding form's context.
  if (event === "generate_lead") {
    for (const key of ["service_requested", "form_name"]) if (!(key in clean)) clean[key] = null;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...clean, event });
}
// Page navigation is owned by AnalyticsLifecycle, including initial load.
export function trackPageView(page: string, payload: AnalyticsPayload = {}) {
  if (typeof window !== "undefined" && !window.bcDelegatedTracking) track("page_view", { ...payload, page });
}
export function trackCta(payload: AnalyticsPayload) {
  if (typeof window !== "undefined" && window.bcDelegatedTracking) return;
  if (String(payload.href || "").startsWith("tel:")) return;
  track("cta_click", payload);
}
export function trackCallClick(payload: AnalyticsPayload) {
  if (typeof window !== "undefined" && !window.bcDelegatedTracking) track("phone_click", payload);
}
// Call only after the API explicitly returns ok:true AND accepted:true.
export function trackFormSubmit(payload: AnalyticsPayload) {
  track("generate_lead", { ...payload, form_id: payload.form_id || payload.form_location });
}
export function trackFormError(form_location: string, error_category: string) {
  track("form_error", { form_id: form_location, form_location, error_category });
}
