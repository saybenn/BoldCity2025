// pages/contact/index.js
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import MetaHead from "@/components/MetaHead";
import SchemaMarkup from "@/components/SchemaMarkup";
import LeadForm from "@/components/LeadForm"; // or wherever your LeadForm is
import TrustBar from "@/components/service/TrustBar"; // badges row (IICRC, NORMI, etc.)

// Lazy-load the Google embed to keep LCP snappy
const MapEmbed = dynamic(() => import("@/components/MapEmbed"), { ssr: false });

export default function ContactPage() {
  const { query, asPath } = useRouter();

  // --------- SEO / Meta ----------
  const meta = {
    title:
      "Contact Bold City IAQ | 24/7 Emergency Restoration in Jacksonville, FL",
    description:
      "Need help now? Call (904) 434-6318 or request service online. 24/7 emergency response for water, fire, smoke, mold, and sanitization. IICRC & NORMI certified.",
    canonical: "https://www.boldcityiaq.com/contact",
    og: {
      title: "Contact Bold City IAQ",
      description:
        "Jacksonville’s 24/7 certified restoration pros. Call now or request service online.",
      image: "/images/ads/hero-emergency.webp",
    },
  };

  // --------- Page Data (copy/text) ----------
  const data = {
    hero: {
      heading: "Contact Bold City IAQ",
      subheading:
        "24/7 live answer — on our way in 2 hours or less across Jacksonville & NE Florida.",
      phone: "904-434-6318",
      ctaPrimary: { label: "Call Now", href: "tel:9044346318" },
      ctaSecondary: { label: "Request Service", href: "#lead-form" },
    },
    nap: {
      address: "10066 103rd St. Unit #206, Jacksonville, FL 32210",
      phone: "(904) 434-6318",
      phoneHref: "tel:9044346318",
      officePhone: "(904) 619-6043",
      officePhoneHref: "tel:9046196043",
      email: "info@boldcityiaq.com",
      emailHref: "mailto:info@boldcityiaq.com",
      hours: "24/7 Emergency Response; Office Mon–Fri",
    },
    form: {
      heading: "Request Service Now",
      subheading:
        "Tell us what happened. We’ll call you right away to dispatch a certified team.",
      submit: { label: "Send Request" },
      consentText:
        "By submitting you agree to be contacted by phone, SMS, or email. No spam. Opt‑out anytime.",
      fields: [
        { label: "Full Name", name: "name", type: "text", required: true },
        { label: "Phone", name: "phone", type: "tel", required: true },
        { label: "ZIP Code", name: "zip", type: "text", required: true },
        {
          label: "Service Needed",
          name: "service",
          type: "select",
          required: true,
          options: [
            "Water Damage Restoration",
            "Fire & Smoke Restoration",
            "Mold Remediation",
            "Cleaning & Sanitization",
            "Emergency Services",
          ],
        },
        {
          label: "Email (optional)",
          name: "email",
          type: "email",
          required: false,
        },
        {
          label: "Details (optional)",
          name: "notes",
          type: "textarea",
          required: false,
        },

        // Hidden UTM slots (LeadForm already merges these if present)
        { name: "utm_source", type: "hidden" },
        { name: "utm_medium", type: "hidden" },
        { name: "utm_campaign", type: "hidden" },
        { name: "utm_term", type: "hidden" },
        { name: "utm_content", type: "hidden" },
        { name: "gclid", type: "hidden" },
        { name: "wbraid", type: "hidden" },
        { name: "gbraid", type: "hidden" },
        { name: "referrer", type: "hidden" },
        { name: "landing_page_url", type: "hidden" },
        { name: "device", type: "hidden" },
        { name: "page_variant", type: "hidden" },
        { name: "timestamp", type: "hidden" },
        { name: "timezone", type: "hidden" },
        // Honeypot
        { name: "company", type: "hidden" }, // your LeadForm treats as honeypot
      ],
      altCTA: {
        label: "Prefer email? info@boldcityiaq.com",
        href: "mailto:info@boldcityiaq.com",
      },
    },
    faq: [
      {
        q: "Do you offer 24/7 emergency service?",
        a: "Yes. We answer calls 24/7 and dispatch technicians immediately.",
      },
      {
        q: "Do you work with my insurance?",
        a: "Yes. We document the loss and coordinate with your carrier to streamline your claim.",
      },
      {
        q: "How fast can you arrive?",
        a: "In most cases we’re on the way in 2 hours or less, depending on your location and conditions.",
      },
      {
        q: "Which areas do you serve?",
        a: "Jacksonville, Orange Park, St. Augustine, Ponte Vedra, Fleming Island, and surrounding Northeast Florida communities.",
      },
      {
        q: "Do you offer financing?",
        a: "Yes—$0 down and monthly payment options are available for qualified customers.",
      },
    ],
  };

  // --------- JSON‑LD (fed into <SchemaMarkup />) ----------
  const schema = [
    // LocalBusiness (contact/NAP)
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Bold City Indoor Air Quality and Emergency Services",
      image: "https://www.boldcityiaq.com/images/logo.webp",
      url: "https://www.boldcityiaq.com",
      telephone: "+19044346318",
      email: "info@boldcityiaq.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "10066 103rd St. Unit #206",
        addressLocality: "Jacksonville",
        addressRegion: "FL",
        postalCode: "32210",
        addressCountry: "US",
      },
      areaServed: [
        "Jacksonville FL",
        "Orange Park FL",
        "St. Augustine FL",
        "Ponte Vedra FL",
        "Fleming Island FL",
        "Duval County FL",
        "Clay County FL",
        "Flagler County FL",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      sameAs: [
        "https://www.google.com/maps?cid=0xc058b814f67b274a", // your GBP CID link (optional)
      ],
    },
    // FAQPage
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    // WebPage / Breadcrumbs (optional but nice)
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.boldcityiaq.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://www.boldcityiaq.com/contact",
        },
      ],
    },
  ];

  // --------- UTM/defaults for the form ----------
  const utm = {
    utm_source: query.utm_source || "",
    utm_medium: query.utm_medium || "",
    utm_campaign: query.utm_campaign || "",
    utm_term: query.utm_term || "",
    utm_content: query.utm_content || "",
    gclid: query.gclid || "",
    wbraid: query.wbraid || "",
    gbraid: query.gbraid || "",
    referrer: typeof window !== "undefined" ? document.referrer : "",
    landing_page_url: `https://www.boldcityiaq.com${asPath || "/contact"}`,
    device:
      typeof window !== "undefined"
        ? window.innerWidth < 640
          ? "mobile"
          : window.innerWidth < 1024
          ? "tablet"
          : "desktop"
        : "",
    page_variant: "contact_default",
    timestamp: typeof window !== "undefined" ? new Date().toISOString() : "",
    timezone:
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "",
  };

  return (
    <Layout>
      <MetaHead {...meta} />
      <SchemaMarkup data={schema} />

      {/* Hero / CTA */}
      <section className="w-full px-8 pb-10 pt-32 bg-navy">
        <h1 className="text-5xl font-bold">{data.hero.heading}</h1>
        <p className="mt-2 text-lg">{data.hero.subheading}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="btn text-lg font-semibold bg-green px-4 py-2 rounded-full"
            href={data.hero.ctaPrimary.href}
          >
            {data.hero.ctaPrimary.label} ({data.hero.phone})
          </a>
          <a
            className="text-lg font-semibold bg-yellow-500 px-4 py-2 rounded-full"
            href={data.hero.ctaSecondary.href}
          >
            {data.hero.ctaSecondary.label}
          </a>
        </div>
        <div className="mt-6">
          <TrustBar />
        </div>
      </section>

      {/* Lead Form + NAP + Map */}
      <section className="w-full mx-auto py-10" id="lead-form">
        <LeadForm data={data.form} utm={utm} />
        <div className="space-y-5 lg:flex justify-around w-full py-8">
          <div className=" p-5">
            <h2 className="text-4xl lg:text-5xl font-semibold text-darkText">
              Office & Service Area
            </h2>
            <ul className="mt-3 space-y-2 text-darkText">
              <li>
                <strong>Address:</strong> {data.nap.address}
              </li>
              <li>
                <strong>24‑Hour Phone:</strong>{" "}
                <a
                  className="text-blue-700 hover:underline "
                  href={data.nap.phoneHref}
                >
                  {data.nap.phone}
                </a>
              </li>
              <li>
                <strong>Office (non‑emergency):</strong>{" "}
                <a
                  className="text-blue-700 hover:underline"
                  href={data.nap.officePhoneHref}
                >
                  {data.nap.officePhone}
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  className="text-blue-700 hover:underline"
                  href={data.nap.emailHref}
                >
                  {data.nap.email}
                </a>
              </li>
              <li>
                <strong>Hours:</strong> {data.nap.hours}
              </li>
            </ul>
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* FAQs */}
      <section className="w-full py-10 px-5">
        <h2 className="text-4xl lg:text-5xl text-darkText font-semibold">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {data.faq.map((f) => (
            <details key={f.q} className="rounded-xl border p-4">
              <summary className="cursor-pointer font-semibold text-gray-900">
                {f.q}
              </summary>
              <p className="mt-2 text-zinc-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-10 px-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 p-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-darkText">
            Need help right now?
          </h2>
          <p className="mt-1 text-darkText font-semibold mb-4">
            Call{" "}
            <a className="text-blue-700 font-semibold" href="tel:9044346318">
              (904) 434‑6318
            </a>{" "}
            or submit the form above — we’ll dispatch immediately.
          </p>
          <a
            className="text-lg font-semibold bg-yellow-500 px-4 py-2 rounded-full"
            href={data.hero.ctaSecondary.href}
          >
            {data.hero.ctaSecondary.label}
          </a>
        </div>
      </section>
    </Layout>
  );
}
