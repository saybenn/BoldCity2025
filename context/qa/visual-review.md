# Visual QA evidence

Screenshots are from isolated Chrome against a local production build, November 1, 2026. They establish rendered layout, not field Core Web Vitals or a statistically significant conversion change. The review data limitation is deliberate: Google’s 5.0 average was verified directly; individual card content and count are not published without a source.

| Page / width | Capture | Observations |
| --- | --- | --- |
| Homepage 375 | [Mobile](evidence/home-375.webp) | One clear water-cleanup H1, primary call button, smaller financing link; review heading and stars visible in opening screen |
| Homepage 430 | [Mobile wide](evidence/home-430.webp) | Readable wrapping; no horizontal overflow |
| Homepage 768 | [Tablet](evidence/home-768.webp) | Consistent spacing and stacked content |
| Homepage 1440 | [Desktop](evidence/home-1440.webp) | Skyline trial, review section immediately after hero, services and authentic process photos; footer license attribution |
| Water service 375 / 1440 | [Mobile](evidence/services-water-damage-restoration-375.webp), [desktop](evidence/services-water-damage-restoration-1440.webp) | Distinct restoration process, clear CTAs, photo gallery and FAQs; trust strip renders without delayed fading |
| Air duct service 375 / 1440 | [Mobile](evidence/services-air-duct-cleaning-375.webp), [desktop](evidence/services-air-duct-cleaning-1440.webp) | Service scope and concerns explained; company vehicle is not labeled as duct-cleaning equipment |
| Jacksonville hub 375 / 1440 | [Mobile](evidence/service-areas-jacksonville-375.webp), [desktop](evidence/service-areas-jacksonville-1440.webp) | Local context, service navigation and sources |
| Orange Park water 375 / 1440 | [Mobile](evidence/service-areas-orange-park-water-damage-restoration-375.webp), [desktop](evidence/service-areas-orange-park-water-damage-restoration-1440.webp) | Correct area/service pairing, real process photo without invented job location, regional guidance and related links |
| Campaign | [Desktop](evidence/ads-emergency.webp) | Original campaign route and confirmation flow preserved; unsupported fixed-response/financing promises softened |
| Original homepage | [Mobile baseline](evidence/baseline-home-375.webp), [desktop baseline](evidence/baseline-home-1440.webp) | Before-change comparison captures |

Gallery interactions were exercised at 375, 430, 768 and 1440 pixels. Dialog opens, Escape closes and keyboard focus is managed by Headless UI. The comparison is a labeled native range, tested with the right-arrow key; the low-resolution hallway images are constrained to their native width and described as preparation, never completed restoration. All referenced source and optimized image URLs were checked separately.

Remaining visual/source dependency: custom individual Google review cards support names, real source photos/initials and exact excerpts, but cannot be filled until those records are directly retrieved or provided through an authorized source. No fabricated testimonials are used to fill the layout. A current Google review count remains unknown.
