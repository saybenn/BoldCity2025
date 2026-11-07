import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { getContext } from "@netlify/functions";
import { deploymentContext, deploymentProvider } from "./deployment.mjs";

export function contactClientIP(req) {
  let ip;
  if (deploymentProvider(process.env) === "netlify") {
    try { ip = getContext().ip; } catch { return null; }
  } else if (process.env.VERCEL === "1") {
    ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  } else {
    ip = req.socket?.remoteAddress;
  }
  return typeof ip === "string" && isIP(ip) ? ip : null;
}

// Supplemental per-instance throttle. Turnstile's single-use verification is the
// cross-instance protection. Apply an edge rate rule before enabling auto-replies.
const attempts = new Map();
export function allowContactAttempt(ip, now = Date.now()) {
  const key = createHash("sha256").update(ip).digest("hex");
  for (const [id, value] of attempts) if (value.expires <= now) attempts.delete(id);
  const entry = attempts.get(key) || { count: 0, expires: now + 600_000 };
  if (entry.count >= 10) return false;
  if (attempts.size >= 10_000 && !attempts.has(key)) return false;
  entry.count += 1;
  attempts.set(key, entry);
  return true;
}
export async function verifyContactToken(token, formType, requestHost, fetcher = fetch) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: false, unavailable: true };
  if (typeof token !== "string" || !token || token.length > 2048) return { ok: false };
  const configuredHosts = process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  if (!configuredHosts && deploymentContext(process.env) !== "production") return { ok: false, unavailable: true, reason: "missing_preview_hosts" };
  const hostnames = (configuredHosts || "boldcityiaq.com,www.boldcityiaq.com")
    .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  try {
    const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { ok: false, unavailable: true };
    const result = await response.json();
    const hostname = String(result.hostname).toLowerCase();
    const expectedHost = new URL(`https://${requestHost}`).hostname.toLowerCase();
    if (result.success !== true) return { ok: false, reason: "challenge_rejected" };
    if (!hostnames.includes(hostname) || hostname !== expectedHost) return { ok: false, reason: "hostname_mismatch" };
    if (result.action !== `contact_${formType}`) return { ok: false, reason: "action_mismatch" };
    return { ok: true };
  } catch { return { ok: false, unavailable: true }; }
}
