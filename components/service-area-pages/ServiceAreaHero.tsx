import type {
  AreaData,
  CtaLink,
  ImageAsset,
} from "@/lib/service-area-pages/types";
import TrackedCtaLink from "./TrackedCtaLink";

type ServiceAreaHeroProps = {
  area: AreaData;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  reassuranceItems: string[];
  image?: ImageAsset;
  pagePath: string;
};

export default function ServiceAreaHero({
  area,
  title,
  description,
  primaryCta,
  secondaryCta,
  reassuranceItems,
  image,
  pagePath,
}: ServiceAreaHeroProps) {
  return (
    <section className="bg-stone-50 px-5 py-10 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
            {area.fullLabel}
          </p>

          <h1 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,5.4rem)] font-black leading-[0.94] tracking-[-0.055em] text-[#16211f]">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475467] md:text-xl md:leading-9">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedCtaLink
              cta={primaryCta}
              pagePath={pagePath}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0f766e] px-7 py-3 text-center text-base font-bold text-white shadow-sm transition hover:bg-[#115e59]"
            />

            <TrackedCtaLink
              cta={secondaryCta}
              pagePath={pagePath}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cfd8d3] bg-white px-7 py-3 text-center text-base font-bold text-[#1f2933] shadow-sm transition hover:border-[#0f766e] hover:text-[#0f766e]"
            />
          </div>

          {reassuranceItems.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {reassuranceItems.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[#d7ded9] bg-white/75 px-4 py-2 text-sm font-semibold text-[#344054]"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#0f766e]/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#d7ded9] bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            {image ? (
              <img
                src={image.src}
                alt={image.alt}
                className="h-[320px] w-full rounded-[1.45rem] object-cover md:h-[440px]"
              />
            ) : (
              <div className="flex h-[320px] flex-col justify-end rounded-[1.45rem] bg-gradient-to-br from-[#d9eee8] via-stone-50 to-[#fff7ed] p-6 md:h-[440px]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
                  Bold City IAQ
                </p>
                <p className="mt-3 max-w-sm text-2xl font-black leading-tight tracking-[-0.04em] text-[#16211f]">
                  Local restoration support for urgent property damage.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
