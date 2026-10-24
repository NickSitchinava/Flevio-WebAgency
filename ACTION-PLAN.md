# Flevio SEO action plan — 17 October 2026

| Priority | Action | Status |
| --- | --- | --- |
| Critical | Publish the corrected origin across canonical, hreflang, robots, sitemap, Open Graph, and JSON-LD; verify the deployed 12 URLs | Implemented and verified locally; owner will publish |
| High | After publication, submit `https://flevio.vercel.app/sitemap.xml` in Search Console and inspect English and Georgian canonicals/indexing | Owner action; no Search Console credentials configured here |
| Medium | Add verified process, deliverable, and project evidence to the short service pages | Concise service-specific metadata and fuller schema description added; confirmed GEO offering added; further facts were not supplied |
| Medium | Measure mobile and desktop loading and interaction | Lighthouse lab complete: mobile 60 / LCP 6.7 s / CLS 0; desktop 96 / LCP 1.3 s / CLS 0. INP field data still requires real traffic or Search Console access |
| Low | Add safe security headers without disrupting media or scripts | Completed locally; browser and response-header checks passed |

Completed locally: page-specific legal metadata; a social preview image using the existing Flevio logo; removal of inaccurate sitemap `lastmod` dates; safe security headers; a Footer media-query implementation that preserves the magnetic hover behavior while passing lint. The established layouts, assets, loader, links, calculator, and interactions were preserved. Improving mobile LCP by shortening the measured loader sequence would change its intentional timing, so no such change was made.
