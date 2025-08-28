import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you offer same-day emergency service?",
    answer:
      "Yes, Bold City IAQ provides 24/7 emergency response for water, mold, and fire damage situations throughout Jacksonville and surrounding areas.",
  },
  {
    question: "How long does water damage restoration usually take?",
    answer:
      "Most projects take between 24–72 hours for drying and another few days for repairs, depending on severity.",
  },
  {
    question: "Will you work with my insurance provider?",
    answer:
      "Absolutely. We assist with claims and provide full documentation to help you navigate your policy.",
  },
  {
    question: "Can I get financing for major repairs?",
    answer:
      "Yes. We offer flexible financing options to help cover out-of-pocket costs — subject to approval.",
  },
  {
    question: "What’s included in mold remediation?",
    answer:
      "We inspect, isolate, remove, clean, and prevent mold regrowth using EPA-certified methods and equipment.",
  },
];

export default function ContactFaq() {
  return (
    <div className="w-full max-w-xl p-6 bg-white dark:bg-darkText rounded-2xl shadow-xl transition-all duration-300 ease-in-out">
      <h2 className="text-4xl lg:text-5xl font-heading text-navy dark:text-lightText mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
                <Disclosure.Button className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium text-gray-900 dark:text-lightText hover:bg-lightGray dark:hover:bg-navy-dark rounded-lg">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`${
                      open ? "rotate-180" : "rotate-0"
                    } h-4 w-4 transition-transform duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 py-4 text-lg text-gray-700 dark:text-gray-300">
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
