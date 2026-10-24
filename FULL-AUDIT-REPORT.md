# Flevio SEO audit — 17 October 2026

Target: `https://flevio.vercel.app/en` and its English/Georgian service and legal routes. This report separates the deployed baseline from the locally built corrections; deployment has not been performed.

## Executive summary

**Business type:** web design and development agency based in Tbilisi, serving local and international clients. **Scope:** all 12 sitemap URLs, homepage content in both languages, service and legal templates, structured data, images, and responsive rendering.

**Primary finding:** the deployed site serves 12 valid pages on `flevio.vercel.app`, but its canonical, hreflang, Open Graph, sitemap, robots, and structured-data URLs point to `nicksitchinava.dev`. That hostname did not resolve during this audit. Search engines may therefore treat the live pages as copies of unavailable canonical pages. The local implementation now consistently uses the verified live origin. The new production build has not been deployed.

**Provisional health score: 70/100 after local fixes.** This is an editorial audit estimate, not a Google score. Category estimates are technical 82, content 55, on-page 76, schema 82, performance 60, AI readiness 55, images 85. The performance component uses the local Lighthouse mobile lab score, not real-user data. Do not compare this estimate with Search Console or field data.

## Findings and disposition

| Priority | Finding | Evidence | Disposition |
| --- | --- | --- | --- |
| Critical | Canonicals, language alternates, schema, sitemap, and robots target an unresolved hostname | All 12 deployed sitemap entries use `nicksitchinava.dev`; DNS lookup failed; all matching `flevio.vercel.app` paths returned 200 | Fixed locally with one `SITE_URL` source; redeploy required |
| Medium | Every sitemap `lastmod` was the build date, regardless of content changes | `src/app/sitemap.ts` used `new Date()` for every route | Removed unverified timestamps locally |
| Medium | Legal pages inherited homepage description and social URL | Deployed `/en/legal/privacy` metadata described the agency homepage | Added page-specific descriptions and social metadata locally |
| Medium | No Open Graph image was declared | Deployed English and Georgian page metadata | Added the existing Flevio logo asset as the social image locally |
| Medium | Service detail pages have limited topical depth | English service pages contain roughly 213–224 extracted words, including shared navigation/footer | Concise service-specific metadata now uses existing facts; fuller detail is in JSON-LD, and the confirmed GEO offering was added to SEO copy. Substantive expansion still requires verified process or project evidence |
| Low | Two H1 elements exist in raw homepage HTML | Separate desktop and mobile hero compositions; CSS exposes one at a time | Preserved intentional responsive composition |
| Low | Some security response headers are absent | Deployed response has HTTPS and HSTS; CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy were not observed | Added scoped CSP, frame, MIME, and referrer headers locally; verified with browser console and HTTP responses |

## Technical, on-page, and schema

- The site is statically rendered. Important content, metadata, and JSON-LD are present in initial HTML; JavaScript is not required to discover the page text.
- `robots.txt` allows crawling. The generated sitemap has 12 URLs: two homepages, six service pages, and four legal pages. All corresponding live paths returned 200. The local sitemap is valid XML with 12 URLs on the corrected origin.
- English and Georgian pages have self-referencing canonicals and reciprocal language alternates after the local correction. The legal pages also now declare `x-default`.
- The homepage emits `ProfessionalService` and service-list structured data; detail pages emit `Service`. The emitted JSON-LD parsed successfully. Existing business descriptions, founder, and location were retained.
- The English homepage has approximately 1,198 extracted words; Georgian has approximately 1,035. The service detail pages are brief. The current site has named project examples, founder identification, contact channels, privacy policy, and terms. External authority or outcomes cannot be verified from this audit, so none were invented.

## Images and performance

- The live English homepage contains 88 `<img>` nodes. All have an `alt` attribute. Most empty alternatives belong to decorative loader assets or repeated slices inside an aria-hidden project gallery; the remaining five are descriptive.
- The seven runtime loader WebP files total approximately 232 KB and have explicit 512 × 512 dimensions. Both homepage videos use `preload="none"`. Project gallery media has lazy/deferred behavior and explicit CSS sizing. No image or video was removed.
- Lighthouse 12 local production lab results for `/en`: **mobile performance 60, SEO 100, LCP 6.7 s, TBT 360 ms, CLS 0; desktop performance 96, SEO 100, LCP 1.3 s, TBT 40 ms, CLS 0**. A separate unthrottled browser run measured approximately 6.3–6.8 s LCP and CLS below 0.001; results vary by test conditions. Lighthouse identifies a loader image as the mobile LCP element, with render delay dominating its timing. The existing full-screen loader remains intact. A Playfair preload experiment reduced preload count but did not improve Lighthouse, so it was reverted. INP requires field data and remains unavailable; TBT is only a lab proxy. Public PageSpeed Insights returned HTTP 429/quota zero.

## Responsive and behavior verification

The local production build returned 200 at widths 1440, 1024, 768, 390, and 320 px. Every tested width retained the six homepage sections, 32 links, two video elements, and zero document-level horizontal overflow. Desktop and mobile screenshots after the existing loader completed showed the established hero compositions. All 12 sitemap routes returned 200 with matching canonicals. Representative English/Georgian home, service, and legal routes returned the expected language, Open Graph URL, image, and descriptions. The new response headers were present, and the desktop/mobile browser checks reported no page or console errors. This was a smoke check, not an exhaustive interaction test of the calculator, animation timelines, or external contact services.

## Evidence limits and next measurements

The corrected origin is the currently reachable public deployment named in the brief. The owner will publish the code; no deployment was made during this audit. If Flevio later activates a different primary domain, change the shared `SITE_URL` and redeploy so every signal continues to agree. Search Console indexing, rankings, backlinks, real-user CWV, and AI citations were not available; those outcomes cannot be inferred from HTML inspection. Recheck deployed output after publishing the code. The mobile lab LCP target cannot be met by network optimization alone while the current loader timing is preserved; the measured delay is primarily the intentional rendering sequence.
