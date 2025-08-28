"use client";

import { ShieldCheck, Zap, Wrench } from "lucide-react";

export default function ValueProps() {
  const props = [
    {
      icon: <Zap className="w-8 h-8 text-aqua dark:text-aqua" />,
      title: "Fast Response",
      description:
        "Available 24/7 with local dispatch in Jacksonville for rapid emergency service.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-aqua dark:text-aqua" />,
      title: "Expert Technicians",
      description:
        "Certified restoration professionals with years of mold and water damage experience.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-aqua dark:text-aqua" />,
      title: "Insurance Support",
      description:
        "We help you navigate insurance claims for a stress-free restoration process.",
    },
  ];

  return (
    <section className="hidden sm:block -mt-20 z-20 absolute left-1/2  -translate-x-1/2 -translate-y-1 px-4 w-max">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {props.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-navy dark:border-navy-dark dark:text-lightText rounded-xl shadow-lg p-6 text-center border border-lightGray animate-in fade-in-up duration-700 ease-out"
          >
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="text-lg font-heading font-bold text-darkText dark:text-zinc-100 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-lightText font-sans">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
