import type { NextApiRequest, NextApiResponse } from "next";
import postmark from "postmark";

type ContactFormType = "standard" | "ad";

type ContactPayload = {
  formType?: ContactFormType;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  notes?: string;
  financing?: boolean | string;
  page?: string;

  honeypot?: string;
  companyWebsite?: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page_url?: string;
  device?: string;
  timestamp?: string;
  timezone?: string;
  page_variant?: string;
};

type NormalizedPayload = ReturnType<typeof normalizePayload>;

type ContactResponse =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: string;
    };

const POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;
const CONTACT_RECEIVER_BACKUP = process.env.CONTACT_RECEIVER_BACKUP;
const POSTMARK_MESSAGE_STREAM = process.env.POSTMARK_MESSAGE_STREAM || "outbound";

const CONTACT_TEMPLATE_ALIAS =
  process.env.POSTMARK_CONTACT_TEMPLATE_ALIAS || "bold-city-contact-lead";

const AD_TEMPLATE_ALIAS =
  process.env.POSTMARK_AD_TEMPLATE_ALIAS || CONTACT_TEMPLATE_ALIAS;

const VISITOR_CONFIRMATION_TEMPLATE_ALIAS =
  process.env.POSTMARK_VISITOR_CONFIRMATION_TEMPLATE_ALIAS ||
  "bold-city-visitor-confirmation";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Bold City IAQ";
const COMPANY_PHONE =
  process.env.NEXT_PUBLIC_COMPANY_PHONE_DISPLAY || "(904) 434-6318";

function cleanString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function cleanBoolean(value: unknown) {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    return value === "true" || value === "on" || value === "yes";
  }

  return false;
}

function isValidEmail(value: string) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^\D?(\d\D*){7,}$/.test(value);
}

function assertEnv() {
  const missing = [
    ["POSTMARK_SERVER_TOKEN", POSTMARK_SERVER_TOKEN],
    ["CONTACT_EMAIL_FROM", CONTACT_EMAIL_FROM],
    ["CONTACT_EMAIL_TO", CONTACT_EMAIL_TO],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    throw new Error(
      `Missing Postmark environment variables: ${missing
        .map(([key]) => key)
        .join(", ")}`
    );
  }
}

function getRecipients() {
  if (CONTACT_RECEIVER_BACKUP) {
    return `${CONTACT_EMAIL_TO},${CONTACT_RECEIVER_BACKUP}`;
  }

  return CONTACT_EMAIL_TO as string;
}

function normalizePayload(body: ContactPayload) {
  const formType =
    body.formType === "ad" || body.formType === "standard"
      ? body.formType
      : "standard";

  const message = cleanString(body.message);
  const notes = cleanString(body.notes);

  return {
    formType,
    name: cleanString(body.name),
    email: cleanString(body.email),
    phone: cleanString(body.phone),
    service: cleanString(body.service),
    message: message || notes,
    financing: cleanBoolean(body.financing),
    page: cleanString(body.page),

    honeypot: cleanString(body.honeypot),
    companyWebsite: cleanString(body.companyWebsite),

    utm_source: cleanString(body.utm_source),
    utm_medium: cleanString(body.utm_medium),
    utm_campaign: cleanString(body.utm_campaign),
    utm_term: cleanString(body.utm_term),
    utm_content: cleanString(body.utm_content),
    referrer: cleanString(body.referrer),
    landing_page_url: cleanString(body.landing_page_url),
    device: cleanString(body.device),
    timestamp: cleanString(body.timestamp),
    timezone: cleanString(body.timezone),
    page_variant: cleanString(body.page_variant),
  };
}

function validatePayload(payload: NormalizedPayload) {
  if (!payload.name) {
    return "Name is required.";
  }

  if (!payload.phone) {
    return "Phone number is required.";
  }

  if (!isValidPhone(payload.phone)) {
    return "Please enter a valid phone number.";
  }

  if (payload.email && !isValidEmail(payload.email)) {
    return "Please enter a valid email address.";
  }

  if (!payload.service) {
    return "Service is required.";
  }

  return "";
}

function getLeadTemplateAlias(formType: ContactFormType) {
  return formType === "ad" ? AD_TEMPLATE_ALIAS : CONTACT_TEMPLATE_ALIAS;
}

function emptyFallback(value: string) {
  return value || "Not provided";
}

function getLeadSubject(payload: NormalizedPayload) {
  const prefix =
    payload.formType === "ad"
      ? "New Ad Landing Page Lead"
      : "New Website Contact Lead";

  return `${prefix}: ${payload.service || "General Service Request"}`;
}

