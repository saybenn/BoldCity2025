# Search Console baseline and investigation

Analysis date: November 1, 2026. Source: seven owner-supplied Google Search Console CSV exports, unmodified. Reporting period: July 31–October 30, 2026 (92 daily rows). Filters.csv identifies `Web (text-based)` and `Last 3 months`; there are no country/device filters in that file. Daily Search Console dates use Pacific Time, which can differ from GA4's property time zone. These are historical search metrics, not a live account audit or a measure of form submissions.

## Reconciled baseline

| Source table | Rows | Clicks | Impressions | Calculated CTR | Interpretation |
| --- | ---: | ---: | ---: | ---: | --- |
| Chart | 92 | 24 | 7,339 | 0.3270% | Headline property baseline |
| Countries | 36 | 24 | 7,339 | 0.3270% | Reconciles to chart |
| Devices | 3 | 24 | 7,339 | 0.3270% | Reconciles to chart |
| Pages | 20 | 24 | 7,921 | 0.3030% | Page aggregation, not another property total |
| Queries | 352 | 3 | 5,651 | 0.0531% | Only disclosed query rows, not full traffic |
| Search appearance | 0 | — | — | — | Header only; no result-feature breakdown supplied |

CTR is total clicks divided by total impressions, not an average of rounded row CTRs. Different page and property aggregation can produce different impression totals. Anonymized and otherwise omitted queries prevent the disclosed query table from reconciling to chart totals. Do not describe the unexplained 21 clicks as lost tracking. [Google report aggregation](https://support.google.com/webmasters/answer/7576553?hl=en), [query limitations and dimensions](https://support.google.com/webmasters/answer/17011259?hl=en).

| Reporting portion | Clicks | Impressions | Calculated CTR |
| --- | ---: | ---: | ---: |
| July 31 only | 0 | 62 | 0.00% |
| August 1–31 | 3 | 2,333 | 0.13% |
| September 1–30 | 10 | 2,046 | 0.49% |
| October 1–30 | 11 | 2,898 | 0.38% |

The first and last portions are incomplete calendar months. These small counts do not establish a stable growth trend or a hero experiment result.

## Device and country segmentation

| Segment | Clicks | Impressions | Calculated CTR | Exported average position |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 16 | 6,167 | 0.2594% | 14.23 |
| Mobile | 8 | 1,164 | 0.6873% | 11.23 |
| Tablet | 0 | 8 | 0.00% | 33 |
| United States | 21 | 7,162 | 0.2932% | 13.37 |
| All other countries combined | 3 | 177 | 1.6949% | Not calculated |

US searches account for 97.59% of impressions and 87.5% of clicks. Ethiopia contributes 2 clicks/4 impressions; Bangladesh 1/9. All other countries have zero clicks. The overseas sample is too small to infer bots, invalid leads, or an SEO targeting failure. Desktop supplies 84.03% of impressions but mobile has the higher observed CTR. This supports mobile conversion QA while retaining desktop snippet research. Separate device/country exports cannot reveal a country-by-device cross-tab; obtain that in Search Console before attributing the anomaly to a segment.

## Tagged homepage anomaly

| Exported URL | Clicks | Impressions | Exported CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| `https://boldcityiaq.com/?utm_source=GMB&utm_medium=Organic` | 14 | 5,623 | 0.25% | 6.79 |
| `https://boldcityiaq.com/` | 7 | 499 | 1.40% | 29.17 |
| `https://boldcityiaq.com/contact/` | 1 | 109 | 0.92% | 12.59 |
| `https://boldcityiaq.com/contact` | 1 | 79 | 1.27% | 27.37 |

The tagged homepage has about 11.27 times the clean homepage's page-row impressions. The export does not show why. Local/knowledge-panel result presentation, Google-selected canonical differences, and historical reporting differences are hypotheses, not findings. A UTM source string is owner-supplied attribution; its presence alone does not identify the exact search feature. Do not remove GBP UTM tracking or force a new canonical policy from this table alone.

Most Search Console URL data is assigned to Google's selected canonical, with exceptions. Average position can describe a compound search element rather than an ordinary blue-link rank. It does not prove the site ranks first for every searcher. [Google's metric definitions](https://support.google.com/webmasters/answer/7042828?hl=en).

### Exact account checks still required

1. Inspect both homepage URLs and both contact variants in Search Console. Record indexed URL status, last crawl, user-declared canonical, Google-selected canonical, and referring/sitemap signals. Inspect the indexed result and then run a live test; the indexed canonical is not a live-test inference. [URL Inspection documentation](https://support.google.com/webmasters/answer/9012289?hl=en).
2. In Performance, keep July 31–October 30 and Web text-based. Compare exact tagged/clean page filters. For each, export Queries, Countries, Devices, Dates, and available Search appearance. Repeat with United States and separately desktop/mobile filters. Retain exact URLs and case in the saved evidence.
3. For `mold remediation jacksonville fl`, `mold remediation jacksonville`, `emergency water cleanup`, and `emergency water removal`, apply an exact-query filter and inspect Pages. Then filter each homepage variant and each relevant service page to see which URLs earned those impressions. The supplied exports are separate dimensions and cannot be joined into a reliable query-to-page map.
4. Investigate October 19 (664 impressions, 0 clicks, average position 3.4) and October 30 (404, 0, 1.5) with date + query + page + US/device filters. Compare with surrounding days rather than treating a spike as a lasting rank improvement.
5. Review actual results from Jacksonville on mobile and desktop and preserve screenshots of any organic listing, local pack, knowledge panel, title and snippet. Note the date/location/device; manual observation is a spot check, not a replacement for historical account data.
6. Compare server-rendered canonical/title/description of the homepage variants, redirects, sitemap URLs, internal links, and GBP website destination. Retain tracking parameters on the destination and a stable clean canonical when confirmed by the technical audit. GBP is pending reverification: record recommendations only.

These checks require owner-authorized Search Console access. No connected Search Console, GA4, or GTM administration session was available to this research task. No Google-selected canonical, live key-event configuration, or GA4 engagement result is claimed here. A shell live-site fetch failed DNS in the restricted execution environment; that is an environment limitation, not proof the public site is down.

## Search-intent priorities

| Priority | Page / intent | Source evidence | Implementation direction |
| --- | --- | --- | --- |
| 1 | Homepage / Jacksonville water cleanup | Clean home 499 impressions; tagged home dominates; Jacksonville water queries include restoration at 28 impressions/position 33.14 and FL variant at 17/29.94 | Service-first H1 and useful summary; emergency call CTA; clear authentic proof and service links |
| 2 | `/services/water-damage-restoration` | 39 page impressions/position 26.9; water restoration 102 query impressions/8.47; emergency water removal 66/4.18 | Detailed extraction, drying, moisture assessment and restoration scope; avoid response-time promises |
| 3 | `/services/mold-remediation` | 48 page impressions/34.58; mold remediation Jacksonville FL 359 query impressions/1.86 with no clicks | Explain containment, HEPA cleanup and moisture source; investigate query-to-page attribution before rank/CTR claims |
| 4 | Jacksonville hub and two existing service pages | Hub 19 impressions/3.95; mold child 6/12 | Remove unverified local case studies; use supported city context and link to core services |
| 5 | Orange Park hub and two existing service pages | Hub 254 impressions/23.58; water mitigation Orange Park FL 38/16.95; water restoration Orange Park 36/22.47 | Distinct regional/property guidance and water-first internal links; preserve URLs |
| 6 | Dedicated air duct cleaning core page | Advertised GBP category; two disclosed duct queries, only 2 combined impressions | Substantive single service page; scope and equipment only when supported; no city multiplication or health guarantees |
| 7 | Existing remaining areas | St. Augustine hub 373/42.83; Atlantic Beach 288/35.06; Neptune Beach 233/24.62; Jacksonville Beach 152/29.01; Ponte Vedra Beach 19/3.95 | Enrich current routes using relevant sources; no automatic additional pages |

Additional disclosed zero-click queries: `indoor air quality` 681 impressions/2.64, `mold testing` 244/1, `mold remediation` 233/2.03, `mold remediation companies near me` 197/1, `emergency water cleanup` 60/1.33. Query presence does not authorize advertising mold testing, assessment licenses, duct sanitization, or unrelated contracting capabilities. Some branded-looking queries refer to different businesses (`bold city seal services`, `bold city home inspections`); do not add those services.

The only duct rows are `best air duct cleaning near me` (1 impression, 0 clicks, position 18) and `air duct cleaning jacksonville` (1, 0, 81). This export offers no volume forecast. The category/service evidence supports the page, not a claim of established duct demand.

## Engagement, launch and evaluation

Search Console does not report bounce rate, form leads, or completed telephone calls. In GA4, compare landing page + query string, session source/medium, engagement rate, engaged sessions, accepted `generate_lead` events, and distinct `phone_click` events. Keep first-touch and latest-touch attribution distinct, check the property's reporting timezone, and exclude test/internal submissions through an agreed process. A telephone-link click is lead intent, not a completed call.

Save a dated snapshot immediately before deployment and review at about 7, 30 and 60 days after the approved deployment. Record actual deployment time and changes in tracking definitions. At 24 clicks across 92 days, short-term hero comparisons cannot establish statistical significance. Use accepted leads, call intent, qualitative mobile usability and longer-term search trends without promising causal SEO gains.

Plain-English explanation: Google showed the site thousands of times, but only 24 people clicked. Some reports count the same search differently, so their totals do not always match. We need to see which page Google showed before deciding why people did not click.

## Source provenance

Original filenames were supplied from the user’s temporary attachments folder, suffixed ` (1).csv`. No source was changed or refreshed.

| File | SHA-256 |
| --- | --- |
| Chart | `C4427413D3E0CC0A410CD3679E1EED4C6584474F1A5AC27BAD128E501883256C` |
| Countries | `3F7563618658D49D31670A4BEACAF0ED65293201B717213F1EB30E3446DFDAA0` |
| Devices | `DE33A3D14AA96FBD8385146A16558947AA3DB74FB9452D2F1A37F0240036391F` |
| Pages | `195342471809EB4713F0B984E16A689BFAE76E80A9083C8BD203580DC3C7AE54` |
| Queries | `3290A364062B747B7BFAA4F31B0B5BC3F76F8B36EF0512ADE40D6A77C012537E` |
| Search appearance | `EED9CEAFB9193E5E3D034F5897AD992BC851F1998204CD98F0B0F6873FBFC8B2` |
| Filters | `335D093169630379294C15D230D6EF231BFB8F52E1B5793BA5F539BC393444C1` |
