import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import { trackPageView } from "@/lib/analytics";
import { captureUTMs, getUTMParams } from "@/lib/utm";

import AdsHero from "@/components/ads/AdsHero";
import AdsEarlyTrustBand from "@/components/ads/AdsEarlyTrustBand";
import AdsLeadFormSection from "@/components/ads/AdsLeadFormSection";
import AdsServiceScope from "@/components/ads/AdsServiceScope";
import AdsProcessStrip from "@/components/ads/AdsProcessStrip";
import AdsFinanceStrip from "@/components/ads/AdsFinanceStrip";
import AdsClosingCTA from "@/components/ads/AdsClosingCTA";
import AdsStickyMobileCTA from "@/components/ads/AdsStickyMobileCTA";

export default function EmergencyRestorationAdsPage() {
  const router = useRouter();

  useEffect(() => {
    captureUTMs();
  }, []);

  useEffect(() => {
    const pagePath =
      router.asPath?.split("?")[0] || "/ads/emergency-restoration";

    trackPageView(pagePath, {
      page_title: "Emergency Restoration Landing Page",
      page_type: "ad landing page",
      intent: "emergency restoration",
    });
  }, [router.asPath]);

  const utms = useMemo(() => getUTMParams(), [router.asPath]);

  return (
    <Layout
      meta={{
        title: "24/7 Emergency Restoration in Jacksonville | Bold City IAQ",
        description:
          "Emergency water damage, mold, fire, and storm cleanup in Jacksonville. Fast local response, financing available, and certified restoration support.",
        canonical: "https://boldcityiaq.com/ads/emergency-restoration",
        image: "/images/andre-truck.webp",
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
          name: "Bold City IAQ",
          url: "https://boldcityiaq.com/ads/emergency-restoration",
        },
        faq: [
          {
            question: "Do you offer 24/7 emergency restoration service?",
            answer:
              "Yes. Bold City IAQ responds to emergency water damage, mold, storm, fire, and cleanup-related situations across Jacksonville and nearby areas.",
          },
          {
            question: "Can I finance emergency restoration work?",
            answer:
              "Yes. Financing options may be available for qualified customers so urgent mitigation does not have to wait.",
          },
          {
            question: "What is the fastest way to get help?",
            answer:
              "Calling is the fastest option. You can also submit the emergency request form and a team member will follow up as quickly as possible.",
          },
        ],
      }}
      showNavbar={false}
      showFooter={false}
      showMobileStickyCallButton={false}
      mainClassName="bg-white text-zinc-900"
    >
      <AdsHero />
      <AdsEarlyTrustBand />
      <AdsLeadFormSection utms={utms} />
      <AdsServiceScope />
      <AdsProcessStrip />
      <AdsFinanceStrip />
      <AdsClosingCTA />
      <AdsStickyMobileCTA />
    </Layout>
  );
}
