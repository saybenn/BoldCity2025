// /components/financing/FinancingIntro.tsx

type FinancingIntroProps = {
  title?: string;
  body?: string;
  checklist?: string[];
  className?: string;
};

const defaultChecklist = [
  "We review the project scope",
  "We discuss possible financing paths",
  "We explain what may apply",
  "We help you understand the next step clearly",
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FinancingIntro({
  title = "A simple way to understand your options",
  body = "Every project is different, and not every financing path fits every situation. Our role is to help you understand what may be available, explain it clearly, and help you move forward with a plan that makes sense for the work involved.",
  checklist = defaultChecklist,
  className,
}: FinancingIntroProps) {
  const hasChecklist = checklist.length > 0;

  return (
    <section
      className={cx("bg-white", className)}
      aria-labelledby="financing-intro-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            How It Works
          </p>

          <h2
            id="financing-intro-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">
            {body}
          </p>
        </div>

        {hasChecklist ? (
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <div className="grid gap-0 sm:grid-cols-2">
                {checklist.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className={cx(
                      "flex items-start gap-3 px-5 py-5 sm:px-6",
                      index % 2 === 0 ? "sm:border-r sm:border-slate-200" : "",
                      index < checklist.length - 2
                        ? "border-b border-slate-200 sm:border-b"
                        : index < checklist.length - 1 &&
                            checklist.length % 2 !== 0
                          ? "border-b border-slate-200 sm:border-b-0"
                          : "",
                    )}
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415.005L3.3 9.204a1 1 0 111.4-1.428l4.08 4.001 6.5-6.487a1 1 0 011.424 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <p className="text-sm font-medium leading-6 text-slate-800 sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
