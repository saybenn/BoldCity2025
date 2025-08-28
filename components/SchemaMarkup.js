// components/SchemaMarkup.jsx

import Head from "next/head";

export default function SchemaMarkup({
  title = "Bold City IAQ - Water Damage Restoration Jacksonville FL",
  description = "Bold City Indoor Air Quality and Emergency Services is ready to respond to your water damage restoration & mold cleanup right away.",
  canonical = "https://boldcityiaq.com",
  keywords = "water damage restoration, mold removal, emergency water services, Jacksonville, FL",
  ogImage = "/images/logo.webp",
  ogType = "website",
  schemaType = "LocalBusiness",
  schemaOverrides = {},
  faq = [],
}) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: "Bold City IAQ",
    image: canonical + ogImage,
    "@id": canonical,
    url: canonical,
    telephone: "+19044346318",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100066 103rd St #206",
      addressLocality: "Jacksonville",
      addressRegion: "FL",
      postalCode: "32210",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: 48,
    },
    ...schemaOverrides,
  };

  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        }
      : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={canonical + ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={canonical + ogImage} />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </Head>
  );
}
