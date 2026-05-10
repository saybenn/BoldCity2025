"use client";

import { useEffect, useMemo, useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { trackFormSubmit } from "@/lib/analytics";

const initialState = {
  formType: "standard",
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  financing: "",
  honeypot: "",
  companyWebsite: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
};

export default function StandardContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const attributionFields = useMemo(() => {
    if (typeof window === "undefined") return {};

    let stored = {};

    try {
      stored = JSON.parse(localStorage.getItem("bc_attribution") || "{}");
    } catch {}

    const current = {
      referrer: document.referrer || stored.referrer || "",
      landing_page_url: window.location.href || stored.landing_page_url || "",
      page: window.location.pathname,
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "",
      page_variant: "standard_contact_form_v1",
    };

    const merged = {
      ...stored,
      ...current,
    };

    localStorage.setItem("bc_attribution", JSON.stringify(merged));

    return merged;
  }, []);

  useEffect(() => {
    const utms = getUTMParams();

    setFormData((prev) => ({
      ...prev,
      ...utms,
    }));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm(payload) {
    const phone = String(payload.phone || "");

    if (!/^\D?(\d\D*){7,}$/.test(phone)) {
      return "Please enter a valid phone number.";
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const payload = {
      ...formData,
      ...attributionFields,
      formType: "standard",
    };

    try {
      const validationError = validateForm(payload);

      if (validationError) {
        throw new Error(validationError);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error || "Submission failed.");
      }

      trackFormSubmit({
        form_name: "Standard Contact Form",
        form_location: "StandardContactForm",
        page:
          typeof window !== "undefined" ? window.location.pathname : "/contact",
        intent:
          formData.financing === "Yes"
            ? "service request with financing interest"
            : "service request",
      });

      const utms = getUTMParams();

      setSubmitted(true);
      setFormData({
        ...initialState,
        ...utms,
      });
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
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

      <div className="hidden">
        <label>
          Do not fill this out:
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </label>

        <label>
          Company website:
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your name"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
            autoComplete="name"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="(904) 555-1234"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
            autoComplete="tel"
            inputMode="tel"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            autoComplete="email"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Service Needed
          </label>
          <select
            id="service"
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
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            What happened?{" "}
            <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            placeholder="Water leak, visible mold, storm damage, smoke issue, or other restoration need"
            onChange={handleChange}
            className="min-h-[140px] w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
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

        <input type="hidden" name="formType" value={formData.formType} />
        <input type="hidden" name="utm_source" value={formData.utm_source} />
        <input type="hidden" name="utm_medium" value={formData.utm_medium} />
        <input
          type="hidden"
          name="utm_campaign"
          value={formData.utm_campaign}
        />
        <input type="hidden" name="utm_term" value={formData.utm_term} />
        <input type="hidden" name="utm_content" value={formData.utm_content} />

        {error ? (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-navy px-6 py-3 font-semibold text-white transition hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Request Service"}
        </button>
      </div>
    </form>
  );
}

