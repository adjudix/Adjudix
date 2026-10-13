import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import { JsonLd } from "@/components/seo/json-ld";

const APP = path.join(process.cwd(), "src/app");

function pageFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return pageFiles(full);
    return name === "page.tsx" ? [full] : [];
  });
}

describe("search engine setup", () => {
  const urls = sitemap().map((entry) => entry.url.slice(SITE_URL.length) || "/");

  it("lists every static page in the sitemap, and no forms or API routes", () => {
    for (const file of pageFiles(APP)) {
      const route = "/" + path.relative(APP, path.dirname(file)).split(path.sep).join("/");
      if (/[@[]/.test(route) || route.startsWith("/apply")) continue;
      expect(urls).toContain(route === "/." ? "/" : route);
    }
    expect(urls.some((url) => url.startsWith("/apply") || url.startsWith("/api"))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("gives every indexable page its own title, description, and canonical", () => {
    for (const file of pageFiles(APP)) {
      const source = readFileSync(file, "utf8");
      if (file.includes("@modal") || file.includes(`${path.sep}apply${path.sep}`)) continue;
      expect({ file, ok: /export const metadata|export async function generateMetadata/.test(source) }).toEqual({ file, ok: true });
      expect({ file, ok: /pageMetadata\(|canonical/.test(source) }).toEqual({ file, ok: true });
    }
  });

  it("points robots.txt at the sitemap without blocking pages", () => {
    const rules = robots();
    expect(rules.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(rules.rules).toMatchObject({ userAgent: "*", allow: "/", disallow: "/api/" });
  });

  it("builds page metadata with a self canonical and matching share tags", () => {
    const metadata = pageMetadata({ title: "Mediation", description: "About mediation.", path: "/dispute-resolution/mediation" });
    expect(metadata.alternates?.canonical).toBe("/dispute-resolution/mediation");
    expect(metadata.openGraph).toMatchObject({ url: "/dispute-resolution/mediation", description: "About mediation." });
  });

  it("escapes structured data so it can't close its script tag", () => {
    const html = renderToStaticMarkup(<JsonLd data={{ name: "</script><script>alert(1)</script>" }} />);
    expect(html).not.toContain("</script><script>");
    expect(JSON.parse(html.replace(/^<script[^>]*>|<\/script>$/g, ""))).toEqual({
      name: "</script><script>alert(1)</script>",
    });
  });
});
