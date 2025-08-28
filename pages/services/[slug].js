import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import MetaHead from "@/components/MetaHead";
import SchemaMarkup from "@/components/SchemaMarkup";
import TrustBar from "@/components/service/TrustBar";
import Intro from "@/components/service/Intro";
import WhyItMatters from "@/components/service/WhyItMatters";
import Process from "@/components/service/Process";
import Services from "@/components/service/Services";
import ServiceAreas from "@/components/service/ServiceAreas";
import ImageGrid from "@/components/service/ImageGrid";
import Testimonials from "@/components/service/Testimonials";
import CTA from "@/components/service/CTA";
import FAQ from "@/components/service/FAQ";
import { serviceData } from "@/lib/serviceData";
import ServiceHero from "@/components/service/ServiceHero";
import Loading from "@/components/Loading";
import StaticTestimonials from "@/components/StaticTestimonials";

// export async function getStaticPaths() {
//   console.log(333);
//   const paths = Object.keys(serviceData).map((slug) => ({ params: { slug } }));
//   console.log(paths);
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   console.log(1123);
//   const data = serviceData[params.slug];
//   console.log(data);
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function ServicePage() {
  const router = useRouter();
  const { slug } = router.query;
  const data = serviceData.find((service) => service.title == slug);

  // useEffect(() => {
  //   if (!data) {
  //     router.push("/404");
  //   }
  // }, [data]);

  return !data ? (
    <Loading />
  ) : (
    <Layout>
      <MetaHead meta={data.meta} />
      <SchemaMarkup schema={data.schema} />

      <ServiceHero
        title={data.title}
        subtitle={data.content.hero.subtitle}
        image={data.content.hero.image}
        ctaPhone={data.content.cta.phone}
        badge={data.content.hero.badge}
      />

      <TrustBar />

      <Intro
        heading={data.content.intro.heading}
        content={data.content.intro.content}
      />

      <WhyItMatters
        heading={data.content.whyItMatters.heading}
        bullets={data.content.whyItMatters.bullets}
        paragraph={data.content.whyItMatters.paragraph}
      />

      <Process
        heading={data.content.process.heading}
        steps={data.content.process.steps}
        note={data.content.process.note}
        image={data.content.process.image}
      />

      <Services
        heading={data.content.services.heading}
        bullets={data.content.services.bullets}
      />

      <ServiceAreas
        heading={data.content.serviceAreas.heading}
        areas={data.content.serviceAreas.areas}
      />

      <ImageGrid images={data.content.imageGrid} />

      <StaticTestimonials />

      <CTA
        heading={data.content.cta.heading}
        paragraph={data.content.cta.paragraph}
        phone={data.content.cta.phone}
        primaryLabel={data.content.cta.primaryLabel}
        secondaryLabel={data.content.cta.secondaryLabel}
        secondaryHref={data.content.cta.secondaryHref}
      />
      <FAQ heading={data.content.faq.heading} faqs={data.content.faq.faqs} />
    </Layout>
  );
}
