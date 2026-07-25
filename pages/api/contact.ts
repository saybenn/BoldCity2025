import type { NextApiRequest, NextApiResponse } from "next";
import postmark from "postmark";

type ContactFormType = "standard" | "ad" | "modal" | "lead";

type ContactPayload = {
  formType?: ContactFormType;

  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  service?: string;
  message?: string;
  notes?: string;
  financing?: boolean | string;
  page?: string;

  honeypot?: string;
  companyWebsite?: string;
  formStartedAt?: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  gclid?: string;
  wbraid?: string;
  gbraid?: string;

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
      accepted: boolean;
    }
  | {
      ok: false;
      error: string;
    };

/**
 * Prevent unnecessarily large JSON payloads from reaching the handler.
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20kb",
    },
  },
};

const POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;
const CONTACT_RECEIVER_BACKUP =
  process.env.CONTACT_RECEIVER_BACKUP;

const POSTMARK_MESSAGE_STREAM =
  process.env.POSTMARK_MESSAGE_STREAM || "outbound";

const CONTACT_TEMPLATE_ALIAS =
  process.env.POSTMARK_CONTACT_TEMPLATE_ALIAS ||
  "bold-city-contact-lead";

const AD_TEMPLATE_ALIAS =
  process.env.POSTMARK_AD_TEMPLATE_ALIAS ||
  CONTACT_TEMPLATE_ALIAS;

const VISITOR_CONFIRMATION_TEMPLATE_ALIAS =
  process.env.POSTMARK_VISITOR_CONFIRMATION_TEMPLATE_ALIAS ||
  "bold-city-visitor-confirmation";

/**
 * Keep this false until persistent rate limiting and Turnstile
 * verification have been enabled.
 */
const SEND_VISITOR_CONFIRMATION =
  process.env.SEND_VISITOR_CONFIRMATION === "true";

const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME || "Bold City IAQ";

const COMPANY_PHONE =
  process.env.NEXT_PUBLIC_COMPANY_PHONE_DISPLAY ||
  "(904) 434-6318";

const FORM_TYPES = new Set<ContactFormType>([
  "standard",
  "ad",
  "modal",
  "lead",
]);

const ALLOWED_SERVICES = new Set([
  "Water Damage Restoration",
  "Mold Remediation",
  "Emergency Extraction",
  "Storm & Flood Cleanup",
  "Fire & Smoke Restoration",
  "Cleaning & Sanitization",
]);

const MIN_FORM_COMPLETION_MS = 1_000;

function cleanString(
  value: unknown,
  maxLength: number,
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function cleanBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    return (
      normalized === "true" ||
      normalized === "on" ||
      normalized === "yes" ||
      normalized === "1"
    );
  }

  return false;
}

function normalizeFormType(
  value: unknown,
): ContactFormType {
  if (
    typeof value === "string" &&
    FORM_TYPES.has(value as ContactFormType)
  ) {
    return value as ContactFormType;
  }

  return "standard";
}

function normalizeDevice(value: unknown): string {
  const device = cleanString(value, 30).toLowerCase();

  if (device === "mobile" || device === "desktop") {
    return device;
  }

  return "";
}

