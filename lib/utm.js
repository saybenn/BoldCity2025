// /lib/utm.js

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function isBrowser() {
  return typeof window !== "undefined";
}

export function captureUTMs() {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);
  const captured = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);

    if (value) {
      localStorage.setItem(key, value);
      captured[key] = value;
    }
  });

  return captured;
}

export function getUTMParams() {
  if (!isBrowser()) {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const values = {};

  UTM_KEYS.forEach((key) => {
    const fromUrl = params.get(key);
    const fromStorage = localStorage.getItem(key);

    values[key] = fromUrl || fromStorage || "";
  });

  return values;
}

export function clearUTMParams() {
  if (!isBrowser()) return;

  UTM_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
}
