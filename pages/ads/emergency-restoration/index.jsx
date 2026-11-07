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
        image: "/images/about-hero.webp",
      }}
      schema={{
        schemaType: "LocalBusiness",
        schemaOverrides: {
          telephone: "+19044346318",
          address: {
            streetAddress: "14440 Normandy Blvd",
            addressLocality: "Jacksonville",
            addressRegion: "FL",
            postalCode: "32234",
            addressCountry: "US",
          },
          name: "Bold City IAQ",
          url: "https://boldcityiaq.com/ads/emergency-restoration",
        },

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
