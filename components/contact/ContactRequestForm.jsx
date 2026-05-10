import { useRef, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { trackFormSubmit, trackCta, trackCallClick } from "@/lib/analytics";

export default function ContactRequestForm({ data, utm = {} }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hiddenFields = useMemo(() => {
    const url =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;

    const get = (key) => utm?.[key] ?? url?.get(key) ?? "";

    let ls = {};
    if (typeof window !== "undefined") {
      try {
        ls = JSON.parse(localStorage.getItem("bc_attribution") || "{}");
      } catch {}
    }

    const base = {
      utm_source: get("utm_source") || ls.utm_source || "",
      utm_medium: get("utm_medium") || ls.utm_medium || "",
      utm_campaign: get("utm_campaign") || ls.utm_campaign || "",
      utm_term: get("utm_term") || ls.utm_term || "",
      utm_content: get("utm_content") || ls.utm_content || "",
      referrer:
        (typeof document !== "undefined" ? document.referrer : "") ||
        ls.referrer ||
        "",
      landing_page_url:
        (typeof window !== "undefined" ? window.location.href : "") ||
        ls.landing_page_url ||
        "",
      device: /Mobi|Android/i.test(
        typeof navigator !== "undefined" ? navigator.userAgent : "",
      )
        ? "mobile"
        : "desktop",
      timestamp: new Date().toISOString(),
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "",
      page_variant: "contact_rebuild_v1",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("bc_attribution", JSON.stringify(base));
    }

    return Object.entries(base).map(([name, value]) => ({ name, value }));
  }, [utm]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const fd = new FormData(formRef.current);
      const payload = Object.fromEntries(fd.entries());

      const phone = String(payload.phone || "");
      const zip = String(payload.zip || "");

      if (!/^\D?(\d\D*){7,}$/.test(phone)) {
        throw new Error("Please enter a valid phone number.");
      }

      if (!/^\d{5}$/.test(zip)) {
        throw new Error("Please enter a valid 5-digit ZIP code.");
      }

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error || "We couldn't submit the form.");
      }

      trackFormSubmit({
        form_name: "Contact Request Form",
        form_location: "ContactRequestForm",
        page: "/contact",
        intent: "request service",
      });

      router.push(
        `/contact/success?service=${encodeURIComponent(
          payload.service || "General Contact Request",
        )}`,
      );
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
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
        Tell us what happened. We’ll call you right away to dispatch help.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
        noValidate
      >
        <div className="hidden">
          <label>
            Do not fill this out:
            <input
              type="text"
              name="honeypot"
              tabIndex="-1"
              autoComplete="off"
            />
          </label>
        </div>

        {hiddenFields.map((field) => (
          <input
            key={field.name}
            type="hidden"
            name={field.name}
            defaultValue={field.value}
          />
        ))}

        <div>
          <label className="block text-sm font-medium text-zinc-800">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800">
            ZIP Code
          </label>
          <input
            name="zip"
            type="text"
            required
            autoComplete="postal-code"
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800">
            Service Needed
          </label>
          <select
            name="service"
            required
            defaultValue=""
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none text-zinc-800 focus:border-blue-600"
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
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800">
            Email (optional)
          </label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-800">
            Details (optional)
          </label>
          <textarea
            name="notes"
            rows={4}
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
        </div>

        {error ? (
          <div className="md:col-span-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200">
            {error}
          </div>
        ) : null}

        <div className="md:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={submitting}
              className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors ${
                submitting
                  ? "bg-blue-300 text-white"
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
