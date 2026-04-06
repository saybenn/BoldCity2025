export default function ContactFaqGrid({ faqs }) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200"
            >
              <summary className="cursor-pointer font-semibold text-zinc-900">
                {faq.question}
              </summary>
              <p className="mt-2 text-zinc-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
