// /lib/analytics.ts

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsPrimitive = string | number | boolean | null | undefined;
export type AnalyticsValue =
  | AnalyticsPrimitive
  | AnalyticsPrimitive[]
  | Record<string, AnalyticsPrimitive>;

export type AnalyticsPayload = Record<string, AnalyticsValue>;

type TrackOptions = {
  /**
   * Whether to also emit a gtag event if gtag is present.
   * Defaults to true.
   */
  sendToGtag?: boolean;

  /**
   * Whether to emit to window.dataLayer.
   * Defaults to true.
   */
  sendToDataLayer?: boolean;

  /**
   * Optional callback after dispatch.
   */
  onDispatched?: () => void;
};

const DEFAULT_OPTIONS: Required<Omit<TrackOptions, "onDispatched">> = {
  sendToGtag: true,
  sendToDataLayer: true,
};

function isBrowser() {
  return typeof window !== "undefined";
}

function sanitizeValue(value: AnalyticsValue): AnalyticsValue {
  if (Array.isArray(value)) {
    return value.filter((item) => item !== undefined);
  }

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return Object.fromEntries(
      Object.entries(value).filter(([, nestedValue]) => nestedValue !== undefined)
    );
  }

  return value;
}

function sanitizePayload(payload: AnalyticsPayload = {}): AnalyticsPayload {
  return Object.fromEntries(
    Object.entries(payload)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, sanitizeValue(value)])
  );
}

/**
 * Generic event tracker for GTM dataLayer and optional gtag support.
 *
 * Example:
 * track("click cta", {
 *   cta_label: "Discuss Your Options",
 *   cta_location: "FinancingHero",
 *   intent: "financing inquiry",
 *   page: "/financing",
 * });
 */
export function track(
  eventName: string,
  payload: AnalyticsPayload = {},
  options: TrackOptions = {}
) {
  if (!eventName) return;
  if (!isBrowser()) return;

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const cleanPayload = sanitizePayload(payload);

  if (mergedOptions.sendToDataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...cleanPayload,
    });
  }

  if (mergedOptions.sendToGtag && typeof window.gtag === "function") {
    window.gtag("event", eventName, cleanPayload);
  }

  options.onDispatched?.();
}

/**
 * SPA pageview helper.
 *
 * Example:
 * trackPageView("/financing", {
 *   page_title: "Financing Options for Qualifying Projects",
 * });
 */
export function trackPageView(
  pagePath: string,
  payload: AnalyticsPayload = {},
  options: TrackOptions = {}
) {
  track(
    "view page",
    {
      page: pagePath,
      ...payload,
    },
    options
  );
}

/**
 * CTA helper for consistency across the app.
 *
 * Example:
 * trackCta({
 *   cta_label: "Discuss Your Options",
 *   cta_location: "FinancingHero",
 *   intent: "financing inquiry",
 *   page: "/financing",
 * });
 */
export function trackCta(payload: {
  cta_label: string;
  cta_location: string;
  intent?: string;
  page?: string;
  href?: string;
}) {
  track("click cta", payload);
}

/**
 * Click-to-call helper.
 *
 * Example:
 * trackCallClick({
 *   cta_location: "FinancingCTA",
 *   page: "/financing",
 *   phone_number: "+19044346318",
 *   intent: "financing inquiry",
 * });
 */
export function trackCallClick(payload: {
  cta_location: string;
  page?: string;
  phone_number?: string;
  intent?: string;
}) {
  track("click call", payload);
}

/**
 * Form submit helper.
 */
export function trackFormSubmit(payload: {
  form_name?: string;
  form_location: string;
  page?: string;
  intent?: string;
}) {
  track("submit form", payload);
}