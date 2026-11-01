import { createHash } from "node:crypto";

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
export async function verifyContactToken(token, formType, fetcher = fetch) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: false, unavailable: true };
  if (typeof token !== "string" || !token || token.length > 2048) return { ok: false };
  const hostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || "boldcityiaq.com,www.boldcityiaq.com")
    .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  try {
    const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { ok: false, unavailable: true };
    const result = await response.json();
    return { ok: result.success === true && hostnames.includes(String(result.hostname).toLowerCase())
      && result.action === `contact_${formType}` };
  } catch { return { ok: false, unavailable: true }; }
}
