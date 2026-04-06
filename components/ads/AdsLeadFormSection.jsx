import { useState } from "react";
import { useRouter } from "next/router";
import AdsSection from "./AdsSection";
import { trackFormSubmit, trackCta, trackCallClick } from "@/lib/analytics";

const initialState = {
  full_name: "",
  phone: "",
  service_needed: "",
  zip: "",
  description: "",
};

export default function AdsLeadFormSection({ utms = {} }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function isValidPhone(value) {
    return /^\D?(\d\D*){7,}$/.test(value || "");
  }

  function isValidZip(value) {
    return /^\d{5}$/.test(value || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidPhone(formData.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!isValidZip(formData.zip)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        ...utms,
        page: "/ads/emergency-restoration",
        source_page: "ads emergency restoration",
      };

      const res = await fetch("/api/lead", {
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
        page: "/ads/emergency-restoration",
        intent: "request emergency restoration service",
      });

      router.push(
        `/ads/emergency-restoration/success?service=${encodeURIComponent(
          formData.service_needed || "General Emergency Request",
        )}`,
      );
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
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
              <option value="Water Damage">Water Damage</option>
              <option value="Mold Remediation">Mold Remediation</option>
              <option value="Storm Damage">Storm Damage</option>
              <option value="Fire / Smoke">Fire / Smoke</option>
              <option value="Cleaning / Sanitization">
                Cleaning / Sanitization
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-800">
              ZIP Code
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              autoComplete="postal-code"
              inputMode="numeric"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-800">
              Brief Description (Optional)
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
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Get Immediate Help"}
            </button>

            <a
              href="tel:+19044346318"
              className="ml-4 text-sm font-semibold text-blue-700 hover:underline"
              onClick={() => {
                trackCta({
                  cta_label: "Or Call Now",
                  cta_location: "AdsLeadFormSection",
                  intent: "call emergency restoration",
                  page: "/ads/emergency-restoration",
                  href: "tel:+19044346318",
                });

                trackCallClick({
                  cta_location: "AdsLeadFormSection",
                  page: "/ads/emergency-restoration",
                  phone_number: "+19044346318",
                  intent: "call emergency restoration",
                });
              }}
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
