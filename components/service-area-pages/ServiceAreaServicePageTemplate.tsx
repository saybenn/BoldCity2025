import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import type { BuiltServiceAreaPage } from "@/lib/service-area-pages/types";
import Breadcrumbs from "./Breadcrumbs";
import ServiceAreaHero from "./ServiceAreaHero";
import TrustProofRow from "./TrustProofRow";
import WhyLocalMatters from "./WhyLocalMatters";
import ServiceIntro from "./ServiceIntro";
import ServiceProcess from "./ServiceProcess";
import LocalProofSection from "./LocalProofSection";
import RelatedServicesGrid from "./RelatedServicesGrid";
import ServiceAreaLinks from "./ServiceAreaLinks";
import FaqAccordion from "./FaqAccordion";
import BottomCtaBand from "./BottomCtaBand";

type ServiceAreaServicePageTemplateProps = {
  pageData: BuiltServiceAreaPage;
};

export default function ServiceAreaServicePageTemplate({
  pageData,
}: ServiceAreaServicePageTemplateProps) {
  const pagePath = pageData.seo.canonicalPath;

  useEffect(() => {
    trackPageView(pagePath, {
      page_title: pageData.seo.title,
      page_type: "service_area_service_page",
      service_area: pageData.area.slug,
      service_area_name: pageData.area.name,
      service_name: pageData.service.slug,
      service_label: pageData.service.name,
    });
  }, [
    pagePath,
    pageData.seo.title,
    pageData.area.slug,
    pageData.area.name,
    pageData.service.slug,
    pageData.service.name,
  ]);

  return (
    <div className="pt-16">
      <Breadcrumbs items={pageData.breadcrumbs} />

      <ServiceAreaHero
        area={pageData.area}
        title={pageData.hero.title}
        description={pageData.hero.description}
        primaryCta={pageData.hero.primaryCta}
        secondaryCta={pageData.hero.secondaryCta}
        reassuranceItems={pageData.hero.reassuranceItems}
        image={pageData.hero.image}
        pagePath={pagePath}
      />

      <TrustProofRow items={pageData.trustItems} />

      <WhyLocalMatters
        heading={pageData.whyLocalMatters.heading}
        cards={pageData.whyLocalMatters.cards}
      />

      <ServiceIntro
        heading={pageData.serviceIntro.heading}
        body={pageData.serviceIntro.body}
      />

      <ServiceProcess
        heading={pageData.process.heading}
        steps={pageData.process.steps}
      />

      <LocalProofSection
        heading={pageData.localProof.heading}
        cards={pageData.localProof.cards}
      />

      <RelatedServicesGrid
        heading={pageData.relatedServices.heading}
        items={pageData.relatedServices.items}
      />

      <ServiceAreaLinks
        heading={pageData.areaLinks.heading}
        items={pageData.areaLinks.items}
      />

      <FaqAccordion
        heading={pageData.faqs.heading}
        items={pageData.faqs.items}
      />

      <BottomCtaBand
        heading={pageData.bottomCta.heading}
        body={pageData.bottomCta.body}
        primaryCta={pageData.bottomCta.primaryCta}
        secondaryCta={pageData.bottomCta.secondaryCta}
        pagePath={pagePath}
      />
    </div>
  );
}
