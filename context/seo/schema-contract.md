# Metadata and structured data

`Layout` resolves title, description, canonical, image and indexing once. `MetaHead` is the sole HTML metadata owner. `SchemaMarkup` emits only one escaped JSON-LD graph using `lib/seo.js`. The footer emits no independent business schema. Pages must pass `meta` through Layout rather than mount another metadata component.

The canonical business ID is `https://boldcityiaq.com/#business`; WebSite is `/#website`. Every page gets a stable WebPage ID. Services get a connected Service/provider and actual areaServed; local hubs use CollectionPage; About and Contact use their matching types. Breadcrumbs follow real routes, including the new collection indexes. FAQPage is emitted only from the same questions/answers rendered in the visible page. FAQ markup does not imply rich-result eligibility.

The owner confirmed 14440 Normandy Blvd, Jacksonville, FL 32234 on November 1, 2026. Phone is the established emergency number (904) 434-6318. Do not invent another local office, geographic coordinates, credential, opening-hour schedule, review count or rating. Existing identity data in deprecated per-page schema overrides is not merged into the canonical entity. No AggregateRating/Review nodes are emitted.

Canonical URLs exclude query strings and use one consistent path format; root ends in /. GBP UTMs remain available for attribution. A clean declared canonical does not prove Google's selected canonical: inspect both homepage variants in Search Console after launch. Social images resolve against the origin, never by appending an image path to a service URL.

Success and campaign pages emit noindex,follow and stay out of the sitemap. Robots allows those pages to be crawled so Google can observe noindex, while API/admin/test/archive paths remain excluded. Sitemap contains only real indexable routes and does not invent daily lastmod timestamps.

Run `npm run validate:site` against a production build to inspect every indexable route, metadata, image URLs, links and JSON-LD. The checker generates the page matrix and schema report. It verifies parseable output, identity, page/service/area pairing and absence of self-serving review markup. This is automated structural verification, not a claim of passing the external schema.org validator or Google's Rich Results Test. Run those tools for representative URLs after an approved preview is reachable.
