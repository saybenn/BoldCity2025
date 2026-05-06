import type { AreaData, AreaSlug } from "@/lib/service-area-pages/types";

export const AREAS: Record<AreaSlug, AreaData> = {
  jacksonville: {
    slug: "jacksonville",
    name: "Jacksonville",
    state: "FL",
    fullLabel: "Jacksonville, FL",
    county: "Duval County",
    rolloutPriority: 1,
    nearbyAreas: [
      "Orange Park",
      "Ponte Vedra Beach",
      "Jacksonville Beach",
      "Neptune Beach",
      "Atlantic Beach",
      "St. Augustine",
    ],
    intro:
      "Jacksonville properties face a mix of storm exposure, plumbing failures, roof leaks, humidity, and older building materials that can turn small water or moisture problems into larger restoration issues.",
    localContext: [
      "Jacksonville covers a wide service area with homes, apartments, commercial buildings, and coastal-adjacent properties that can experience different moisture and restoration needs.",
      "Heavy rain, tropical weather, roof leaks, plumbing failures, and HVAC moisture problems can create fast-moving water damage or mold concerns.",
      "Fast response matters because trapped moisture can spread behind walls, under flooring, and into building materials before the damage is obvious.",
    ],
    commonIssues: [
      "Burst pipes and supply line leaks",
      "Roof leaks after storms",
      "Water intrusion around windows and exterior walls",
      "Mold growth after unresolved moisture problems",
      "Crawl space, attic, and HVAC-related humidity issues",
      "Storm-related water damage",
    ],
  },

  "ponte-vedra-beach": {
    slug: "ponte-vedra-beach",
    name: "Ponte Vedra Beach",
    state: "FL",
    fullLabel: "Ponte Vedra Beach, FL",
    county: "St. Johns County",
    rolloutPriority: 2,
    nearbyAreas: [
      "Palm Valley",
      "Nocatee",
      "Sawgrass",
      "Jacksonville Beach",
      "St. Augustine",
      "Atlantic Beach",
    ],
    intro:
      "Ponte Vedra Beach homes and businesses often need restoration support that accounts for coastal weather exposure, high humidity, roof leaks, and moisture that can hide inside finished spaces.",
    localContext: [
      "Coastal weather, wind-driven rain, and humidity can make moisture problems harder to ignore and harder to fully dry without professional equipment.",
      "Many Ponte Vedra Beach properties have higher-end finishes, flooring, cabinets, and built-ins that need careful drying, containment, and restoration planning.",
      "Fast mitigation helps reduce the chance of secondary damage, mold growth, and avoidable removal of materials that may be salvageable.",
    ],
    commonIssues: [
      "Storm and wind-driven rain intrusion",
      "Roof and flashing leaks",
      "Moisture behind walls or under flooring",
      "Mold caused by humidity or previous water damage",
      "Appliance and plumbing leaks",
      "Water damage affecting finished living spaces",
    ],
  },

  "st-augustine": {
    slug: "st-augustine",
    name: "St. Augustine",
    state: "FL",
    fullLabel: "St. Augustine, FL",
    county: "St. Johns County",
    rolloutPriority: 3,
    nearbyAreas: [
      "St. Augustine Beach",
      "Vilano Beach",
      "Anastasia Island",
      "Ponte Vedra Beach",
      "Elkton",
      "Hastings",
    ],
    intro:
      "St. Augustine properties can face restoration challenges from storms, older construction, coastal humidity, roof leaks, and water intrusion that needs to be handled before it becomes a larger structural or mold issue.",
    localContext: [
      "St. Augustine includes historic properties, newer homes, coastal neighborhoods, and commercial buildings that may require different drying and restoration approaches.",
      "Older materials and previous repairs can make it especially important to identify where moisture is traveling before cleanup begins.",
      "Storm seasons and heavy rainfall can increase the risk of roof leaks, exterior wall intrusion, and trapped moisture.",
    ],
    commonIssues: [
      "Roof leaks and storm water intrusion",
      "Moisture in older building materials",
      "Flooding or water entry during heavy rain",
      "Mold from unresolved leaks",
      "Crawl space and subfloor moisture",
      "Water damage in rental or vacation properties",
    ],
  },

  "orange-park": {
    slug: "orange-park",
    name: "Orange Park",
    state: "FL",
    fullLabel: "Orange Park, FL",
    county: "Clay County",
    rolloutPriority: 4,
    nearbyAreas: [
      "Fleming Island",
      "Lakeside",
      "Oakleaf",
      "Middleburg",
      "Green Cove Springs",
      "Jacksonville",
    ],
    intro:
      "Orange Park homes and businesses can experience water damage and mold concerns from plumbing failures, roof leaks, storms, appliance leaks, and moisture that spreads into flooring, drywall, and hidden cavities.",
    localContext: [
      "Homes in Orange Park can face water damage from plumbing failures, roof leaks, and storm-related moisture.",
      "Fast local response helps reduce structural damage and lower the risk of mold growth.",
      "Suburban homes, townhomes, apartments, and commercial spaces may all require quick drying, containment, and restoration planning after a water loss.",
    ],
    commonIssues: [
      "Water heater and appliance leaks",
      "Burst pipes and plumbing failures",
      "Roof leaks during heavy rain",
      "Moisture under flooring",
      "Mold after slow or hidden leaks",
      "Storm-related water damage",
    ],
  },

  "jacksonville-beach": {
    slug: "jacksonville-beach",
    name: "Jacksonville Beach",
    state: "FL",
    fullLabel: "Jacksonville Beach, FL",
    county: "Duval County",
    rolloutPriority: 5,
    nearbyAreas: [
      "Neptune Beach",
      "Atlantic Beach",
      "Ponte Vedra Beach",
      "Mayport",
      "San Pablo",
      "Jacksonville",
    ],
    intro:
      "Jacksonville Beach properties often need water damage and mold support that accounts for coastal humidity, storms, wind-driven rain, and moisture problems that can move quickly through finished materials.",
    localContext: [
      "Coastal humidity and frequent storms can increase the risk of moisture issues in walls, flooring, attics, and HVAC-connected spaces.",
      "Vacation rentals, condos, townhomes, restaurants, and beach-area homes may need fast restoration to reduce downtime and protect finishes.",
      "Wind-driven rain and roof or window leaks can create hidden water damage that is not always visible on the surface.",
    ],
    commonIssues: [
      "Wind-driven rain intrusion",
      "Roof and window leaks",
      "Moisture under tile, wood, or laminate flooring",
      "Mold from humidity or previous leaks",
      "Storm-related water damage",
      "Water damage in rental and commercial properties",
    ],
  },

  "neptune-beach": {
    slug: "neptune-beach",
    name: "Neptune Beach",
    state: "FL",
    fullLabel: "Neptune Beach, FL",
    county: "Duval County",
    rolloutPriority: 6,
    nearbyAreas: [
      "Jacksonville Beach",
      "Atlantic Beach",
      "Mayport",
      "San Pablo",
      "Ponte Vedra Beach",
      "Jacksonville",
    ],
    intro:
      "Neptune Beach properties can face moisture and restoration problems from storms, roof leaks, plumbing failures, and coastal humidity that can contribute to water damage or mold if not addressed quickly.",
    localContext: [
      "Beach-area homes and small commercial properties can be exposed to wind-driven rain, humidity, and roof or window leak concerns.",
      "Moisture can hide behind baseboards, under flooring, around exterior walls, or inside attic spaces before visible damage appears.",
      "Quick inspection and drying helps reduce the chance of mold growth and deeper material damage.",
    ],
    commonIssues: [
      "Storm and rain intrusion",
      "Roof, flashing, and window leaks",
      "Mold from trapped moisture",
      "Plumbing and appliance leaks",
      "Humidity-related indoor air concerns",
      "Water damage in condos, homes, and small businesses",
    ],
  },

  "atlantic-beach": {
    slug: "atlantic-beach",
    name: "Atlantic Beach",
    state: "FL",
    fullLabel: "Atlantic Beach, FL",
    county: "Duval County",
    rolloutPriority: 7,
    nearbyAreas: [
      "Neptune Beach",
      "Jacksonville Beach",
      "Mayport",
      "San Pablo",
      "Ponte Vedra Beach",
      "Jacksonville",
    ],
    intro:
      "Atlantic Beach homes and businesses may need fast restoration help after plumbing leaks, roof leaks, storm intrusion, or humidity-driven mold concerns common to coastal properties.",
    localContext: [
      "Coastal exposure can make roof leaks, window leaks, and humidity problems more damaging when moisture is not found and dried quickly.",
      "Homes, townhomes, condos, and local businesses may need careful drying and containment to protect finishes and reduce disruption.",
      "Mold concerns often begin with a moisture source, so identifying the source matters as much as cleaning the visible damage.",
    ],
    commonIssues: [
      "Wind-driven rain and storm intrusion",
      "Roof and exterior envelope leaks",
      "Mold caused by hidden moisture",
      "Appliance and plumbing leaks",
      "Moisture in walls, ceilings, and flooring",
      "Humidity-related odor or indoor air concerns",
    ],
  },
};

export const AREA_SLUGS = Object.keys(AREAS) as AreaSlug[];

export function isAreaSlug(value: string): value is AreaSlug {
  return AREA_SLUGS.includes(value as AreaSlug);
}

export function getAreaBySlug(slug: AreaSlug): AreaData {
  return AREAS[slug];
}

/**
 * Nearby area reference list for later expansion:
 *
 * Jacksonville / Duval:
 * - Mandarin
 * - Riverside
 * - Avondale
 * - San Marco
 * - Ortega
 * - Arlington
 * - Southside
 * - Baymeadows
 * - Bartram Park
 * - Northside
 * - Westside
 * - San Pablo
 * - Mayport
 * - Baldwin
 *
 * Clay County:
 * - Fleming Island
 * - Lakeside
 * - Oakleaf
 * - Middleburg
 * - Green Cove Springs
 * - Keystone Heights
 *
 * St. Johns County:
 * - Nocatee
 * - Palm Valley
 * - Sawgrass
 * - Vilano Beach
 * - St. Augustine Beach
 * - Anastasia Island
 * - Elkton
 * - Hastings
 *
 * Beaches:
 * - Jacksonville Beach
 * - Neptune Beach
 * - Atlantic Beach
 * - Ponte Vedra Beach
 */