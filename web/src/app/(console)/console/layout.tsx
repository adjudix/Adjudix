import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConsoleBaseProvider } from "@/components/console/base";
import { consoleBase } from "@/lib/console/paths";

// The admin console. Reached only through the proxy's rewrite from
// /<ADMIN_PATH>; never linked, listed, or indexed.

export const metadata: Metadata = {
  title: { default: "Console", template: "%s · Adjudix Console" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

// Every console page depends on who is signed in.
export const dynamic = "force-dynamic";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  // A build without ADMIN_PATH has no console at all.
  if (consoleBase() === "/") notFound();
  return (
    <ConsoleBaseProvider base={consoleBase()}>
      <div className="flex min-h-dvh flex-1 flex-col bg-surface font-body text-foreground">{children}</div>
    </ConsoleBaseProvider>
  );
}
