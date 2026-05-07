import type { WhyLocalCard } from "@/lib/service-area-pages/types";

type WhyLocalMattersProps = {
  heading: string;
  cards: WhyLocalCard[];
};

export default function WhyLocalMatters({
  heading,
  cards,
}: WhyLocalMattersProps) {
  if (!cards.length) return null;

  return (
    <section className="bg-stone-50 px-5 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
            Local response matters
          </p>

          <h2 className="mt-3 text-[clamp(2rem,3vw,3.5rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
            {heading}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.5rem] border border-[#d7ded9] bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-black tracking-[-0.025em] text-[#16211f]">
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