function getLeadHeadline(payload: NormalizedPayload) {
  return payload.formType === "ad"
    ? "New Ad Landing Page Lead"
    : "New Website Contact Lead";
}

function getLeadPriority(payload: NormalizedPayload) {
  if (payload.formType === "ad") return "High Intent";
  if (/emergency|water|flood|mold|storm/i.test(payload.service)) {
    return "Urgent Service Request";
  }

  return "Standard Service Request";
}

function createLeadTemplateModel(payload: NormalizedPayload) {
  return {
    subject: getLeadSubject(payload),
    headline: getLeadHeadline(payload),
    priority: getLeadPriority(payload),

    company_name: COMPANY_NAME,
    company_phone: COMPANY_PHONE,

    form_type: payload.formType,
    name: emptyFallback(payload.name),
    phone: emptyFallback(payload.phone),
    email: emptyFallback(payload.email),
    service: emptyFallback(payload.service),
    message: emptyFallback(payload.message),
    financing: payload.financing ? "Yes" : "No",
    page: emptyFallback(payload.page),

    utm_source: emptyFallback(payload.utm_source),
    utm_medium: emptyFallback(payload.utm_medium),
    utm_campaign: emptyFallback(payload.utm_campaign),
    utm_term: emptyFallback(payload.utm_term),
    utm_content: emptyFallback(payload.utm_content),
    referrer: emptyFallback(payload.referrer),
    landing_page_url: emptyFallback(payload.landing_page_url),
    device: emptyFallback(payload.device),
    timestamp: emptyFallback(payload.timestamp),
    timezone: emptyFallback(payload.timezone),
    page_variant: emptyFallback(payload.page_variant),
  };
}

function createVisitorTemplateModel(payload: NormalizedPayload) {
  return {
    subject: `We received your request — ${COMPANY_NAME}`,
    headline: "We received your request.",
    company_name: COMPANY_NAME,
    company_phone: COMPANY_PHONE,

    name: payload.name || "there",
    phone: emptyFallback(payload.phone),
    email: emptyFallback(payload.email),
    service: emptyFallback(payload.service),
    message: emptyFallback(payload.message),
    financing: payload.financing ? "Yes" : "No",
    page: emptyFallback(payload.page),

    response_note:
      "Our team received your request and will contact you as soon as possible.",
    emergency_note: `If this is an emergency, call us directly at ${COMPANY_PHONE}.`,
  };
}

async function sendLeadNotification(
  client: postmark.ServerClient,
  payload: NormalizedPayload
) {
  await client.sendEmailWithTemplate({
    From: CONTACT_EMAIL_FROM as string,
    To: getRecipients(),
    ReplyTo: payload.email || CONTACT_EMAIL_FROM,
    TemplateAlias: getLeadTemplateAlias(payload.formType),
    TemplateModel: createLeadTemplateModel(payload),
    MessageStream: POSTMARK_MESSAGE_STREAM,
  });
}

async function sendVisitorConfirmation(
  client: postmark.ServerClient,
  payload: NormalizedPayload
) {
  if (!payload.email) return;

  try {
    await client.sendEmailWithTemplate({
      From: CONTACT_EMAIL_FROM as string,
      To: payload.email,
      ReplyTo: CONTACT_EMAIL_FROM,
      TemplateAlias: VISITOR_CONFIRMATION_TEMPLATE_ALIAS,
      TemplateModel: createVisitorTemplateModel(payload),
      MessageStream: POSTMARK_MESSAGE_STREAM,
    });
  } catch (error) {
    /**
     * Do not fail the form if the business already received the lead.
     * Visitor confirmation is useful, but the lead notification is mission-critical.
     */
    console.error("Visitor confirmation email failed:", error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      ok: false,
      error: "Method not allowed.",
    });
  }

  const payload = normalizePayload(req.body || {});

  /**
   * Honeypot bot trap.
   * Return success, but do not send email.
   */
  if (payload.honeypot || payload.companyWebsite) {
    return res.status(200).json({ ok: true });
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return res.status(400).json({
      ok: false,
      error: validationError,
    });
  }

  try {
    assertEnv();

    const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN as string);

    await sendLeadNotification(client, payload);
    await sendVisitorConfirmation(client, payload);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error("Contact form Postmark template send failed:", error);

    return res.status(500).json({
      ok: false,
      error: "Unable to send message right now. Please call us directly.",
    });
  }
}