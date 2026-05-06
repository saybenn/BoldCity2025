import type { ProcessStep } from "@/lib/service-area-pages/types";

type ServiceProcessProps = {
  heading: string;
  steps: ProcessStep[];
};

export default function ServiceProcess({
  heading,
  steps,
}: ServiceProcessProps) {
  if (!steps.length) return null;

  return (
    <section className="bg-[#f7f3eb] px-5 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
            Our process
          </p>

          <h2 className="mt-3 text-[clamp(2rem,3vw,3.5rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
            {heading}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={`${step.title}-${index}`}
              className="rounded-[1.5rem] border border-[#d7ded9] bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f766e] text-sm font-black text-white">
                {index + 1}
              </div>

              <h3 className="mt-5 text-lg font-black tracking-[-0.025em] text-[#16211f]">
                {step.title}
              </h3>

              <p className="mt-3 text-base leading-7 text-[#5f6f69]">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
