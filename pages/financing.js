import EarlyTrustBand from "@/components/EarlyTrustBand";
import AcornFinanceBanner from "@/components/financing/AcornFinanceBanner";
import FinancingCTA from "@/components/financing/FinancingCTA";
import FinancingExpectations from "@/components/financing/FinancingExpectations";
import FinancingFAQ from "@/components/financing/FinancingFAQ";
import FinancingHero from "@/components/financing/FinancingHero";
import FinancingIntro from "@/components/financing/FinancingIntro";
import FinancingOptions from "@/components/financing/FinancingOptions";
import FinancingProcess from "@/components/financing/FinancingProcess";
import Layout from "@/components/Layout";
import { track, trackCta, trackCallClick } from "@/lib/analytics";

export default function FinancingPage() {
  return (
    <Layout
      meta={{
        title: "Financing Options for Qualifying Projects | Bold City IAQ",
        description:
          "Learn about Bold City IAQ financing options for qualifying projects, including third-party, in-house, and hybrid paths. Talk with our team to review what may fit your situation.",
        canonical: "https://boldcityiaq.com/financing",
        image: "/images/financing-hero.jpg",
      }}
      schema={{
        schemaType: "LocalBusiness",
        schemaOverrides: {
          name: "Bold City IAQ",
          url: "https://boldcityiaq.com/financing",
          telephone: "+19044346318",
          address: {
            streetAddress: "10066 103rd St #206",
            addressLocality: "Jacksonville",
            addressRegion: "FL",
            postalCode: "32210",
            addressCountry: "US",
          },
        },
        faq: [
          {
            question: "Do I need good credit to qualify?",
            answer:
              "Some financing paths include a credit review, but qualification depends on the specific option and situation.",
          },
          {
            question: "Is financing available for every project?",
            answer:
              "Not every financing option is available for every project. It depends on scope, circumstances, and other factors.",
          },
          {
            question: "How much is the down payment for in-house financing?",
            answer:
              "When in-house financing is available, down payments typically range from 45% to 65%, depending on the project.",
          },
          {
            question: "What is hybrid financing?",
            answer:
              "Hybrid financing is a less common option where different parts of the project may be financed through different paths.",
          },
          {
            question: "How do I find out what applies to my project?",
            answer:
              "The best next step is to contact our team so we can review the situation and explain what may be available.",
          },
        ],
      }}
    >
      <FinancingHero
        secondaryCtaHref="tel:+19044346318"
        onCtaClick={({ ctaLabel, ctaLocation, intent, href }) => {
          if (href.startsWith("tel:")) {
            trackCallClick({
              cta_location: ctaLocation,
              page: "/financing",
              phone_number: href.replace("tel:", ""),
              intent,
            });
            return;
          }

          trackCta({
            cta_label: ctaLabel,
            cta_location: ctaLocation,
            intent,
            page: "/financing",
            href,
          });
        }}
      />
      <EarlyTrustBand />
      <FinancingIntro
        checklist={[
          "We review the project scope",
          "We discuss possible financing paths",
          "We explain what may apply",
          "We help you understand the next step clearly",
        ]}
      />
      <FinancingOptions />
      <AcornFinanceBanner />
      <FinancingProcess />
      <FinancingExpectations />
      <FinancingFAQ />
      <FinancingCTA
        secondaryCtaHref="tel:+19045551234"
        onCtaClick={({ ctaLabel, ctaLocation, intent }) => {
          track("click cta", {
            cta_label: ctaLabel,
            cta_location: ctaLocation,
            intent,
            page: "/financing",
          });
        }}
      />
    </Layout>
  );
}
