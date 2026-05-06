import { serviceData } from "@/lib/serviceData";
import type {
  FaqItem,
  ProcessStep,
  RelatedServiceCard,
  ServicePageServiceData,
  ServiceSlug,
} from "@/lib/service-area-pages/types";

type RawServiceProcessStep = {
  head?: string;
  tail?: string;
  title?: string;
  body?: string;
};

type RawServiceEntry = {
  slug: string;
  title?: string;
  meta?: {
    title?: string;
    description?: string;
    og?: {
      image?: string;
    };
  };
  schema?: {
    serviceType?: string;
    keywords?: string[];
  };
  content?: {
    hero?: {
      heading?: string;
      subheading?: string;
      image?: string;
    };
    intro?: {
      heading?: string;
      content?: string[];
    };
    process?: {
      heading?: string;
      steps?: RawServiceProcessStep[];
    };
    faq?: {
      heading?: string;
      faqs?: FaqItem[];
    };
  };
};

const ENABLED_SERVICE_SLUGS: ServiceSlug[] = [
  "water-damage-restoration",
  "mold-remediation",
];

const SERVICE_LABELS: Record<ServiceSlug, string> = {
  "water-damage-restoration": "Water Damage Restoration",
  "mold-remediation": "Mold Remediation",
};

const RELATED_SERVICES: Record<ServiceSlug, RelatedServiceCard[]> = {
  "water-damage-restoration": [
    {
      title: "Mold Remediation",
      description: "Address mold growth that can follow water damage.",
      href: "/services/mold-remediation",
    },
    {
      title: "Emergency Services",
      description: "Fast help when water damage needs urgent response.",
      href: "/services/emergency-services",
    },
    {
      title: "Cleaning & Sanitization",
      description: "Professional cleanup after water, storm, or contamination events.",
      href: "/services/cleaning-and-sanitization",
    },
  ],

  "mold-remediation": [
    {
      title: "Water Damage Restoration",
      description: "Address active or previous water damage affecting the property.",
      href: "/services/water-damage-restoration",
    },
    {
      title: "Emergency Services",
      description: "Urgent response for active moisture, storm, or damage concerns.",
      href: "/services/emergency-services",
    },
    {
      title: "Cleaning & Sanitization",
      description: "Support cleaner indoor conditions after contamination or damage.",
      href: "/services/cleaning-and-sanitization",
    },
  ],
};

const PRIMARY_KEYWORDS: Record<ServiceSlug, string[]> = {
  "water-damage-restoration": [
    "water damage restoration",
    "water damage restoration near me",
    "water damage restoration services near me",
    "water damage restoration companies near me",
    "emergency water removal",
    "flood cleanup",
    "structural drying",
  ],

  "mold-remediation": [
    "mold remediation",
    "mold removal",
    "mold removal services",
    "mold remediation companies",
    "mold cleanup",
    "black mold removal",
    "emergency mold cleanup",
  ],
};

function isServiceSlug(value: string): value is ServiceSlug {
  return ENABLED_SERVICE_SLUGS.includes(value as ServiceSlug);
}

function getRawServiceBySlug(slug: ServiceSlug): RawServiceEntry | undefined {
  return (serviceData as RawServiceEntry[]).find((entry) => entry.slug === slug);
}

function normalizeProcessSteps(
  steps: RawServiceProcessStep[] | undefined
): ProcessStep[] {
  if (!steps?.length) return [];

  return steps.map((step) => {
    if (step.title || step.body) {
      return {
        title: step.title ?? "",
        body: step.body ?? "",
      };
    }

    return {
      title: step.head ?? "",
      body: step.tail?.replace(/^–\s*/, "") ?? "",
    };
  });
}

function normalizeFaqs(faqs: FaqItem[] | undefined): FaqItem[] {
  if (!faqs?.length) return [];

  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}

function mapServiceToPageServiceData(
  rawService: RawServiceEntry,
  slug: ServiceSlug
): ServicePageServiceData {
  const introContent = rawService.content?.intro?.content ?? [];
  const schemaKeywords = rawService.schema?.keywords ?? [];

  return {
    slug,
    name: SERVICE_LABELS[slug],

    heroSummary:
      rawService.content?.hero?.subheading ??
      rawService.meta?.description ??
      `${SERVICE_LABELS[slug]} services from Bold City IAQ.`,

    introHeading:
      rawService.content?.intro?.heading ??
      `${SERVICE_LABELS[slug]} in Northeast Florida`,

    introBody: introContent.join("\n\n"),

    processHeading:
      rawService.content?.process?.heading ??
      `Our ${SERVICE_LABELS[slug]} Process`,

    processSteps: normalizeProcessSteps(rawService.content?.process?.steps),

    relatedServices: RELATED_SERVICES[slug],

    baseFaqs: normalizeFaqs(rawService.content?.faq?.faqs),

    keywords: {
      primary: PRIMARY_KEYWORDS[slug],
      secondary: schemaKeywords.filter(
        (keyword) => !PRIMARY_KEYWORDS[slug].includes(keyword)
      ),
      emergency:
        slug === "water-damage-restoration"
          ? ["emergency water damage restoration", "emergency water removal"]
          : ["emergency mold cleanup", "black mold removal"],
      localModifiers: [
        "Jacksonville FL",
        "Orange Park FL",
        "Ponte Vedra Beach FL",
        "St. Augustine FL",
        "Jacksonville Beach FL",
        "Neptune Beach FL",
        "Atlantic Beach FL",
      ],
    },

    image: rawService.content?.hero?.image
      ? {
          src: rawService.content.hero.image,
          alt: `${SERVICE_LABELS[slug]} service image`,
        }
      : undefined,

    schemaServiceType: rawService.schema?.serviceType,
  };
}

export const SERVICES = ENABLED_SERVICE_SLUGS.reduce((acc, slug) => {
  const rawService = getRawServiceBySlug(slug);

  if (!rawService || !isServiceSlug(rawService.slug)) {
    return acc;
  }

  acc[slug] = mapServiceToPageServiceData(rawService, slug);

  return acc;
}, {} as Record<ServiceSlug, ServicePageServiceData>);

export const SERVICE_SLUGS = Object.keys(SERVICES) as ServiceSlug[];

export function getServiceBySlug(
  slug: ServiceSlug
): ServicePageServiceData | undefined {
  return SERVICES[slug];
}