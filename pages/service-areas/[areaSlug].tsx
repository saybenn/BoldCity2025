import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";

import Layout from "@/components/Layout";
import ServiceAreaHubPageTemplate from "@/components/service-area-pages/ServiceAreaHubPageTemplate";
import { buildServiceAreaHubPageData } from "@/lib/service-area-pages/buildServiceAreaHubPageData";
import { getAllServiceAreaHubPaths } from "@/lib/service-area-pages/getServiceAreaHubPaths";
import type { BuiltServiceAreaHubPage } from "@/lib/service-area-pages/types";

type ServiceAreaHubPageProps = {
  pageData: BuiltServiceAreaHubPage;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllServiceAreaHubPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ServiceAreaHubPageProps> = async (
  context,
) => {
  const areaSlug = context.params?.areaSlug;

  if (typeof areaSlug !== "string") {
    return {
      notFound: true,
    };
  }

  const pageData = buildServiceAreaHubPageData(areaSlug);

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

export default function ServiceAreaHubPage({
  pageData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonical = `https://www.boldcityiaq.com${pageData.seo.canonicalPath}`;

  return (
    <Layout
      meta={{
        title: pageData.seo.title,
        description: pageData.seo.description,
        canonical,
        image: "/images/social-preview.jpg",
      }}
      schema={{
        title: pageData.seo.title,
        description: pageData.seo.description,
        canonical,
        keywords: pageData.seo.keywords,
        schemaType: pageData.seo.schemaType || "LocalBusiness",
        schemaOverrides: pageData.seo.schemaOverrides || {},
      }}
      mainClassName="bg-stone-50 text-[#1f2933]"
    >
      <ServiceAreaHubPageTemplate pageData={pageData} />
    </Layout>
  );
}
