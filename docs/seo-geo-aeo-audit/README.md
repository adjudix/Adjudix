# SEO, GEO & AEO audit — release certificate

| | |
|---|---|
| Application | Adjudix Dispute Resolution Institute website (`web/`) |
| Environment audited | Production build run locally (`SITE_URL=https://adjudixadr.com`) and the live sites adjudixadr.com / adjudixadr.in |
| Date | 13 Oct 2026 |
| Stack | Next.js 16.3.5 App Router, React 19.2.8; all pages static (SSG) except `/contact` and `/apply/[form]` (server-rendered on request); Vercel |
| Routes | 93 indexable + 20 noindex form routes = 113 rendered, 113 audited by crawler (100%); 4 dynamic-route edge cases checked |
| Violations | 15 recorded: 2 High, 7 Medium, 5 Low, 1 informational |
| Fixed and verified | 10 (V-01, V-03–V-11); V-02 mitigated |
| Remaining | 0 Critical, 0 High; 1 Medium needing an owner decision (V-15); 2 Low accepted (V-12, V-13); 1 informational (V-14) |

Files: [route-inventory.md](route-inventory.md) · [violation-register.md](violation-register.md) · [unverified-checks.md](unverified-checks.md)

## Rounds

1. **Investigation.** Recon of routing, rendering, metadata, sitemap/robots, structured data, and images; crawler over sitemap + all internal links; live HTTP and crawler-access checks. Found the orphan pages and hidden navigation (V-01/02), no share images or rich structured data (V-03/04), heading and header gaps.
2. **Remediation.** Fixes listed in the register; new regression tests (`web/src/lib/seo.test.tsx`); re-crawl showed 0 High; Lighthouse surfaced image weight, the intro's effect on LCP, and the gold-text contrast (V-06–V-08).
3. **Adversarial re-inspection.** Rebuilt and re-crawled from scratch (inventory unchanged at 93 + 20), re-validated every earlier finding, tested malformed and unknown URLs, re-checked headers, sitemap, and canonicals, and re-ran Lighthouse. New finding V-10 (inaccurate sitemap dates) fixed.

## Results

- **Build / lint / types / tests:** `next build` OK; `eslint src` clean; `tsc --noEmit` clean; Vitest 27/27 pass (5 new SEO assertions: sitemap covers every page and excludes forms/API, every page exports metadata with a canonical, robots shape, `pageMetadata` canonical/OG, JSON-LD script escaping).
- **Sitemap / robots / canonical:** pass (see register, "Checked and passing").
- **Structured data:** Organization + WebSite (home), BreadcrumbList (96 pages), FAQPage (13), Article (10). JSON parses everywhere; FAQ and Article text verified against visible text by the crawler. Google Rich Results eligibility is UNVERIFIED (external tool).
- **Lighthouse, mobile lab, local build (final):** inner pages (arbitration, blog post, Fellow membership) performance 94–95, accessibility 100, best practices 100, SEO 100, LCP 3.0 s, CLS 0, TBT 50–70 ms; home performance 72, accessibility 99, SEO 100, LCP 5.8 s (intro). No field (CrUX) data available yet.
- **GEO:** entity name consistent ("Adjudix Dispute Resolution Institute", alternates "Adjudix", "ADR-i"); public pages server-rendered and open to all major search and AI crawlers; no fabricated authority found.
- **AEO:** 13 pages carry visible FAQs that match their FAQPage markup; mechanism pages state legal basis, process, and next step in plain language.
- **Geographic SEO:** N/A beyond India context — no address or phone published; no location pages; nothing invented.

4. **Owner decisions (follow-up).** Intro limited to the home page (V-07) and gold text made AA-compliant (V-08). Re-measured: inner pages performance 94–95, accessibility 100, best practices 100, SEO 100, LCP 3.0 s, CLS 0; home performance 72, accessibility 99, LCP 5.8 s (intro, by choice). Re-measuring found V-15.

## Verdict

**CONDITIONAL — EXPLICIT ACCEPTANCE REQUIRED**

No Critical or High violations remain, and V-07 and V-08 are resolved. One Medium item remains, again a design choice:

- **V-15** — page headers fade in only after JavaScript runs, which holds inner-page mobile LCP at 3.0 s (target ≤ 2.5 s). Accept it, or approve showing on-screen content immediately (animating only what's below the fold).
