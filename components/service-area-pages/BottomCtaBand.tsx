import type { CtaLink } from "@/lib/service-area-pages/types";
import TrackedCtaLink from "./TrackedCtaLink";

type BottomCtaBandProps = {
  heading: string;
  body: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  pagePath: string;
};

export default function BottomCtaBand({
  heading,
  body,
  primaryCta,
  secondaryCta,
  pagePath,
}: BottomCtaBandProps) {
  return (
    <section className="bg-navy-dark px-5 py-14 text-white md:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
          Get help now
        </p>

        <h2 className="mt-3 text-[clamp(2.2rem,4vw,4.25rem)] font-black leading-[0.98] tracking-[-0.055em]">
          {heading}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#d8ebe7]">
          {body}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedCtaLink
            cta={primaryCta}
            pagePath={pagePath}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-center text-base font-bold text-[#0f2724] shadow-sm transition hover:bg-[#ecfdf5]"
          />

          {secondaryCta ? (
            <TrackedCtaLink
              cta={secondaryCta}
              pagePath={pagePath}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3 text-center text-base font-bold text-white transition hover:border-white hover:bg-white/10"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
