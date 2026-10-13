import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { buildSearchIndex } from "@/lib/search-index";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageLoader } from "@/components/layout/page-loader";
import { ConsultationPopup } from "@/components/layout/consultation-popup";
import { SHARE_IMAGE, SITE_NAME } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const DESCRIPTION =
  "Dispute resolution and assured implementation under one roof — arbitration, mediation, conciliation, Lok Adalat, emergency, hybrid, and corporate ADR.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  // No canonical here: pages would inherit it and all point at the home page.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: DESCRIPTION, images: [SHARE_IMAGE.url] },
  // Search Console ownership: set GOOGLE_SITE_VERIFICATION in Vercel to the
  // content="…" value of the HTML-tag method (not needed for DNS verification).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    /* the "light" class forces light mode regardless of OS preference while
       we're actively building — theme.css's dark media query is guarded
       with :not(.light) specifically for this. Remove once a real
       theme-switcher (next-themes) is wired up and dark mode should follow
       user/OS choice instead of being hardcoded. */
    <html lang="en" className="h-full antialiased light">
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          data-gr-* attributes onto <body> before React hydrates, which is a
          known false-positive hydration mismatch, not an app bug. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Without JavaScript the intro can't be dismissed and the scroll-reveal
            never fires: skip the one and show everything for the other. */}
        <noscript>
          <style>
            {"[data-intro]{display:none!important}html{overflow:auto!important}[data-reveal]{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
        <PageLoader />
        <SiteHeader searchItems={buildSearchIndex()} />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <ConsultationPopup />
        {/* Apply / enrol / request forms, opened over the current page. */}
        {modal}
      </body>
    </html>
  );
}
