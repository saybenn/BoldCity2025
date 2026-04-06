// /components/financing/FinancingCTA.tsx

import Link from "next/link";

type FinancingCTAProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
  onCtaClick?: (payload: {
    ctaLabel: string;
    ctaLocation: "FinancingCTA";
    intent: "financing inquiry";
    href: string;
  }) => void;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type { FinancingCTAProps };

export default function FinancingCTA({
  eyebrow = "Next Step",
  title = "Need help understanding your financing options?",
  body = "Talk with our team and we’ll help you review the paths that may make sense for your project.",
  primaryCtaLabel = "Discuss Your Options",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "Call Bold City IAQ",
  secondaryCtaHref = "tel:+19040000000",
  className,
  onCtaClick,
}: FinancingCTAProps) {
  const isSecondaryPhone = secondaryCtaHref.startsWith("tel:");

  const handleCtaClick = (ctaLabel: string, href: string) => {
    onCtaClick?.({
      ctaLabel,
      ctaLocation: "FinancingCTA",
      intent: "financing inquiry",
      href,
    });
  };

  return (
    <section
      className={cx("bg-slate-950", className)}
      aria-labelledby="financing-cta-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.5)] sm:px-8 sm:py-12 lg:px-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              {eyebrow}
            </p>

            <h2
              id="financing-cta-title"
              className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              {title}
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
              {body}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryCtaHref}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-slate-950"
                onClick={() => handleCtaClick(primaryCtaLabel, primaryCtaHref)}
              >
                {primaryCtaLabel}
              </Link>

              {secondaryCtaLabel && secondaryCtaHref ? (
                isSecondaryPhone ? (
                  <a
                    href={secondaryCtaHref}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950"
                    onClick={() =>
                      handleCtaClick(secondaryCtaLabel, secondaryCtaHref)
                    }
                  >
                    {secondaryCtaLabel}
                  </a>
                ) : (
                  <Link
                    href={secondaryCtaHref}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950"
                    onClick={() =>
                      handleCtaClick(secondaryCtaLabel, secondaryCtaHref)
                    }
                  >
                    {secondaryCtaLabel}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
