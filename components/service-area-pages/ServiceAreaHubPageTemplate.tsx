import { useEffect } from "react";
import Link from "next/link";
import { trackPageView } from "@/lib/analytics";
import type { BuiltServiceAreaHubPage } from "@/lib/service-area-pages/types";
import Breadcrumbs from "./Breadcrumbs";
import TrackedCtaLink from "./TrackedCtaLink";

type ServiceAreaHubPageTemplateProps = {
  pageData: BuiltServiceAreaHubPage;
};

export default function ServiceAreaHubPageTemplate({
  pageData,
}: ServiceAreaHubPageTemplateProps) {
  const pagePath = pageData.seo.canonicalPath;

  useEffect(() => {
    trackPageView(pagePath, {
      page_title: pageData.seo.title,
      page_type: "service_area_hub_page",
      service_area: pageData.area.slug,
      service_area_name: pageData.area.name,
    });
  }, [pagePath, pageData.seo.title, pageData.area.slug, pageData.area.name]);

  return (
    <div className="pt-16">
      <Breadcrumbs items={pageData.breadcrumbs} />

      <section className="bg-stone-50 px-5 py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
              {pageData.hero.eyebrow}
            </p>

            <h1 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,5.4rem)] font-black leading-[0.94] tracking-[-0.055em] text-[#16211f]">
              {pageData.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475467] md:text-xl md:leading-9">
              {pageData.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedCtaLink
                cta={pageData.hero.primaryCta}
                pagePath={pagePath}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-aqua px-7 py-3 text-center text-base font-bold text-white shadow-sm transition hover:bg-[#115e59]"
              />

              <TrackedCtaLink
                cta={pageData.hero.secondaryCta}
                pagePath={pagePath}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cfd8d3] bg-white px-7 py-3 text-center text-base font-bold text-[#1f2933] shadow-sm transition hover:border-aqua hover:text-aqua"
              />
            </div>

            <ul className="mt-8 flex flex-wrap gap-3">
              {pageData.hero.reassuranceItems.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[#d7ded9] bg-white/75 px-4 py-2 text-sm font-semibold text-[#344054]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-[#d7ded9] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
              Service Area
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#16211f]">
              {pageData.area.fullLabel}
            </h2>

            {pageData.area.county ? (
              <p className="mt-2 text-base font-semibold text-[#475467]">
                {pageData.area.county}
              </p>
            ) : null}

            <div className="mt-6 rounded-[1.25rem] bg-stone-50 p-5">
              <p className="text-base leading-7 text-[#5f6f69]">
                Local restoration support for water damage, mold concerns,
                moisture problems, and emergency property damage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
              Local context
            </p>

            <h2 className="mt-3 text-[clamp(2rem,3vw,3.25rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
              {pageData.localContext.heading}
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#475467]">
              {pageData.localContext.body}
            </p>
          </div>

          <div className="grid gap-4">
            {pageData.localContext.items.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[#d7ded9] bg-stone-50 p-6"
              >
                <p className="text-base leading-7 text-[#5f6f69]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
              Common issues
            </p>

            <h2 className="mt-3 text-[clamp(2rem,3vw,3.5rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
              {pageData.commonIssues.heading}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pageData.commonIssues.items.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[#d7ded9] bg-white p-6 shadow-sm"
              >
                <p className="font-semibold leading-7 text-[#344054]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
              Available services
            </p>

            <h2 className="mt-3 text-[clamp(2rem,3vw,3.5rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
              {pageData.services.heading}
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#475467]">
              {pageData.services.body}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {pageData.services.items.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-[1.75rem] border border-[#d7ded9] bg-stone-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-aqua hover:shadow-md md:p-8"
              >
                <h3 className="text-2xl font-black tracking-[-0.035em] text-[#16211f] transition group-hover:text-aqua">
                  {service.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-[#5f6f69]">
                  {service.description}
                </p>

                <p className="mt-6 text-sm font-bold text-aqua">
                  View local service page →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {pageData.nearbyAreas.items.length > 0 ? (
        <section className="bg-stone-50 px-5 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2rem] border border-[#d7ded9] bg-white p-6 md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
                Nearby areas
              </p>

              <h2 className="mt-3 text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
                {pageData.nearbyAreas.heading}
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                {pageData.nearbyAreas.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#d7ded9] bg-stone-50 px-5 py-3 text-sm font-bold text-[#344054]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-navy-dark px-5 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            Get help now
          </p>

          <h2 className="mt-3 text-[clamp(2.2rem,4vw,4.25rem)] font-black leading-[0.98] tracking-[-0.055em]">
            {pageData.bottomCta.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#d8ebe7]">
            {pageData.bottomCta.body}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedCtaLink
              cta={pageData.bottomCta.primaryCta}
              pagePath={pagePath}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-center text-base font-bold text-[#0f2724] shadow-sm transition hover:bg-[#ecfdf5]"
            />

            {pageData.bottomCta.secondaryCta ? (
              <TrackedCtaLink
                cta={pageData.bottomCta.secondaryCta}
                pagePath={pagePath}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3 text-center text-base font-bold text-white transition hover:border-white hover:bg-white/10"
              />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
