import { AREAS } from "@/data/service-area-pages/areas";
import { SERVICES } from "@/data/service-area-pages/services";
import type { AreaSlug, ServiceSlug } from "@/lib/service-area-pages/types";

export type ServiceAreaPathParams = {
  params: {
    areaSlug: AreaSlug;
    serviceSlug: ServiceSlug;
  };
};

export function getAllServiceAreaPaths(): ServiceAreaPathParams[] {
  return (Object.keys(AREAS) as AreaSlug[]).flatMap((areaSlug) =>
    (Object.keys(SERVICES) as ServiceSlug[]).map((serviceSlug) => ({
      params: {
        areaSlug,
        serviceSlug,
      },
    }))
  );
}