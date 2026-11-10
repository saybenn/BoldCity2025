# Media registry

Audited 2026-11-01 for BC-02 and BC-03. The original checkout contains 55 image files. One licensed Jacksonville skyline trial adds a 56th. Every original was inspected in four contact sheets, and the small hallway pair was inspected separately. No image file has a misleading filename extension according to Sharp's decoded format.

`asset-inventory.json` is the complete per-file registry. It records a stable asset ID, original filename, final URL, dimensions, actual format, bytes, checksum, visible subject, service association, job/location verification status, permitted display contexts, proposed alt text, comparison relationship, rights/provenance status, usage status, verification notes, and source-code references. `asset-notes.cjs` contains the human visual observations; `audit-assets.cjs` refreshes technical measurements and references without discarding them.

The inventory is evidence about media, not a substitute for company records. Existing project photographs are retained as company repository assets within the approved scope. Original photographer/release documents and job records were not supplied. A caption may describe what is visibly present. It must not invent a city, customer, cause, date, completion outcome, or mold species.

## Recommended placements

| Context | Existing valid asset | Factual caption/alt | Limits |
| --- | --- | --- | --- |
| Reversible homepage skyline hero | `/images/jacksonville-skyline.webp` | Downtown Jacksonville and the Main Street Bridge above the St. Johns River | Licensed regional context, not a company project. Attribution required below. |
| Hero fallback | `/images/landing-min.webp` | Bold City IAQ branded service pickup | Retain for reversible trial. Original is 6000 × 4000, 1.54 MB; use responsive Next Image sizing. |
| Homepage water-first project proof | `/images/grid/carousel2.webp` | Restoration equipment beside exposed wall framing and protection sheeting | Red equipment and exposed framing are visible. Do not claim measured dryness or completed repair. |
| Homepage project/process proof | `/images/proof1.webp` | Worker beside exposed lower kitchen walls and protected cabinets | Byte-identical to `/images/grid/carousel3.webp`; use one intentional representation. |
| Mold containment process | `/images/moldprocess.webp` | Air-handling equipment beside plastic containment and exposed wall framing | Phantom 2000 EC label is visible. No equipment performance or HEPA certification inferred from filename. |
| Water service hero and local illustrative photo | `/images/waterHero.webp` | Exposed lower kitchen wall framing beneath protected cabinets | No technician visible. Do not claim the photo was taken in Jacksonville or Orange Park. |
| Water drying process | `/images/waterProcess.webp` | Restoration equipment inside a room with exposed block walls | No verified moisture readings or drying results. |
| Mold material removal | `/images/grid/mold-hero.webp` | Gloved hand holding removed building material with visible dark spotting | Do not identify mold species, health risk, test results, or removal location. |
| Company/about/contact/social fallback | `/images/about-hero.webp` | Bold City IAQ branded pickup and trailer | Byte-identical to `emergencyProcess.webp`. |
| Material removal | `/images/grid/emergencyGrid.webp` | Removed cabinets and building materials collected outdoors | No visible fire damage established. |
| Cleanup preparation | `/images/sanitizationHero.webp` | Tiled floor and exposed wall framing during restoration preparation | Not a completed rebuild. |

No genuine air-duct cleaning photograph was found. A dedicated air-duct service page may use a company vehicle photo or omit a process photograph; do not relabel unrelated remediation equipment as duct cleaning.

## Skyline source and rights

The skyline trial is a real photograph by **Quintin Soloviev**, released under **Creative Commons Attribution 4.0 International**. The Wikimedia file description identifies downtown Jacksonville, the Main Street Bridge, and the St. Johns River. The file page and license were inspected on 2026-11-01.

- Source and author: <https://commons.wikimedia.org/wiki/File:Jacksonville_skyline.jpg>
- Original image: <https://upload.wikimedia.org/wikipedia/commons/a/a1/Jacksonville_skyline.jpg>
- License: <https://creativecommons.org/licenses/by/4.0/>
- Original retained locally at `context/media/originals/jacksonville-skyline.jpg` (7823 × 5035; 28,517,423 bytes).
- Website derivative: `/images/jacksonville-skyline.webp` (1920 × 1236; 454,726 bytes).
- Changes: resized, converted from JPEG to WebP, metadata stripped by optimization; responsive display may crop.
- Suggested visible credit: `Jacksonville photo: Quintin Soloviev / Wikimedia Commons, CC BY 4.0. Resized and cropped.` Link the author/source phrase to the source page and `CC BY 4.0` to the license.
- The photograph is licensed external regional context. It is not Bold City project evidence and is not public domain. No endorsement is implied.

Original JPEG and generated audit contact sheets should be retained locally rather than added to the site's public downloads. The optimized website derivative and this source/license record are the implementation artifacts.

## Comparison sequences

| Files | Visual evidence | Publication wording |
| --- | --- | --- |
| `hallbefore.webp`, `hallafter.webp` | Visually compatible hallway sequence. Original source is only 353 × 235; first image has wall surfaces intact, second has exposed framing and protection. No independent project record. | “Before preparation / During restoration preparation.” Avoid “fully restored.” Do not display as a large high-resolution result photograph. |
| `grid/bathroom-before.webp`, `grid/bathroom-after.webp` | Corresponding window/tub room layout; later image shows exposed framing and removed fixtures. | “Bathroom before work / Wall materials removed.” This is an in-progress sequence. |
| `grid/kitchenbefore.webp`, `grid/kitchenafter.webp` | Corresponding window/cabinet layout; later image shows exposed lower framing. | “Kitchen before work / During restoration preparation.” This is an in-progress sequence. |
| `before.png`, `after.png` | Similar-looking composition only. Origin and relationship are unverified. Not referenced by application source. | Keep unused. Do not publish as an authentic company before/after story. |

