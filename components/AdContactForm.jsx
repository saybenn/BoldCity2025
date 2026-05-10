import { useMemo, useState } from "react";
import { trackFormSubmit } from "@/lib/analytics";
import { getUTMParams } from "@/lib/utm";

export default function AdContactForm() {
  const [formData, setFormData] = useState(() => ({
    formType: "ad",
    name: "",
    phone: "",
    email: "",
    service: "",
    financing: false,
    message: "",
    honeypot: "",
    companyWebsite: "",
    ...getUTMParams(),
  }));

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const attributionFields = useMemo(() => {
    let stored = {};

    if (typeof window !== "undefined") {
      try {
        stored = JSON.parse(localStorage.getItem("bc_attribution") || "{}");
      } catch {}

      const current = {
        referrer: document.referrer || stored.referrer || "",
        landing_page_url: window.location.href || stored.landing_page_url || "",
        page: window.location.pathname,
        device: /Mobi|Android/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
        timestamp: new Date().toISOString(),
        timezone:
          typeof Intl !== "undefined"
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "",
        page_variant: "ad_landing_page_v1",
      };

      const merged = {
        ...stored,
        ...current,
      };

      localStorage.setItem("bc_attribution", JSON.stringify(merged));

      return merged;
    }

    return {};
  }, []);

  const payload = {
    ...formData,
    ...attributionFields,
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const phone = String(payload.phone || "");

      if (!/^\D?(\d\D*){7,}$/.test(phone)) {
        throw new Error("Please enter a valid phone number.");
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
        form_name: "Ad Contact Form",
        form_location: "AdContactForm",
        page: typeof window !== "undefined" ? window.location.pathname : "/ads",
        intent: payload.financing
          ? "ad service request with financing interest"
          : "ad service request",
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Something went wrong. Please try again.");
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
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-8 shadow-xl"
      noValidate
    >
      <h2 className="mb-4 font-heading text-2xl text-navy">
        Request Emergency Help
      </h2>

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

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone
        </label>
        <input
          required
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium">
          Service Needed
        </label>
        <select
          required
          name="service"
          id="service"
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
        <label htmlFor="message" className="block text-sm font-medium">
          Additional Message{" "}
          <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <textarea
          name="message"
          id="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="financing"
          id="financing"
          checked={formData.financing}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label htmlFor="financing" className="text-sm">
          I&apos;m interested in financing options
        </label>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-green px-4 py-2 text-white transition hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "Request My Free Estimate"}
      </button>
    </form>
  );
}