function isValidEmail(value: string): boolean {
  if (!value || value.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  return (
    digits.length === 10 ||
    (digits.length === 11 && digits.startsWith("1"))
  );
}

function isValidZip(value: string): boolean {
  return /^\d{5}(?:-\d{4})?$/.test(value);
}

function assertEnv(): void {
  const missing = [
    ["POSTMARK_SERVER_TOKEN", POSTMARK_SERVER_TOKEN],
    ["CONTACT_EMAIL_FROM", CONTACT_EMAIL_FROM],
    ["CONTACT_EMAIL_TO", CONTACT_EMAIL_TO],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    throw new Error(
      `Missing Postmark environment variables: ${missing
        .map(([key]) => key)
        .join(", ")}`,
    );
  }
}

function getRecipients(): string {
  if (CONTACT_RECEIVER_BACKUP) {
    return `${CONTACT_EMAIL_TO},${CONTACT_RECEIVER_BACKUP}`;
  }

  return CONTACT_EMAIL_TO as string;
}

function normalizePayload(body: ContactPayload) {
  const message = cleanString(body.message, 2_000);
  const notes = cleanString(body.notes, 2_000);

  return {
    formType: normalizeFormType(body.formType),

    name: cleanString(body.name, 120),
    email: cleanString(body.email, 254).toLowerCase(),
    phone: cleanString(body.phone, 30),
    zip: cleanString(body.zip, 10),
    service: cleanString(body.service, 100),
    message: message || notes,
    financing: cleanBoolean(body.financing),
    page: cleanString(body.page, 300),

    honeypot: cleanString(body.honeypot, 500),
    companyWebsite: cleanString(
      body.companyWebsite,
      500,
    ),
    formStartedAt: cleanString(
      body.formStartedAt,
      50,
    ),

    utm_source: cleanString(body.utm_source, 200),
    utm_medium: cleanString(body.utm_medium, 200),
    utm_campaign: cleanString(
      body.utm_campaign,
      200,
    ),
    utm_term: cleanString(body.utm_term, 200),
    utm_content: cleanString(
      body.utm_content,
      200,
    ),

    gclid: cleanString(body.gclid, 500),
    wbraid: cleanString(body.wbraid, 500),
    gbraid: cleanString(body.gbraid, 500),

    referrer: cleanString(body.referrer, 1_000),
    landing_page_url: cleanString(
      body.landing_page_url,
      1_000,
    ),
    device: normalizeDevice(body.device),
    timestamp: cleanString(body.timestamp, 50),
    timezone: cleanString(body.timezone, 100),
    page_variant: cleanString(
      body.page_variant,
      100,
    ),
  };
}

function validatePayload(
  payload: NormalizedPayload,
): string {
  if (payload.name.length < 2) {
    return "Name is required.";
  }

  if (payload.email && !isValidEmail(payload.email)) {
    return "Please enter a valid email address.";
  }

  if (payload.phone && !isValidPhone(payload.phone)) {
    return "Please enter a valid phone number.";
  }

  if (payload.zip && !isValidZip(payload.zip)) {
    return "Please enter a valid ZIP code.";
  }

  /*
   * Modal form:
   * name, email, and message are required.
   */
  if (payload.formType === "modal") {
    if (!payload.email) {
      return "Email is required.";
    }

    if (!isValidEmail(payload.email)) {
      return "Please enter a valid email address.";
    }

    if (payload.message.length < 5) {
      return "Message is required.";
    }

    return "";
  }

  /*
   * Standard, ad, and lead forms:
   * name, phone, and service are required.
   */
  if (!payload.phone) {
    return "Phone number is required.";
  }

  if (!isValidPhone(payload.phone)) {
    return "Please enter a valid phone number.";
  }

  if (!payload.service) {
    return "Service is required.";
  }

  if (!ALLOWED_SERVICES.has(payload.service)) {
    return "Please select a valid service.";
  }

  /*
   * The current emergency LeadForm collects a ZIP code.
   * Remove this requirement if ZIP is not required in data.fields.
   */
  if (payload.formType === "lead" && !payload.zip) {
    return "ZIP code is required.";
  }

  return "";
}

function wasSubmittedTooQuickly(
  formStartedAt: string,
): boolean {
  if (!formStartedAt) {
    return false;
  }

  const startedAtMs = Date.parse(formStartedAt);

  if (!Number.isFinite(startedAtMs)) {
    return false;
  }

  const elapsedMs = Date.now() - startedAtMs;

  /*
   * Ignore future timestamps or large clock differences.
   * This is only a weak bot signal, not an authentication mechanism.
   */
  if (elapsedMs < 0) {
    return false;
  }

  return elapsedMs < MIN_FORM_COMPLETION_MS;
}

function getLeadTemplateAlias(
  formType: ContactFormType,
): string {
  return formType === "ad"
    ? AD_TEMPLATE_ALIAS
    : CONTACT_TEMPLATE_ALIAS;
}

function emptyFallback(value: string): string {
  return value || "Not provided";
}

function getLeadSubject(
  payload: NormalizedPayload,
): string {
  switch (payload.formType) {
    case "ad":
      return `New Ad Landing Page Lead: ${
        payload.service || "General Service Request"
      }`;

    case "lead":
      return `New Emergency Lead: ${
        payload.service || "General Service Request"
      }`;

    case "modal":
      return "New Modal Contact Message";

    default:
      return `New Website Contact Lead: ${
        payload.service || "General Service Request"
      }`;
  }
}

function getLeadHeadline(
  payload: NormalizedPayload,
): string {
  switch (payload.formType) {
    case "ad":
      return "New Ad Landing Page Lead";

    case "lead":
      return "New Emergency Lead";

    case "modal":
      return "New Contact Message";

    default:
      return "New Website Contact Lead";
  }
}

function getLeadPriority(
  payload: NormalizedPayload,
): string {
  if (
    payload.formType === "ad" ||
    payload.formType === "lead"
  ) {
    return "High Intent";
  }

  if (
    /emergency|water|flood|mold|storm|fire/i.test(
      payload.service,
    )
  ) {
    return "Urgent Service Request";
  }

  return "Standard Service Request";
}

function createLeadTemplateModel(
  payload: NormalizedPayload,
) {
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
    zip: emptyFallback(payload.zip),
    service: emptyFallback(payload.service),
    message: emptyFallback(payload.message),
    financing: payload.financing ? "Yes" : "No",
    page: emptyFallback(payload.page),

    utm_source: emptyFallback(payload.utm_source),
    utm_medium: emptyFallback(payload.utm_medium),
    utm_campaign: emptyFallback(
      payload.utm_campaign,
    ),
    utm_term: emptyFallback(payload.utm_term),
    utm_content: emptyFallback(
      payload.utm_content,
    ),

    gclid: emptyFallback(payload.gclid),
    wbraid: emptyFallback(payload.wbraid),
    gbraid: emptyFallback(payload.gbraid),

    referrer: emptyFallback(payload.referrer),
    landing_page_url: emptyFallback(
      payload.landing_page_url,
    ),
    device: emptyFallback(payload.device),
    timestamp: emptyFallback(payload.timestamp),
    timezone: emptyFallback(payload.timezone),
    page_variant: emptyFallback(
      payload.page_variant,
    ),
    form_started_at: emptyFallback(
      payload.formStartedAt,
    ),
  };
}

