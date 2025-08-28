// components/MetaHead.jsx
import Head from "next/head";

export default function MetaHead({
  title = "Bold City IAQ - Water Damage Restoration Jacksonville FL",
  description = "Emergency restoration, mold remediation, and water damage repair services in Jacksonville, FL. 24/7 response. Financing available.",
  canonical = "https://boldcityiaq.com",
  image = "/images/social-preview.jpg",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={canonical + image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={canonical + image} />
    </Head>
  );
}
