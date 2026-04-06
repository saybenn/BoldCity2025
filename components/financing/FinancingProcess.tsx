// /components/financing/FinancingProcess.tsx

type ProcessStep = {
  id: string;
  title: string;
  body: string;
};

type FinancingProcessProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  steps?: ProcessStep[];
  className?: string;
};

const defaultSteps: ProcessStep[] = [
  {
    id: "tell-us",
    title: "Tell us about your project",
    body: "We learn about the work involved and the situation you’re dealing with.",
  },
  {
    id: "review-options",
    title: "We review possible options",
    body: "Based on the project, we discuss which financing paths may apply.",
  },
  {
    id: "explain-details",
    title: "We explain the details clearly",
    body: "We walk you through what to expect, including any approval or down payment considerations.",
  },
  {
    id: "decide-next-step",
    title: "You decide how to move forward",
    body: "Our goal is to help you make an informed decision with clarity.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function StepNumber({ number }: { number: number }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100">
      {String(number).padStart(2, "0")}
    </div>
  );
}

export type { ProcessStep, FinancingProcessProps };

export default function FinancingProcess({
  eyebrow = "The Process",
  title = "What the process looks like",
  body = "We keep the next step simple. Our role is to help you understand what may apply to your project and what moving forward would look like.",
  steps = defaultSteps,
  className,
}: FinancingProcessProps) {
  if (!steps.length) return null;

  return (
    <section
      className={cx("bg-white", className)}
      aria-labelledby="financing-process-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {eyebrow}
          </p>

          <h2
            id="financing-process-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">
            {body}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <StepNumber number={index + 1} />

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                    {step.body}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 translate-x-6 translate-y-6 rounded-full bg-emerald-100/40 blur-2xl"
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
