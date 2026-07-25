"use client";

import { useEffect, useRef, useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { trackFormSubmit } from "@/lib/analytics";
import { TurnstileField } from "./contact/TurnstileField";

const ALLOWED_SERVICES = new Set([
  "Water Damage Restoration",
  "Mold Remediation",
  "Emergency Services",
  "Fire & Smoke Restoration",
  "Cleaning & Sanitization",
  "Storm & Flood Cleanup",
  "General Restoration Request",
]);

const initialState = {
  formType: "standard",
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  financing: "",
  companyWebsite: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
};

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

export default function StandardContactForm() {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);

  const [turnstileToken, setTurnstileToken] = useState("");

  const [formData, setFormData] = useState(initialState);

  const [attributionFields, setAttributionFields] = useState({});

  const [formStartedAt, setFormStartedAt] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    let utms = {};

    try {
      utms = getUTMParams() || {};
    } catch {
      utms = {};
    }

    const current = {
      ...utms,
      referrer: document.referrer || stored.referrer || "",
      landing_page_url: window.location.href || stored.landing_page_url || "",
      page: window.location.pathname,
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: startedAt,
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : stored.timezone || "",
      page_variant: "standard_contact_form_v1",
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
      ...utms,
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

    if (isSubmitting) return;

    setError("");

    if (!formRef.current?.reportValidity()) {
      return;
    }

    setIsSubmitting(true);

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

        formType: "standard",
        name,
        phone,
        email,
        service,
        message,

        companyWebsite,
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
          form_name: "Standard Contact Form",
          form_location: "StandardContactForm",
          page: window.location.pathname,
          intent:
            formData.financing === "Yes"
              ? "service request with financing interest"
              : "service request",
        });
      }

      setSubmitted(true);

      setFormData({
        ...initialState,
      });
    } catch (err) {
      console.error("Standard contact form error:", err);

      if (requestStarted) {
        turnstileRef.current?.reset();
      }

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-100 p-6 text-green-800 shadow-md">
        <h2 className="font-heading text-2xl font-bold">Request received</h2>

        <p className="mt-2 text-base leading-7">
          Thanks. A member of the team will follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      noValidate
    >
      <h2 className="font-heading text-3xl font-bold text-darkText sm:text-4xl">
        Talk to Our Restoration Team
      </h2>

      <p className="mt-3 text-base leading-7 text-gray-600">
        Tell us what happened and how to reach you. Emergency requests can also
        call directly for faster response.
      </p>

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="standard-company-website">Company website</label>

        <input
          id="standard-company-website"
          type="text"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="standard-name"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Name
          </label>

          <input
            id="standard-name"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your name"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
            autoComplete="name"
            maxLength={120}
          />
        </div>

        <div>
          <label
            htmlFor="standard-phone"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Phone
          </label>

          <input
            id="standard-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="(904) 555-1234"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            pattern="[0-9()\+\-\.\s]{7,}"
          />
        </div>

        <div>
          <label
            htmlFor="standard-email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email <span className="font-normal text-gray-500">(optional)</span>
          </label>

          <input
            id="standard-email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
          />
        </div>

        <div>
          <label
            htmlFor="standard-service"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Service Needed
          </label>

          <select
            id="standard-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
          >
            <option value="">Select one</option>

            <option value="Water Damage Restoration">
              Water Damage Restoration
            </option>

            <option value="Mold Remediation">Mold Remediation</option>

            <option value="Emergency Services">Emergency Services</option>

            <option value="Fire & Smoke Restoration">
              Fire & Smoke Restoration
            </option>

            <option value="Cleaning & Sanitization">
              Cleaning & Sanitization
            </option>

            <option value="Storm & Flood Cleanup">Storm & Flood Cleanup</option>

            <option value="General Restoration Request">
              General Restoration Request
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="standard-message"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            What happened?{" "}
            <span className="font-normal text-gray-500">(optional)</span>
          </label>

          <textarea
            id="standard-message"
            name="message"
            value={formData.message}
            placeholder="Water leak, visible mold, storm damage, smoke issue, or other restoration need"
            onChange={handleChange}
            className="min-h-[140px] w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            maxLength={2_000}
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-gray-800">
            Interested in financing options?
          </span>

          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="radio"
                name="financing"
                value="Yes"
                checked={formData.financing === "Yes"}
                onChange={handleChange}
                className="border-gray-300 text-aqua focus:ring-aqua"
              />

              <span className="ml-2">Yes</span>
            </label>

            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="radio"
                name="financing"
                value="No"
                checked={formData.financing === "No"}
                onChange={handleChange}
                className="border-gray-300 text-aqua focus:ring-aqua"
              />

              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <TurnstileField
          ref={turnstileRef}
          action="contact_standard"
          onTokenChange={setTurnstileToken}
          onVerificationError={setError}
        />

        {error ? (
          <div
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          aria-busy={isSubmitting}
          className="w-full rounded-lg bg-navy px-6 py-3 font-semibold text-white transition hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Request Service"}
        </button>
      </div>
    </form>
  );
}

