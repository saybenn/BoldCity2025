// pages/ads/emergency-restoration.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { adLandingPageData } from "@/lib/adLandingPage";
import LeadForm from "@/components/LeadForm";
import { callClickEvent } from "@/lib/gtm";
import { useRouter } from "next/router";

/** ----------------------------
 *  DATA (can be moved to /data/adLandingPageData.js)
 *  ---------------------------*/
// const adLandingPageData = {
//   id: "boldcity-emergency-ads",
//   route: "/ads/emergency-restoration",
//   meta: {
//     title: "24/7 Emergency Restoration Jacksonville FL | Bold City IAQ",
//     description:
//       "On our way in 2 hours or less. Water, fire, mold & storm damage cleanup with direct insurance billing and flexible financing. Call now for 24/7 help.",
//     canonical: "https://www.boldcityiaq.com/ads/emergency-restoration",
//     og: {
//       title: "Emergency Restoration • 24/7 • Jacksonville, FL",
//       description:
//         "Live answer 24/7. Board-up, tarping, water removal, fire/smoke cleanup, mold mitigation. Financing available. Call now.",
//       image: "/images/ads/hero-emergency-finance.webp",
//     },
//   },
//   settings: {
//     stickyCTA: {
//       enabled: true,
//       mobileOnly: true,
//       primaryLabel: "Call Now",
//       primaryHref: "tel:19044346318",
//       secondaryLabel: "Get Financing",
//       secondaryHref: "#finance",
//     },
//     hideGlobalNav: true,
//     trackUTM: true,
//   },
//   hero: {
//     heading: "24/7 Emergency Restoration",
//     highlight: "On Our Way in 2 Hours or Less",
//     subheading:
//       "Water • Fire • Mold • Storm — Certified cleanup, rapid stabilization, and full restoration.",
//     financeBadge: {
//       label: "No Upfront Cost • Flexible Financing",
//       sublabel: "We bill insurance directly for covered losses",
//     },
//     ctas: [
//       {
//         label: "Call Now (904) 434-6318",
//         href: "tel:19044346318",
//         variant: "primary",
//       },
//       {
//         label: "Request Emergency Service",
//         href: "#lead-form",
//         variant: "secondary",
//       },
//       { label: "Get Financing", href: "#finance", variant: "ghost" },
//     ],
//     bullets: [
//       "Live Answer 24/7",
//       "IICRC & NORMI Certified",
//       "Insurance-Ready Documentation",
//       "Locally Owned & Operated",
//     ],
//     image: "/images/ads/hero-emergency-finance.webp",
//     trustBadgesInline: true,
//   },
//   trustBar: {
//     heading: "Trusted by Northeast Florida Property Owners",
//     badges: [
//       { name: "IICRC Certified", image: "/images/badges/iicrc.webp" },
//       { name: "NORMI Certified", image: "/images/badges/normi.webp" },
//       {
//         name: "Google Reviews ★★★★★",
//         image: "/images/badges/google-reviews.webp",
//       },
//       {
//         name: "Local Business Award",
//         image: "/images/badges/local-award.webp",
//       },
//     ],
//     testimonial: {
//       quote:
//         "They were here in under an hour after our kitchen flood and handled everything with our insurance. Absolute lifesavers.",
//       author: "Maria S., Jacksonville",
//       avatar: "/images/avatars/maria.webp",
//     },
//     subtext:
//       "Locally Owned & Operated — Serving Jacksonville & NE Florida Since 2012",
//   },
//   urgency: {
//     heading: "Why You Need Fast Action",
//     bullets: [
//       "Mold can begin within 24–48 hours in wet materials",
//       "Openings invite wind, rain, and intruders",
//       "Soot residues damage finishes the longer they sit",
//       "Rapid stabilization reduces total repair costs",
//     ],
//     miniCTA: {
//       label: "Call Now — Technicians Standing By",
//       href: "tel:19044346318",
//     },
//   },
//   services: {
//     heading: "Emergency Services We Provide",
//     items: [
//       {
//         icon: "water",
//         title: "Water Removal & Drying",
//         text: "High-capacity extraction, structural drying, and moisture monitoring to stop secondary damage.",
//       },
//       {
//         icon: "fire",
//         title: "Fire & Smoke Cleanup",
//         text: "Soot removal, deodorization, HVAC protection, and full rebuilds with insurance coordination.",
//       },
//       {
//         icon: "mold",
//         title: "Mold Mitigation",
//         text: "Containment, HEPA filtration, and safe remediation to protect health and indoor air quality.",
//       },
//       {
//         icon: "storm",
//         title: "Storm & Hurricane",
//         text: "Emergency board-up, roof tarping, debris removal, and rapid stabilization after severe weather.",
//       },
//       {
//         icon: "clean",
//         title: "Cleaning & Sanitization",
//         text: "Deep cleaning, disinfection, and odor control for contents and structures after any loss.",
//       },
//     ],
//   },
//   finance: {
//     id: "finance",
//     heading: "Get Emergency Help Now — Pay Later",
//     bullets: [
//       "0% APR promotional plans for qualified homeowners",
//       "No upfront payment required to start work",
//       "We bill your insurance directly for covered losses",
//       "Flexible options for uncovered damage",
//     ],
//     cta: { label: "Check Financing Options", href: "#lead-form" },
//     image: "/images/ads/finance-friendly.webp",
//     faq: [
//       {
//         q: "Can you start work before insurance pays?",
//         a: "Yes. We can begin immediately and bill your carrier directly when applicable. We also offer financing for uncovered items so you’re not delayed.",
//       },
//       {
//         q: "Will applying for financing hurt my credit?",
//         a: "Most providers use a soft credit check for pre-qualification, which does not impact your credit score.",
//       },
//     ],
//   },
//   process: {
//     heading: "How It Works",
//     steps: [
//       {
//         head: "Call Us 24/7",
//         tail: "Speak to a live expert and get an immediate ETA.",
//       },
//       {
//         head: "On-Site in ≤ 2 Hours",
//         tail: "We secure openings, extract water, and stabilize conditions.",
//       },
//       {
//         head: "Clean, Repair & Restore",
//         tail: "From mitigation to rebuilds, we handle everything.",
//       },
//       {
//         head: "Insurance Coordination",
//         tail: "Detailed photos, moisture logs, and estimates for your claim.",
//       },
//     ],
//     image: "/images/ads/process-emergency.webp",
//   },
//   testimonials: {
//     heading: "What Homeowners Are Saying",
//     list: [
//       {
//         quote:
//           "Professional, fast, and super clear about the process. The two-hour arrival promise was real.",
//         author: "Steve D., Ponte Vedra",
//       },
//       {
//         quote:
//           "They tarped our roof the same night of the storm and helped us navigate the claim. Five stars.",
//         author: "Kendra L., Jacksonville Beach",
//       },
//       {
//         quote:
//           "Financing made it possible to start right away. Our home was back to normal quickly.",
//         author: "Mike R., Orange Park",
//       },
//     ],
//   },
//   serviceAreas: {
//     heading: "Proudly Serving Jacksonville & Northeast Florida",
//     text: "We’re local and ready 24/7 across the metro and surrounding counties.",
//     areas: [
//       "Jacksonville, FL",
//       "Orange Park, FL",
//       "St. Augustine, FL",
//       "Ponte Vedra, FL",
//       "Fleming Island, FL",
//       "Baldwin, FL",
//       "Beaches (Atlantic, Neptune, Jacksonville Beach)",
//       "Argyle Forest, FL",
//       "Oakleaf Plantation, FL",
//       "Duval County, FL",
//       "Clay County, FL",
//       "Flagler County, FL",
//     ],
//     mapImage: "/images/ads/map-jax-coverage.webp",
//   },
//   leadForm: {
//     id: "lead-form",
//     heading: "Request Emergency Service",
//     subheading:
//       "Complete this short form and we’ll call you right away. For fastest help, call now.",
//     fields: [
//       { name: "name", label: "Full Name", type: "text", required: true },
//       { name: "phone", label: "Phone Number", type: "tel", required: true },
//       {
//         name: "service",
//         label: "Service Needed",
//         type: "select",
//         options: [
//           "Water",
//           "Fire/Smoke",
//           "Mold",
//           "Storm",
//           "Cleaning/Sanitization",
//         ],
//         required: true,
//       },
//       { name: "zip", label: "ZIP Code", type: "text", required: true },
//       {
//         name: "notes",
//         label: "Brief Description (Optional)",
//         type: "textarea",
//       },
//       { name: "utm_source", type: "hidden" },
//       { name: "utm_campaign", type: "hidden" },
//       { name: "utm_term", type: "hidden" },
//     ],
//     consentText:
//       "By submitting, you agree to be contacted by Bold City IAQ via phone, text, or email regarding your request.",
//     submit: { label: "Get Immediate Help", variant: "primary" },
//     altCTA: { label: "Or Call Now (904) 434-6318", href: "tel:19044346318" },
//   },
//   closingCTA: {
//     heading: "Don’t Wait — Every Minute Matters",
//     subheading:
//       "Call now for 24/7 emergency help. We’ll secure your property and start restoration immediately.",
//     ctas: [
//       {
//         label: "Call Now (904) 434-6318",
//         href: "tel:19044346318",
//         variant: "primary",
//       },
//       {
//         label: "Request Emergency Service",
//         href: "#lead-form",
//         variant: "secondary",
//       },
//     ],
//   },
// };

