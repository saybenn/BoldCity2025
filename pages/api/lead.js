// pages/api/lead.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- simple in-memory rate limiter (swap for Redis in prod) ---
const hits = {};
function rateLimit(key, max = 8, windowSec = 3600) {
  const now = Date.now();
  hits[key] = (hits[key] || []).filter((t) => now - t < windowSec * 1000);
  if (hits[key].length >= max) return false;
  hits[key].push(now);
  return true;
}

function normalizePhone(raw = "") {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  return `+1${digits.slice(-10)}`; // assume US
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  // enable when ready (left off during initial testing if needed)
  if (!rateLimit(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests" });
  }

  try {
    const {
      // visible fields
      name,
      phone,
      zip,
      service, // "Water" | "Fire/Smoke" | "Mold" | "Storm" | "Cleaning/Sanitization"
      notes,
      email, // optional
      // anti-spam
      honeypot,
      // attribution
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
      wbraid,
      gbraid,
      referrer,
      landing_page_url,
      device,
      page_variant,
      timestamp,
      timezone,
    } = req.body || {};

    // Honeypot: if filled, pretend success to bots
    if (honeypot) return res.status(200).json({ ok: true });

    // Required
    if (!name || !phone || !zip || !service) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields." });
    }

    const phoneNorm = normalizePhone(phone);
    if (!/^\+1\d{10}$/.test(phoneNorm)) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid phone number." });
    }
    if (!/^\d{5}$/.test(String(zip))) {
      return res.status(400).json({ ok: false, error: "Invalid ZIP code." });
    }

    // Env guardrails
    const FROM = process.env.CONTACT_EMAIL_FROM;
    const TO = process.env.CONTACT_EMAIL_TO;
    if (!process.env.RESEND_API_KEY) {
      console.error("Lead API error: RESEND_API_KEY missing");
      return res
        .status(500)
        .json({ ok: false, error: "Email service not configured." });
    }
    if (!FROM) {
      console.error("Lead API error: CONTACT_FROM_EMAIL missing");
      return res
        .status(500)
        .json({ ok: false, error: "Sender not configured." });
    }
    if (!TO) {
      console.error("Lead API error: CONTACT_RECEIVER_EMAIL missing");
      return res
        .status(500)
        .json({ ok: false, error: "Recipient not configured." });
    }

    const subject = "🚨 New Emergency Lead - Bold City IAQ";
    const textContent = `
🚨 New Lead from BoldCityIAQ.com

👤 Contact
Name: ${name}
Phone: ${phoneNorm}
Email: ${email || "N/A"}
ZIP: ${zip}
Service: ${service}
Notes: ${notes || "N/A"}

📈 Attribution
utm_source: ${utm_source || "N/A"}
utm_medium: ${utm_medium || "N/A"}
utm_campaign: ${utm_campaign || "N/A"}
utm_term: ${utm_term || "N/A"}
utm_content: ${utm_content || "N/A"}
gclid: ${gclid || "N/A"} | wbraid: ${wbraid || "N/A"} | gbraid: ${
      gbraid || "N/A"
    }

🔎 Meta
Referrer: ${referrer || "N/A"}
Landing URL: ${landing_page_url || "N/A"}
Device: ${device || "N/A"} | Variant: ${page_variant || "N/A"}
Submitted: ${timestamp || new Date().toISOString()} (${timezone || "N/A"})
IP: ${ip}
UA: ${req.headers["user-agent"] || "N/A"}
`.trim();

    const recipients = [TO].filter(Boolean);
    const BCC = process.env.CONTACT_RECEIVER_BACKUP;

    // In dev, don't burn the free quota
    if (process.env.NODE_ENV === "development") {
      console.log("DEV MODE: Email would send via Resend:", {
        from: FROM,
        to: recipients,
        bcc: BCC,
        subject,
        text: textContent,
      });
      return res.status(200).json({ ok: true, dev: true });
    }

    const sendRes = await resend.emails.send({
      from: FROM,
      to: recipients,
      ...(BCC ? { bcc: BCC } : {}),
      subject,
      text: textContent, // fallback plain text
      html: `
    <h2 style="font-family:sans-serif;">🚨 New Lead from BoldCityIAQ.com</h2>
    <table style="border-collapse:collapse;width:100%;margin-top:10px;font-family:sans-serif;font-size:14px;">
      <tr><td style="font-weight:bold;">Name:</td><td>${name}</td></tr>
      <tr><td style="font-weight:bold;">Phone:</td><td>${phoneNorm}</td></tr>
      <tr><td style="font-weight:bold;">Email:</td><td>${
        email || "N/A"
      }</td></tr>
      <tr><td style="font-weight:bold;">ZIP:</td><td>${zip}</td></tr>
      <tr><td style="font-weight:bold;">Service:</td><td>${service}</td></tr>
      <tr><td style="font-weight:bold;">Notes:</td><td>${
        notes || "N/A"
      }</td></tr>
    </table>

    <hr style="margin:20px 0;" />

    <h3 style="font-family:sans-serif;">📈 Attribution</h3>
    <ul style="font-family:sans-serif;font-size:14px;">
      <li>utm_source: ${utm_source || "N/A"}</li>
      <li>utm_medium: ${utm_medium || "N/A"}</li>
      <li>utm_campaign: ${utm_campaign || "N/A"}</li>
      <li>utm_term: ${utm_term || "N/A"}</li>
      <li>utm_content: ${utm_content || "N/A"}</li>
      <li>gclid: ${gclid || "N/A"} | wbraid: ${wbraid || "N/A"} | gbraid: ${
        gbraid || "N/A"
      }</li>
    </ul>

    <hr style="margin:20px 0;" />

    <h3 style="font-family:sans-serif;">🔎 Meta</h3>
    <p style="font-family:sans-serif;font-size:14px;">
      Referrer: ${referrer || "N/A"}<br/>
      Landing URL: ${landing_page_url || "N/A"}<br/>
      Device: ${device || "N/A"} | Variant: ${page_variant || "N/A"}<br/>
      Submitted: ${timestamp || new Date().toISOString()} (${
        timezone || "N/A"
      })<br/>
      IP: ${ip}<br/>
      UA: ${req.headers["user-agent"] || "N/A"}
    </p>
  `,
    });

    if (sendRes.error) {
      console.error("Resend error:", sendRes.error);
      return res.status(502).json({ ok: false, error: "Email send failed." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err?.message || err);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
}
