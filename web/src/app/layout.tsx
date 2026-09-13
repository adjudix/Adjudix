import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adjudix Dispute Resolution Institute",
  description:
    "Arbitration, mediation, conciliation, and online dispute resolution under one roof.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          data-gr-* attributes onto <body> before React hydrates, which is a
          known false-positive hydration mismatch, not an app bug. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
