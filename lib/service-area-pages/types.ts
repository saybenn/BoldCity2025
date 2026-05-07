export type AreaSlug =
  | "jacksonville"
  | "ponte-vedra-beach"
  | "st-augustine"
  | "orange-park"
  | "jacksonville-beach"
  | "neptune-beach"
  | "atlantic-beach";

export type ServiceSlug = "water-damage-restoration" | "mold-remediation";

export type AreaData = {
  slug: AreaSlug;
  name: string;
  state: "FL";
  fullLabel: string;
  county?: string;
  rolloutPriority: number;
  nearbyAreas?: string[];
  localContext?: string[];
  commonIssues?: string[];
  intro?: string;
};

export type CtaLink = {
  label: string;
  href: string;
  analyticsLabel?: string;
  analyticsLocation?: string;
  analyticsIntent?: string;
};

export type TrustItem = {
  label: string;
  description?: string;
  icon?: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

export type WhyLocalCard = {
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type ProofCard = {
  title: string;
  description: string;
  meta?: string;
};

export type RelatedServiceCard = {
  title: string;
  description: string;
  href: string;
};

export type AreaLinkItem = {
  label: string;
  href: string;
  areaSlug: AreaSlug;
  isCurrent?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceKeyword = {
  keyword: string;
  avgMonthlySearches?: number;
  competition?: string;
  competitionIndex?: number;
  topOfPageBidLow?: number;
  topOfPageBidHigh?: number;
};

export type ServiceKeywordGroup = {
  primary: string[];
  secondary?: string[];
  emergency?: string[];
  localModifiers?: string[];
  csvKeywords?: ServiceKeyword[];
};

export type ServicePageServiceData = {
  slug: ServiceSlug;
  name: string;
  heroSummary: string;
  introHeading: string;
  introBody: string;
  processHeading: string;
  processSteps: ProcessStep[];
  relatedServices: RelatedServiceCard[];
  baseFaqs: FaqItem[];
  keywords?: ServiceKeywordGroup;
  image?: ImageAsset;
  schemaServiceType?: string;
};

/**
 * Compatibility alias for earlier drafts.
 */
export type ServiceData = ServicePageServiceData;

export type ServiceAreaSeoData = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  keywords?: string;
  schemaType?: string;
  schemaOverrides?: Record<string, unknown>;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BuiltServiceAreaPage = {
  area: AreaData;
  service: ServicePageServiceData;

  seo: ServiceAreaSeoData;

  breadcrumbs: BreadcrumbItem[];

  hero: {
    title: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    reassuranceItems: string[];
    image?: ImageAsset;
  };

  trustItems: TrustItem[];

  whyLocalMatters: {
    heading: string;
    cards: WhyLocalCard[];
  };

  serviceIntro: {
    heading: string;
    body: string;
  };

  process: {
    heading: string;
    steps: ProcessStep[];
  };

  localProof: {
    heading: string;
    cards: ProofCard[];
  };

  relatedServices: {
    heading: string;
    items: RelatedServiceCard[];
  };

  areaLinks: {
    heading: string;
    items: AreaLinkItem[];
  };

  faqs: {
    heading: string;
    items: FaqItem[];
  };

  bottomCta: {
    heading: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
  };
};

export type ServiceAreaPageOverride = {
  areaSlug: AreaSlug;
  serviceSlug: ServiceSlug;

  seo?: Partial<Omit<ServiceAreaSeoData, "canonicalPath">>;

  hero?: Partial<{
    title: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    reassuranceItems: string[];
    image: ImageAsset;
  }>;

  whyLocalMatters?: WhyLocalCard[];

  serviceIntro?: Partial<{
    heading: string;
    body: string;
  }>;

  localProof?: ProofCard[];

  faqs?: FaqItem[];

  bottomCta?: Partial<{
    heading: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  }>;
};

/**
 * Service-area hub page types.
 * Used for /service-areas/[areaSlug].
 */

export type ServiceAreaHubServiceLink = {
  title: string;
  description: string;
  href: string;
  serviceSlug: ServiceSlug;
};

export type BuiltServiceAreaHubPage = {
  area: AreaData;

  seo: ServiceAreaSeoData;

  breadcrumbs: BreadcrumbItem[];

  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    reassuranceItems: string[];
  };

  localContext: {
    heading: string;
    body: string;
    items: string[];
  };

  commonIssues: {
    heading: string;
    items: string[];
  };

  services: {
    heading: string;
    body: string;
    items: ServiceAreaHubServiceLink[];
  };

  nearbyAreas: {
    heading: string;
    items: string[];
  };

  bottomCta: {
    heading: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
  };
};