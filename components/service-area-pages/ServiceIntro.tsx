type ServiceIntroProps = {
  heading: string;
  body: string;
};

export default function ServiceIntro({ heading, body }: ServiceIntroProps) {
  if (!heading && !body) return null;

  return (
    <section className="bg-white px-5 py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
            Service overview
          </p>

          <h2 className="mt-3 text-[clamp(2rem,3vw,3.25rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
            {heading}
          </h2>
        </div>

        <div className="rounded-[1.75rem] border border-[#d7ded9] bg-[#f7f3eb] p-6 md:p-8">
          <p className="whitespace-pre-line text-lg leading-8 text-[#475467]">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
