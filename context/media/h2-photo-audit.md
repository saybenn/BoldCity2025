# Handoff #2 photography audit and allocation

Audited November 1, 2026 against baseline commit `95496769f76fd267d36700df856058e947cc9efb`. This is a source/image audit and recommended allocation, not a claim that the application placements below have already changed. Parent implementation and final browser screenshots establish the final state.

## Supplied sources and identity

All three supplied photographs were visually inspected before descriptions were written. They show different views of similarly protected exposed kitchen/room framing, worker activity and equipment. They may be from one property. No job, city, loss cause, customer, completion result, license or equipment specification is inferred from them.

| Supplied file | Existing same scene | Exact bytes? | Normalized image comparison | Optimized display path |
| --- | --- | --- | --- | --- |
| extra-min.webp, 109,996 bytes | /images/extra-min.webp and /images/grid/extra.webp, 913,800 bytes | No | dHash distance 0/64; 32×32 grayscale RMSE 0.528 | /images/projects/protected-framing-work.webp |
| proof1.webp, 144,808 bytes | /images/proof1.webp and /images/grid/carousel3.webp, 1,118,350 bytes | No | dHash distance 1/64; RMSE 0.597 | /images/projects/worker-at-protected-kitchen.webp |
| carousel2-min.webp, 133,842 bytes | /images/carousel2-min.webp and /images/grid/carousel2.webp, 1,021,830 bytes | No | dHash distance 0/64; RMSE 0.502 | /images/projects/equipment-beside-framing.webp |

The existing versions are 6000×4000; supplied versions are 2048×1365 WebP. Exact SHA-256 comparison found no same-byte match between supplied and legacy files. Pixel-normalized fingerprints and visual subject comparison establish that these are optimized versions of the same scenes. The three supplied variants were copied without recompression into intentional display paths, preserving every legacy original and URL. Combined stored size is 388,646 bytes versus 3,053,980 bytes for the three matching legacy originals (about 87.3% smaller). Do not present the additional three files as three newly documented projects.

Full checksum/fingerprint evidence is in [h2-photo-comparison.json](h2-photo-comparison.json). New variants have human source/provenance notes in asset-notes.cjs; run the existing media inventory refresher after final application placement to update references.

## Safe descriptions and crop choices

| Asset | Visible subject / safe caption | Crop and factual limits |
| --- | --- | --- |
| protected-framing-work | Worker holding a tool beside exposed framing and protection sheeting | Keep worker and tool together when cropping; a very narrow centered background crop can show only framing. The image alone does not identify the material being applied, cleanup method or result. |
| worker-at-protected-kitchen | Worker beside exposed kitchen wall framing and protected cabinets | Preserve the kneeling worker and cabinet/framing context. No claim of water extraction or measured drying is supported. |
| equipment-beside-framing | Red restoration equipment beside exposed framing and protection sheeting | A 4:3 crop can retain equipment and framing; a centered narrow background crop may cut off the machine. Branding is visible but does not substantiate HEPA or other performance specifications. |

The shared blue masking, cabinets and framing make it possible for these pictures to be one work sequence. Describe facets of work, never separate job stories. A crop or derivative is the same photo for repetition analysis.

## Repetition findings

- Emergency service currently repeats the company vehicle in hero and gallery, and red equipment in process and gallery. The process and gallery are not new evidence just because the crop differs.
- Mold repeats /images/moldprocess.webp in hero, process and gallery (three visible uses).
- Fire repeats both debris photos in process/hero and gallery. No visible fire is established by the debris images.
- Cleaning repeats its framing hero in the gallery and the kneeling-worker process image in the gallery.
- Air duct cleaning repeats the same vehicle in hero and process; no genuine duct-cleaning equipment/job image exists in the supplied or existing approved inventory.
- Water uses distinct scene views within the route, but the equipment/worker photographs also appear across the homepage and other core pages. This is contextual reuse, not evidence of separate jobs.
- The seven water area pages share a single illustrative company image, and the seven mold area pages share another. Each route uses only one project photo. This cross-route reuse is acceptable when disclosed as company process imagery rather than labeled as a job in each city; source captions must remain geographic-neutral.
- Social-preview reuse is intentional, and brand logos are excluded from scene-repetition counts.

## Recommended restrained allocation

| Page | Recommendation |
| --- | --- |
| Homepage | Keep skyline hero and truthful before/during comparison. Use the three supplied optimized views as a coherent work/process sequence (equipment, worker preparation, protected framing); avoid calling them separate projects. Retain the native-width hallway comparison and descriptive labels. |
| Emergency | Keep vehicle once as dispatch/company context, use numbered photo-free response steps, and show two or three distinct supplied work views once each in a concise gallery. This removes the truck/machine duplication without inventing more jobs. |
| Water | Keep protected-framing hero and distinct block-wall/equipment process image if useful. Use at most two different supplied work views in the gallery, each once; no extraction-result captions. |
| Mold | Use the containment/equipment photograph once as hero. Use numbered text process steps and one material-removal image, without species/testing claims. |
| Cleaning | Use standing worker/protection view once and one different cleanup/preparation image if useful. Use text steps rather than repeat either photograph. |
| Fire/smoke | Use one company/debris illustration with honest alt text, then text steps and at most one distinct material-removal photograph. Do not label visible generic debris as proven fire damage. |
| Air duct | Keep company vehicle once; use typographic process steps. Do not relabel the supplied framing/equipment photographs as duct cleaning. |
| Local pages | One neutral company process photo per route is enough. If rotating water views, use genuine varied views and no city claim. Do not manufacture unique city-project imagery or treat different crops as new evidence. |

