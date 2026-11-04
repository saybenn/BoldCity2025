# Bold City UI patterns

Established brand retained November 1, 2026. This records the edited components for maintenance; it does not authorize a sitewide redesign.

| Component | Surface and text | Border / radius / shadow | Spacing and interaction |
| --- | --- | --- | --- |
| Home hero | bg-navy, white text, controlled navy gradient; next/image skyline trial | Rounded-md primary and secondary CTAs; aqua primary with navy text | Compact mobile padding; min-h-12 CTAs; visible white keyboard outlines; financing is a smaller text link |
| Google reviews | White section, darkText/navy text, initials on navy circles | Wide rectangular panels, rounded-2xl subtle borders/shadow; 420–500px desktop width with identity and stars sharing the header | Passive two-row desktop flow; single native mobile swipe band. No card links, dialogs, visible controls, scrollbar or scroll indicators. Soft edge mask. Hover/focus/touch pauses; keyboard arrows browse, Escape holds pause and Space permits resuming after blur. Reduced motion disables movement. One semantic copy per review; exact excerpts and understated section-level Google attribution. |
| Photo-free service process | Existing navy/foreground section, aqua step labels, white descriptions | Restrained numbered steps | Two-column step grid on larger screens when no photograph is supplied; one column on mobile. Single-photo galleries remain supported. |
| Project proof | lightGray section, darkText titles, white cards | Rounded-2xl images/cards and modest shadows | Lazy responsive images; labeled native comparison range; Headless UI dialog handles focus/Escape |
| Service cards | LightGray section, navy cards, lightText headings | rounded-2xl, border-slate-200, shadow-md | p-6, readable leading-7 body; aqua link text on navy |
| Collection indexes | White, darkText body, navy links | rounded-2xl border-gray-200 | p-6 cards, gap-5, clear focus/hover border |

Typography uses the existing Inter and Poppins next/font variables via Tailwind font-sans/font-heading. Colors remain the existing navy (#0C2340), aqua (#1BC9D0), green (#27AE60), lightGray and darkText tokens. White text on aqua is avoided for the new homepage primary button. Existing unrelated per-template style variations are not globally rewritten.
