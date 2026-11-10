"use client";

import {
  Droplets,
  Wind,
  ShieldAlert,
  SprayCan,
  Flame,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useId } from "react";

const services = [
  { title: "Air Duct Cleaning", icon: <Wind className="h-12 w-12 text-aqua" />, description: "Discuss dust, debris, access and the cleaning scope for residential or commercial ductwork.", href: "/services/air-duct-cleaning" },
  {
    title: "Water Damage Restoration",
    icon: <Wind className="h-12 w-12 text-aqua" />,
    description:
      "Emergency extraction, structural drying, moisture control, and restoration support for floods, leaks, burst pipes, and storm damage.",
    href: "/services/water-damage-restoration",
  },
  {
    title: "Mold Remediation",
    icon: <Droplets className="h-12 w-12 text-aqua" />,
    description:
      "Identify the affected areas, contain the spread, remove unsafe materials, and treat impacted spaces to help restore a healthier environment.",
    href: "/services/mold-remediation",
  },
  {
    title: "Fire & Smoke Restoration",
    icon: <Flame className="h-12 w-12 text-aqua" />,
    description:
      "Remove smoke residue, address affected materials, and begin restoration work after fire-related damage to the property.",
    href: "/services/fire-and-smoke-restoration",
  },
  {
    title: "Cleaning & Sanitization",
    icon: <SprayCan className="h-12 w-12 text-aqua" />,
    description:
      "Targeted cleaning, odor reduction, and sanitization support after water damage, contamination events, or difficult property conditions.",
    href: "/services/cleaning-and-sanitization",
  },
  {
    title: "Emergency Services",
    icon: <ShieldAlert className="h-12 w-12 text-aqua" />,
    description:
      "24/7 response for urgent restoration needs across Jacksonville and Northeast Florida when immediate action is needed to reduce damage.",
    href: "/services/emergency-services",
  },
];

export default function ServicesOverview() {
  const headingId = useId();
  return (
    <section data-services-overview aria-labelledby={headingId} className="services-overview">
      <div className="services-photo-track" aria-hidden="true">
        <div className="services-photo-panel">
          {/* The tall static crop needs more source pixels than the viewport width. */}
          <Image src="/images/projects/worker-at-protected-kitchen.webp" alt="" fill sizes="(max-width: 1023px) 1600px, 100vw" quality={75} loading="lazy" className="services-photo" />
        </div>
      </div>
      <div className="services-shade" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="services-intro">
          <h2 id={headingId} className="text-4xl font-heading font-bold text-white sm:text-5xl">
            Full-Service Emergency Restoration
          </h2>

          <p className="mt-5 text-base font-medium leading-7 text-slate-100 sm:text-lg">
            Restoration services for Jacksonville homes and businesses facing
            water damage, mold issues, smoke damage, or urgent cleanup needs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {[...services.slice(1), services[0]].map((service) => (
            <Link
              href={service.href}
              key={service.title}
              className="services-proof-card group flex h-full flex-col rounded-2xl border border-white/20 bg-navy/90 p-6 shadow-sm transition-colors duration-200 hover:border-aqua/70 hover:bg-navy/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua"
            >
              <div className="mb-4" aria-hidden="true">{service.icon}</div>

              <h3 className="mb-3 text-xl font-heading font-bold text-lightText">
                {service.title}
              </h3>

              <p className="mb-5 flex-1 text-base leading-7 text-slate-200">
                {service.description}
              </p>

              <span
                className="inline-flex items-center gap-2 text-base font-semibold text-aqua transition hover:underline"
              >
                Learn More
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
