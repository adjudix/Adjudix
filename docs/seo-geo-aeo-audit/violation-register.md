# Violation register

Audit of 13 Oct 2026. Earlier the same day (before this audit) the site gained its
sitemap, robots.txt, per-page titles/descriptions/canonicals, and noindex on the
`/apply` forms; those are counted as the starting state, not as findings here.

Evidence comes from three crawls of the production build (`next build` + `next start`,
`SITE_URL=https://adjudixadr.com`), live HTTP checks against adjudixadr.com /
adjudixadr.in, and Lighthouse 12 (mobile, lab) on the local build.

| ID | Sev. | Round found | Route / scope | Finding | Root cause | Fix | Verified by | Status |
|---|---|---|---|---|---|---|---|---|
| V-01 | HIGH | 1 | `/about/annual-reports`, `/dispute-resolution/domestic`, `/dispute-resolution/international`, `/odr/security`, `/training/faculty` | Orphan pages: in the sitemap, but no link to them exists in any server-rendered HTML | Their only links were inside the header dropdowns and mobile menu, which render only when opened (client-side portals), so crawlers never see them | Contextual links on the parent pages: `/about` (governance paragraph), `/dispute-resolution` (domestic / international / online / in-person sentence), `/odr` ("Security & Enforceability" was plain text; now a link), `/training` (faculty sentence) | Round 2 + 3 crawl: 0 orphans | FIXED |
| V-02 | HIGH | 1 | Header navigation, all pages | Dropdown and mobile-menu links are absent from the initial HTML | Base UI NavigationMenu / Sheet portals render on open only | Mitigated by V-01 (every page is now linked from page bodies); the menus themselves are unchanged to keep the design | Crawl from sitemap + links reaches all 93 indexable routes | MITIGATED |
| V-03 | MEDIUM | 1 | 93 pages | No link-preview image (`og:image`, `twitter:image`) | None configured | 1200×630 brand image `public/images/og-default.png`, set in `pageMetadata()` and the root layout; Twitter card `summary_large_image` | Round 3 crawl: every page has og:image | FIXED |
| V-04 | MEDIUM | 1 | Site-wide | No breadcrumb, FAQ, or article structured data | Not implemented | `JsonLd` helper (escapes `<`); `BreadcrumbList` from `PageHeader` breadcrumbs (96 pages); `FAQPage` from `FaqAccordion` (13 pages, built from the same items that render); `Article` on the 10 blog posts; Organization gains its published mailboxes | Crawl asserts every FAQ question/answer and Article headline is visible text, breadcrumb items are on-origin; JSON parses on all pages; unit test for `</script>` escaping | FIXED |
| V-05 | MEDIUM | 2 | All pages, no-JS clients | With JavaScript off, the intro overlay never dismisses (page blocked) and scroll-reveal content stays at opacity 0 | Both depend on client JS | `<noscript>` style hides `[data-intro]`, restores scrolling, shows `[data-reveal]` | Code review; content was already present in HTML | FIXED |
| V-06 | MEDIUM | 2 | All pages | Header/footer/menu logos downloaded at 640–3840 px for 16–64 px display; intro rest frame at 3840 px; intro poster an 850 KB PNG | `next/image` intrinsic sizes set to source resolution; PNG poster | Intrinsic sizes set to display size; `sizes` on the intro rest frame; poster now `logo-full.webp` (176 KB) | Lighthouse: home 2,086 → 1,299 KB, arbitration 1,816 → 1,030 KB | FIXED |
| V-07 | MEDIUM | 2 | All pages | Main content painted late — mobile LCP 9.8 s (home) / 8.0 s (arbitration); now 5.8 s / 4.0 s | ~7.6 s "render delay": the full-screen logo intro covers every page on a fresh load until the visitor scrolls | Owner chose "home page only": `PageLoader` renders the intro only when the visit starts on `/`, and otherwise signals intro-done at once (the consultation pop-up timer still starts) | Lighthouse: inner pages LCP 8.0 → 3.0 s, performance 88 → 95; home unchanged at 5.8 s by owner choice; `/about` HTML has no intro element | FIXED (home: ACCEPTED by owner) |
| V-08 | MEDIUM | 2 | Most pages | Gold eyebrow text (`text-primary`, #EEB32B) on white is 1.75:1 contrast (WCAG AA needs 4.5:1) | Brand gold used for small text on light backgrounds | Owner approved a fix: new `--color-gold-800` (#8A6312, 5.4:1 on white, 5.0:1 on the light surface) exposed as `text-primary-ink`; all 101 gold-text uses switched to it; `.bg-hero` / `.text-text-on-hero` sections reset it to the bright gold, and gold fills/borders are unchanged | Lighthouse colour-contrast passes on `/`, arbitration, blog, membership; accessibility 99–100 | FIXED |
| V-09 | LOW | 1 | Site-wide | Missing `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` | Not configured | Added in `next.config.ts` `headers()` | Round 3 response headers | FIXED |
| V-10 | LOW | 3 | `sitemap.xml` | Every URL stamped with the build time as `lastmod` | `new Date()` in sitemap | Removed — inaccurate dates make Google ignore lastmod | Round 3 sitemap output | FIXED |
| V-11 | LOW | 1 | Footer, all pages | Footer column titles were `h3` with no `h2` above on many pages | Heading levels chosen for size | Footer titles are `h2` (same styling) | Heading skips 28 → 6 | FIXED |
| V-12 | LOW | 1 | `/`, `/dispute-resolution/clause-drafting`, both handbooks, `/odr/ad-hoc`, `/odr/help` | Heading skips `h1 → h3` (step lists / FAQ triggers directly under the page heading) | Shared list components use `h3` | Accepted — cosmetic; no content or crawl impact | Round 3 crawl | ACCEPTED (LOW) |
| V-13 | LOW | 1 | `/dispute-resolution/rules/code-of-procedure` and `/…/2026` | Same `h1` ("The Adjudix Code of ADR Procedure, 2026") | Overview and full text of the current edition share a heading | Accepted — titles, descriptions, and canonicals differ | Round 3 crawl | ACCEPTED (LOW) |
| V-15 | MEDIUM | 4 | Inner pages | Mobile LCP 3.0 s (target ≤ 2.5 s); LCP element is a heading whose ~2.5 s is render delay | Above-the-fold content sits inside `Reveal`, server-rendered at opacity 0 and faded in only after JS hydrates and the observer fires | Not changed — would drop the on-load fade-in of page headers. Option: content already on screen at load renders visible; only below-the-fold content animates | Lighthouse lab | **NEEDS OWNER DECISION** |
| V-14 | INFO | 1 | adjudixadr.in | Serves a full copy of the site | Two domains on one deployment | Canonicals, sitemap, and robots on .in all point to adjudixadr.com (verified live). A 301 from .in → .com would be stronger | Live HTTP | OWNER CHOICE |

## Checked and passing (no violation)

- robots.txt: allows all, blocks only `/api/`, points to the .com sitemap (live, both domains).
- Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, CCBot, Applebot: all get HTTP 200 on live (no WAF/bot blocking).
- `http://` → `https://`, `www.` → apex, trailing slash → none, `/dispute-resolution/panels/*` → practice areas: all single 308 hops (live).
- Query-string variants (`?utm_source=…`) canonicalise to the clean URL (live).
- Unknown URLs, unknown blog slugs, Code years, form names, and extra path segments return 404; the 404 page is `noindex`.
- No duplicate titles or descriptions across the 93 indexable pages; every one has a self-referencing canonical on adjudixadr.com, `lang`, and viewport.
- Every sitemap URL returns 200 with no redirect; every indexable page is in the sitemap; no noindex page is in it.
- FAQ answers are present in the server HTML (the accordion keeps closed panels in the DOM).
- No fabricated statistics, ratings, reviews, awards, or credentials found in page copy (searched for counts, percentages, superlatives, "guarantee"). The "more than 170 New York Convention states" figure is accurate (172 contracting states).
- Geographic SEO: no physical address or phone number is published, so no LocalBusiness markup or location pages were created; Organization carries only the published mailboxes.
