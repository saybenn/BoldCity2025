# Local content research and quality review

Reviewed November 1, 2026. Purpose: support revisions of seven existing area hubs and fourteen existing water/mold pages. Regional facts below are background for customer guidance, not claims about Bold City projects, response times, offices, licenses, or completed outcomes. The owner confirms no documented project case studies are available. No new route is proposed solely to repeat a city name.

## Source-backed local context

| Area | Supported regional distinction | Useful customer-facing direction | Primary source |
| --- | --- | --- | --- |
| Jacksonville | The St. Johns River, tributaries and Atlantic coast expose the city to river, rainfall, tidal and coastal flooding; mechanisms can overlap | Ask whether water came from a supply line, rain intrusion or outdoor flooding. Distinguish clean-water extraction from contaminated cleanup. Explain checking concealed materials after the source is controlled | [City of Jacksonville resilience assessment](https://www.jacksonville.gov/departments/planning-and-development/community-planning-division/resilient-jacksonville/docs/resilientjacksonville_oct2023_pages.aspx), flood section |
| Orange Park | The town publishes Clay County flood-map updates and a property-specific map link; risk should be checked by address | Keep plumbing/appliance leaks distinct from outdoor floodwater. Direct visitors to the town's current map resource rather than assigning a flood zone to all Orange Park properties. Do not publish temporary map deadlines as evergreen sales copy | [Town of Orange Park news archive, FEMA Flood Zone Changes](https://www.townoforangepark.com/p/our-town/news--events-archive) (search-indexed official text; full-page fetch unavailable) |
| Ponte Vedra Beach | St. Johns County identifies Ponte Vedra among flood adaptation focus areas and provides coastal storm risk-management information | Discuss moisture review after rain intrusion and coordination of unit access where applicable. Link the county's property/area resources. Avoid implying every property floods or that a company photograph is local | [St. Johns County flood vulnerability update](https://www.sjcfl.us/st-johns-county-flood-vulnerability-assessment-update/), [Ponte Vedra coastal storm risk management](https://www.sjcfl.us/pv-spv-csrm/) |
| St. Augustine | The city describes overlapping rain/tide flooding and has specific guidance for historic properties | Explain why documenting affected finishes and discussing material-sensitive drying matters before removal. Refer historic-property alteration questions to the city. Do not imply Bold City is a preservation specialist | [City flood hazards](https://www.citystaug.com/301/Flood-Hazards), [Flooding and Historic Properties](https://www.citystaug.com/905/Flooding-and-Historic-Properties) |
| Jacksonville Beach | The city describes rainy-season and tropical-storm flood risk, including risk outside mapped floodplains, and provides flood/drainage assistance | Explain addressing leaks and contaminated floodwater differently. Give condo/rental owners a practical access and communication checklist, framed as advice rather than a claim about local client history | [City Flood Protection Information](https://www.jacksonvillebeach.org/DocumentCenter/View/1432/Flood-Information-Flyer?bidId=), [Planning Division](https://www.jacksonvillebeach.org/210/Planning-Division) |
| Neptune Beach | The city provides flood-map determinations and property-specific floodplain information | Help owners prepare the address, water source, affected rooms and safe access information. Link the city's hazard resource. Replace the existing unsupported “Small Area, Fast Response” assertion with service planning guidance | [City floodplain management](https://www.nbfl.gov/planning-community-development/pages/floodplain-management), [Protect Yourself from the Flood Hazard](https://www.nbfl.gov/planning-community-development/pages/protect-yourself-flood-hazard) (official indexed text; direct fetch returned 403) |
| Atlantic Beach | The city distinguishes barrier-island storm-surge exposure from ponding in other areas and describes public/private drainage systems | Distinguish structural cleanup from municipal or private drainage repairs. Explain that remediation must address indoor moisture causes, not just remove surface growth. Do not infer sewer contamination from every standing-water event | [City Stormwater Utility](https://www.coab.us/82/Stormwater-Utility), [City flood maps](https://www.coab.us/656/FEMA-Flood-Maps-Information) |

Keep source citations near any specific published regional assertion. Current disaster warnings, road closures, map deadlines, insurance/legal rules, property-specific flood zones and numerical hazard claims need fresh verification before publication. The evergreen content above deliberately avoids those dependencies.

## Review of all existing hub/service combinations

This is a research-stage quality review, not a claim that app source has already been revised. Parent implementation and QA ledgers record final status.

| Existing area hub | Water restoration child | Mold remediation child | Required correction / enrichment |
| --- | --- | --- | --- |
| `/service-areas/jacksonville` | `/service-areas/jacksonville/water-damage-restoration` | `/service-areas/jacksonville/mold-remediation` | Water child is customized but includes undocumented supply-line/storm project narratives; remove them. Mold relies on shared defaults. Distinguish water-source/affected-material triage from moisture-source/containment guidance |
| `/service-areas/orange-park` | `/service-areas/orange-park/water-damage-restoration` | `/service-areas/orange-park/mold-remediation` | Water child customized; missing hero reference and undocumented pipe/storm stories require repair. Mold defaults need distinct practical moisture/source guidance. Priority after Jacksonville |
| `/service-areas/ponte-vedra-beach` | `/service-areas/ponte-vedra-beach/water-damage-restoration` | `/service-areas/ponte-vedra-beach/mold-remediation` | Mold child customized but contains an undocumented humidity case study and location-specific photo claim; remove them. Water defaults need separate rain/leak access and drying guidance |
| `/service-areas/st-augustine` | `/service-areas/st-augustine/water-damage-restoration` | `/service-areas/st-augustine/mold-remediation` | Water child customized but unverified roof-leak story and inaccurate image alt need repair. Mold defaults need material-sensitive planning copy with no preservation-specialist claim |
| `/service-areas/jacksonville-beach` | `/service-areas/jacksonville-beach/water-damage-restoration` | `/service-areas/jacksonville-beach/mold-remediation` | Mold customized but unsupported local-photo caption. Water defaults can explain access, contaminated water and adjoining-unit communication without invented condo projects |
| `/service-areas/neptune-beach` | `/service-areas/neptune-beach/water-damage-restoration` | `/service-areas/neptune-beach/mold-remediation` | Water customized; “small area” cannot substantiate a speed guarantee or photo location. Mold defaults need source-first cleanup, ventilation/condensation concerns and a distinct FAQ |
| `/service-areas/atlantic-beach` | `/service-areas/atlantic-beach/water-damage-restoration` | `/service-areas/atlantic-beach/mold-remediation` | Mold customized with unverified local-photo alt. Water defaults should distinguish ponding, structural intrusion and drainage repair responsibility. Do not invent municipal work or flood histories |

All seven hubs consume `AREAS` from `data/service-area-pages/areas.ts`; their introductions differ but currently repeat similar leak/humidity lists. All fourteen children consume two service data entries and seven overrides via `buildServiceAreaPageData.ts`. Seven children have no override. Improve useful instructions and FAQs rather than only replacing names. Shared accurate process steps are appropriate; the entire page should not consist of duplicated service copy plus a city name.

Remove or replace undocumented `localProof` cards in `pageOverrides.ts` (Jacksonville, Orange Park, Ponte Vedra Beach and St. Augustine). A heading such as “Our Restoration Process” with genuine general company photos is supportable. Describing the pictured work as a named city's job is not supportable without a verified location. Do not turn an empty proof section into a fabricated case study.

## Suggested distinct service questions

These are editorial directions for supported answers, not new business promises.

| Area | Water question | Mold question |
| --- | --- | --- |
| Jacksonville | What information helps you plan cleanup after a pipe leak versus outdoor flooding? | Why can a dry-looking surface still need a moisture review? |
| Orange Park | What should I note when water spreads under flooring after a leak? | Should the leak be fixed before mold remediation starts? |
| Ponte Vedra Beach | What should a condo owner arrange before a water-damage visit? | How do access and occupied spaces affect containment planning? |
| St. Augustine | What should I document before damaged finishes are removed? | How do you plan work around existing finishes and affected materials? |
| Jacksonville Beach | What should a rental manager share about affected and adjoining rooms? | Does a musty smell prove that mold is present? |
| Neptune Beach | What can I safely prepare while waiting for water-cleanup guidance? | Can recurring condensation or a small leak keep a mold problem active? |
| Atlantic Beach | Does interior water cleanup also fix outdoor drainage? | Why does cleanup need to address the moisture source? |

Safety-sensitive published answers should be consistent with authoritative guidance, never advise entering unsafe floodwater, and avoid treating visible discoloration or odor as a laboratory diagnosis. Do not offer mold testing simply because queries mention it.

## Air duct cleaning content opportunity

The GBP screenshots establish an air duct cleaning category. A single core page is appropriate; no current route specifically serves that intent. The supplied queries offer only two impressions, so they do not justify a forecast or per-city expansion.

Describe the agreed scope before service, access to supply/return ducts and registers, visible debris concerns, care around occupied homes/businesses, and final walkthrough only to the extent supported by actual company operations. Equipment brands, negative-pressure systems, biocides, sanitization, HVAC repair, laboratory testing, certification and health outcomes remain unverified. Repository project photos can illustrate related work only with accurate captions; none should be relabeled as duct cleaning without visual/evidence support.

EPA does not support blanket health or efficiency promises from duct cleaning. Frame the page around an assessment of actual conditions and a clear cleaning scope. Persistent moisture requires attention to its source; duct cleaning is not a substitute for fixing leaks or remediating wet materials. [EPA air duct cleaning guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned).

Useful links: water damage restoration, mold remediation where moisture is involved, cleaning services when scope overlaps, and contact. FAQs can address the initial visit, scope, home/business access, moisture concerns and why a written service scope matters. Do not add mold testing or chemical treatment claims to capture keywords.

Plain-English explanation: Each town needs helpful advice that fits the place. We can explain local rain and flood concerns using city sources. We cannot say a photo shows a job in that town unless we know it really happened there.
