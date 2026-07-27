import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { trackFormSubmit, trackCta, trackCallClick } from "@/lib/analytics";
import { TurnstileField } from "./TurnstileField";
const ALLOWED_SERVICES = new Set([
  "Water Damage Restoration",
  "Fire & Smoke Restoration",
  "Mold Remediation",
  "Cleaning & Sanitization",
  "Emergency Services",
  "Storm & Flood Cleanup",
  "General Restoration Request",
]);

function cleanString(value, maxLength) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function isValidPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  return (
    digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))
  );
}

function isValidEmail(value) {
  if (!value) return true;
  if (value.length > 254) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactRequestForm({ data, utm = {} }) {
  const router = useRouter();
  const formRef = useRef(null);
  const turnstileRef = useRef(null);

  const [turnstileToken, setTurnstileToken] = useState("");

  const [hiddenFields, setHiddenFields] = useState({
    formType: "standard",
  });

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const utmSource = utm?.utm_source || "";
  const utmMedium = utm?.utm_medium || "";
  const utmCampaign = utm?.utm_campaign || "";
  const utmTerm = utm?.utm_term || "";
  const utmContent = utm?.utm_content || "";
  const gclid = utm?.gclid || "";
  const wbraid = utm?.wbraid || "";
  const gbraid = utm?.gbraid || "";

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    let stored = {};

    try {
      const parsed = JSON.parse(localStorage.getItem("bc_attribution") || "{}");

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        stored = parsed;
      }
    } catch {
      stored = {};
    }

    function resolveValue(propValue, key) {
      return propValue || url.get(key) || stored[key] || "";
    }

    const startedAt = new Date().toISOString();

    const attribution = {
      formType: "standard",
      formStartedAt: startedAt,

      utm_source: resolveValue(utmSource, "utm_source"),

      utm_medium: resolveValue(utmMedium, "utm_medium"),

      utm_campaign: resolveValue(utmCampaign, "utm_campaign"),

      utm_term: resolveValue(utmTerm, "utm_term"),

      utm_content: resolveValue(utmContent, "utm_content"),

      gclid: resolveValue(gclid, "gclid"),
      wbraid: resolveValue(wbraid, "wbraid"),
      gbraid: resolveValue(gbraid, "gbraid"),

      referrer: document.referrer || stored.referrer || "",

      landing_page_url: window.location.href || stored.landing_page_url || "",

      page: window.location.pathname,

      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",

      timestamp: startedAt,

      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : stored.timezone || "",

      page_variant: "contact_request_form_v1",
    };

    try {
      localStorage.setItem("bc_attribution", JSON.stringify(attribution));
    } catch {
      // Continue if localStorage is unavailable.
    }

    setHiddenFields(attribution);
  }, [
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    gclid,
    wbraid,
    gbraid,
  ]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setError("");

    const formElement = formRef.current;

    if (!formElement?.reportValidity()) {
      return;
    }

    setSubmitting(true);

    let requestStarted = false;

    try {
      const formData = new FormData(formElement);

      const name = cleanString(formData.get("name"), 120);

      const phone = cleanString(formData.get("phone"), 30);

      const email = cleanString(formData.get("email"), 254).toLowerCase();

      const service = cleanString(formData.get("service"), 100);

      const notes = cleanString(formData.get("notes"), 2_000);

      const companyWebsite = cleanString(formData.get("companyWebsite"), 500);

      if (name.length < 2) {
        throw new Error("Please enter your full name.");
      }

      if (!isValidPhone(phone)) {
        throw new Error("Please enter a valid phone number.");
      }

      if (!isValidEmail(email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (!ALLOWED_SERVICES.has(service)) {
        throw new Error("Please select a valid service.");
      }

      if (!turnstileToken) {
        throw new Error("Please complete the verification.");
      }

      const payload = {
        ...Object.fromEntries(formData.entries()),
        ...hiddenFields,

        formType: "standard",
        name,
        phone,
        email,
        service,
        notes,

        companyWebsite,

        /*
         * Compatibility alias for the backend if it still
         * checks the older honeypot field name.
         */
        honeypot: companyWebsite,

        formStartedAt: hiddenFields.formStartedAt || new Date().toISOString(),

        turnstileToken,
      };

      delete payload["cf-turnstile-response"];

      requestStarted = true;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok || json?.ok === false) {
        throw new Error(json?.error || "We couldn't submit the form.");
      }

      /*
       * Do not count silently discarded honeypot or
       * spam submissions as conversions.
       */
      if (json?.accepted !== false) {
        trackFormSubmit({
          form_name: "Contact Request Form",
          form_location: "ContactRequestForm",
          page: String(payload.page || "/contact"),
          intent: "request service",
        });
      }

      await router.push(
        `/contact/success?service=${encodeURIComponent(
          service || "General Contact Request",
        )}`,
      );
    } catch (err) {
      console.error("Contact request form error:", err);

      /*
       * A token can only be verified once. Reset it after
       * any request that reached the backend and failed.
       */
      if (requestStarted) {
        turnstileRef.current?.reset();
      }

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleEmailClick() {
    trackCta({
      cta_label: "Prefer Email",
      cta_location: "ContactRequestForm",
      intent: "email contact",
      page: "/contact",
      href: data.emailHref,
    });
  }

  function handleCallClick() {
    trackCta({
      cta_label: "Call Instead",
      cta_location: "ContactRequestForm",
      intent: "call emergency restoration",
      page: "/contact",
      href: data.phoneHref,
    });

    trackCallClick({
      cta_location: "ContactRequestForm",
      page: "/contact",
      phone_number: "+19044346318",
      intent: "call emergency restoration",
    });
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 sm:p-8">
      <h2 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
        Request Service Now
      </h2>

      <p className="mt-2 text-zinc-700">
        Tell us what happened. We&apos;ll call you right away to dispatch help.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
        noValidate
      >
        {/* Honeypot */}
        <div
          className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="contact-request-company-website">
            Company website
          </label>

          <input
            id="contact-request-company-website"
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Attribution and timing fields */}
        {Object.entries(hiddenFields).map(([name, value]) => (
          <input
            key={name}
            type="hidden"
            name={name}
            value={value || ""}
            readOnly
          />
        ))}

        <div>
          <label
            htmlFor="contact-request-name"
            className="block text-sm font-medium text-zinc-800"
          >
            Full Name
          </label>

          <input
            id="contact-request-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label
            htmlFor="contact-request-phone"
            className="block text-sm font-medium text-zinc-800"
          >
            Phone
          </label>

          <input
            id="contact-request-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            pattern="[0-9()\+\-\.\s]{7,}"
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label
            htmlFor="contact-request-service"
            className="block text-sm font-medium text-zinc-800"
          >
            Service Needed
          </label>

          <select
            id="contact-request-service"
            name="service"
            required
            defaultValue=""
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none focus:border-blue-600"
          >
            <option value="" disabled>
              Select...
            </option>

            <option value="Water Damage Restoration">
              Water Damage Restoration
            </option>

            <option value="Fire & Smoke Restoration">
              Fire & Smoke Restoration
            </option>

            <option value="Mold Remediation">Mold Remediation</option>

            <option value="Cleaning & Sanitization">
              Cleaning & Sanitization
            </option>

            <option value="Emergency Services">Emergency Services</option>

            <option value="Storm & Flood Cleanup">Storm & Flood Cleanup</option>

            <option value="General Restoration Request">
              General Restoration Request
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-request-email"
            className="block text-sm font-medium text-zinc-800"
          >
            Email <span className="font-normal text-zinc-500">(optional)</span>
          </label>

          <input
            id="contact-request-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="contact-request-notes"
            className="block text-sm font-medium text-zinc-800"
          >
            Details{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>

          <textarea
            id="contact-request-notes"
            name="notes"
            rows={4}
            maxLength={2_000}
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <TurnstileField
          ref={turnstileRef}
          action="contact_standard"
          onTokenChange={setTurnstileToken}
          onVerificationError={setError}
          className="md:col-span-2"
        />

        {error ? (
          <div
            role="alert"
            className="md:col-span-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200"
          >
            {error}
          </div>
        ) : null}

        <div className="md:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={submitting || !turnstileToken}
              aria-busy={submitting}
              className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors ${
                submitting || !turnstileToken
                  ? "cursor-not-allowed bg-blue-300 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {submitting ? "Submitting..." : "Send Request"}
            </button>

            <a
              href={data.emailHref}
              onClick={handleEmailClick}
              className="text-sm font-semibold text-blue-700 hover:underline"
            >
              Prefer email? {data.email}
            </a>

            <a
              href={data.phoneHref}
              onClick={handleCallClick}
              className="text-sm font-semibold text-zinc-700 hover:underline"
            >
              Or call now: {data.phoneDisplay}
            </a>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            By submitting you agree to be contacted by phone, SMS, or email. No
            spam. Opt-out anytime.
          </p>
        </div>
      </form>
    </div>
  );
}
