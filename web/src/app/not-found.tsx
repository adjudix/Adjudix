import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LinkButton } from "@/components/ui/link-button";
import { getSiteSettings } from "@/lib/content/data";
import { buildSearchIndex } from "@/lib/search-index";

// Any address that matches no page — including every guess at the console's
// address — gets the same page, so nothing hints that the console exists.
export default async function NotFound() {
  const [settings, searchItems] = await Promise.all([getSiteSettings(), buildSearchIndex()]);
  return (
    <>
      <SiteHeader searchItems={searchItems} navGroups={settings.navGroups} secondaryLinks={settings.secondaryLinks} languages={settings.languages} />
      <main className="flex flex-1 flex-col items-center justify-center bg-canvas px-6 py-24 text-center">
        <p className="font-body text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">Page not found</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-balance text-foreground">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-md font-body text-muted-foreground">
          The link may be out of date, or the page may have moved.
        </p>
        <LinkButton href="/" className="mt-8">
          Back to the home page
        </LinkButton>
      </main>
      <SiteFooter groups={settings.footerGroups} copyright={settings.copyright} />
    </>
  );
}
