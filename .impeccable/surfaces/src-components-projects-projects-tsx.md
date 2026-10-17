---
version: 1
slug: "src-components-projects-projects-tsx"
primary_target: "src/components/Projects/Projects.tsx"
related_targets: ["src/components/Projects/projects.module.css","src/components/Projects/WorksWheel.tsx","src/components/Projects/WorksWheel.module.css","src/components/Projects/ProjectImageTrail.tsx","src/components/Projects/ProjectImageTrail.module.css","src/components/ui/video-morphing-dialog.tsx","src/components/ui/video-morphing-dialog.module.css","src/i18n/dictionaries.ts"]
---

# Projects work gallery

## Scope

The bilingual Projects section on the home page. Visitor mode: Experience. This is a Projects-only extension of the established Live Type Atelier world, not a global redesign. Preserve the header, Hero, About, Services, Pricing, Contact, root `PRODUCT.md`, root `DESIGN.md`, `.impeccable/design.json`, and every unrelated breakpoint and interaction.

## Audience, job, action, and proof

Prospective international and Georgian service-business clients are deciding whether Flevio can produce distinctive, business-specific digital work. The section must let them explore real projects, understand the range of websites, portfolios, dashboards, event pages, and private work, and open a public project when available. Proof comes from the supplied local project imagery, live destinations, factual metadata, and the original Flevio showreel. Preserve English and Georgian copy from `src/i18n/dictionaries.ts`; do not invent client claims, results, testimonials, or performance metrics.

## Direction contract

THESIS: Make project browsing feel like moving through an editorial work archive: a wheel-led desktop gallery opens into supporting motion and a composed project collection. Refuse both the generic uniform card grid and a decorative 3D spectacle that obscures the work.

OWN-WORLD: Warm White `#EFEDE6` is the continuous Projects field, near-black `#151412` carries type and rules, and Cherry Red `#CD0000` marks focus, active indices, actions, and selection. The wheel is integrated into the paper surface rather than isolated on a dark panel. Oversized grotesk headings, thin rules, square image crops, circular utility marks, and restrained uppercase metadata carry the atelier into an editorial portfolio surface.

STORY: Visitors first encounter every available project image as visual evidence, then read a compact statement of Flevio's custom, conversion-focused web practice, view the original showreel, and explore the selected project cards. Public entries invite direct exploration; private work stays clearly locked and non-clickable.

FIRST VIEWPORT: A broad editorial heading and concise scope copy introduce a continuous Warm White gallery field. Desktop enters a tall native-scroll sequence whose full-viewport sticky stage centers the transforming work wheel, names the active project at left, and keeps the numbered image index at right. Compact and touch layouts remove the sticky scene and present the same images in a normal document-flow grid with metadata below each image.

FORM: Ordinary scoped surface extension, shaped directly from the user's pinned direction; position not ranked and seed key `not-run (brief-pinned local extension)`. The memorable interaction is the desktop gallery transforming from ring to bowed wheel as native page-scroll progress moves through separate hero and detail images.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Shipped interaction and responsive contract

- **Desktop gallery:** At `900px` and above with a fine pointer, keep the wheel as a Warm White, page-integrated gallery. A tall scroll section supplies progress to a full-viewport sticky stage through a passive window scroll listener; do not attach a wheel listener or call `preventDefault` for wheel input. Native page scrolling morphs the ring into the bowed wheel and advances through the image sequence. Arrow keys and numbered index controls navigate by scrolling the page to the corresponding progress point. The stage remains keyboard focusable with visible Cherry Red focus treatment. Reduced motion removes scroll interpolation and smooth programmatic scrolling without removing content.
- **Touch and compact gallery:** Below `900px`, or for coarse/no-hover pointers, remove sticky positioning, 3D transforms, and wheel controls. Render the images as a normal responsive grid in document flow: two columns where compact width allows and one vertical column on phones. Preserve image, title, category, public-link/private-lock state, and comfortable spacing without horizontal rails, scroll snapping, custom dragging, or hover dependency.
- **Project art:** Flatten each project's media into gallery items: `heroSrc` is one complete item and every available `detailSrc` is a separate complete item, carrying the same project title, category, destination, and private state. Do not composite detail imagery inside a hero card. Keep public items as new-tab links with safe rel attributes; private items remain non-links with explicit private labels.
- **Supporting showreel:** Keep the Projects reel on the original `/videos/showreel.mp4`, distinct from the Services reel. The muted inline preview may loop only while the section is active and closed; activation opens the existing accessible morphing dialog with native video controls and a reduced-motion transition fallback.
- **Editorial project cards:** Keep the localized selected-project heading, compact explanatory copy, factual region/duration metadata, and public/private action state. Use the twelve-column desktop grid asymmetrically: alternating seven/five-column cards and a centered wider card rhythm. Collapse to a normal single-column card list on phones. Each public card remains a new-tab link; private cards remain clearly labelled non-links.
- **Card-owned pooled trails:** Every asymmetric project card owns its own `ProjectImageTrail`, bound to that project's `previewSrc` and the card element as its coordinate container. Reuse the fixed five-slot pool and imperative image swapping so pointer movement does not trigger React renders. Spawn only for fine hover pointers, keep the trail decorative and pointer-transparent, and disable it for coarse pointers and reduced motion.
- **Compact copy:** Preserve the concise bilingual practice statement, service attribution, wheel hint, and project-index introduction from `src/i18n/dictionaries.ts`. Keep wording factual and search-readable around custom web design, web development, strategy, conversion focus, speed, and business growth; do not expand it into keyword repetition or unsupported claims.

## Constraints

Keep all gallery geometry, native-scroll progress, motion, content visibility, video activation, card-owned image-trail behavior, localization, focus states, and responsive fallbacks contained to Projects and its listed dependencies. Maintain section-local clipping and rendering containment without clipping focus or content. Preserve the supplied local optimized imagery and lazy-loading intent. Do not intercept desktop wheel input, restore pointer dragging or a mobile horizontal rail, composite hero/detail media, retrofit this composition into other sections, change the global visual system, substitute the Services showreel, turn private work into a link, or remove complete content when motion is unavailable.

## Unresolved decisions

None. The direction, assets, interaction split, localization, and surface boundary are fixed by the supplied contract and current implementation.
