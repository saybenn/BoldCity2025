import type { FaqItem } from "@/lib/service-area-pages/types";

type FaqAccordionProps = {
  heading: string;
  items: FaqItem[];
};

export default function FaqAccordion({ heading, items }: FaqAccordionProps) {
  if (!items.length) return null;

  return (
    <section className="bg-stone-50 px-5 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
            Questions
          </p>

          <h2 className="mt-3 text-[clamp(2rem,3vw,3.5rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
            {heading}
          </h2>
        </div>

        <div className="mt-8 divide-y divide-[#d7ded9] overflow-hidden rounded-[1.75rem] border border-[#d7ded9] bg-white shadow-sm">
          {items.map((item) => (
            <details key={item.question} className="group p-6 md:p-7">
              <summary className="cursor-pointer list-none text-lg font-black tracking-[-0.025em] text-[#16211f]">
                <div className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span className="mt-1 text-[#0f766e] transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <p className="mt-4 max-w-3xl text-base leading-7 text-[#5f6f69]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
