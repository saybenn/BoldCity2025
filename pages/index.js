import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import FinancingHighlights from "@/components/FinancingHighlights";
import ServicesOverview from "@/components/ServicesOverview";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ContactSection from "@/components/ContactSection";
import Layout from "@/components/Layout";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return <Layout meta={{
    title: "Water Damage Cleanup Jacksonville, FL | Bold City IAQ",
    description: "Need emergency water damage cleanup in Jacksonville, FL? Bold City IAQ provides 24/7 water removal, structural drying, mold remediation, and restoration. Call now.",
    canonical: "https://boldcityiaq.com/", image: "/images/jacksonville-skyline.webp",
  }}>
    <Hero />
    <ReviewsCarousel />
    <ServicesOverview />
    <BeforeAfterSlider />
    <ValueProps />
    <FinancingHighlights />
    <ContactSection />
    <FinalCTA />
  </Layout>;
}
