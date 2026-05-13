import { useEffect } from "react";
import Layout from "@/components/Layout";
import TrustBar from "@/components/service/TrustBar";
import Intro from "@/components/service/Intro";
import WhyItMatters from "@/components/service/WhyItMatters";
import Process from "@/components/service/Process";
import Services from "@/components/service/Services";
import ServiceAreas from "@/components/service/ServiceAreas";
import ImageGrid from "@/components/service/ImageGrid";
import CTA from "@/components/service/CTA";
import FAQ from "@/components/service/FAQ";
import ServiceHero from "@/components/service/ServiceHero";
import StaticTestimonials from "@/components/StaticTestimonials";
import { serviceData } from "@/lib/serviceData";
import { trackPageView } from "@/lib/analytics";

const SITE_URL = "https://boldcityiaq.com";

export async function getStaticPaths() {
  const paths = serviceData
    .filter((service) => service?.slug)
    .map((service) => ({
      params: {
        slug: service.slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = serviceData.find((service) => service.slug === params.slug);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default function ServicePage({ data }) {
  const pagePath = `/services/${data.slug}`;
  const canonical =
    data?.meta?.canonical ||
    data?.meta?.canonicalUrl ||
    `${SITE_URL}${pagePath}`;

  useEffect(() => {
    trackPageView(pagePath, {
      page_title: data?.meta?.title || data.title,
      page_type: "service_page",
      service_name: data.slug,
      service_label: data.title,
    });
  }, [pagePath, data?.meta?.title, data.slug, data.title]);

  return (
    <Layout
      meta={{
        ...(data.meta || {}),
        canonical,
      }}
      schema={{
        ...(data.schema || {}),
        canonical,
      }}
    >
      <ServiceHero
        title={data.title}
        subtitle={
          data.content?.hero?.subtitle || data.content?.hero?.subheading
        }
        image={data.content?.hero?.image}
        ctaPhone={data.content?.cta?.phone}
        badge={data.content?.hero?.badge}
      />

      <TrustBar />

      <Intro
        heading={data.content?.intro?.heading}
        content={data.content?.intro?.content}
      />

      <WhyItMatters
        heading={data.content?.whyItMatters?.heading}
        bullets={data.content?.whyItMatters?.bullets}
        paragraph={data.content?.whyItMatters?.paragraph}
      />

      <Process
        heading={data.content?.process?.heading}
        steps={data.content?.process?.steps}
        note={data.content?.process?.note}
        image={data.content?.process?.image}
      />

      <Services
        heading={data.content?.services?.heading}
        bullets={data.content?.services?.bullets}
      />

      <ServiceAreas
        heading={data.content?.serviceAreas?.heading}
        areas={data.content?.serviceAreas?.areas}
      />

      <ImageGrid images={data.content?.imageGrid} />

      <StaticTestimonials />

      <CTA
        heading={data.content?.cta?.heading}
        paragraph={data.content?.cta?.paragraph}
        phone={data.content?.cta?.phone}
        primaryLabel={data.content?.cta?.primaryLabel}
        secondaryLabel={data.content?.cta?.secondaryLabel}
        secondaryHref={data.content?.cta?.secondaryHref}
      />

      <FAQ
        heading={data.content?.faq?.heading}
        faqs={data.content?.faq?.faqs}
      />
    </Layout>
  );
}
