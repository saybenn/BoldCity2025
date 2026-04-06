"use client";

import { ShieldCheck, Zap, FileText } from "lucide-react";

const valueProps = [
  {
    icon: <Zap className="h-8 w-8 text-aqua" />,
    title: "Fast Local Response",
    description:
      "Jacksonville-area emergency dispatch for water, mold, and storm-related damage when timing matters most.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-aqua" />,
    title: "Certified Restoration Team",
    description:
      "IICRC-informed restoration work focused on mitigation, cleanup, and protecting the structure from further damage.",
  },
  {
    icon: <FileText className="h-8 w-8 text-aqua" />,
    title: "Insurance Documentation Help",
    description:
      "Clear job documentation and claim support to make the restoration process easier to navigate.",
  },
];

export default function ValueProps() {
  return (
    <section className="relative z-20 hidden h-0 sm:block">
      <div className="mx-auto max-w-6xl px-4 -translate-y-1/2 lg:-translate-y-[58%]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-navy p-7 text-center text-lightText shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="mb-3 text-lg font-heading font-bold text-white lg:text-[1.65rem]">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-lightText/85 lg:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
