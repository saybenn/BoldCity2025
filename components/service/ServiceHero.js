// components/service/ServiceHero.jsx
import Image from "next/image";
import Link from "next/link";

// Turn "mold-remediation" -> "Mold Remediation"
function slugToTitle(s = "") {
  return s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
}

export default function ServiceHero({
  title, // e.g., "24/7 Mold Remediation in Jacksonville, FL"
  subtitle, // e.g., "Fast Response. Certified Experts. Insurance-Ready."
  image, // e.g., "/images/hero-mold.jpg"
  ctaPhone, // e.g., "9044346318"
  badge, // optional extra badge text
  slug, // e.g., "mold-remediation" (preferred)
  serviceTitle, // optional explicit clean service name; overrides slug
}) {
  const cleanService = serviceTitle || (title ? slugToTitle(title) : undefined);
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={
            cleanService ? `${cleanService} background` : "Service background"
          }
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-navy-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        {/* Top badges */}
        <div className="flex flex-col items-center gap-2 mb-4">
          {badge && (
            <span className="inline-block bg-aqua text-navy font-semibold text-sm px-4 py-1 rounded-full shadow-md">
              {badge}
            </span>
          )}
          {/* Financing is always visible */}
          <span className="inline-block bg-green text-white font-semibold text-lg px-3 py-1 rounded-full">
            Financing Available
          </span>
        </div>

        {/* Service name line (from slug/title) */}
        {cleanService && (
          <h1 className="lg:text-4xl text-3xl text-white/90 mb-2">
            <strong className="text-white/70"> {cleanService} </strong>{" "}
            <span>with Bold City IAQ</span>
          </h1>
        )}

        {/* Main headline */}

        {/* Subheadline */}
        {subtitle && (
          <p className="text-lg md:text-xl mb-6 font-medium">{subtitle}</p>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${ctaPhone}`}
            className="bg-aqua text-navy font-bold text-lg px-6 py-3 rounded-full shadow-md transition hover:bg-aqua-dark"
            aria-label="Call Bold City IAQ now"
          >
            Call Now
          </a>

          <Link
            href="#contact"
            className="text-white border border-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-navy transition"
            aria-label="Schedule a free inspection"
          >
            Schedule Free Inspection
          </Link>
        </div>
      </div>
    </section>
  );
}
