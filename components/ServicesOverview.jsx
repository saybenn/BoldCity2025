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

const services = [
  {
    title: "Mold Remediation",
    icon: <Droplets className="h-12 w-12 text-aqua" />,
    description:
      "Identify the affected areas, contain the spread, remove unsafe materials, and treat impacted spaces to help restore a healthier environment.",
    href: "/services/mold-remediation",
  },
  {
    title: "Water Damage Restoration",
    icon: <Wind className="h-12 w-12 text-aqua" />,
    description:
      "Emergency extraction, structural drying, moisture control, and restoration support for floods, leaks, burst pipes, and storm damage.",
    href: "/services/water-damage-restoration",
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
  return (
    <section className="bg-[#f7f8fa] py-20 text-darkText">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-heading font-bold text-darkText sm:text-5xl">
          Full-Service Emergency Restoration
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-7 text-gray-700 sm:text-lg">
          Restoration services for Jacksonville homes and businesses facing
          water damage, mold issues, smoke damage, or urgent cleanup needs.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-navy p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4">{service.icon}</div>

              <h3 className="mb-3 text-xl font-heading font-bold text-lightText">
                {service.title}
              </h3>

              <p className="mb-5 flex-1 text-base leading-7 text-gray-300">
                {service.description}
              </p>

              <Link
                href={service.href}
                className="inline-flex items-center gap-2 text-base font-semibold text-aqua transition hover:underline"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
