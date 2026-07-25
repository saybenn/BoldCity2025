import { useEffect, useRef, useState } from "react";
import { TurnstileField } from "@/components/forms/TurnstileField";

function cleanString(value, maxLength) {
  return String(value || "")
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

function getFieldMaxLength(field) {
  if (field.type === "email" || field.name === "email") {
    return 254;
  }

  if (field.name === "phone") {
    return 30;
  }

  if (field.name === "zip") {
    return 10;
  }

  return 120;
}

export default function LeadForm({ data, utm = {} }) {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);

  const [turnstileToken, setTurnstileToken] = useState("");

  const [hiddenFields, setHiddenFields] = useState({
    formType: "lead",
  });

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const cn = (...classes) => classes.filter(Boolean).join(" ");

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
      formType: "lead",
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
      page_variant: stored.page_variant || "A",
      timestamp: startedAt,
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : stored.timezone || "",
    };

    try {
      localStorage.setItem("bc_attribution", JSON.stringify(attribution));
    } catch {
      // Continue when storage is unavailable.
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

  async function onSubmit(event) {
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

      const phone = cleanString(formData.get("phone"), 30);

      const email = cleanString(formData.get("email"), 254).toLowerCase();

      const zip = cleanString(formData.get("zip"), 10);

      const companyWebsite = cleanString(formData.get("companyWebsite"), 500);

      if (formData.has("phone") && !isValidPhone(phone)) {
        throw new Error("Please enter a valid phone number.");
      }

      if (formData.has("zip") && !/^\d{5}(?:-\d{4})?$/.test(zip)) {
        throw new Error("Please enter a valid 5-digit ZIP code.");
      }

      if (formData.has("email") && !isValidEmail(email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (!turnstileToken) {
        throw new Error("Please complete the verification.");
      }

      const payload = Object.fromEntries(formData.entries());

      delete payload["cf-turnstile-response"];

      payload.formType = "lead";
      payload.phone = phone;
      payload.email = email;
      payload.zip = zip;
      payload.companyWebsite = companyWebsite;
      payload.honeypot = companyWebsite;
      payload.formStartedAt =
        hiddenFields.formStartedAt || new Date().toISOString();
      payload.turnstileToken = turnstileToken;

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

      if (json?.accepted !== false) {
        window.gtag?.("event", "conversion", {
          send_to: "AW-10940863332/label",
        });

        window.gtag?.("event", "lead_submit", {
          source: "ads_emergency",
        });

        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: "lead_submit",
          form_name: "Ads Emergency Lead",
        });
      }

      setDone(true);
      formElement.reset();
    } catch (err) {
      console.error("Lead form error:", err);

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

  return (
    <div className="w-full max-w-xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 sm:p-8 md:max-w-none lg:rounded-3xl">
      <h2 className="text-4xl font-semibold text-zinc-900 lg:text-5xl">
        {data.heading}
      </h2>

      <p className="mt-1 text-zinc-700">{data.subheading}</p>

      <div aria-live="polite" className="sr-only">
        {submitting
          ? "Submitting..."
          : done
            ? "Submission complete."
            : error
              ? `Submission error: ${error}`
              : ""}
      </div>

      {done ? (
        <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-200">
          Thanks! We received your request and will call you right away.
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2"
          noValidate
        >
          <div
            className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="lead-company-website">Company website</label>

            <input
              id="lead-company-website"
              type="text"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {Object.entries(hiddenFields).map(([name, value]) => (
            <input
              key={name}
              type="hidden"
              name={name}
              value={value || ""}
              readOnly
            />
          ))}

          {data.fields.map((field, index) => {
            const fieldId = `lead-${field.name}`;

            if (field.type === "hidden") {
              if (
                Object.prototype.hasOwnProperty.call(
                  hiddenFields,
                  field.name,
                ) ||
                field.name === "companyWebsite" ||
                field.name === "honeypot"
              ) {
                return null;
              }

              return (
                <input
                  key={`${field.name}-${index}`}
                  type="hidden"
                  name={field.name}
                  defaultValue={field.value || ""}
                />
              );
            }

            if (field.type === "select") {
              return (
                <div
                  key={`${field.name}-${index}`}
                  className="min-w-0 md:col-span-1"
                >
                  <label
                    htmlFor={fieldId}
                    className="block break-words text-base font-medium text-zinc-800"
                  >
                    {field.label}
                  </label>

                  <select
                    id={fieldId}
                    name={field.name}
                    required={Boolean(field.required)}
                    autoComplete="off"
                    defaultValue=""
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
                  >
                    <option value="" disabled>
                      Select...
                    </option>

                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div
                  key={`${field.name}-${index}`}
                  className="min-w-0 md:col-span-2"
                >
                  <label
                    htmlFor={fieldId}
                    className="block text-base font-medium text-zinc-800"
                  >
                    {field.label}
                  </label>

                  <textarea
                    id={fieldId}
                    name={field.name}
                    rows={4}
                    required={Boolean(field.required)}
                    maxLength={2_000}
                    autoComplete="off"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              );
            }

            const autoComplete =
              field.name === "name"
                ? "name"
                : field.name === "phone"
                  ? "tel"
                  : field.name === "email"
                    ? "email"
                    : field.name === "zip"
                      ? "postal-code"
                      : "off";

            const inputMode =
              field.name === "phone"
                ? "tel"
                : field.name === "email"
                  ? "email"
                  : field.name === "zip"
                    ? "numeric"
                    : undefined;

            const pattern =
              field.name === "zip"
                ? "\\d{5}(-\\d{4})?"
                : field.name === "phone"
                  ? "[0-9()\\+\\-\\.\\s]{7,}"
                  : undefined;

            return (
              <div key={`${field.name}-${index}`} className="md:col-span-1">
                <label
                  htmlFor={fieldId}
                  className="block text-base font-medium text-zinc-800"
                >
                  {field.label}
                </label>

                <input
                  id={fieldId}
                  name={field.name}
                  type={field.type || "text"}
                  required={Boolean(field.required)}
                  autoComplete={autoComplete}
                  inputMode={inputMode}
                  pattern={pattern}
                  maxLength={getFieldMaxLength(field)}
                  className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
                />
              </div>
            );
          })}

          <TurnstileField
            ref={turnstileRef}
            action="contact_lead"
            onTokenChange={setTurnstileToken}
            onVerificationError={setError}
            className="md:col-span-2"
          />

          {error ? (
            <div className="md:col-span-2">
              <div
                role="alert"
                className="rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200"
              >
                {error} — or call{" "}
                <a href="tel:19044346318" className="font-semibold underline">
                  (904) 434-6318
                </a>
                .
              </div>
            </div>
          ) : null}

          <div className="md:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={submitting || !turnstileToken}
                aria-busy={submitting}
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors",
                  submitting || !turnstileToken
                    ? "cursor-not-allowed bg-blue-300 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700",
                )}
              >
                {submitting ? "Submitting..." : data.submit.label}
              </button>

              <a
                href={data.altCTA.href}
                className="break-words text-sm font-semibold text-blue-700 hover:underline"
              >
                {data.altCTA.label}
              </a>
            </div>

            <p className="mt-3 break-words text-xs text-zinc-500">
              {data.consentText}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
