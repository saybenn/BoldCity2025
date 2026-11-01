const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
function read(key) { try { return JSON.parse(sessionStorage.getItem(key) || "null"); } catch { return null; } }
function write(key, value) { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {} }
export function captureUTMs() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const campaign = Object.fromEntries(KEYS.map((key) => [key, params.get(key) || ""]));
  const current = { ...campaign, landing_page_url: window.location.href, referrer: document.referrer || "" };
  if (!read("bc_first_touch")) write("bc_first_touch", current);
  if (!read("bc_latest_touch") || KEYS.some((key) => campaign[key])) write("bc_latest_touch", current);
  return getUTMParams();
}
export function getUTMParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const first = read("bc_first_touch") || {};
  const latest = read("bc_latest_touch") || first;
  return { ...Object.fromEntries(KEYS.map((key) => [key, params.get(key) || latest[key] || ""])),
    landing_page_url: first.landing_page_url || window.location.href,
    referrer: first.referrer || "" };
}
export function clearUTMParams() {
  if (typeof window === "undefined") return;
  try { sessionStorage.removeItem("bc_first_touch"); sessionStorage.removeItem("bc_latest_touch"); } catch {}
}
