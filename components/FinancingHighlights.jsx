"use client";

import { CreditCard, BadgeDollarSign, CheckCircle } from "lucide-react";
import Link from "next/link";

const items = [
  {
    icon: <CreditCard className="h-10 w-10 text-aqua" />,
    title: "Flexible Payment Options",
    description:
      "Break large restoration costs into manageable monthly payments instead of delaying needed work.",
  },
  {
    icon: <BadgeDollarSign className="h-10 w-10 text-aqua" />,
    title: "Promotional APR Options*",
    description:
      "Qualified applicants may have access to promotional financing with fast approval timelines.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-aqua" />,
    title: "Start Work Without Waiting",
    description:
      "Urgent damage does not improve with time. Financing can help you move faster when repairs cannot wait.",
  },
];

export default function FinancingHighlights() {
  return (
    <section className="bg-navy-dark pb-16 pt-16 text-lightText sm:pt-48 lg:pb-20 lg:pt-52">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold sm:text-4xl lg:text-5xl">
          Flexible Financing for Emergency Repairs
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-lightText/85 sm:text-lg">
          Do not let cost delay mitigation. Bold City IAQ offers financing paths
          that can help qualified homeowners move forward with cleanup and
          restoration sooner.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-navy p-6 shadow-md"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="mb-2 text-xl font-heading font-bold text-white">
                {item.title}
              </h3>
              <p className="text-base leading-7 text-lightText/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/financing"
            className="inline-flex items-center justify-center rounded-md bg-aqua px-6 py-3 text-lg font-semibold text-white transition hover:scale-[1.02] hover:bg-aqua-dark"
            aria-label="Apply for financing"
          >
            Apply Now
          </Link>
          <p className="mt-3 text-sm text-lightText/60">
            *Financing terms depend on approval and lender availability.
          </p>
        </div>
      </div>
    </section>
  );
}
