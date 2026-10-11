---
name: Flevio
description: A precise live type atelier for custom, hand-coded digital work.
colors:
  cherry-red: "#CD0000"
  warm-white: "#EFEDE6"
  atelier-ink: "#151412"
typography:
  display:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "clamp(7rem, 19vw, 20rem)"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "clamp(4.4rem, 7.2vw, 7.15rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  headline-result:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 5.3vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.22vw, 1.3rem)"
    fontWeight: 500
    lineHeight: 1.42
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  annotation:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(0.67rem, 0.85vw, 0.82rem)"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0.08em"
  mobile-headline:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "clamp(2.55rem, 13vw, 5.7rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.045em"
  mobile-headline-result:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "clamp(2.15rem, 10.5vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  mobile-body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(0.9rem, 3.8vw, 1.08rem)"
    fontWeight: 500
    lineHeight: 1.42
  mobile-label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(0.72rem, 3vw, 0.82rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.06em"
rounded:
  pill: "999px"
spacing:
  desktop-edge: "5%"
  mobile-edge: "1.25rem"
  action-gap: "0.75rem"
  mobile-action-gap: "0.65rem"
  cta-block: "1rem"
  cta-inline: "1.8rem"
components:
  button-primary:
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.warm-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.8rem"
    height: "58px"
  button-primary-hover:
    backgroundColor: "{colors.atelier-ink}"
    textColor: "{colors.warm-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.8rem"
    height: "58px"
  button-secondary:
    backgroundColor: "rgba(239, 237, 230, 0.82)"
    textColor: "{colors.atelier-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.8rem"
    height: "58px"
  button-secondary-hover:
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.warm-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.8rem"
    height: "58px"
  button-primary-mobile:
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.warm-white}"
    typography: "{typography.mobile-label}"
    rounded: "{rounded.pill}"
    padding: "0.82rem 1rem"
    height: "50px"
  button-secondary-mobile:
    backgroundColor: "rgba(239, 237, 230, 0.86)"
    textColor: "{colors.atelier-ink}"
    typography: "{typography.mobile-label}"
    rounded: "{rounded.pill}"
    padding: "0.82rem 1rem"
    height: "50px"
---

# Design System: Flevio

## Overview

**Creative North Star: "Live Type Atelier"**

Flevio's hero is a warm-white technical proof surface where oversized type behaves like crafted material rather than a marketing ornament. Cherry-red light fields, sparse construction marks, and deliberate negative space make the experience premium, precise, confident, and experimental without obscuring the conversion path.

The system demonstrates the product promise: custom design and hand-coded development are visible in the interface itself. Its signature is a code-drawn selection frame that turns typography into evidence of craft; supporting copy and controls stay restrained so that the proof remains legible.

This is currently a scoped new world, not a completed site-wide rollout. It is authoritative for the complete hero: the approved desktop composition at 1024px and above and its responsive mobile adaptation through 1023px. All later incumbent sections retain their existing visual system until explicitly redesigned; do not silently retrofit them from this document.

**Key Characteristics:**

- Warm-white technical proof surface
- Cherry-red skewed light fields used with restraint
- Oversized editorial typography with strong negative space
- Sparse technical annotations and selection geometry
- Interaction as evidence of custom, hand-coded craft
- Responsive mobile composition with static, performant atmosphere
- English and Georgian layouts tuned independently where required
- Clear conversion hierarchy for international service businesses

## Colors

The palette is intentionally narrow: warm paper, readable near-black, and one decisive red signal.

### Primary

- **Cherry Red** (`#CD0000`): The signature light and interaction color for the hero, including CTA emphasis, selection geometry, focus color, and skewed light fields.

### Neutral

- **Warm White** (`#EFEDE6`): The hero's working surface and the text color used on filled controls.
- **Atelier Ink** (`#151412`): The readable near-black for monumental type, body copy, outlines, and technical annotation.

### Named Rules

**The Red-as-Evidence Rule.** Cherry Red marks authored interaction, decisive action, or directional light; it is not general-purpose decoration.

**The Transitional Scope Rule.** Apply this palette to the responsive hero only until another surface is explicitly redesigned into the same world.

## Typography

**Display Font:** Roboto (with Arial and sans-serif fallbacks)