/** ----------------------------
 *  UTILITIES
 *  ---------------------------*/
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Button = ({
  href = "#",
  children,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
    secondary:
      "bg-amber-500 text-zinc-900 hover:bg-amber-400 focus-visible:ring-amber-500",
    ghost:
      "bg-transparent text-emerald-300 ring-1 ring-emerald-300 hover:bg-emerald-50",
    outline: "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-50",
  };
  const content = (
    <span className={cn(base, variants[variant], className)} onClick={onClick}>
      {children}
    </span>
  );
  return href.startsWith("tel:") || href.startsWith("#") ? (
    <a
      href={href}
      aria-label={typeof children === "string" ? children : "Button"}
    >
      {content}
    </a>
  ) : (
    <Link href={href}>{content}</Link>
  );
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={cn("mx-auto max-w-6xl px-4 md:px-6", className)}>
    {children}
  </section>
);

/** ----------------------------
 *  PAGE
 *  ---------------------------*/
export default function EmergencyAdsPage() {
  const d = adLandingPageData;

  // Capture UTM params into form state

  const trackUTM = Boolean(d?.settings?.trackUTM); // stable primitive
  const router = useRouter();
  const [utm, setUtm] = useState({
    utm_source: "",
    utm_campaign: "",
    utm_term: "",
  });

  useEffect(() => {
    if (!trackUTM) return;

    // Pull query from router (SSR-safe; doesn't touch window)
    const queryString = router.asPath.split("?")[1] || "";
    const search = new URLSearchParams(queryString);

    setUtm({
      utm_source: search.get("utm_source") || "",
      utm_campaign: search.get("utm_campaign") || "",
      utm_term: search.get("utm_term") || "",
    });
  }, [trackUTM, router.asPath]); // ✅ satisfies exhaustive-deps and updates on client nav

  // Sticky CTA visible only on small screens (CSS hides on md+)
  const StickyCTA = () =>
    d.settings.stickyCTA?.enabled ? (
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="mx-auto max-w-6xl px-4 pb-3">
          <div className="rounded-2xl bg-white/95 shadow-lg ring-1 ring-zinc-200 backdrop-blur">
            <div className="flex gap-2 p-3">
              <Button
                href={d.settings.stickyCTA.primaryHref}
                variant="primary"
                className="flex-1"
              >
                {d.settings.stickyCTA.primaryLabel}
              </Button>
              <Button
                href={d.settings.stickyCTA.secondaryHref}
                variant="secondary"
                className="flex-1"
              >
                {d.settings.stickyCTA.secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  // Simple icon renderer (swap for real icons if you like)
  const EmojiIcon = ({ name }) => {
    const map = {
      water: "💧",
      fire: "🔥",
      mold: "🦠",
      storm: "🌪️",
      clean: "🧼",
    };
    return <span className="text-xl">{map[name] || "✔️"}</span>;
  };

  const handleCallClick = () => {
    // placeholder for analytics: gtag('event', 'call_click', { ... })
  };

  return (
    <>
      <Head>
        <title>{d.meta.title}</title>
        <meta name="description" content={d.meta.description} />
        <link rel="canonical" href={d.meta.canonical} />
        <meta property="og:title" content={d.meta.og.title} />
        <meta property="og:description" content={d.meta.og.description} />
        <meta property="og:image" content={d.meta.og.image} />
        <meta name="robots" content="noindex,follow" />
      </Head>

      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
        <Section className="py-12 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                {d.hero.heading}
                <span className="block text-amber-400">{d.hero.highlight}</span>
              </h1>
              <p className="mt-3 text-zinc-200">{d.hero.subheading}</p>

              <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-2 ring-1 ring-zinc-700">
                <span className="text-emerald-400">✔</span>
                <p className="text-sm">
                  <span className="font-semibold">
                    {d.hero.financeBadge.label}
                  </span>{" "}
                  <span className="text-zinc-300">
                    • {d.hero.financeBadge.sublabel}
                  </span>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {d.hero.ctas.map((c, i) => (
                  <Button
                    key={i}
                    href={c.href}
                    variant={c.variant}
                    className="min-w-44"
                    onClick={
                      c.href.startsWith("tel:") ? handleCallClick : undefined
                    }
                  >
                    {c.label}
                  </Button>
                ))}
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-zinc-200 md:grid-cols-4">
                {d.hero.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-400">●</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/3] w-full">
              <Image
                src={d.hero.image}
                alt="Emergency restoration hero"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-3xl object-cover shadow-2xl ring-1 ring-zinc-700"
              />
            </div>
          </div>
        </Section>
      </header>

      {/* TRUST BAR with testimonial */}
      <Section className="py-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
          <p className="text-center text-sm font-medium text-zinc-600">
            {d.trustBar.heading}
          </p>
          <div className="mt-4 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-4">
            {d.trustBar.badges.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-zinc-700">
                  {b.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-200">
              <Image
                src={d.trustBar.testimonial.avatar}
                alt={d.trustBar.testimonial.author}
                fill
              />
            </div>
            <blockquote className="text-center text-zinc-800 md:text-left">
              <p className="text-lg font-medium">
                &ldquo;{d.trustBar.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-1 text-sm text-zinc-500">
                — {d.trustBar.testimonial.author}
              </footer>
            </blockquote>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-600">
            {d.trustBar.subtext}
          </p>
        </div>
      </Section>

      {/* URGENCY */}
      <Section className="py-12">
        <div className="grid gap-8 rounded-3xl bg-zinc-50 p-8 ring-1 ring-zinc-200 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold text-zinc-900">
              {d.urgency.heading}
            </h2>
            <div className="mt-4">
              <Button
                href={d.urgency.miniCTA.href}
                variant="primary"
                onClick={() => callClickEvent("19044346318")}
              >
                {d.urgency.miniCTA.label}
              </Button>
            </div>
          </div>
          <ul className="md:col-span-2 grid list-disc gap-3 pl-5 text-zinc-700">
            {d.urgency.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="py-12">
        <h2 className="text-center text-3xl font-semibold text-zinc-900">
          {d.services.heading}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.services.items.map((s, i) => (
            <Link
              href={s.href}
              key={i}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200"
            >
              <div className="flex items-center gap-3">
                <EmojiIcon name={s.icon} />
                <h3 className="text-lg font-semibold text-zinc-900">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-zinc-700">{s.text}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* FINANCE */}
      <Section id="finance" className="py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-semibold text-zinc-900">
              {d.finance.heading}
            </h2>
            <ul className="mt-4 grid gap-2 text-zinc-700">
              {d.finance.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-500">✔</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href={d.finance.cta.href} variant="secondary">
                {d.finance.cta.label}
              </Button>
            </div>
            <div className="mt-6 space-y-3">
              {d.finance.faq.map((f, i) => (
                <details
                  key={i}
                  className="rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200"
                >
                  <summary className="cursor-pointer font-medium text-zinc-900">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-zinc-700">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="relative order-1 aspect-[4/3] w-full md:order-2">
            <Image
              src={d.finance.image}
              alt="Financing friendly restoration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover  ring-zinc-200"
            />
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="py-12">
        <div className="rounded-3xl bg-blue-700 p-8 shadow-sm ring-1 ring-zinc-200">
          <h2 className="text-3xl font-semibold text-white">
            {d.process.heading}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {d.process.steps.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200"
              >
                <div className="mb-2 text-sm font-semibold text-amber-600">
                  Step {i + 1}
                </div>
                <div className="font-semibold text-zinc-900">{s.head}</div>
                <div className="mt-1 text-sm text-zinc-700">{s.tail}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="py-12">
        <h2 className="text-center text-3xl font-semibold text-zinc-900">
          {d.testimonials.heading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {d.testimonials.list.map((t, i) => (
            <figure
              key={i}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200"
            >
              <blockquote className="text-zinc-800">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-zinc-600">
                — {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* SERVICE AREAS */}
      <Section className="py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-zinc-900">
              {d.serviceAreas.heading}
            </h2>
            <p className="mt-2 text-zinc-700">{d.serviceAreas.text}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-700 sm:grid-cols-3">
              {d.serviceAreas.areas.map((a, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-zinc-200"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={d.serviceAreas.mapImage}
              alt="Jacksonville coverage map"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-3xl object-cover ring-1 ring-zinc-200"
            />
          </div>
        </div>
      </Section>

      {/* LEAD FORM */}
      <Section id={d.leadForm.id} className="py-12">
        <LeadForm data={d.leadForm} utm={utm} />
      </Section>

      {/* CLOSING CTA */}
      <Section className="pb-28 pt-8 md:pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-blue-400 to-blue-700 p-8 text-white">
          <h2 className="text-3xl font-semibold">{d.closingCTA.heading}</h2>
          <p className="mt-2 text-blue-100">{d.closingCTA.subheading}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {d.closingCTA.ctas.map((c, i) => (
              <Button key={i} href={c.href} variant={c.variant}>
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {/* Sticky mobile CTA */}
      <StickyCTA />
    </>
  );
}
/** ----------------------------
 *  LEAD FORM COMPONENT (HARDENED)
 *  ---------------------------*/
// function LeadForm({ data, utm = {} }) {
//   const formRef = useRef(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [done, setDone] = useState(false);
//   const [error, setError] = useState("");

//   // Build attribution/hidden fields from:
//   // 1) props.utm, 2) URL params, 3) localStorage fallback
//   const hiddenFields = useMemo(() => {
//     const url =
//       typeof window !== "undefined"
//         ? new URLSearchParams(window.location.search)
//         : null;
//     const get = (k) => utm?.[k] ?? url?.get(k) ?? "";

//     // localStorage fallback (previous session)
//     let ls = {};
//     if (typeof window !== "undefined") {
//       try {
//         ls = JSON.parse(localStorage.getItem("bc_attribution") || "{}");
//       } catch {}
//     }

//     const base = {
//       utm_source: get("utm_source") || ls.utm_source || "",
//       utm_medium: get("utm_medium") || ls.utm_medium || "",
//       utm_campaign: get("utm_campaign") || ls.utm_campaign || "",
//       utm_term: get("utm_term") || ls.utm_term || "",
//       utm_content: get("utm_content") || ls.utm_content || "",
//       gclid: get("gclid") || ls.gclid || "",
//       wbraid: get("wbraid") || ls.wbraid || "",
//       gbraid: get("gbraid") || ls.gbraid || "",
//       referrer:
//         (typeof document !== "undefined" ? document.referrer : "") ||
//         ls.referrer ||
//         "",
//       landing_page_url:
//         (typeof window !== "undefined" ? window.location.href : "") ||
//         ls.landing_page_url ||
//         "",
//       device:
//         (/Mobi|Android/i.test(
//           typeof navigator !== "undefined" ? navigator.userAgent : ""
//         )
//           ? "mobile"
//           : "desktop") ||
//         ls.device ||
//         "",
//       page_variant: ls.page_variant || "A",
//       timestamp: new Date().toISOString() || ls.timestamp || "",
//       timezone:
//         (typeof Intl !== "undefined" &&
//           Intl.DateTimeFormat().resolvedOptions().timeZone) ||
//         ls.timezone ||
//         "",
//     };

//     // Persist for later pages
//     if (typeof window !== "undefined") {
//       localStorage.setItem("bc_attribution", JSON.stringify(base));
//     }

//     // Convert to [{name, value}] list expected below
//     return Object.entries(base).map(([name, value]) => ({ name, value }));
//   }, [utm]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);

//     try {
//       const fd = new FormData(formRef.current);

//       // Simple client-side constraints
//       const phone = (fd.get("phone") || "").toString();
//       const zip = (fd.get("zip") || "").toString();

//       if (!/^\D?(\d\D*){7,}$/.test(phone)) {
//         throw new Error("Please enter a valid phone number.");
//       }
//       if (!/^\d{5}$/.test(zip)) {
//         throw new Error("Please enter a 5-digit ZIP code.");
//       }

//       // Optional: include Turnstile token if you add the widget
//       // const turnstileToken = window?.turnstileToken || "";

//       // Build JSON from FormData
//       const payload = Object.fromEntries(fd.entries());
//       // payload.turnstileToken = turnstileToken;

//       const r = await fetch("/api/lead", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const json = await r.json();
//       if (!r.ok || json?.ok === false) {
//         throw new Error(json?.error || "We couldn't submit the form.");
//       }

//       // Fire client-side conversion events (optional)
//       window.gtag?.("event", "conversion", { send_to: "AW-XXXX/label" });
//       window.gtag?.("event", "lead_submit", { source: "ads_emergency" });
//       window.dataLayer = window.dataLayer || [];
//       window.dataLayer.push({
//         event: "lead_submit",
//         form_name: "Ads Emergency Lead",
//       });

//       setDone(true);
//       formRef.current?.reset();
//     } catch (err) {
//       setError(err?.message || "Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="rounded-3xl bg-white p-8 ring-1 ring-zinc-200 shadow-lg">
//       <h2 className="text-3xl font-semibold text-zinc-900">{data.heading}</h2>
//       <p className="mt-1 text-zinc-700">{data.subheading}</p>

//       {/* Status region for screen readers */}
//       <div aria-live="polite" className="sr-only">
//         {submitting
//           ? "Submitting..."
//           : done
//           ? "Submission complete."
//           : error
//           ? "Submission error."
//           : ""}
//       </div>

//       {done ? (
//         <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-200">
//           Thanks! We received your request and will call you right away.
//         </div>
//       ) : (
//         <form
//           ref={formRef}
//           onSubmit={onSubmit}
//           className="mt-6 grid gap-4 md:grid-cols-2"
//           noValidate
//         >
//           {/* Honeypot (anti-spam) */}
//           <div className="hidden">
//             <label>
//               Do not fill this out:
//               <input
//                 type="text"
//                 name="honeypot"
//                 tabIndex="-1"
//                 autoComplete="off"
//               />
//             </label>
//           </div>

//           {/* Hidden attribution fields */}
//           {hiddenFields.map((h, i) => (
//             <input key={i} type="hidden" name={h.name} defaultValue={h.value} />
//           ))}

//           {data.fields.map((f, i) => {
//             if (f.type === "hidden") {
//               // Ensure any extra hidden fields from data are included
//               return (
//                 <input
//                   key={i}
//                   type="hidden"
//                   name={f.name}
//                   defaultValue={
//                     hiddenFields.find((h) => h.name === f.name)?.value || ""
//                   }
//                 />
//               );
//             }

//             if (f.type === "select") {
//               return (
//                 <div key={i} className="md:col-span-1">
//                   <label className="block text-sm font-medium text-zinc-800">
//                     {f.label}
//                   </label>
//                   <select
//                     name={f.name}
//                     required={!!f.required}
//                     autoComplete="off"
//                     className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-blue-600"
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select...
//                     </option>
//                     {f.options.map((o) => (
//                       <option key={o} value={o}>
//                         {o}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               );
//             }

//             if (f.type === "textarea") {
//               return (
//                 <div key={i} className="md:col-span-2">
//                   <label className="block text-sm font-medium text-zinc-800">
//                     {f.label}
//                   </label>
//                   <textarea
//                     name={f.name}
//                     rows={4}
//                     autoComplete="off"
//                     className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
//                   />
//                 </div>
//               );
//             }

//             // Inputs
//             const common =
//               "mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600";
//             const auto =
//               f.name === "name"
//                 ? "name"
//                 : f.name === "phone"
//                 ? "tel"
//                 : f.name === "zip"
//                 ? "postal-code"
//                 : "off";

//             return (
//               <div key={i} className="md:col-span-1">
//                 <label className="block text-sm font-medium text-zinc-800">
//                   {f.label}
//                 </label>
//                 <input
//                   name={f.name}
//                   type={f.type}
//                   required={!!f.required}
//                   autoComplete={auto}
//                   inputMode={
//                     f.name === "phone"
//                       ? "tel"
//                       : f.name === "zip"
//                       ? "numeric"
//                       : "text"
//                   }
//                   pattern={
//                     f.name === "zip"
//                       ? "\\d{5}"
//                       : f.name === "phone"
//                       ? "[0-9()+.s-]{7,}" // lenient, validated server-side too
//                       : undefined
//                   }
//                   className={common}
//                 />
//               </div>
//             );
//           })}

//           {/* Optional: Cloudflare Turnstile placeholder
//           <div className="md:col-span-2">
//             <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}></div>
//             <input type="hidden" name="turnstileToken" />
//           </div> */}

//           {error && (
//             <div className="md:col-span-2">
//               <div className="rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200">
//                 {error} — or call{" "}
//                 <a href="tel:19044346318" className="font-semibold underline">
//                   (904) 434-6318
//                 </a>
//                 .
//               </div>
//             </div>
//           )}

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               disabled={submitting}
//               className={cn(
//                 "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors",
//                 submitting
//                   ? "bg-blue-300 text-white"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               )}
//               aria-busy={submitting ? "true" : "false"}
//             >
//               {submitting ? "Submitting..." : data.submit.label}
//             </button>

//             <a
//               href={data.altCTA.href}
//               className="ml-4 align-middle text-sm font-semibold text-blue-700 hover:underline"
//             >
//               {data.altCTA.label}
//             </a>

//             <p className="mt-3 text-xs text-zinc-500">{data.consentText}</p>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }
