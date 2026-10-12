// The public origin of the site, for absolute URLs (sitemap, robots).
// NEXT_PUBLIC_SITE_URL wins once a custom domain is set; otherwise Vercel's
// production domain, which Vercel provides to every build automatically.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
