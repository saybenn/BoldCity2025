import AdsSection from "./AdsSection";

const steps = [
  {
    head: "Call Us 24/7",
    tail: "Speak to a live person and tell us what happened.",
  },
  {
    head: "On-Site Assessment",
    tail: "We inspect the damage and determine the next best steps.",
  },
  {
    head: "Mitigation Starts",
    tail: "We begin cleanup, drying, containment, or stabilization work.",
  },
  {
    head: "Documentation & Next Steps",
    tail: "We help organize the job information you need moving forward.",
  },
];

export default function AdsProcessStrip() {
  return (
    <AdsSection className="py-10 md:py-12">
      <div className="rounded-3xl bg-blue-700 p-8 text-white">
        <h2 className="text-3xl font-semibold">How It Works</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.head}
              className="rounded-2xl bg-white p-5 text-zinc-900 ring-1 ring-zinc-200"
            >
              <div className="mb-2 text-sm font-semibold text-amber-600">
                Step {index + 1}
              </div>
              <div className="font-semibold">{step.head}</div>
              <div className="mt-1 text-sm text-zinc-700">{step.tail}</div>
            </div>
          ))}
        </div>
      </div>
    </AdsSection>
  );
}
