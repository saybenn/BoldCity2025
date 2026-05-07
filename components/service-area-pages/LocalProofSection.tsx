import type { ProofCard } from "@/lib/service-area-pages/types";

type LocalProofSectionProps = {
  heading: string;
  cards: ProofCard[];
};

export default function LocalProofSection({
  heading,
  cards,
}: LocalProofSectionProps) {
  if (!cards.length) return null;

  return (
    <section className="bg-white px-5 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
            Local proof
          </p>

          <h2 className="mt-3 text-[clamp(2rem,3vw,3.5rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
            {heading}
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.75rem] border border-[#d7ded9] bg-stone-50 p-6 shadow-sm md:p-8"
            >
              {card.meta ? (
                <p className="mb-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f766e]">
                  {card.meta}
                </p>
              ) : null}

              <h3 className="text-xl font-black tracking-[-0.03em] text-[#16211f]">
                {card.title}
              </h3>

              <p className="mt-3 text-base leading-7 text-[#5f6f69]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
