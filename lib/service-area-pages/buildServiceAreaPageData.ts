import { AREAS } from "@/data/service-area-pages/areas";
import { PAGE_OVERRIDES } from "@/data/service-area-pages/pageOverrides";
import { SERVICES } from "@/data/service-area-pages/services";
import { TRUST_ITEMS } from "@/data/service-area-pages/trustItems";
import type {
  AreaLinkItem,
  AreaSlug,
  BreadcrumbItem,
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

function findPageOverride(
  selectedAreaSlug: AreaSlug,
  selectedServiceSlug: ServiceSlug
): ServiceAreaPageOverride | undefined {
  return PAGE_OVERRIDES.find(
    (entry) =>
      entry.areaSlug === selectedAreaSlug &&
      entry.serviceSlug === selectedServiceSlug
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

function createRequestCta(
  selectedServiceSlug: ServiceSlug,
  location: string
): CtaLink {
  const isMoldService = selectedServiceSlug === "mold-remediation";

  return {
    label: isMoldService ? "Request Mold Inspection" : "Request Inspection",
    href: CONTACT_HREF,
    analyticsLabel: isMoldService
      ? "Request Mold Inspection"
      : "Request Inspection",
    analyticsLocation: location,
    analyticsIntent: isMoldService ? "inspection_request" : "service_request",
  };
}

function createBreadcrumbs(
  selectedAreaSlug: AreaSlug,
  selectedServiceSlug: ServiceSlug
): BreadcrumbItem[] {
  const selectedArea = AREAS[selectedAreaSlug];
  const selectedService = SERVICES[selectedServiceSlug];

  return [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas" },
    {
      label: selectedArea.name,
      href: `/service-areas/${selectedArea.slug}`,
    },
    { label: selectedService.name },
  ];
}

function createAreaSiblingLinks(
  currentAreaSlug: AreaSlug,
  selectedServiceSlug: ServiceSlug
): AreaLinkItem[] {
  return Object.values(AREAS)
    .sort((a, b) => a.rolloutPriority - b.rolloutPriority)
    .map((area) => ({
      label: area.name,
      href: `/service-areas/${area.slug}/${selectedServiceSlug}`,
      areaSlug: area.slug,
      isCurrent: area.slug === currentAreaSlug,
    }));
}

function createKeywordString(args: {
  serviceName: string;
  areaFullLabel: string;
  primaryKeywords?: string[];
  overrideKeywords?: string;
}): string {
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
  selectedAreaSlug: AreaSlug;
  selectedServiceSlug: ServiceSlug;
  override?: ServiceAreaPageOverride;
}): Record<string, unknown> {
  if (args.override?.seo?.schemaOverrides) {
    return args.override.seo.schemaOverrides;
  }

  const selectedArea = AREAS[args.selectedAreaSlug];
  const selectedService = SERVICES[args.selectedServiceSlug];

  return {
    areaServed: {
      "@type": "Place",
      name: selectedArea.fullLabel,
      address: {
        "@type": "PostalAddress",
        addressLocality: selectedArea.name,
        addressRegion: selectedArea.state,
        addressCountry: "US",
      },
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${selectedService.name} in ${selectedArea.fullLabel}`,
        serviceType:
          selectedService.schemaServiceType ?? selectedService.name,
        areaServed: selectedArea.fullLabel,
      },
    },
  };
}

export function buildServiceAreaPageData(
  areaSlugInput: string,
  serviceSlugInput: string
): BuiltServiceAreaPage | null {
  if (!isAreaSlug(areaSlugInput)) return null;
  if (!isServiceSlug(serviceSlugInput)) return null;

  const selectedAreaSlug: AreaSlug = areaSlugInput;
  const selectedServiceSlug: ServiceSlug = serviceSlugInput;

  const selectedArea = AREAS[selectedAreaSlug];
  const selectedService = SERVICES[selectedServiceSlug];

  if (!selectedArea || !selectedService) return null;

  const override = findPageOverride(selectedAreaSlug, selectedServiceSlug);

  const canonicalPath = `/service-areas/${selectedArea.slug}/${selectedService.slug}`;

  const seoTitle =
    override?.seo?.title ??
    `${selectedService.name} in ${selectedArea.fullLabel} | ${SITE_NAME}`;

  const seoDescription =
    override?.seo?.description ??
    `${selectedService.name} in ${selectedArea.fullLabel}. Fast local response from ${SITE_NAME} for homes and businesses.`;

  const heroPrimaryCta =
    override?.hero?.primaryCta ?? createPhoneCta("hero");

  const heroSecondaryCta =
    override?.hero?.secondaryCta ??
    createRequestCta(selectedServiceSlug, "hero");

  const bottomPrimaryCta =
    override?.bottomCta?.primaryCta ?? createPhoneCta("bottom_cta");

  const bottomSecondaryCta =
    override?.bottomCta?.secondaryCta ??
    createRequestCta(selectedServiceSlug, "bottom_cta");

  return {
    area: selectedArea,
    service: selectedService,

    seo: {
      title: seoTitle,
      description: seoDescription,
      canonicalPath,
      image: override?.seo?.image ?? selectedService.image?.src,
      keywords: createKeywordString({
        serviceName: selectedService.name,
        areaFullLabel: selectedArea.fullLabel,
        primaryKeywords: selectedService.keywords?.primary,
        overrideKeywords: override?.seo?.keywords,
      }),
      schemaType: override?.seo?.schemaType ?? DEFAULT_SCHEMA_TYPE,
      schemaOverrides: createSchemaOverrides({
        selectedAreaSlug,
        selectedServiceSlug,
        override,
      }),
    },

    breadcrumbs: createBreadcrumbs(selectedAreaSlug, selectedServiceSlug),

    hero: {
      title:
        override?.hero?.title ??
        `${selectedService.name} in ${selectedArea.fullLabel}`,
      description:
        override?.hero?.description ?? selectedService.heroSummary,
      primaryCta: heroPrimaryCta,
      secondaryCta: heroSecondaryCta,
      reassuranceItems:
        override?.hero?.reassuranceItems ?? [
          "24/7 Emergency Response",
          `Serving ${selectedArea.name}`,
          "Residential & Commercial Service",
        ],
      image: override?.hero?.image ?? selectedService.image,
    },

    trustItems: TRUST_ITEMS,

    whyLocalMatters: {
      heading: `Why Local Response Matters in ${selectedArea.name}`,
      cards:
        override?.whyLocalMatters ?? [
          {
            title: "Local Response",
            description: `Fast response in ${selectedArea.name} helps reduce delay and uncertainty when damage is active.`,
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
      heading:
        override?.serviceIntro?.heading ?? selectedService.introHeading,
      body: override?.serviceIntro?.body ?? selectedService.introBody,
    },

    process: {
      heading: selectedService.processHeading,
      steps: selectedService.processSteps,
    },

    localProof: {
      heading: "Local Results You Can Trust",
      cards: override?.localProof ?? [],
    },

    relatedServices: {
      heading:
        selectedServiceSlug === "water-damage-restoration"
          ? "Related Water Damage Services"
          : "Related Mold Services",
      items: selectedService.relatedServices,
    },

    areaLinks: {
      heading: "Proudly Serving Northeast Florida",
      items: createAreaSiblingLinks(selectedAreaSlug, selectedServiceSlug),
    },

    faqs: {
      heading: "Frequently Asked Questions",
      items: override?.faqs ?? selectedService.baseFaqs,
    },

    bottomCta: {
      heading:
        override?.bottomCta?.heading ??
        `Need ${selectedService.name.toLowerCase()} in ${selectedArea.name}?`,
      body:
        override?.bottomCta?.body ??
        `Contact ${SITE_NAME} for help in ${selectedArea.fullLabel}.`,
      primaryCta: bottomPrimaryCta,
      secondaryCta: bottomSecondaryCta,
    },
  };
}