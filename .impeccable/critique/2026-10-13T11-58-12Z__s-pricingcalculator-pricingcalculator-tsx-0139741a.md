---
target: Calculator section
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\Nika\\OneDrive\\Desktop\\Flevio\\src\\components\\PricingCalculator\\PricingCalculator.tsx"
target_fingerprint: "sha256:c02855c1d3b5cdc30b8a607a8a55477fb84640e2a0be748b3bee6f3c2f896282"
target_path: "C:\\Users\\Nika\\OneDrive\\Desktop\\Flevio\\src\\components\\PricingCalculator\\PricingCalculator.tsx"
timestamp: 2026-10-13T11-58-12Z
slug: s-pricingcalculator-pricingcalculator-tsx-0139741a
---
# Calculator section critique — before redesign

The original warm paper and cherry red palette fits Flevio, and the sequential calculation rules are clear. The six separate cards, duplicated headings, and detached result make the surface resemble a generic agency form rather than a custom estimating tool.

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Step count and result appear, but desktop progress is weak. |
| 2 | Match to the real world | 2 | Some professional terms are hard for a first-time buyer to judge. |
| 3 | User control and freedom | 2 | Earlier mobile answers take multiple Back taps to edit. |
| 4 | Consistency and standards | 3 | Selection behavior is consistent. |
| 5 | Error prevention | 3 | Gated choices prevent invalid sequences. |
| 6 | Recognition over recall | 2 | Mobile result lacks a visible answer review. |
| 7 | Flexibility and efficiency | 1 | Mobile requires linear traversal to revisit choices. |
| 8 | Aesthetic and minimalist design | 3 | Restrained palette works, but six matching boxes flatten hierarchy. |
| 9 | Error recovery | 2 | Earlier selections can be revised, but the path is long. |
| 10 | Help and documentation | 1 | Choice meaning and estimate basis receive little explanation. |
| **Total** | | **22/40** | **Acceptable, with material usability and authorship gaps.** |

## Design specificity

The calculator uses Flevio colors and typography but its six equal cards and plain result could be reused by almost any web agency. The result should feel physically connected to the choices that produce it.

## Working well

- The warm paper, ink, and red palette is coherent with Flevio.
- Sequential gating preserves dependencies and prevents invalid combinations.
- The mobile flow presents one decision at a time with large controls.

## Priority issues

1. **P1 — Fragmented composition.** Six isolated cards have equal visual weight and the result looks appended. Build one ruled estimate sheet with a reserved result area and one decisive reveal.
2. **P1 — Mobile recall and revision.** The result offers no answer summary. Add a compact review list with direct edit jumps while preserving the original step order and answers.
3. **P1 — Accessible selection.** Dropdown triggers are announced only by their placeholder and lack complete listbox keyboard navigation. Associate labels and implement arrow, Home, End, Escape, and Enter behavior.
4. **P2 — Weak estimate context.** The UI makes the number feel definitive without surfacing the already-present introductory qualification nearby. Keep the qualification legible and visually tie it to the estimate; avoid adding unverified claims or changing values.
5. **P2 — Mobile pacing.** Repeating the full introduction at every step pushes the active question down. Collapse the introduction after step one and keep the current step visible.

## Persona red flags

- A first-time buyer may hesitate at creative direction and SEO/GEO terms, though changing their exact wording is outside this task.
- An experienced buyer has to traverse many Back controls to revise the first answer on mobile.
- A keyboard or screen-reader user hears ambiguous dropdown names and cannot use familiar listbox navigation.

## Minor observations

The fixed site navigation can overlap the calculator title when a mobile step scrolls to the section. The CTA typography has one low-impact detector advisory against the Hero-only design ramp.

## Questions considered

How can the form and result read as one custom instrument? How can a visitor inspect and revise the inputs behind the estimate without changing the calculator's logic?

Questions skipped: The user already directed implementation of the critique findings.
