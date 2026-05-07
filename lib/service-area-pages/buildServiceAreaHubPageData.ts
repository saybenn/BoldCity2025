import { AREAS } from "@/data/service-area-pages/areas";
import { SERVICES } from "@/data/service-area-pages/services";
import type {
  AreaSlug,
  BuiltServiceAreaHubPage,
  CtaLink,
  ServiceSlug,
} from "@/lib/service-area-pages/types";

const SITE_NAME = "Bold City IAQ";
const PHONE_DISPLAY = "(904) 434-6318";
const PHONE_HREF = "tel:+19044346318";
const CONTACT_HREF = "/contact";

function isAreaSlug(value: string): value is AreaSlug {
  return Object.prototype.hasOwnProperty.call(AREAS, value);
}

function createPhoneCta(location: string): CtaLink {
  return {
    label: location === "bottom_cta" ? `Call ${PHONE_DISPLAY}` : "Call Now",
    href: PHONE_HREF,
    analyticsLabel: "Call Now",
    analyticsLocation: location,
    analyticsIntent: "phone_call",
  };
}

function createRequestCta(location: string): CtaLink {
  return {
    label: "Request Service",
    href: CONTACT_HREF,
    analyticsLabel: "Request Service",
    analyticsLocation: location,
    analyticsIntent: "service_request",
  };
}

function getServiceDescription(serviceSlug: ServiceSlug) {
  if (serviceSlug === "water-damage-restoration") {
    return "Emergency water extraction, drying, cleanup, and restoration support for leaks, floods, storms, and plumbing failures.";
  }

  if (serviceSlug === "mold-remediation") {
    return "Mold inspection, containment, cleanup, and remediation support for visible growth, odor, humidity, and moisture concerns.";
  }

  return "Professional restoration support from Bold City IAQ.";
}

export function buildServiceAreaHubPageData(
  areaSlugInput: string
): BuiltServiceAreaHubPage | null {
  if (!isAreaSlug(areaSlugInput)) return null;

  const selectedAreaSlug: AreaSlug = areaSlugInput;
  const area = AREAS[selectedAreaSlug];

  if (!area) return null;

  const canonicalPath = `/service-areas/${area.slug}`;

  const serviceItems = Object.values(SERVICES).map((service) => ({
    title: `${service.name} in ${area.name}`,
    description: getServiceDescription(service.slug),
    href: `/service-areas/${area.slug}/${service.slug}`,
    serviceSlug: service.slug,
  }));

  return {
    area,

    seo: {
      title: `Restoration Services in ${area.fullLabel} | ${SITE_NAME}`,
      description: `Bold City IAQ provides water damage restoration, mold remediation, and emergency property restoration support in ${area.fullLabel}.`,
      canonicalPath,
      keywords: [
        `restoration services ${area.fullLabel}`,
        `water damage restoration ${area.fullLabel}`,
        `mold remediation ${area.fullLabel}`,
        `emergency restoration ${area.fullLabel}`,
        SITE_NAME,
      ].join(", "),
      schemaType: "LocalBusiness",
      schemaOverrides: {
        areaServed: {
          "@type": "Place",
          name: area.fullLabel,
          address: {
            "@type": "PostalAddress",
            addressLocality: area.name,
            addressRegion: area.state,
            addressCountry: "US",
          },
        },
      },
    },

    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Service Areas", href: "/service-areas" },
      { label: area.name },
    ],

    hero: {
      eyebrow: area.fullLabel,
      title: `Restoration Services in ${area.fullLabel}`,
      description:
        area.intro ??
        `Bold City IAQ provides local restoration support in ${area.fullLabel}, including water damage restoration, mold remediation, cleanup, drying, and emergency response services.`,
      primaryCta: createPhoneCta("service_area_hub_hero"),
      secondaryCta: createRequestCta("service_area_hub_hero"),
      reassuranceItems: [
        "24/7 Emergency Response",
        `Serving ${area.name}`,
        "Water Damage & Mold Support",
      ],
    },

    localContext: {
      heading: `Local Restoration Support for ${area.name}`,
      body: `${area.name} properties can face urgent damage from leaks, storms, humidity, plumbing failures, and hidden moisture. This hub helps you find the right service for your situation.`,
      items: area.localContext ?? [],
    },

    commonIssues: {
      heading: `Common Property Issues in ${area.name}`,
      items:
        area.commonIssues ??
        [
          "Water damage from leaks or storms",
          "Mold growth after unresolved moisture",
          "Roof, window, or plumbing-related water intrusion",
          "Humidity and indoor air quality concerns",
        ],
    },

    services: {
      heading: `Services Available in ${area.name}`,
      body: `Choose the service that best matches what is happening at your property. Each page includes local context, process details, FAQs, and clear next steps.`,
      items: serviceItems,
    },

    nearbyAreas: {
      heading: `Nearby Areas Around ${area.name}`,
      items: area.nearbyAreas ?? [],
    },

    bottomCta: {
      heading: `Need restoration help in ${area.name}?`,
      body: `Call Bold City IAQ for clear next steps, fast response, and local restoration support in ${area.fullLabel}.`,
      primaryCta: createPhoneCta("service_area_hub_bottom_cta"),
      secondaryCta: createRequestCta("service_area_hub_bottom_cta"),
    },
  };
}