Implementation note: Process currently requires an image and ImageGrid suppresses single-image sets. Parent can make the process image optional and allow a single intentional gallery image so fewer photos do not cause a missing-src request or force repetition. The existing service-area process component is already photo-free.

## Baseline route × image usage

The full role-by-role map, including metadata roles and repeat counts, is in [h2-route-image-usage.json](h2-route-image-usage.json). Snapshot excludes navigation logos, badges, avatars and non-project decorative marks.

| Route | Visible photo roles at reviewed baseline |
| --- | --- |
| `/` | hero: `/images/jacksonville-skyline.webp`<br>comparison-before: `/images/hallbefore.webp`<br>comparison-during: `/images/hallafter.webp`<br>project-proof: `/images/grid/carousel2.webp`<br>project-proof: `/images/moldprocess.webp`<br>project-proof: `/images/grid/mold-hero.webp`<br>project-proof: `/images/grid/emergencyGrid.webp`<br>project-proof: `/images/sanitizationHero.webp` |
| `/services/water-damage-restoration` | hero: `/images/waterHero.webp`<br>process: `/images/waterProcess.webp`<br>gallery: `/images/grid/carousel2.webp`<br>gallery: `/images/proof1.webp` |
| `/services/mold-remediation` | hero: `/images/moldprocess.webp`<br>process: `/images/moldprocess.webp`<br>gallery: `/images/moldprocess.webp`<br>gallery: `/images/grid/mold-hero.webp` |
| `/services/fire-and-smoke-restoration` | hero: `/images/fireHero.webp`<br>process: `/images/grid/emergencyGrid.webp`<br>gallery: `/images/fireHero.webp`<br>gallery: `/images/grid/emergencyGrid.webp` |
| `/services/cleaning-and-sanitization` | hero: `/images/sanitizationHero.webp`<br>process: `/images/proof1.webp`<br>gallery: `/images/proof1.webp`<br>gallery: `/images/sanitizationHero.webp` |
| `/services/emergency-services` | hero: `/images/about-hero.webp`<br>process: `/images/grid/carousel2.webp`<br>gallery: `/images/grid/carousel2.webp`<br>gallery: `/images/about-hero.webp` |
| `/services/air-duct-cleaning` | hero: `/images/about-hero.webp`<br>process: `/images/about-hero.webp` |
| `/service-areas/jacksonville` | No project photo |
| `/service-areas/jacksonville/water-damage-restoration` | hero: `/images/waterHero.webp` |
| `/service-areas/jacksonville/mold-remediation` | hero: `/images/moldprocess.webp` |
| `/service-areas/orange-park` | No project photo |
| `/service-areas/orange-park/water-damage-restoration` | hero: `/images/waterHero.webp` |
| `/service-areas/orange-park/mold-remediation` | hero: `/images/moldprocess.webp` |
| `/service-areas/ponte-vedra-beach` | No project photo |
| `/service-areas/ponte-vedra-beach/water-damage-restoration` | hero: `/images/waterHero.webp` |
| `/service-areas/ponte-vedra-beach/mold-remediation` | hero: `/images/moldprocess.webp` |
| `/service-areas/st-augustine` | No project photo |
| `/service-areas/st-augustine/water-damage-restoration` | hero: `/images/waterHero.webp` |
| `/service-areas/st-augustine/mold-remediation` | hero: `/images/moldprocess.webp` |
| `/service-areas/jacksonville-beach` | No project photo |
| `/service-areas/jacksonville-beach/water-damage-restoration` | hero: `/images/waterHero.webp` |
| `/service-areas/jacksonville-beach/mold-remediation` | hero: `/images/moldprocess.webp` |
| `/service-areas/neptune-beach` | No project photo |
| `/service-areas/neptune-beach/water-damage-restoration` | hero: `/images/waterHero.webp` |
| `/service-areas/neptune-beach/mold-remediation` | hero: `/images/moldprocess.webp` |
| `/service-areas/atlantic-beach` | No project photo |
| `/service-areas/atlantic-beach/water-damage-restoration` | hero: `/images/waterHero.webp` |
| `/service-areas/atlantic-beach/mold-remediation` | hero: `/images/moldprocess.webp` |
| `/ads/emergency-restoration` | hero: `/images/fireProcess.webp` |

## Validation and handoff limits

Executed: read complete approved handoff; decoded and visually inspected all three supplied files; SHA-256 exact comparison against the public inventory; normalized grayscale/difference-hash similarity search; measured dimensions/format/bytes; copied the smaller approved variants; created baseline route/role inventory; recorded human alt/provenance notes.

Not executed by this bounded asset task: application edits, browser layout/cropping verification, URL-response checks after placement, production deployment, real project-location verification or final media registry refresh. These remain with the parent implementation/QA workflow.

Plain English: these are three useful pictures of real work, but they may be three views of one job. Show each view once where it helps, and use clear steps when another photo would just repeat the same scene.
