// The public origin of the site, for absolute URLs (sitemap, robots,
// canonicals). Server-only — no NEXT_PUBLIC_ prefix, so it never ships to the
// browser. SITE_URL wins once a main domain is chosen; otherwise Vercel's
// production domain, which Vercel provides to every build automatically.
// Trimmed, because a value pasted into Vercel can carry a stray space, which
// would otherwise land inside every sitemap <loc>.
export const SITE_URL = (
  process.env.SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).trim().replace(/\/$/, "");
