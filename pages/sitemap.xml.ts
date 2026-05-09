import type { GetServerSideProps } from "next";
import { serviceData } from "@/lib/serviceData";
import { AREAS } from "@/data/service-area-pages/areas";
import { SERVICES } from "@/data/service-area-pages/services";
import type { AreaSlug, ServiceSlug } from "@/lib/service-area-pages/types";

const SITE_URL = "https://boldcityiaq.com";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/financing",
  "/services/water-damage-restoration",
  "/services/mold-remediation",
  "/services/fire-and-smoke-restoration",
  "/services/cleaning-and-sanitization",
  "/services/emergency-services",
  "/service-areas",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizePath(path: string) {
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

function uniqueRoutes(routes: string[]) {
  return Array.from(new Set(routes.map(normalizePath)));
}

function getServiceRoutes() {
  return serviceData
    .map((service) => service.slug)
    .filter(Boolean)
    .map((slug) => `/services/${slug}`);
}

function getServiceAreaHubRoutes() {
  return (Object.keys(AREAS) as AreaSlug[]).map(
    (areaSlug) => `/service-areas/${areaSlug}`
  );
}

function getServiceAreaServiceRoutes() {
  return (Object.keys(AREAS) as AreaSlug[]).flatMap((areaSlug) =>
    (Object.keys(SERVICES) as ServiceSlug[]).map(
      (serviceSlug) => `/service-areas/${areaSlug}/${serviceSlug}`
    )
  );
}

function buildSitemapXml(routes: string[]) {
  const now = new Date().toISOString();

  const urls = routes
    .map((route) => {
      const loc = `${SITE_URL}${route}`;

      return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`;
}

function SitemapXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const routes = uniqueRoutes([
    ...STATIC_ROUTES,
    ...getServiceRoutes(),
    ...getServiceAreaHubRoutes(),
    ...getServiceAreaServiceRoutes(),
  ]);

  const sitemap = buildSitemapXml(routes);

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SitemapXml;