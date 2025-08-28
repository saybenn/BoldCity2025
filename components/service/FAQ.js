import React from "react";

export default function FAQ({ heading, faqs }) {
  if (!heading || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }
  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full bg-white dark:bg-dark py-16 border-t border-border px-4 sm:px-6 lg:px-8"
    >
      {" "}
      <div className="max-w-4xl mx-auto">
        <h2
          id="faq-heading"
          className="text-3xl sm:text-4xl font-bold text-darkText dark:text-grey-900 mb-10 text-center"
        >
          {heading}
        </h2>
        <dl className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <dt className="text-lg font-semibold text-darkText dark:text-gray-800">
                {faq.question}
              </dt>
              <dd className="mt-2 text-base text-mutedText dark:text-zinc-900">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
