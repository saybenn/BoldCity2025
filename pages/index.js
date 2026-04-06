// pages/index.js
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import FinancingHighlights from "@/components/FinancingHighlights";
import ServicesOverview from "@/components/ServicesOverview";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ContactSection from "@/components/ContactSection";
import Layout from "@/components/Layout";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import EarlyTrustBand from "@/components/EarlyTrustBand";

export default function HomePage() {
  return (
    <Layout
      meta={{
        title:
          "Bold City IAQ – Jacksonville’s 24/7 Water Damage & Mold Experts",
        description:
          "Fast, certified restoration and mold removal with financing available. Serving Jacksonville and surrounding areas.",
        canonical: "https://boldcityiaq.com",
        image: "/images/hero.jpg",
      }}
      schema={{
        schemaType: "LocalBusiness",
        schemaOverrides: {
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
            question: "Do you offer 24/7 emergency service?",
            answer:
              "Yes! We are on-call 24/7 for any water, fire, or mold damage emergencies.",
          },
          {
            question: "Can I finance the restoration work?",
            answer:
              "Absolutely. We provide flexible financing options for qualified customers.",
          },
        ],
      }}
    >
      <Hero />
      <ValueProps />
      <EarlyTrustBand />
      <FinancingHighlights />
      <ServicesOverview />
      <TrustSection />
      <BeforeAfterSlider />
      <WhyChooseUs />
      <ContactSection />
      <FinalCTA />
    </Layout>
  );
}

