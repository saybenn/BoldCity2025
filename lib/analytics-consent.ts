export type AnalyticsConsent = "unknown" | "granted" | "denied";
export const ANALYTICS_CONSENT_KEY = "bc_analytics_choice_v1";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const MEASUREMENT_ID = "G-9G03529W5P";
let sessionChoice: AnalyticsConsent = "unknown";
let storageUnavailable = false;
const subscribers = new Set<() => void>();

declare global {
  interface Window {
    bcGoogleConsentInitialized?: boolean;
    bcGtmLoaded?: boolean;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return "unknown";
  if (storageUnavailable) return sessionChoice;
  try {
    const value = JSON.parse(window.localStorage.getItem(ANALYTICS_CONSENT_KEY) || "null");
    if (value && ["granted", "denied"].includes(value.choice) && Number.isFinite(value.at)
      && value.at <= Date.now() && Date.now() - value.at < MAX_AGE) return value.choice;
  } catch { /* Missing, blocked or malformed storage never grants consent. */ }
  return "unknown";
}

export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const domains = new Set([window.location.hostname, "boldcityiaq.com"]);
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
  }
}

// Standard Google command messages, not a second analytics-event transport.
// No Google script exists before Allow: this is basic, rather than advanced,
// consent behavior. Advertising consent stays denied in this GA4-only release.
export function applyGoogleConsent(choice: AnalyticsConsent) {
  if (typeof window === "undefined") return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = choice !== "granted";
  if (choice !== "granted") clearAnalyticsCookies();
  window.dataLayer = window.dataLayer || [];
  function command(...args: unknown[]) {
    if (args.length) window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
  }
  if (!window.bcGoogleConsentInitialized) {
    command("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    command("set", "ads_data_redaction", true);
    window.bcGoogleConsentInitialized = true;
  }
  command("consent", "update", { analytics_storage: choice === "granted" ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
}

export function setAnalyticsConsent(choice: "granted" | "denied") {
  if (typeof window === "undefined") return;
  sessionChoice = choice;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify({ choice, at: Date.now() }));
    storageUnavailable = false;
  } catch { storageUnavailable = true; }
  applyGoogleConsent(choice);
  subscribers.forEach(listener => listener());
  // Removing a Script element cannot unload already-executing GTM listeners.
  // Disable GA4 first, then reload on withdrawal to truly unload the container.
  if (choice === "denied" && window.bcGtmLoaded) window.location.reload();
}

function storageChanged(event: StorageEvent) {
  if (event.key !== ANALYTICS_CONSENT_KEY && event.key !== null) return;
  storageUnavailable = false;
  const choice = getAnalyticsConsent();
  applyGoogleConsent(choice);
  subscribers.forEach(listener => listener());
  if (choice !== "granted" && window.bcGtmLoaded) window.location.reload();
}

export function subscribeAnalyticsConsent(listener: () => void) {
  // The loader, lifecycle and UI share one storage listener. Withdrawal must
  // reload once per tab, irrespective of how many components subscribe.
  if (subscribers.size === 0) window.addEventListener("storage", storageChanged);
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
    if (subscribers.size === 0) window.removeEventListener("storage", storageChanged);
  };
}

export const serverAnalyticsConsent = (): AnalyticsConsent => "unknown";
