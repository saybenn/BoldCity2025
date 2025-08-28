import { useRef, useState, useMemo } from "react";
export default function LeadForm({ data, utm = {} }) {
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const cn = (...classes) => classes.filter(Boolean).join(" ");

  // Build attribution/hidden fields from:
  // 1) props.utm, 2) URL params, 3) localStorage fallback
  const hiddenFields = useMemo(() => {
    const url =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const get = (k) => utm?.[k] ?? url?.get(k) ?? "";

    // localStorage fallback (previous session)
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
      gclid: get("gclid") || ls.gclid || "",
      wbraid: get("wbraid") || ls.wbraid || "",
      gbraid: get("gbraid") || ls.gbraid || "",
      referrer:
        (typeof document !== "undefined" ? document.referrer : "") ||
        ls.referrer ||
        "",
      landing_page_url:
        (typeof window !== "undefined" ? window.location.href : "") ||
        ls.landing_page_url ||
        "",
      device:
        (/Mobi|Android/i.test(
          typeof navigator !== "undefined" ? navigator.userAgent : ""
        )
          ? "mobile"
          : "desktop") ||
        ls.device ||
        "",
      page_variant: ls.page_variant || "A",
      timestamp: new Date().toISOString() || ls.timestamp || "",
      timezone:
        (typeof Intl !== "undefined" &&
          Intl.DateTimeFormat().resolvedOptions().timeZone) ||
        ls.timezone ||
        "",
    };

    // Persist for later pages
    if (typeof window !== "undefined") {
      localStorage.setItem("bc_attribution", JSON.stringify(base));
    }

    // Convert to [{name, value}] list expected below
    return Object.entries(base).map(([name, value]) => ({ name, value }));
  }, [utm]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const fd = new FormData(formRef.current);

      // Simple client-side constraints
      const phone = (fd.get("phone") || "").toString();
      const zip = (fd.get("zip") || "").toString();

      if (!/^\D?(\d\D*){7,}$/.test(phone)) {
        throw new Error("Please enter a valid phone number.");
      }
      if (!/^\d{5}$/.test(zip)) {
        throw new Error("Please enter a 5-digit ZIP code.");
      }

      // Optional: include Turnstile token if you add the widget
      // const turnstileToken = window?.turnstileToken || "";

      // Build JSON from FormData
      const payload = Object.fromEntries(fd.entries());
      // payload.turnstileToken = turnstileToken;

      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await r.json();
      if (!r.ok || json?.ok === false) {
        throw new Error(json?.error || "We couldn't submit the form.");
      }

      // Fire client-side conversion events (optional)
      window.gtag?.("event", "conversion", { send_to: "AW-10940863332/label" });
      window.gtag?.("event", "lead_submit", { source: "ads_emergency" });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_submit",
        form_name: "Ads Emergency Lead",
      });

      setDone(true);
      formRef.current?.reset();
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl md:max-w-none lg:rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-zinc-200 shadow-lg">
      <h2 className="lg:text-5xl text-4xl font-semibold text-zinc-900">
        {data.heading}
      </h2>
      <p className="mt-1 text-zinc-700">{data.subheading}</p>

      {/* Status region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {submitting
          ? "Submitting..."
          : done
          ? "Submission complete."
          : error
          ? "Submission error."
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
          className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 "
          noValidate
        >
          {/* Honeypot (anti-spam) */}
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

          {/* Hidden attribution fields */}
          {hiddenFields.map((h, i) => (
            <input key={i} type="hidden" name={h.name} defaultValue={h.value} />
          ))}

          {data.fields.map((f, i) => {
            if (f.type === "hidden") {
              // Ensure any extra hidden fields from data are included
              return (
                <input
                  key={i}
                  type="hidden"
                  name={f.name}
                  defaultValue={
                    hiddenFields.find((h) => h.name === f.name)?.value || ""
                  }
                />
              );
            }

            if (f.type === "select") {
              return (
                <div key={i} className="min-w-0 md:col-span-1">
                  <label className="text-base block font-medium text-zinc-800 break-words">
                    {f.label}
                  </label>
                  <select
                    name={f.name}
                    required={!!f.required}
                    autoComplete="off"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-blue-600"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (f.type === "textarea") {
              return (
                <div key={i} className="min-w-0 md:col-span-2">
                  <label className="text-base block font-medium text-zinc-800">
                    {f.label}
                  </label>
                  <textarea
                    name={f.name}
                    rows={4}
                    autoComplete="off"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              );
            }

            // Inputs
            const common =
              "mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600";
            const auto =
              f.name === "name"
                ? "name"
                : f.name === "phone"
                ? "tel"
                : f.name === "zip"
                ? "postal-code"
                : "off";

            return (
              <div key={i} className="md:col-span-1">
                <label className="text-base block  font-medium text-zinc-800">
                  {f.label}
                </label>
                <input
                  name={f.name}
                  type={f.type}
                  required={!!f.required}
                  autoComplete={auto}
                  inputMode={
                    f.name === "phone"
                      ? "tel"
                      : f.name === "zip"
                      ? "numeric"
                      : "text"
                  }
                  pattern={
                    f.name === "zip"
                      ? "\\d{5}"
                      : f.name === "phone"
                      ? "[0-9()\\+\\-\\.\\s]{7,}" // lenient, validated server-side too
                      : undefined
                  }
                  className={common}
                />
              </div>
            );
          })}

          {/* Optional: Cloudflare Turnstile placeholder
          <div className="md:col-span-2">
            <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}></div>
            <input type="hidden" name="turnstileToken" />
          </div> */}

          {error && (
            <div className="md:col-span-2">
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200">
                {error} — or call{" "}
                <a href="tel:19044346318" className="font-semibold underline">
                  (904) 434-6318
                </a>
                .
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors",
                  submitting
                    ? "bg-blue-300 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                )}
                aria-busy={submitting ? "true" : "false"}
              >
                {submitting ? "Submitting..." : data.submit.label}
              </button>

              <a
                href={data.altCTA.href}
                className="text-sm font-semibold text-blue-700 hover:underline break-words"
              >
                {data.altCTA.label}
              </a>
            </div>

            <p className="mt-3 text-xs text-zinc-500 break-words">
              {data.consentText}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
