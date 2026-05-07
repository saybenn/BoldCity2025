import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";

import Layout from "@/components/Layout";
import ServiceAreaServicePageTemplate from "@/components/service-area-pages/ServiceAreaServicePageTemplate";
import { buildServiceAreaPageData } from "@/lib/service-area-pages/buildServiceAreaPageData";
import { getAllServiceAreaPaths } from "@/lib/service-area-pages/getServiceAreaPaths";
import type { BuiltServiceAreaPage } from "@/lib/service-area-pages/types";

type ServiceAreaServicePageProps = {
  pageData: BuiltServiceAreaPage;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllServiceAreaPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ServiceAreaServicePageProps
> = async (context) => {
  const areaSlug = context.params?.areaSlug;
  const serviceSlug = context.params?.serviceSlug;

  if (typeof areaSlug !== "string" || typeof serviceSlug !== "string") {
    return {
      notFound: true,
    };
  }

  const pageData = buildServiceAreaPageData(areaSlug, serviceSlug);

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData,
    },
  };
};

export default function ServiceAreaServicePage({
  pageData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonical = `https://www.boldcityiaq.com${pageData.seo.canonicalPath}`;

  return (
    <Layout
      meta={{
        title: pageData.seo.title,
        description: pageData.seo.description,
        canonical,
        image: pageData.seo.image || "/images/social-preview.jpg",
      }}
      schema={{
        title: pageData.seo.title,
        description: pageData.seo.description,
        canonical,
        keywords: pageData.seo.keywords,
        schemaType: pageData.seo.schemaType || "LocalBusiness",
        schemaOverrides: pageData.seo.schemaOverrides || {},
        faq: pageData.faqs.items,
      }}
      mainClassName="bg-stone-50 text-[#1f2933]"
    >
      <ServiceAreaServicePageTemplate pageData={pageData} />
    </Layout>
  );
}
