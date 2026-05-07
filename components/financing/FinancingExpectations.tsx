// /components/financing/FinancingExpectations.tsx

type FinancingExpectationsProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  bullets?: string[];
  className?: string;
};

const defaultBullets = [
  "Availability varies by project",
  "Approval may be required for some options",
  "Down payment requirements may apply",
  "We will explain the next step clearly",
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FinancingExpectations({
  eyebrow = "Important to Know",
  title = "Clear expectations from the start",
  body = "Financing availability depends on the type of project, scope of work, approval factors, and other circumstances. Not every option is available for every situation. We will help you understand what may be possible and answer your questions as clearly as we can.",
  bullets = defaultBullets,
  className,
}: FinancingExpectationsProps) {
  const hasBullets = bullets.length > 0;

  return (
    <section
      className={cx("bg-stone-50", className)}
      aria-labelledby="financing-expectations-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {eyebrow}
              </p>

              <h2
                id="financing-expectations-title"
                className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
              >
                {title}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                {body}
              </p>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              {hasBullets ? (
                <ul
                  className="space-y-4"
                  aria-label="Financing expectation details"
                >
                  {bullets.map((bullet, index) => (
                    <li
                      key={`${bullet}-${index}`}
                      className="flex items-start gap-3"
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

                      <p className="text-sm leading-7 text-slate-700 sm:text-base">
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 sm:text-base">
                  Financing details vary by project, and we&apos;ll help explain
                  what applies to your situation.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
