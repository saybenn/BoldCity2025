// /components/financing/FinancingOptionCard.tsx

type FinancingOption = {
  id: string;
  title: string;
  summary: string;
  expectationsLabel?: string;
  expectations: string;
  supportNote?: string;
  bestFit?: string;
  iconKey?: "third-party" | "in-house" | "hybrid" | string;
};

type FinancingOptionCardProps = {
  option: FinancingOption;
  featured?: boolean;
  className?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function OptionIcon({ iconKey }: { iconKey?: string }) {
  const common = "h-5 w-5 text-emerald-700";

  if (iconKey === "in-house") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
      >
        <path
          d="M4 10.5 12 4l8 6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 9.5V20h11V9.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 14h4" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconKey === "hybrid") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
      >
        <path
          d="M5 7h5a3 3 0 0 1 3 3v7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 7h-5a3 3 0 0 0-3 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 7l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={common}
    >
      <rect x="4" y="6" width="16" height="12" rx="2.5" />
      <path d="M4 10h16" strokeLinecap="round" />
      <path d="M8 14h3" strokeLinecap="round" />
    </svg>
  );
}

export type { FinancingOption, FinancingOptionCardProps };

export default function FinancingOptionCard({
  option,
  featured = false,
  className,
}: FinancingOptionCardProps) {
  return (
    <article
      className={cx(
        "relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition",
        featured
          ? "border-emerald-200 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.35)]"
          : "border-slate-200",
        className,
      )}
    >
      {featured ? (
        <div className="mb-5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
          Common path
        </div>
      ) : null}

      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
          <OptionIcon iconKey={option.iconKey} />
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            {option.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            {option.summary}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
          {option.expectationsLabel ?? "What to expect"}
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-800 sm:text-base">
          {option.expectations}
        </p>
      </div>

      {option.bestFit ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            Best fit
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            {option.bestFit}
          </p>
        </div>
      ) : null}

      {option.supportNote ? (
        <p className="mt-5 border-t border-slate-200 pt-5 text-sm leading-7 text-slate-600 sm:text-base">
          {option.supportNote}
        </p>
      ) : null}
    </article>
  );
}
