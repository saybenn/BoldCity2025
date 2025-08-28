"use client";

import { Droplets, Wind, ShieldAlert, SprayCan, Flame } from "lucide-react";
import Link from "next/link";

export default function ServicesOverview() {
  const services = [
    {
      title: "Mold Remediation",
      icon: <Droplets className="w-12 h-12 text-aqua" />,
      description:
        "Complete mold removal and prevention using EPA-approved methods — serving Jacksonville homes and businesses.",
      href: "/services/mold-remediation",
    },
    {
      title: "Water Damage Restoration",
      icon: <Wind className="w-12 h-12 text-aqua" />,
      description:
        "Rapid drying, extraction, and restoration for floods, burst pipes, or storm damage — 24/7 service.",
      href: "/services/water-damage-restoration",
    },
    {
      title: "Fire & Smoke Restoration",
      icon: <Flame className="w-12 h-12 text-aqua" />,
      description:
        "Remove smoke residue and fire damage quickly and safely with our certified restoration team.",
      href: "/services/fire-and-smoke-restoration",
    },
    {
      title: "Cleaning & Sanitization",
      icon: <SprayCan className="w-12 h-12 text-aqua" />,
      description:
        "Disinfection and odor removal services for homes and facilities after damage or health emergencies.",
      href: "/services/cleaning-and-sanitization",
    },
    {
      title: "Emergency Services",
      icon: <ShieldAlert className="w-12 h-12 text-aqua" />,
      description:
        "24/7 dispatch for urgent water, fire, mold, or storm-related restoration across Northeast Florida.",
      href: "/services/emergency-services",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#f1f5f9] via-white to-white dark:from-background dark:via-background dark:to-background text-darkText dark:text-lightText">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-dark mb-4 drop-shadow-sm">
          Full-Service Emergency Restoration
        </h2>

        <p className="text-lg font-semibold font-sans text-gray-800 dark:text-gray-900 max-w-2xl mx-auto mb-12">
          We provide complete damage repair solutions for homes and businesses
          in Jacksonville — 24/7 availability and expert response.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-navy rounded-xl shadow-md p-6 text-left border border-lightGray dark:border-navy hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-heading font-bold text-darkText dark:text-zinc-100 mb-2">
                {service.title}
              </h3>
              <p className="text-lg font-sans text-gray-800 dark:text-gray-300 mb-4">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="text-aqua font-semibold text-lg hover:underline"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
