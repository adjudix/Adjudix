import { readdirSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { CODE_EDITIONS } from "@/lib/code-editions";
import { SITE_URL } from "@/lib/site-url";

// Every static page under src/app, found by walking the folders at build time
// so new pages land in the sitemap without anyone remembering to add them.
// Skipped: route groups/slots (@modal), dynamic segments (listed below from
// their data), the API, and the /apply forms (they open over other pages).
const SKIP = new Set(["api", "apply"]);

function staticRoutes(dir: string, route = ""): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const routes = entries.some((entry) => entry.name === "page.tsx") ? [route] : [];
  for (const entry of entries) {
    if (!entry.isDirectory() || SKIP.has(entry.name) || /^[@[_]/.test(entry.name)) continue;
    routes.push(...staticRoutes(path.join(dir, entry.name), `${route}/${entry.name}`));
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes(path.join(process.cwd(), "src/app")),
    ...CODE_EDITIONS.map((edition) => `/dispute-resolution/rules/code-of-procedure/${edition.year}`),
    ...ARTICLES.map((article) => `/knowledge/blog/${article.slug}`),
  ];
  // No lastModified: stamping every page with the build date would be
  // inaccurate, and Google stops trusting a sitemap's dates once it notices.
  return routes.sort().map((route) => ({
    url: `${SITE_URL}${route}`,
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
