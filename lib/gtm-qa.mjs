// Diagnostic mode loads GTM/Tag Assistant but deliberately prevents collection.
// No GA4, Ads, Floodlight or GTM service-worker collection origin is allowed.
// unsafe-inline/eval are limited to the existing Next development runtime.
export const GTM_QA_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/gtm.js https://www.googletagmanager.com/gtag/js https://www.googletagmanager.com/debug/ https://tagmanager.google.com https://tagassistant.google.com",
  "connect-src 'self' ws://localhost:* ws://127.0.0.1:* https://tagassistant.google.com",
  "img-src 'self' data: blob: https://www.googletagmanager.com/debug/ https://ssl.gstatic.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://tagassistant.google.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");
