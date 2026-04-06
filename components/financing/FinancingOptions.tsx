// /components/financing/FinancingOptions.tsx

import FinancingOptionCard, {
  type FinancingOption,
} from "@/components/financing/FinancingOptionCard";

type FinancingOptionsProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  options?: FinancingOption[];
  className?: string;
};

const defaultOptions: FinancingOption[] = [
  {
    id: "third-party",
    title: "Third-Party Financing",
    summary:
      "For many projects, third-party financing may be available through a standard approval process.",
    expectationsLabel: "What to expect",
    expectations:
      "This option typically includes a credit review. Some customers qualify even when they initially assume they may not.",
    supportNote:
      "A common path for customers looking for a traditional financing option.",
    iconKey: "third-party",
  },
  {
    id: "in-house",
    title: "In-House Financing",
    summary:
      "In some cases, we may offer in-house financing with a required down payment.",
    expectationsLabel: "What to expect",
    expectations:
      "Down payments typically range from 45% to 65%, depending on the project and other factors.",
    supportNote:
      "When this option is available, we work to explain it clearly and keep the process straightforward.",
    iconKey: "in-house",
  },
  {
    id: "hybrid",
    title: "Hybrid Financing",
    summary: "For some projects, a split financing structure may be possible.",
    expectationsLabel: "What to expect",
    expectations:
      "This can mean in-house financing for the mitigation portion of the project and third-party financing for the reconstruction portion.",
    supportNote:
      "This option is less common and depends on the specific scope and circumstances involved.",
    iconKey: "hybrid",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FinancingOptions({
  eyebrow = "Financing Paths",
  title = "Options explained clearly",
  body = "We present financing in a way that helps customers understand the path, not just the payment mechanics. Each option depends on the project and circumstances involved.",
  options = defaultOptions,
  className,
}: FinancingOptionsProps) {
  if (!options.length) return null;

  return (
    <section
      className={cx("bg-stone-50", className)}
      aria-labelledby="financing-options-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {eyebrow}
          </p>

          <h2
            id="financing-options-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">
            {body}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
          {options.map((option, index) => (
            <FinancingOptionCard
              key={option.id}
              option={option}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
