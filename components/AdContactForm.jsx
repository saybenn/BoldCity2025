import { useEffect, useRef, useState } from "react";
import { trackFormSubmit } from "@/lib/analytics";
import { getUTMParams } from "@/lib/utm";
import { TurnstileField } from "@/components/forms/TurnstileField";

const ALLOWED_SERVICES = new Set([
  "Water Damage Restoration",
  "Mold Remediation",
  "Emergency Extraction",
  "Storm & Flood Cleanup",
  "Fire & Smoke Restoration",
  "Cleaning & Sanitization",
]);

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

export default function AdContactForm() {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);

  const [turnstileToken, setTurnstileToken] = useState("");

  const [formData, setFormData] = useState({
    formType: "ad",
    name: "",
    phone: "",
    email: "",
    service: "",
    financing: false,
    message: "",
    companyWebsite: "",
  });

  const [attributionFields, setAttributionFields] = useState({});
  const [formStartedAt, setFormStartedAt] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const startedAt = new Date().toISOString();

    setFormStartedAt(startedAt);

    let stored = {};

    try {
      const parsed = JSON.parse(localStorage.getItem("bc_attribution") || "{}");

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        stored = parsed;
      }
    } catch {
      stored = {};
    }

    let utmParams = {};

    try {
      utmParams = getUTMParams() || {};
    } catch {
      utmParams = {};
    }

    const current = {
      ...utmParams,
      referrer: document.referrer || stored.referrer || "",
      landing_page_url: window.location.href || stored.landing_page_url || "",
      page: window.location.pathname,
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: startedAt,
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : stored.timezone || "",
      page_variant: "ad_landing_page_v1",
    };

    const merged = {
      ...stored,
      ...current,
    };

    try {
      localStorage.setItem("bc_attribution", JSON.stringify(merged));
    } catch {
      // Continue without persisted attribution.
    }

    setAttributionFields(merged);

    setFormData((previous) => ({
      ...previous,
      ...utmParams,
    }));
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setError("");

    if (!formRef.current?.reportValidity()) {
      return;
    }

    setSubmitting(true);

    let requestStarted = false;

    try {
      const name = cleanString(formData.name, 120);
      const phone = cleanString(formData.phone, 30);
      const email = cleanString(formData.email, 254).toLowerCase();
      const service = cleanString(formData.service, 100);
      const message = cleanString(formData.message, 2_000);
      const companyWebsite = cleanString(formData.companyWebsite, 500);

      if (name.length < 2) {
        throw new Error("Please enter your name.");
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
        ...formData,
        ...attributionFields,

        formType: "ad",
        name,
        phone,
        email,
        service,
        message,
        financing: formData.financing === true,

        companyWebsite,

        // Compatibility alias for the backend.
        honeypot: companyWebsite,

        formStartedAt: formStartedAt || new Date().toISOString(),

        turnstileToken,
      };

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
        throw new Error(json?.error || "Submission failed.");
      }

      if (json?.accepted !== false) {
        trackFormSubmit({
          form_name: "Ad Contact Form",
          form_location: "AdContactForm",
          page: window.location.pathname,
          intent: formData.financing
            ? "ad service request with financing interest"
            : "ad service request",
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Ad contact form error:", err);

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

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="mb-2 font-heading text-2xl text-navy">Thank You!</h2>

        <p className="text-darkText">
          Your request has been received. We&apos;ll contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-8 shadow-xl"
      noValidate
    >
      <h2 className="mb-4 font-heading text-2xl text-navy">
        Request Emergency Help
      </h2>

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="ad-company-website">Company website</label>

        <input
          id="ad-company-website"
          type="text"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="ad-name" className="block text-sm font-medium">
          Name
        </label>

        <input
          required
          type="text"
          name="name"
          id="ad-name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          maxLength={120}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="ad-phone" className="block text-sm font-medium">
          Phone
        </label>

        <input
          required
          type="tel"
          name="phone"
          id="ad-phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
          maxLength={30}
          pattern="[0-9()\+\-\.\s]{7,}"
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="ad-email" className="block text-sm font-medium">
          Email <span className="font-normal text-gray-500">(optional)</span>
        </label>

        <input
          type="email"
          name="email"
          id="ad-email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="ad-service" className="block text-sm font-medium">
          Service Needed
        </label>

        <select
          required
          name="service"
          id="ad-service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="">Select One</option>

          <option value="Water Damage Restoration">
            Water Damage Restoration
          </option>

          <option value="Mold Remediation">Mold Remediation</option>

          <option value="Emergency Extraction">Emergency Extraction</option>

          <option value="Storm & Flood Cleanup">Storm & Flood Cleanup</option>

          <option value="Fire & Smoke Restoration">
            Fire & Smoke Restoration
          </option>

          <option value="Cleaning & Sanitization">
            Cleaning & Sanitization
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="ad-message" className="block text-sm font-medium">
          Additional Message{" "}
          <span className="font-normal text-gray-500">(optional)</span>
        </label>

        <textarea
          name="message"
          id="ad-message"
          rows={3}
          maxLength={2_000}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="financing"
          id="ad-financing"
          checked={formData.financing}
          onChange={handleChange}
          className="h-4 w-4"
        />

        <label htmlFor="ad-financing" className="text-sm">
          I&apos;m interested in financing options
        </label>
      </div>

      <TurnstileField
        ref={turnstileRef}
        action="contact_ad"
        onTokenChange={setTurnstileToken}
        onVerificationError={setError}
      />

      <div aria-live="polite">
        {error ? (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting || !turnstileToken}
        aria-busy={submitting}
        className="w-full rounded-md bg-green px-4 py-2 text-white transition hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "Request My Free Estimate"}
      </button>
    </form>
  );
}