**Body Font:** Inter (with Arial and sans-serif fallbacks)

**Label Font:** Inter (with Arial and sans-serif fallbacks)

**Character:** The pairing is direct and engineered: extremely large, tightly set grotesk display type carries the proposition, while a neutral body face keeps sales copy and controls calm. Uppercase labels and annotations read like production marks, not decorative captions.

### Hierarchy

- **Display** (700, `clamp(7rem, 19vw, 20rem)`, 0.8): The interactive hero word. It spans the viewport and is fitted per glyph by the canvas implementation.
- **Headline** (700, `clamp(4.4rem, 7.2vw, 7.15rem)`, 0.88): The desktop hero's supporting phrase above the interactive word.
- **Headline Result** (700, `clamp(3.5rem, 5.3vw, 5.25rem)`, 0.9): The conversion-oriented phrase aligned beneath the interactive word's right edge.
- **Body** (500, `clamp(1rem, 1.22vw, 1.3rem)`, 1.42): Concise conversion copy, constrained to approximately 35rem.
- **Label** (700, `0.88rem`, `0.08em`, uppercase): Primary and secondary CTA labels.
- **Annotation** (700, `clamp(0.67rem, 0.85vw, 0.82rem)`, `0.08em`, uppercase): Quiet capability notes and technical metadata.
- **Mobile Headline** (700, `clamp(2.55rem, 13vw, 5.7rem)`, 0.88): The opening phrase on phone and tablet layouts; Georgian receives a smaller language-specific scale.
- **Mobile Headline Result** (700, `clamp(2.15rem, 10.5vw, 4.6rem)`, 0.92): The right-aligned result phrase below the interactive word; Georgian uses a smaller size and looser line-height.
- **Mobile Body** (500, `clamp(0.9rem, 3.8vw, 1.08rem)`, 1.42): The compact value statement in the lower portion of the mobile viewport.
- **Mobile Label** (700, `clamp(0.72rem, 3vw, 0.82rem)`, `0.06em`, uppercase): The two mobile CTA labels.

### Named Rules

**The Type-Is-the-Proof Rule.** The largest type must demonstrate bespoke craft through scale, fit, or interaction; never reduce it to a generic centered headline treatment.

**The Wide-Statement Rule.** Keep primary display phrases broad and shallow. Do not force the headline into narrow, multi-line text blocks.

## Layout

The hero is a single-screen composition (`100vh` fallback followed by `100svh`) with hero-local clipping. On desktop, content sits against a 5% horizontal inset: the headline occupies the upper and middle field, conversion copy anchors the lower-left, and a restrained capability note balances the lower-right. The composition uses asymmetry and open space rather than a centered container.

Through 1023px, the atelier becomes a vertical mobile composition. The opening phrase starts near 14.5% of the viewport, the interactive word occupies a 27% high band beginning near 20%, the result phrase follows near 43.5%, and conversion content begins near 59.5%. Content respects 1.25rem safe-area-aware side insets. From 600px through 1023px, the layout opens to 5% side insets and rebalances copy and capability notes for tablet widths.

Short mobile viewports compress the headline and conversion positions; landscape viewports at 520px high or less split the headline to the left and conversion content to the right. The capability note hides when vertical space is insufficient. The desktop composition begins at 1024px and remains unchanged.

**The One-Viewport Rule.** The hero must fit inside one viewport at every supported width and must not create overflow below its boundary.

**The Responsive Atelier Rule.** Keep one visual world across the 1024px boundary while changing its composition: mobile is a deliberate vertical adaptation, and desktop retains its established asymmetric arrangement.

## Elevation & Depth

The hero is flat by default and uses no component box shadows. Depth comes from translucent radial light, skewed masked red fields, a fading dot grid, and tonal contrast on the proof surface. The mobile background is entirely static CSS, preserving atmosphere without an animated rendering cost. Buttons remain planar; their state change is carried by an expanding fill rather than lift. Existing header or incumbent-section shadows are outside this rollout and should not be generalized into the atelier world.

**The Light-Not-Shadow Rule.** Create atmosphere with directional color fields and tonal layering; do not add card shadows or floating glass panels to the hero.

## Shapes