There are no documented completed case studies. Filenames ending in “after” do not establish a finished restoration or a particular job location.

## Missing paths at baseline

The scan found 14 distinct active missing paths. Some refer to optional data fields or metadata rather than a displayed image; production-rendered requests must determine impact. Case sensitivity is evaluated exactly because production is normally case-sensitive.

| Missing path | Repair choice |
| --- | --- |
| `/images/fireprocess.webp` | Use existing `/images/fireProcess.webp`; capitalization matters. |
| `/images/logo.png` | Use `/images/logo.webp`. |
| `/images/social-preview.jpg` | Use a valid shared fallback such as `/images/about-hero.webp`. |
| `/images/team-or-vehicle-hero.webp` | Use `/images/about-hero.webp`. |
| `/images/badges/since.webp` | Remove the missing decorative badge; do not fabricate a credential graphic. |
| `/images/andre-truck.webp` | Use `/images/about-hero.webp` or `/images/landing-min.webp`; avoid assigning a person's identity without evidence. |
| `/images/financing-hero.jpg` | Use `/images/carousel2-min.webp` if that remains the financing page's actual hero, or `/images/about-hero.webp`. |
| `/images/hero.jpg` | Use the actual chosen homepage hero. |
| `/images/ads/process-emergency.webp` | Use `/images/emergencyProcess.webp` if the content describes company response, or a genuine work-process photo with matching caption. |
| `/images/moldHero-min.webp` | Use `/images/moldHero.webp`. |
| `/images/fireHero-min.webp` | Use `/images/fireHero.webp` only with factual description of removed materials. |
| `/images/cleaningHero-min.webp` | Use `/images/sanitizationHero.webp`. |
| `/images/emergencyHero-min.webp` | Use `/images/ads/emergencyHero.webp`. |
| `/images/service-areas/orange-park/water-restoration-hero.webp` | Use `/images/waterHero.webp`, described as illustrative process imagery without a location claim. |

The six commented-out cleaning-gallery paths are not deployed image references: `contents-inventory.webp`, `packout-cleaning.webp`, `duct-cleaning.webp`, `surface-disinfection.webp`, `odor-treatment.webp`, and `contents-return.webp`. Do not create placeholders merely to satisfy commented examples.

## Format, size, duplication, and unused files

All 56 files decoded successfully. The originals' extensions match their actual image encodings. Most project photographs are 6000 × 4000 and many exceed 1 MB despite “min” filenames. Largest: `grid/beforeSloan.webp` (6.06 MB), `grid/mold-hero.webp` (5.06 MB), and duplicate branded-shirt files `ads/emergencyHero.webp` / `fireProcess.webp` (3.60 MB each). Serve responsive optimized derivatives, with lazy loading below the fold. Do not lazy-load the hero. Preserve originals; avoid serving full-resolution gallery files directly through lightbox slides when smaller display copies suffice.

Thirteen duplicate files match byte-for-byte; the machine-readable inventory lists exact pairs. No duplicates were deleted, to preserve established paths and any external links. The `min` suffix does not prove optimization.

Unused assets are marked in the per-file inventory and retained. In particular, `hero.png`, `hero-water-floor.png`, `moldMid.png`, `before.png`, and `after.png` have no established photographic provenance and are excluded from authentic project proof. The `ChatGPT Image ...png` file is byte-identical to the existing `ads/map.png`; treat this as an illustration rather than geographic evidence. `why-us.png` contains a mountain silhouette and must not be described as Jacksonville.

Trust logos and reviewer avatars do not establish current credentials, verified review text, average rating, or review totals. Link them only to the corresponding confirmed records. Five-star artwork must not be used as evidence of a current five-star aggregate rating.

## Refresh and verification

From the repository root, run `node context/media/audit-assets.cjs` to refresh technical inventory and source references. Add `--sheets` only when new assets need visual review. The scanner records source lines and distinguishes obvious line comments, but dynamic URLs, runtime image requests, and generated HTML need the production-build check as well. A successful scan is not a substitute for visually checking captions or browser requests.

Executed evidence: all originals decoded with Sharp, SHA-256 duplicate comparison, filename/actual-format comparison, exact-path source scan, four contact-sheet visual inspections, direct hallway-pair inspections, skyline source/license inspection, skyline download and derivative generation, and direct visual inspection of the optimized skyline. No application source was changed by this bounded audit.

Plain English: some “after” photos still show work being done. We should show what the photo really shows, keep the real pictures safe, and make smaller copies so phones load them faster.


## Implementation verification update

The final source-reference scan reports no active missing image paths. All 56 files still decode; 13 duplicate pairs are retained to protect established URLs. The production HTML scan checks every rendered source asset and optimized response. The hallway comparison is constrained to its native 353-pixel width; larger original work photographs supply the main gallery. Service-area hero images now use responsive Next Image output. See context/qa/media-validation.json and site-validation.json for actual results.
