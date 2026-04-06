import { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { trackPageView } from "@/lib/analytics";
import { captureUTMs, getUTMParams } from "@/lib/utm";

import ContactHero from "@/components/contact/ContactHero";
import ContactTrustStrip from "@/components/contact/ContactTrustStrip";
import ContactRequestSection from "@/components/contact/ContactRequestSection";
import ContactOfficeMapSection from "@/components/contact/ContactOfficeMapSection";
import ContactFaqGrid from "@/components/contact/ContactFaqGrid";
import ContactFinalCta from "@/components/contact/ContactFinalCta";

const MapEmbed = dynamic(() => import("@/components/MapEmbed"), {
  ssr: false,
});

const CONTACT_DATA = {
  phoneDisplay: "(904) 434-6318",
  phoneHref: "tel:+19044346318",
  officePhoneDisplay: "(904) 619-6043",
  officePhoneHref: "tel:+19046196043",
  email: "info@boldcityiaq.com",
  emailHref: "mailto:info@boldcityiaq.com",
  address: "10066 103rd St. Unit #206, Jacksonville, FL 32210",
  hours: "24/7 Emergency Response; Office Mon–Fri",
  areas: [
    "Jacksonville",
    "Orange Park",
    "Fleming Island",
    "Ponte Vedra",
    "Jacksonville Beach",
    "St. Augustine",
    "Duval County",
    "Clay County",
  ],
  faqs: [
    {
      question: "Do you offer 24/7 emergency service?",
      answer:
        "Yes. We answer calls 24/7 and dispatch emergency restoration help as quickly as possible.",
    },
    {
      question: "How fast can you arrive?",
      answer:
        "In many cases we are on the way in 2 hours or less, depending on your location, conditions, and active demand.",
    },
    {
      question: "Do you work with insurance?",
      answer:
        "Yes. We help document the loss and organize information that can support the claims process.",
    },
    {
      question: "Do you offer financing?",
      answer:
        "Yes. Financing options may be available for qualified customers so urgent mitigation does not have to wait.",
    },
    {
      question: "Which areas do you serve?",
      answer:
        "We serve Jacksonville and surrounding Northeast Florida communities including Orange Park, Fleming Island, Ponte Vedra, Jacksonville Beach, and St. Augustine.",
    },
  ],
};

export default function ContactPage() {
  useEffect(() => {
    captureUTMs();
    trackPageView("/contact", {
      page_title: "Contact Bold City IAQ",
      page_type: "contact page",
      intent: "contact emergency restoration",
    });
  }, []);

  return (
    <Layout
      meta={{
        title:
          "Contact Bold City IAQ | 24/7 Emergency Restoration in Jacksonville",
        description:
          "Call now for 24/7 emergency restoration in Jacksonville or request service online. Water damage, mold, storm, and cleanup support.",
        canonical: "https://boldcityiaq.com/contact",
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
          url: "https://boldcityiaq.com/contact",
        },
        faq: CONTACT_DATA.faqs.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      }}
      mainClassName="bg-zinc-50 text-zinc-900"
    >
      <ContactHero data={CONTACT_DATA} />
      <ContactTrustStrip data={CONTACT_DATA} />
      <ContactRequestSection data={CONTACT_DATA} />
      <ContactOfficeMapSection data={CONTACT_DATA} MapComponent={MapEmbed} />
      <ContactFaqGrid faqs={CONTACT_DATA.faqs} />
      <ContactFinalCta data={CONTACT_DATA} />
    </Layout>
  );
}
