import Head from "next/head";
import { absoluteUrl } from "@/lib/seo";
export default function MetaHead({ title, description, canonical, image, noindex = false }) {
  const socialImage = absoluteUrl(image);
  return <Head>
    <title>{title}</title>
    <meta key="description" name="description" content={description} />
    <meta key="robots" name="robots" content={noindex ? "noindex, follow" : "index, follow"} />
    <link key="canonical" rel="canonical" href={canonical} />
    <meta property="og:title" content={title} /><meta property="og:description" content={description} />
    <meta property="og:image" content={socialImage} /><meta property="og:url" content={canonical} /><meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} /><meta name="twitter:image" content={socialImage} />
  </Head>;
}
