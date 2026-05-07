import { AREAS } from "@/data/service-area-pages/areas";
import type { AreaSlug } from "@/lib/service-area-pages/types";

export type ServiceAreaHubPathParams = {
  params: {
    areaSlug: AreaSlug;
  };
};

export function getAllServiceAreaHubPaths(): ServiceAreaHubPathParams[] {
  return (Object.keys(AREAS) as AreaSlug[]).map((areaSlug) => ({
    params: {
      areaSlug,
    },
  }));
}