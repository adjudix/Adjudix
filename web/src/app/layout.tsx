import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { buildSearchIndex } from "@/lib/search-index";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageLoader } from "@/components/layout/page-loader";
import { ConsultationPopup } from "@/components/layout/consultation-popup";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adjudix Dispute Resolution Institute",
  description:
    "Dispute resolution and assured implementation under one roof — arbitration, mediation, conciliation, Lok Adalat, emergency, hybrid, and corporate ADR.",
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
