# Unverified checks and post-release follow-up

These need tools or data that weren't available from the codebase. None is marked as passing.

| Check | Why unverified | How to verify |
|---|---|---|
| Google indexing and coverage | Search Console data isn't accessible from here | Search Console → Sitemaps: `sitemap.xml` shows Success with 93 discovered. Pages report: expected exclusions are "Alternate page with proper canonical tag" (adjudixadr.in) and "Excluded by 'noindex' tag" (`/apply/*`) |
| Rich-result eligibility (Breadcrumb, FAQ, Article) | Google Rich Results Test is an external tool | Run https://search.google.com/test/rich-results on `/`, `/dispute-resolution/arbitration`, `/knowledge/blog/basics-of-arbitration` after deploy. FAQ rich results are restricted by Google to some site types, so FAQ markup may be valid yet not shown |
| Schema.org validation | External validator | https://validator.schema.org/ on the same three URLs |
| Field Core Web Vitals (CrUX, 75th percentile) | The site has no field data yet; PageSpeed Insights API quota was exhausted during the audit | PageSpeed Insights on adjudixadr.com after a few weeks of traffic; Search Console → Core Web Vitals |
| Bing indexing | No Bing Webmaster account access | Add the site in Bing Webmaster Tools (can import from Search Console) and submit the same sitemap |
| Live deployment of this audit's fixes | Checked on a local production build; live checks above were made before the push | After Vercel deploys: `curl https://adjudixadr.com/about` should show `og:image`, the BreadcrumbList script, and the new security headers |
| AI answer visibility / citations | Depends on external systems; not measurable from the site | Periodically ask ChatGPT search, Perplexity, Google AI Overviews questions like "emergency arbitration India institution" and note whether Adjudix is cited |
| Brand mentions and backlinks | Off-site | Search Console → Links |
