export const SITE_URL = "https://boldcityiaq.com";
export const BUSINESS = {
  "@type": "LocalBusiness", "@id": `${SITE_URL}/#business`,
  name: "Bold City Indoor Air Quality and Emergency Services",
  alternateName: "Bold City IAQ", url: `${SITE_URL}/`, telephone: "+19044346318",
  logo: `${SITE_URL}/images/logo.webp`, image: `${SITE_URL}/images/about-hero.webp`,
  // Current public address confirmed by the owner on 2026-11-01.
  address: { "@type": "PostalAddress", streetAddress: "14440 Normandy Blvd", addressLocality: "Jacksonville", addressRegion: "FL", postalCode: "32234", addressCountry: "US" },
  areaServed: ["Jacksonville", "Orange Park", "Ponte Vedra Beach", "St. Augustine", "Jacksonville Beach", "Neptune Beach", "Atlantic Beach"].map((name) => ({ "@type": "City", name: `${name}, FL` })),
};
export function absoluteUrl(value = "/") { return new URL(value, `${SITE_URL}/`).href; }
export function canonicalUrl(value = "/") {
  const url = new URL(value, SITE_URL);
  const path = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  return `${SITE_URL}${path}`;
}
function label(slug) {
  const special = { "st-augustine": "St. Augustine", "fire-and-smoke-restoration": "Fire & Smoke Restoration", "cleaning-and-sanitization": "Cleaning & Sanitization" };
  return special[slug] || slug.split("-").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" ");
}
export function buildPageGraph({ canonical, title, description, image, faq = [] }) {
  const url = canonicalUrl(canonical);
  const path = new URL(url).pathname;
  const parts = path.split("/").filter(Boolean);
  const isService = parts[0] === "services" && parts.length === 2 || parts[0] === "service-areas" && parts.length === 3;
  const serviceName = isService ? label(parts.at(-1)) : null;
  const area = parts[0] === "service-areas" && parts[1] ? `${label(parts[1])}, FL` : null;
  const pageType = parts[0] === "about" ? "AboutPage" : path === "/contact" ? "ContactPage" : path === "/services" || parts[0] === "service-areas" && parts.length < 3 ? "CollectionPage" : "WebPage";
  const page = { "@type": pageType, "@id": `${url}#webpage`, url, name: title, description,
    isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": BUSINESS["@id"] },
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) },
    ...(area ? { spatialCoverage: { "@type": "City", name: area } } : {}),
    ...(isService ? { mainEntity: { "@id": `${url}#service` } } : {}),
  };
  const graph = [BUSINESS, { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Bold City IAQ", publisher: { "@id": BUSINESS["@id"] } }, page];
  if (isService) graph.push({ "@type": "Service", "@id": `${url}#service`, name: `${serviceName}${area ? ` in ${area}` : ""}`, serviceType: serviceName, url,
    provider: { "@id": BUSINESS["@id"] }, areaServed: area ? { "@type": "City", name: area } : BUSINESS.areaServed });
  if (parts.length) {
    const crumbs = [{ name: "Home", item: `${SITE_URL}/` }, ...parts.map((part, index) => ({ name: label(part), item: `${SITE_URL}/${parts.slice(0, index + 1).join("/")}` }))];
    graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })) });
    page.breadcrumb = { "@id": `${url}#breadcrumbs` };
  }
  if (faq.length) graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, isPartOf: { "@id": page["@id"] }, mainEntity: faq.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })) });
  return { "@context": "https://schema.org", "@graph": graph };
}
