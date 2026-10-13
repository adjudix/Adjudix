// The public origin of the site, for absolute URLs (sitemap, robots,
// canonicals). Server-only — no NEXT_PUBLIC_ prefix, so it never ships to the
// browser. SITE_URL wins once a main domain is chosen; otherwise Vercel's
// production domain, which Vercel provides to every build automatically.
export const SITE_URL = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
