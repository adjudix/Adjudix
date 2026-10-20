import { LinkButton } from "@/components/ui/link-button";

// Inside the site's own layout, which already draws the header and footer.
// (app/not-found.tsx is the same page for addresses outside it.)
export default function SiteNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-canvas px-6 py-24 text-center">
      <p className="font-body text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">Page not found</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold text-balance text-foreground">We couldn&apos;t find that page.</h1>
      <p className="mt-4 max-w-md font-body text-muted-foreground">The link may be out of date, or the page may have moved.</p>
      <LinkButton href="/" className="mt-8">
        Back to the home page
      </LinkButton>
    </main>
  );
}
