import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import AdsSection from "./AdsSection";
import { trackFormSubmit, trackCta, trackCallClick } from "@/lib/analytics";

const PAGE_PATH = "/ads/emergency-restoration";

const initialState = {
  full_name: "",
  phone: "",
  email: "",
  service_needed: "",
  financing: "",
  description: "",
  honeypot: "",
  companyWebsite: "",
};

export default function AdsLeadFormSection({ utms = {} }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const attributionFields = useMemo(() => {
    if (typeof window === "undefined") {
      return {};
    }

    let stored = {};

    try {
      stored = JSON.parse(localStorage.getItem("bc_attribution") || "{}");
    } catch {}

    const current = {
      ...utms,
      referrer: document.referrer || stored.referrer || "",
      landing_page_url: window.location.href || stored.landing_page_url || "",
      page: window.location.pathname || PAGE_PATH,
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "",
      page_variant: "ads_emergency_restoration_v1",
    };

    const merged = {
      ...stored,
      ...current,
    };

    localStorage.setItem("bc_attribution", JSON.stringify(merged));

    return merged;
  }, [utms]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function isValidPhone(value) {
    return /^\D?(\d\D*){7,}$/.test(value || "");
  }

  function validateForm() {
    if (!formData.full_name.trim()) {
      return "Please enter your name.";
    }

    if (!isValidPhone(formData.phone)) {
      return "Please enter a valid phone number.";
    }

    if (!formData.service_needed) {
      return "Please select the service needed.";
    }

    return "";
  }

  function buildPayload() {
    return {
      formType: "ad",

      name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service_needed,
      message: formData.description,
      financing: formData.financing,

      honeypot: formData.honeypot,
      companyWebsite: formData.companyWebsite,

      page: PAGE_PATH,
      source_page: "ads emergency restoration",

      ...attributionFields,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = buildPayload();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error || "Could not submit request.");
      }

      trackFormSubmit({
        form_name: "Emergency Restoration Lead Form",
        form_location: "AdsLeadFormSection",
        page: PAGE_PATH,
        intent:
          formData.financing === "Yes"
            ? "request emergency restoration service with financing interest"
            : "request emergency restoration service",
      });

      router.push(
        `/ads/emergency-restoration/success?service=${encodeURIComponent(
          formData.service_needed || "General Emergency Request",
        )}`,
      );
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCallClick() {
    trackCta({
      cta_label: "Or Call Now",
      cta_location: "AdsLeadFormSection",
      intent: "call emergency restoration",
      page: PAGE_PATH,
      href: "tel:+19044346318",
    });

    trackCallClick({
      cta_location: "AdsLeadFormSection",
      page: PAGE_PATH,
      phone_number: "+19044346318",
      intent: "call emergency restoration",
    });
  }

  return (
    <AdsSection id="request-service" className="py-10 md:py-12">
      <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 md:p-8">
        <h2 className="text-3xl font-semibold text-zinc-900 md:text-4xl">
          Request Emergency Service
        </h2>

        <p className="mt-2 text-zinc-700">
          Complete this short form and we will call you right away. For fastest
          response, call now.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 md:grid-cols-2"
          noValidate
        >
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
            <label className="block text-sm font-medium text-zinc-800">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-800">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
              inputMode="tel"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-800">
              Email{" "}
              <span className="font-normal text-zinc-500">(optional)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-800">
              Service Needed
            </label>
            <select
              name="service_needed"
              value={formData.service_needed}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            >
              <option value="">Select...</option>
              <option value="Water Damage Restoration">
                Water Damage Restoration
              </option>
              <option value="Mold Remediation">Mold Remediation</option>
              <option value="Emergency Extraction">Emergency Extraction</option>
              <option value="Storm & Flood Cleanup">
                Storm & Flood Cleanup
              </option>
              <option value="Fire & Smoke Restoration">
                Fire & Smoke Restoration
              </option>
              <option value="Cleaning & Sanitization">
                Cleaning & Sanitization
              </option>
              <option value="General Emergency Request">
                General Emergency Request
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <span className="block text-sm font-medium text-zinc-800">
              Interested in financing options?
            </span>

            <div className="mt-2 flex flex-wrap gap-6">
              <label className="inline-flex items-center text-sm text-zinc-700">
                <input
                  type="radio"
                  name="financing"
                  value="Yes"
                  checked={formData.financing === "Yes"}
                  onChange={handleChange}
                  className="border-zinc-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="ml-2">Yes</span>
              </label>

              <label className="inline-flex items-center text-sm text-zinc-700">
                <input
                  type="radio"
                  name="financing"
                  value="No"
                  checked={formData.financing === "No"}
                  onChange={handleChange}
                  className="border-zinc-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-800">
              Brief Description{" "}
              <span className="font-normal text-zinc-500">(optional)</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          {error ? (
            <div className="md:col-span-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200">
              {error}
            </div>
          ) : null}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Get Immediate Help"}
            </button>

            <a
              href="tel:+19044346318"
              className="ml-4 inline-flex text-sm font-semibold text-blue-700 hover:underline"
              onClick={handleCallClick}
            >
              Or call now: (904) 434-6318
            </a>

            <p className="mt-3 text-xs text-zinc-500">
              By submitting, you agree to be contacted by Bold City IAQ via
              phone, text, or email regarding your request.
            </p>
          </div>
        </form>
      </div>
    </AdsSection>
  );
}
