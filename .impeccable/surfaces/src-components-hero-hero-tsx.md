---
version: 2
slug: "src-components-hero-hero-tsx"
primary_target: "src/components/Hero/Hero.tsx"
related_targets: ["src/components/Hero/Hero.module.css", "src/components/Hero/TechText.tsx", "src/components/Hero/TechText.module.css"]
---

# Responsive hero adaptation

## Scope

Responsive web hero at every width. Visitor mode: Persuade. The approved Live Type Atelier now includes a deliberate mobile and tablet adaptation through `1023px`; the established desktop composition begins at `1024px` and remains unchanged. Preserve every header element and all sections below the hero.

## Audience, job, action, and proof

International service businesses evaluating whether Flevio can understand their industry and build a distinctive conversion-focused website. The primary action is Contact Us at `#contact`; View Our Work at `#projects` remains the secondary action on both mobile and desktop. Proof is the product mechanism itself: custom design, hand-coded development, business understanding, and the existing project work below the fold. No invented trust claims.

## Direction contract

THESIS: Treat the responsive hero as a live type atelier where the promise is demonstrated through oversized, manipulable headline craft; refuse the generic centered agency hero and the chaotic showreel-as-hero opposite.

OWN-WORLD: Warm White `#EFEDE6` is the working surface, Cherry Red `#CD0000` is the signature light and interaction color, and near-black carries text. Static skewed light fields, restrained dots, technical selection marks, and oversized custom typography form one precise system across phone, tablet, and desktop.

STORY: The visitor understands that Flevio studies the business, designs specifically for it, and hand-codes the result; they see technical craft in the headline interaction and move directly to Contact Us. English and Georgian receive the same story and actions with language-specific type sizing where needed.

DESKTOP FIRST VIEWPORT: Approved comp `.impeccable/mocks/hero-live-type-b.png`. The streak background fills exactly one desktop viewport without changing the header. “WE BUILD” sits above an enormous edge-to-edge “WEBSITES,” with “THAT CONVERT” aligned beneath its right side. A concise value statement and two animated actions occupy the lower-left; a quiet capability note balances the lower-right. The headline remains immediately legible before interaction.

MOBILE FIRST VIEWPORT: The same headline hierarchy becomes vertical inside one `100svh` viewport with a `100vh` fallback. The opening phrase occupies the upper field, TechText spans a dedicated central band, the result phrase aligns right below it, and the value statement plus both CTAs sit in the lower field. The capability note moves to the bottom-right and may hide when height is constrained. Tablet widths open the side insets; short landscape viewports split headline and conversion content into left and right zones.

FORM: Live Type Atelier, position 7 in the grounded direction list; Impeccable seed `76580b49`. Individual headline letters reveal construction frames and can be displaced with spring return. Below 1024px, an autonomous sequence moves from the first letter to the last and back again, resting 0.75 seconds on every letter. Desktop remains still until direct pointer interaction. Touch retains direct selection and dragging with `touch-action: pan-y`. Reduced motion disables the autonomous sequence and preserves stable, readable type at rest.

PERFORMANCE: The hero background is composed from static CSS gradients, masks, and dots with no ambient animation. TechText renders into a viewport-covering overscanned canvas with 72px extra padding; the hero's local clipping contains it. Coarse-pointer DPR is capped at 1.5 and other pointers at 2.

FINISH: Unreviewed and undocumented is unfinished; the responsive implementation, surface brief, DESIGN.md, and sidecar must agree before the hero is considered complete.

## Constraints

Keep “We build websites that convert.” Preserve English and Georgian. Keep Contact Us primary and View Our Work secondary at every breakpoint. Do not touch the header or later sections. The hero must fit within one screen (`100svh` with a `100vh` fallback), clip its oversized canvas locally, and not extend beyond its boundary. Preserve the desktop layout from `1024px` upward. On mobile, keep the background static, keep vertical page scrolling available, run the letter-by-letter TechText sequence only when reduced motion is not requested, and retain direct touch interaction.
