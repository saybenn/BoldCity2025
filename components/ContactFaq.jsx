"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you offer same-day emergency service?",
    answer:
      "Yes. Bold City IAQ provides 24/7 emergency response for water damage, mold concerns, and other urgent restoration needs throughout Jacksonville and nearby areas.",
  },
  {
    question: "How long does water damage restoration usually take?",
    answer:
      "Drying timelines vary by severity, materials affected, and how quickly mitigation begins. Many drying phases take a few days, while full restoration can take longer depending on repairs needed.",
  },
  {
    question: "Will you work with my insurance provider?",
    answer:
      "Yes. We help document the damage and provide information that can support the claims process with your insurance provider.",
  },
  {
    question: "Can I get financing for major repairs?",
    answer:
      "Yes. Financing options may be available for qualified applicants to help with larger restoration costs.",
  },
  {
    question: "What is included in mold remediation?",
    answer:
      "Typical remediation includes inspection of affected areas, containment, removal of impacted materials where needed, cleaning, and steps to help reduce recurrence.",
  },
];

export default function ContactFaq() {
  return (
    <div className="w-full rounded-2xl bg-[#101214] p-6 shadow-xl sm:p-8">
      <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-3 text-base leading-7 text-white/70">
        Quick answers to common questions that often come up before someone
        calls or submits a request.
      </p>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <Disclosure key={faq.question}>
            {({ open }) => (
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Disclosure.Button className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-semibold text-white transition hover:bg-white/5 sm:text-lg">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-4 text-sm leading-7 text-white/75 sm:text-base">
                  {faq.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
