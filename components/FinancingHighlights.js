"use client";

import { CreditCard, BadgeDollarSign, CheckCircle } from "lucide-react";

export default function FinancingHighlights() {
  const items = [
    {
      icon: <CreditCard className="w-10 h-10 text-aqua" />,
      title: "Flexible Payments",
      description:
        "Break your restoration costs into affordable monthly installments.",
    },
    {
      icon: <BadgeDollarSign className="w-10 h-10 text-aqua" />,
      title: "0% APR Available*",
      description: "No interest financing options with quick approval times.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-aqua" />,
      title: "Start Now, Pay Later",
      description:
        "Don't delay urgent repairs—apply today and pay when you're ready.",
    },
  ];

  return (
    <section className="sm:pt-32 py-16 bg-lightGray dark:bg-navy-dark text-darkText dark:text-lightText">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
          Flexible Financing for Emergency Repairs
        </h2>
        <p className="max-w-2xl mx-auto text-lg font-sans text-gray-700 dark:text-gray-300 mb-10">
          Don&apos;t let finances stop you from getting the help you need. Bold
          City IAQ partners with trusted lenders to provide simple, fast, and
          flexible payment options.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-navy rounded-xl shadow-md p-6 border border-lightGray dark:border-navy"
            >
              <div className="mb-4 ">{item.icon}</div>
              <h3 className="text-xl font-heading font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-lg font-sans text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#contact"
            className="inline-block bg-aqua hover:bg-aqua-dark text-white font-semibold px-6 py-3 rounded-md transition text-lg"
            aria-label="Apply for Financing"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
