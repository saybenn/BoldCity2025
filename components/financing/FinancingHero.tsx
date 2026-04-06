// /components/financing/FinancingHero.tsx

import Link from "next/link";
import Image from "next/image";

type TrustChip = {
  id: string;
  label: string;
};

type FinancingHeroProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  microcopy?: string;
  trustChips?: TrustChip[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  onCtaClick?: (payload: {
    ctaLabel: string;
    ctaLocation: "FinancingHero";
    intent: "financing inquiry";
    href: string;
  }) => void;
};

const defaultTrustChips: TrustChip[] = [
  { id: "1", label: "Clear guidance" },
  { id: "2", label: "No pressure" },
  { id: "3", label: "Real project support" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FinancingHero({
  eyebrow = "Financing Options",
  title = "Practical financing options for qualifying projects",
  body = "Unexpected mitigation, restoration, or indoor air quality work can create pressure fast. We offer financing paths for many situations and help you understand what may be possible for your project.",
  primaryCtaLabel = "Discuss Your Options",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "Call Our Team",
  secondaryCtaHref = "tel:+19044346318",
  microcopy = "Clear guidance. No pressure. We’ll help you understand the next step.",
  trustChips = defaultTrustChips,
  imageSrc = "/images/carousel2-min.webp",
  imageAlt = "Bold City IAQ service truck with company branding",
  className,
  onCtaClick,
}: FinancingHeroProps) {
  const handleCtaClick = (ctaLabel: string, href: string) => {
    onCtaClick?.({
      ctaLabel,
      ctaLocation: "FinancingHero",
      intent: "financing inquiry",
      href,
    });
  };

  const isSecondaryPhone = secondaryCtaHref.startsWith("tel:");

  return (
    <section
      className={cx("relative overflow-hidden bg-stone-50", className)}
      aria-labelledby="financing-hero-title"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {eyebrow}
            </p>

            <h1
              id="financing-hero-title"
              className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
            >
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              {body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryCtaHref}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                onClick={() => handleCtaClick(primaryCtaLabel, primaryCtaHref)}
              >
                {primaryCtaLabel}
              </Link>

              {isSecondaryPhone ? (
                <a
                  href={secondaryCtaHref}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                  onClick={() =>
                    handleCtaClick(secondaryCtaLabel, secondaryCtaHref)
                  }
                >
                  {secondaryCtaLabel}
                </a>
              ) : (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                  onClick={() =>
                    handleCtaClick(secondaryCtaLabel, secondaryCtaHref)
                  }
                >
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-600">{microcopy}</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.48)]">
              <div className="relative min-h-[360px] sm:min-h-[420px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/70 to-slate-900/40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_35%)]" />

                <div className="relative z-10 flex min-h-[360px] flex-col justify-between p-6 sm:min-h-[420px] sm:p-8">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Qualifying projects
                    </div>

                    <div className="mt-6 max-w-md">
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        Financing should feel understandable, not overwhelming.
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-200 sm:text-base">
                        We walk customers through possible paths with clarity so
                        they can understand what may fit their project and what
                        the next step looks like.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {trustChips.map((chip) => (
                      <div
                        key={chip.id}
                        className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm"
                      >
                        {chip.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
