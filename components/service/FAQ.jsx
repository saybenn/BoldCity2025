import React, { useState } from "react";

export default function FAQ({ heading, faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!heading || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  function toggleFaq(index) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full border-t border-border bg-white px-4 py-16 dark:bg-dark sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            Questions
          </p>

          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-darkText dark:text-grey-900 sm:text-4xl"
          >
            {heading}
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div
                key={`${faq.question}-${index}`}
                className="border-b border-zinc-200 last:border-b-0"
              >
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none sm:px-6"
                  >
                    <span className="text-base font-semibold leading-7 text-darkText sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-lg font-semibold text-aqua transition-transform duration-200 ${
                        isOpen ? "rotate-45 bg-aqua text-white" : "bg-white"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-base leading-7 text-zinc-700 sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
