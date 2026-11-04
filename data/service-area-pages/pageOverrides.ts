import { AREAS } from "./areas";
import { LOCAL_DETAILS } from "./localDetails";
import { SERVICES } from "./services";
import type { AreaSlug, ServiceSlug, ServiceAreaPageOverride } from "@/lib/service-area-pages/types";

// All fourteen existing routes have substantive area/service-specific guidance.
// No project location, completed job or customer story is inferred from a photo.
const waterPhotos = [
  { src: "/images/waterHero.webp", alt: "Exposed kitchen wall framing beneath protected cabinets; company process photograph" },
  { src: "/images/projects/equipment-beside-framing.webp", alt: "Restoration equipment beside exposed framing; company process photograph" },
  { src: "/images/projects/worker-at-protected-kitchen.webp", alt: "Worker beside protected kitchen cabinets and exposed walls; company process photograph" },
];
const moldPhotos = [
  { src: "/images/moldprocess.webp", alt: "Air-handling equipment beside plastic containment; company process photograph" },
  { src: "/images/projects/protected-framing-work.webp", alt: "Worker beside protected exposed framing; company process photograph" },
  { src: "/images/grid/mold-hero.webp", alt: "Gloved hand holding removed material with dark spotting; company process photograph" },
];
export const PAGE_OVERRIDES: ServiceAreaPageOverride[] = (Object.keys(AREAS) as AreaSlug[]).flatMap((areaSlug, areaIndex) =>
  (["water-damage-restoration", "mold-remediation"] as ServiceSlug[]).map((serviceSlug) => {
    const area = AREAS[areaSlug]; const local = LOCAL_DETAILS[areaSlug]; const service = SERVICES[serviceSlug];
    const water = serviceSlug === "water-damage-restoration";
    return { areaSlug, serviceSlug,
      seo: { title: `${service.name} in ${area.fullLabel} | Bold City IAQ`, description: water ? `Water extraction, structural drying and restoration in ${area.fullLabel}. Discuss leaks, storm damage and affected materials with Bold City IAQ.` : `Mold remediation in ${area.fullLabel}. Discuss moisture sources, containment, HEPA cleanup and affected-material removal with Bold City IAQ.` },
      hero: { title: `${service.name} in ${area.fullLabel}`, description: water ? `Water extraction, structural drying and restoration for ${area.name} homes and businesses. Call to discuss the affected rooms, materials and access.` : `Mold remediation for homes and businesses in ${area.name}. Discuss moisture sources, containment and cleanup scope.`,
        image: (water ? waterPhotos : moldPhotos)[areaIndex % 3] },
      whyLocalMatters: local.planning.map((description, index) => ({title:["Prepare for the visit", "Plan the affected areas", "Clarify the scope"][index],description})),
      serviceIntro: { heading: water ? `Planning water restoration in ${area.name}` : `Planning mold cleanup in ${area.name}`, body: water ? local.waterIntro : local.moldIntro },
      localProof: [],
      faqs: [{ question: water ? local.waterQuestion : local.moldQuestion, answer: water ? local.waterAnswer : local.moldAnswer }, ...service.baseFaqs.slice(0,2)],
      bottomCta: { heading: `Discuss ${service.name.toLowerCase()} in ${area.name}`, body:"Call with the property address, affected areas and access details. Availability depends on conditions and current demand." },
    };
  })
);
