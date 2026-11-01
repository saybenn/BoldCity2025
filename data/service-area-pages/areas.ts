import type { AreaData, AreaSlug } from "@/lib/service-area-pages/types";
import { LOCAL_DETAILS } from "./localDetails";
const identities = [
  {
    "slug": "jacksonville",
    "name": "Jacksonville",
    "state": "FL",
    "fullLabel": "Jacksonville, FL",
    "county": "Duval County",
    "rolloutPriority": 1,
    "nearbyAreas": [
      "Orange Park",
      "Jacksonville Beach"
    ]
  },
  {
    "slug": "orange-park",
    "name": "Orange Park",
    "state": "FL",
    "fullLabel": "Orange Park, FL",
    "county": "Clay County",
    "rolloutPriority": 2,
    "nearbyAreas": [
      "Jacksonville",
      "St. Augustine"
    ]
  },
  {
    "slug": "ponte-vedra-beach",
    "name": "Ponte Vedra Beach",
    "state": "FL",
    "fullLabel": "Ponte Vedra Beach, FL",
    "county": "St. Johns County",
    "rolloutPriority": 3,
    "nearbyAreas": [
      "Jacksonville Beach",
      "St. Augustine"
    ]
  },
  {
    "slug": "st-augustine",
    "name": "St. Augustine",
    "state": "FL",
    "fullLabel": "St. Augustine, FL",
    "county": "St. Johns County",
    "rolloutPriority": 4,
    "nearbyAreas": [
      "Ponte Vedra Beach",
      "Jacksonville"
    ]
  },
  {
    "slug": "jacksonville-beach",
    "name": "Jacksonville Beach",
    "state": "FL",
    "fullLabel": "Jacksonville Beach, FL",
    "county": "Duval County",
    "rolloutPriority": 5,
    "nearbyAreas": [
      "Neptune Beach",
      "Ponte Vedra Beach"
    ]
  },
  {
    "slug": "neptune-beach",
    "name": "Neptune Beach",
    "state": "FL",
    "fullLabel": "Neptune Beach, FL",
    "county": "Duval County",
    "rolloutPriority": 6,
    "nearbyAreas": [
      "Atlantic Beach",
      "Jacksonville Beach"
    ]
  },
  {
    "slug": "atlantic-beach",
    "name": "Atlantic Beach",
    "state": "FL",
    "fullLabel": "Atlantic Beach, FL",
    "county": "Duval County",
    "rolloutPriority": 7,
    "nearbyAreas": [
      "Neptune Beach",
      "Jacksonville"
    ]
  }
];
export const AREAS = Object.fromEntries(identities.map((area) => {
  const local = LOCAL_DETAILS[area.slug as AreaSlug];
  return [area.slug, { ...area, intro:local.context, localContext:local.planning,
    commonIssues:["Active water intrusion and wet materials", "Moisture remaining after a leak", "Affected materials needing cleanup or removal"], source: local.source }];
})) as Record<AreaSlug, AreaData>;
