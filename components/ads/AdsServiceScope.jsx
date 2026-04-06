import { Droplets, Flame, ShieldAlert, Wind, Sparkles } from "lucide-react";
import AdsSection from "./AdsSection";

const items = [
  {
    icon: Droplets,
    title: "Water Removal & Drying",
    text: "Extraction, structural drying, and moisture control to reduce secondary damage.",
  },
  {
    icon: Flame,
    title: "Fire & Smoke Cleanup",
    text: "Soot removal, deodorization, and affected-material cleanup after fire events.",
  },
  {
    icon: Wind,
    title: "Mold Remediation",
    text: "Containment, removal of affected materials, and remediation support for impacted spaces.",
  },
  {
    icon: ShieldAlert,
    title: "Storm Damage Stabilization",
    text: "Fast response for storm-related water intrusion and urgent property stabilization.",
  },
  {
    icon: Sparkles,
    title: "Cleaning & Sanitization",
    text: "Deep cleaning and odor reduction for spaces affected by damage or contamination.",
  },
];

export default function AdsServiceScope() {
  return (
    <AdsSection className="py-10 md:py-12">
      <h2 className="text-center text-3xl font-semibold text-zinc-900">
        Emergency Services We Provide
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-zinc-900">{title}</h3>
            </div>
            <p className="mt-3 text-zinc-700">{text}</p>
          </div>
        ))}
      </div>
    </AdsSection>
  );
}
