---
version: 3
slug: "src-components-services-services-tsx"
primary_target: "src/components/Services/Services.tsx"
related_targets: ["src/components/Services/ServicesVideo.tsx", "src/components/Services/services.module.css", "src/components/ui/cursor.tsx", "src/i18n/dictionaries.ts"]
---

# Services horizontal timeline

## Scope

The bilingual Services section on the home page. This is a Services-only horizontal journey, not a site-wide visual-system change. Preserve the header, hero, Projects, Contact, other breakpoints, root `PRODUCT.md`, hero-scoped `DESIGN.md`, and `.impeccable/design.json` outside their existing scopes.

## Shipped contract

**PURPOSE:** Help prospective English- and Georgian-speaking clients understand Website Development, Landing Pages, and SEO Optimization, then start a project. Preserve every localized heading, CTA, description, detail, feature, and the localized strategy/design/development period label from `src/i18n/dictionaries.ts`. Do not invent claims, metrics, testimonials, or services.

**OPENING:** Lead with the local `/videos/flevio-showreel.mp4`, preloaded as metadata, inline, and entirely user-controlled between the fixed display lines “Built Around” and “Your Business.” It does not autoplay or loop. The reel starts with audio enabled (`isMuted` is initially `false`), preserves the mute state the visitor selects, and reapplies that state when playback starts. Do not restore the former project image, image alt text, or caption.

**VIDEO CURSOR AND PLAYBACK:** Preserve the supplied replacement exactly within the video click region: an absolute, full-inset, pointer-events-none `CursorProvider` from `src/components/ui/cursor.tsx`; a `Cursor` containing the supplied 40-by-40 Cherry Red pointer SVG rendered at 24px; and a default bottom-right `CursorFollow` containing the compact rounded Cherry Red label with Warm White text and shadow. The follower's `Play` and `Pause` labels crossfade and slide from the actual playback state. On fine-pointer hover, hide the native cursor throughout `videoClickArea` while the supplied cursor implementation tracks parent-relative coordinates, animates the pointer directly, and spring-follows the label. Keep this overlay decorative and non-interactive; the full video remains the real button.

**VIDEO CONTROLS AND STATE:** Clicking the video button plays or pauses it. While paused or ended, a Warm White circular play indicator with a Cherry Red `Play` icon stays exactly centered over the frame; its anchor remains a static grid with `line-height: 0` so the circle and triangle boxes are precisely centered, while its child handles the entrance and exit motion. It exits on play and returns on pause or end. Replaying an ended reel first resets `currentTime` to zero. Keep state synchronized from media events rather than optimistic click assumptions: `play` sets playing, `pause` and `ended` clear it, and `volumechange` reads the media element's actual muted value. A failed `play()` promise also leaves the interface paused. The localized play/pause accessible name must follow the synchronized playback state.

**SOUND CONTROL:** Keep the 44px circular sound toggle independently anchored at the video's bottom-right, outside the cursor-tracked, cursor-hidden, and click-to-play region so operating sound never toggles playback. Its `Volume2` and `VolumeX` icons crossfade, scale, and rotate between states. The control directly toggles the media element's `muted` property and exposes the localized mute/unmute accessible name that matches the synchronized state. Preserve its visible hover, press, and keyboard-focus treatment.

**DESKTOP AND TABLET:** Keep a viewport-height sticky frame and scrub the oversized track horizontally with GSAP ScrollTrigger. The showreel composition leads into the Services heading and period label, followed by three milestones on one Cherry Red axis. Positions remain deliberate and alternate top / bottom / top. A top milestone grows its branch upward from the axis into content above; a bottom milestone grows downward into content below. Content order is never mirrored: title, description, details, features, then the shared animated Flevio Button. Every CTA points to `#contact`, retains the localized label and upper-right arrow, and keyboard focus scrolls the corresponding milestone into view.

**MOTION AND TIMING:** The track and axis draw are scroll-linked. Milestone reveal order is stem and dot, title and description lines, then details, features, and CTA. SplitText groups title and description by lines only; there are no line masks. Keep title overflow visible and preserve its small block padding so ascenders, descenders, and Georgian glyphs are not clipped. Desktop/tablet reveal starts are 28%, 52%, and 62% of the section; mobile starts are 30%, 51%, and 64%; each scrubs across the next 18%. Preserve scoped cleanup for SplitText instances, timelines, ScrollTriggers, media contexts, and resize listeners.

**VISUAL WORLD:** Keep the section local to Warm White `#EFEDE6`, Cherry Red `#CD0000`, near-black `#151412`, and restrained muted ink. Cherry Red owns the axis, branches, dots, checks, selection, and focus emphasis. Keep typography direct and high-contrast, with no gradients, floating cards, or unrelated motifs.

**FALLBACKS:** Standard phones retain the horizontal journey. The supplied custom cursor is mouse-driven and therefore does not appear for touch-only interaction; tapping the full-frame video button uses the same play/pause behavior, the centered play indicator supplies the visible paused affordance, and the independent 44px sound toggle remains available without triggering playback. The video button keeps `touch-action: manipulation`. `prefers-reduced-motion: reduce` and compact phones matching `(max-width: 699px) and (max-height: 700px)` become a static vertical flow: no sticky pinning, horizontal transform, hidden entrances, axis, or branches. The showreel, opening copy, heading, period, all service content, and working CTAs remain in reading order. Reduced motion also collapses Services-local animation and transition durations, including the play-indicator transition.

**ACCESSIBILITY:** Content remains structurally complete without animation. The inline showreel is a real keyboard-operable button with a localized, state-dependent play/pause name and no autoplay. Sound is a separate keyboard-operable button with a localized, state-dependent mute/unmute name and at least a 44px target. The centered play icon and volume icons are hidden from assistive technology; primary semantics remain on their buttons. Decorative axis, branches, dots, checks, and arrows remain hidden from assistive technology where appropriate. Focus remains visible.

## Constraints

Keep all behavior, styling, motion, localization support, cursor integration, responsive fallbacks, and cleanup contained to the Services surface and its listed dependencies. The shared supplied cursor implementation may be consumed here, but do not activate, restyle, or roll these video cursor and media-control decisions out elsewhere. Do not alter the header, hero, Projects, Contact, global visual system, unrelated breakpoints, or any other section.