function createVisitorTemplateModel(
  payload: NormalizedPayload,
) {
  return {
    subject: `We received your request — ${COMPANY_NAME}`,
    headline: "We received your request.",

    company_name: COMPANY_NAME,
    company_phone: COMPANY_PHONE,

    name: payload.name || "there",
    phone: emptyFallback(payload.phone),
    email: emptyFallback(payload.email),
    zip: emptyFallback(payload.zip),
    service: emptyFallback(payload.service),
    message: emptyFallback(payload.message),
    financing: payload.financing ? "Yes" : "No",
    page: emptyFallback(payload.page),

    response_note:
      "Our team received your request and will contact you as soon as possible.",

    emergency_note:
      `If this is an emergency, call us directly at ${COMPANY_PHONE}.`,
  };
}

async function sendLeadNotification(
  client: postmark.ServerClient,
  payload: NormalizedPayload,
): Promise<void> {
  await client.sendEmailWithTemplate({
    From: CONTACT_EMAIL_FROM as string,
    To: getRecipients(),
    ReplyTo: payload.email || CONTACT_EMAIL_FROM,
    TemplateAlias: getLeadTemplateAlias(
      payload.formType,
    ),
    TemplateModel: createLeadTemplateModel(payload),
    MessageStream: POSTMARK_MESSAGE_STREAM,
  });
}

async function sendVisitorConfirmation(
  client: postmark.ServerClient,
  payload: NormalizedPayload,
): Promise<void> {
  if (!SEND_VISITOR_CONFIRMATION || !payload.email) {
    return;
  }

  try {
    await client.sendEmailWithTemplate({
      From: CONTACT_EMAIL_FROM as string,
      To: payload.email,
      ReplyTo: CONTACT_EMAIL_FROM,
      TemplateAlias:
        VISITOR_CONFIRMATION_TEMPLATE_ALIAS,
      TemplateModel:
        createVisitorTemplateModel(payload),
      MessageStream: POSTMARK_MESSAGE_STREAM,
    });
  } catch (error) {
    /*
     * Do not fail the submission after the business has
     * already received the lead notification.
     */
    console.error(
      "Visitor confirmation email failed:",
      error,
    );
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      ok: false,
      error: "Method not allowed.",
    });
  }

  const contentType = req.headers["content-type"] || "";

  if (
    !contentType
      .toLowerCase()
      .includes("application/json")
  ) {
    return res.status(415).json({
      ok: false,
      error: "Content type must be application/json.",
    });
  }

  const requestBody =
    req.body &&
    typeof req.body === "object" &&
    !Array.isArray(req.body)
      ? (req.body as ContactPayload)
      : {};

  const payload = normalizePayload(requestBody);

  /**
   * Silent bot rejection.
   *
   * The frontend shows the ordinary thank-you state, but
   * accepted:false prevents ad conversion tracking.
   */
  if (
    payload.honeypot ||
    payload.companyWebsite ||
    wasSubmittedTooQuickly(payload.formStartedAt)
  ) {
    return res.status(200).json({
      ok: true,
      accepted: false,
    });
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

    const client = new postmark.ServerClient(
      POSTMARK_SERVER_TOKEN as string,
    );

    await sendLeadNotification(client, payload);
    await sendVisitorConfirmation(client, payload);

    return res.status(200).json({
      ok: true,
      accepted: true,
    });
  } catch (error) {
    console.error(
      "Contact form Postmark template send failed:",
      error,
    );

    return res.status(500).json({
      ok: false,
      error:
        "Unable to send message right now. Please call us directly.",
    });
  }
}