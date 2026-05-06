import { AREAS } from "@/data/service-area-pages/areas";
import { PAGE_OVERRIDES } from "@/data/service-area-pages/pageOverrides";
import { SERVICES } from "@/data/service-area-pages/services";
import { TRUST_ITEMS } from "@/data/service-area-pages/trustItems";
import type {
  AreaLinkItem,
  AreaSlug,
  BuiltServiceAreaPage,
  CtaLink,
  ServiceAreaPageOverride,
  ServiceSlug,
} from "@/lib/service-area-pages/types";

const SITE_NAME = "Bold City IAQ";
const PHONE_DISPLAY = "(904) 434-6318";
const PHONE_HREF = "tel:+19044346318";
const CONTACT_HREF = "/contact";

const DEFAULT_SCHEMA_TYPE = "LocalBusiness";

function isAreaSlug(value: string): value is AreaSlug {
  return Object.prototype.hasOwnProperty.call(AREAS, value);
}

function isServiceSlug(value: string): value is ServiceSlug {
  return Object.prototype.hasOwnProperty.call(SERVICES, value);
}

function findOverride(
  areaSlug: AreaSlug,
  serviceSlug: ServiceSlug
): ServiceAreaPageOverride | undefined {
  return PAGE_OVERRIDES.find(
    (entry) => entry.areaSlug === areaSlug && entry.serviceSlug === serviceSlug
  );
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

function createRequestCta(serviceSlug: ServiceSlug, location: string): CtaLink {
  const isMold = serviceSlug === "mold-remediation";

  return {
    label: isMold ? "Request Mold Inspection" : "Request Inspection",
    href: CONTACT_HREF,
    analyticsLabel: isMold ? "Request Mold Inspection" : "Request Inspection",
    analyticsLocation: location,
    analyticsIntent: isMold ? "inspection_request" : "service_request",
  };
}

function createBreadcrumbs(areaSlug: AreaSlug, serviceSlug: ServiceSlug) {
  const area = AREAS[areaSlug];
  const service = SERVICES[serviceSlug];

  return [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas" },
    { label: area.name, href: `/service-areas/${areaSlug}` },
    { label: service.name },
  ];
}

function createAreaSiblingLinks(
  currentAreaSlug: AreaSlug,
  serviceSlug: ServiceSlug
): AreaLinkItem[] {
  return Object.values(AREAS)
    .sort((a, b) => a.rolloutPriority - b.rolloutPriority)
    .map((area) => ({
      label: area.name,
      href: `/service-areas/${area.slug}/${serviceSlug}`,
      areaSlug: area.slug,
      isCurrent: area.slug === currentAreaSlug,
    }));
}

function createKeywordString(args: {
  serviceName: string;
  areaFullLabel: string;
  primaryKeywords?: string[];
  overrideKeywords?: string;
}) {
  if (args.overrideKeywords) return args.overrideKeywords;

  const keywords = [
    ...(args.primaryKeywords ?? []),
    `${args.serviceName} ${args.areaFullLabel}`,
    `${args.serviceName} near me`,
    `${args.serviceName} company`,
    `${args.serviceName} services`,
    SITE_NAME,
  ];

  return Array.from(new Set(keywords)).join(", ");
}

function createSchemaOverrides(args: {
  areaSlug: AreaSlug;
  serviceSlug: ServiceSlug;
  override?: ServiceAreaPageOverride;
}) {
  const area = AREAS[args.areaSlug];
  const service = SERVICES[args.serviceSlug];

  return (
    args.override?.seo?.schemaOverrides ?? {
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
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.name} in ${area.fullLabel}`,
          serviceType: service.schemaServiceType ?? service.name,
          areaServed: area.fullLabel,
        },
      },
    }
  );
}

function createSeoObject(args: {
  areaSlug: AreaSlug;
  serviceSlug: ServiceSlug;
  override?: ServiceAreaPageOverride;
}) {
  const area = AREAS[args.areaSlug];
  const service = SERVICES[args.serviceSlug];
  const canonicalPath = `/service-areas/${args.areaSlug}/${args.serviceSlug}`;

  const title =
    args.override?.seo?.title ??
    `${service.name} in ${area.fullLabel} | ${SITE_NAME}`;

  const description =
    args.override?.seo?.description ??
    `${service.name} in ${area.fullLabel}. Fast local response from ${SITE_NAME} for homes and businesses.`;

  return {
    title,
    description,
    canonicalPath,
    image: args.override?.seo?.image ?? service.image?.src,
    keywords: createKeywordString({
      serviceName: service.name,
      areaFullLabel: area.fullLabel,
      primaryKeywords: service.keywords?.primary,
      overrideKeywords: args.override?.seo?.keywords,
    }),
    schemaType: args.override?.seo?.schemaType ?? DEFAULT_SCHEMA_TYPE,
    schemaOverrides: createSchemaOverrides(args),
  };
}

export function buildServiceAreaPageData(
  areaSlugInput: string,
  serviceSlugInput: string
): BuiltServiceAreaPage | null {
  if (!isAreaSlug(areaSlugInput)) return null;
  if (!isServiceSlug(serviceSlugInput)) return null;

  const areaSlug = areaSlugInput;
  const serviceSlug = serviceSlugInput;

  const area = AREAS[areaSlug];
  const service = SERVICES[serviceSlug];
  const override = findOverride(areaSlug, serviceSlug);

  const heroPrimaryCta =
    override?.hero?.primaryCta ?? createPhoneCta("hero");

  const heroSecondaryCta =
    override?.hero?.secondaryCta ?? createRequestCta(serviceSlug, "hero");

  const bottomPrimaryCta =
    override?.bottomCta?.primaryCta ?? createPhoneCta("bottom_cta");

  const bottomSecondaryCta =
    override?.bottomCta?.secondaryCta ??
    createRequestCta(serviceSlug, "bottom_cta");

  return {
    area,
    service,

    seo: createSeoObject({
      areaSlug,
      serviceSlug,
      override,
    }),

    breadcrumbs: createBreadcrumbs(areaSlug, serviceSlug),

    hero: {
      title: override?.hero?.title ?? `${service.name} in ${area.fullLabel}`,
      description: override?.hero?.description ?? service.heroSummary,
      primaryCta: heroPrimaryCta,
      secondaryCta: heroSecondaryCta,
      reassuranceItems:
        override?.hero?.reassuranceItems ?? [
          "24/7 Emergency Response",
          `Serving ${area.name}`,
          "Residential & Commercial Service",
        ],
      image: override?.hero?.image ?? service.image,
    },

    trustItems: TRUST_ITEMS,

    whyLocalMatters: {
      heading: `Why Local Response Matters in ${area.name}`,
      cards:
        override?.whyLocalMatters ?? [
          {
            title: "Local Response",
            description: `Fast response in ${area.name} helps reduce delay and uncertainty when damage is active.`,
          },
          {
            title: "Clear Next Steps",
            description:
              "A clear inspection and mitigation plan helps you understand what needs to happen first.",
          },
          {
            title: "Property Protection",
            description:
              "Quick action can help reduce additional damage, disruption, and avoidable restoration costs.",
          },
        ],
    },

    serviceIntro: {
      heading: override?.serviceIntro?.heading ?? service.introHeading,
      body: override?.serviceIntro?.body ?? service.introBody,
    },

    process: {
      heading: service.processHeading,
      steps: service.processSteps,
    },

    localProof: {
      heading: "Local Results You Can Trust",
      cards: override?.localProof ?? [],
    },

    relatedServices: {
      heading:
        serviceSlug === "water-damage-restoration"
          ? "Related Water Damage Services"
          : "Related Mold Services",
      items: service.relatedServices,
    },

    areaLinks: {
      heading: "Proudly Serving Northeast Florida",
      items: createAreaSiblingLinks(areaSlug, serviceSlug),
    },

    faqs: {
      heading: "Frequently Asked Questions",
      items: override?.faqs ?? service.baseFaqs,
    },

    bottomCta: {
      heading:
        override?.bottomCta?.heading ??
        `Need ${service.name.toLowerCase()} in ${area.name}?`,
      body:
        override?.bottomCta?.body ??
        `Contact ${SITE_NAME} for help in ${area.fullLabel}.`,
      primaryCta: bottomPrimaryCta,
      secondaryCta: bottomSecondaryCta,
    },
  };
}