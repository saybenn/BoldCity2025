// components/service/ServiceHero.jsx

import Image from "next/image";
import Link from "next/link";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackCta } from "@/lib/analytics";

function slugToTitle(s = "") {
  return s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
}

function normalizePhoneHref(phone = "") {
  if (!phone) return "tel:+19044346318";
  if (phone.startsWith("tel:")) return phone;
  if (phone.startsWith("+")) return `tel:${phone}`;
  return `tel:+1${phone.replace(/\D/g, "")}`;
}

function normalizePhoneNumber(phone = "") {
  if (!phone) return "+19044346318";
  if (phone.startsWith("tel:")) return phone.replace("tel:", "");
  if (phone.startsWith("+")) return phone;
  return `+1${phone.replace(/\D/g, "")}`;
}

export default function ServiceHero({
  title,
  subtitle,
  image,
  ctaPhone,
  badge,
  slug,
  serviceTitle,
}) {
  const cleanService = serviceTitle || (title ? slugToTitle(title) : undefined);
  const pagePath = slug ? `/services/${slug}` : "/services";
  const phoneHref = normalizePhoneHref(ctaPhone);
  const phoneNumber = normalizePhoneNumber(ctaPhone);

  function handleScheduleClick() {
    trackCta({
      cta_label: "Schedule Free Inspection",
      cta_location: "ServiceHero",
      intent: "schedule inspection",
      page: pagePath,
      href: "#contact",
    });
  }

  return (
    <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden md:h-[90vh]">
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

      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <div className="mb-4 flex flex-col items-center gap-2">
          {badge && (
            <span className="inline-block rounded-full bg-aqua px-4 py-1 text-sm font-semibold text-navy shadow-md">
              {badge}
            </span>
          )}

          <span className="inline-block rounded-full bg-green px-3 py-1 text-lg font-semibold text-white">
            Financing Available
          </span>
        </div>

        {cleanService && (
          <h1 className="mb-2 text-3xl text-white/90 lg:text-4xl">
            <strong className="text-white/70"> {cleanService} </strong>{" "}
            <span>with Bold City IAQ</span>
          </h1>
        )}

        {subtitle && (
          <p className="mb-6 text-lg font-medium md:text-xl">{subtitle}</p>
        )}

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TrackedPhoneLink
            href={phoneHref}
            phoneNumber={phoneNumber}
            ctaLabel="Call Now"
            ctaLocation="ServiceHero"
            page={pagePath}
            intent="call service page"
            className="rounded-full bg-aqua px-6 py-3 text-lg font-bold text-navy shadow-md transition hover:bg-aqua-dark"
            ariaLabel="Call Bold City IAQ now"
          >
            Call Now
          </TrackedPhoneLink>

          <Link
            href="#contact"
            onClick={handleScheduleClick}
            className="rounded-full border border-white px-6 py-3 text-lg text-white transition hover:bg-white hover:text-navy"
            aria-label="Schedule a free inspection"
          >
            Schedule Free Inspection
          </Link>
        </div>
      </div>
    </section>
  );
}