The form language pairs monumental rectangular typography and square selection handles with fully pill-shaped controls (`999px`). Technical frames use one-pixel dashed red strokes and small square corner handles. A single thin vertical rule may organize an annotation; rounded containers should remain reserved for actionable controls.

**The Geometry Contrast Rule.** Use hard-edged construction geometry around type and soft pill geometry for controls so interaction and evidence remain visually distinct.

## Components

### Buttons

The shared button is tactile but restrained: a pill shell contains a pointer-origin radial fill while the label stays above the animation.

- **Shape:** Fully rounded pill (`999px`). Desktop uses a 58px minimum height and `1rem 1.8rem` padding; mobile uses a 50px minimum height and `0.82rem 1rem` padding, tightening further only on very narrow or short landscape viewports.
- **Primary:** Cherry Red surface with Warm White uppercase text; the active fill changes to Atelier Ink.
- **Secondary:** Translucent Warm White surface, Atelier Ink text, and a one-pixel translucent ink border; the active fill changes to Cherry Red with Warm White text.
- **Hover / Focus:** The fill expands from the pointer location on hover and from the center on keyboard focus over 0.5 seconds using `cubic-bezier(0.16, 1, 0.3, 1)`. Press scales to 0.97. Focus remains visibly outlined in Cherry Red.
- **Reduced Motion:** Remove transform effects and the animated fill; preserve contrast and focus visibility.
- **Mobile Pairing:** Keep Contact Us and View Our Work visible together in a two-button row, with the primary receiving slightly more width. In short landscape layouts, stack the same pair vertically.

### Live Type Selection

The interactive display word is rendered on a canvas while accessible text remains in the semantic heading. Pointer proximity identifies a glyph; the selected glyph receives a Cherry Red construction frame, square handles, technical labels, dashed letter treatment, and restrained specks. A displaced letter returns with spring stiffness 320 and damping 22.

On touch and coarse-pointer devices, `touch-action: pan-y` preserves vertical page scrolling while direct pointer contact can select and drag a glyph. Below 1024px, the autonomous sequence rests on each letter for 0.75 seconds, advances letter by letter to the end, then reverses back to the first. Desktop has no autonomous sequence and responds only to direct interaction. Reduced motion disables the sequence. The canvas is oversized to cover the viewport around its local word band, including 72px of extra padding; the hero's own `overflow: hidden` clips that overscan so interaction art can breathe without leaking into adjacent sections. Device pixel ratio is capped at 1.5 on coarse pointers and 2 elsewhere.

### Atelier Proof Surface

The background is static at every breakpoint. Desktop layers Warm White with low-opacity white and Cherry Red radial light, four diagonal masked red fields, and a 20px dot grid. Mobile uses a tailored CSS composition with two diagonal fields and an 18px dot grid so the same atmosphere remains legible and performant on a smaller viewport. The only autonomous motion is the mobile Live Type letter sequence; the background never animates.

### Capability Annotation

The capability note is uppercase Inter, left-aligned beside a thin Atelier Ink rule. It balances the lower-right on desktop and the bottom-right on mobile, and may disappear on short mobile viewports. Keep it quiet, compact, and factual; it supports the headline rather than competing with it.

## Do's and Don'ts

### Do:

- **Do** use Warm White as the dominant hero field and reserve Cherry Red for light, action, focus, and technical evidence.
- **Do** keep the oversized headline immediately readable before and during interaction.
- **Do** preserve the primary Contact Us action and the secondary View Our Work action as a clear conversion pair on mobile and desktop.
- **Do** use the established `cubic-bezier(0.16, 1, 0.3, 1)` hierarchy entrance and provide reduced-motion fallbacks.
- **Do** preserve English and Georgian layouts, including language-specific mobile headline sizing.
- **Do** keep mobile background atmosphere static and use the measured letter-by-letter TechText sequence only below 1024px.

### Don't:

- **Don't** turn the system into a generic centered agency template.
- **Don't** use Cherry Red as ambient decoration without an interaction, hierarchy, or directional-light purpose.
- **Don't** animate the mobile background or enable the automatic TechText sequence on desktop.
- **Don't** let the oversized TechText canvas escape the hero's local clipping boundary.
- **Don't** claim that incumbent sections below the hero already use the Live Type Atelier world.
- **Don't** fabricate testimonials, performance claims, or business results as visual proof.
