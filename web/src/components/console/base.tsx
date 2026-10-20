"use client";

import { createContext, useContext, type ComponentProps } from "react";
import Link from "next/link";

// The console's private base path (ADMIN_PATH), handed down from its layout
// so client components can build links without knowing the address.
const BaseContext = createContext("/");

export function ConsoleBaseProvider({ base, children }: { base: string; children: React.ReactNode }) {
  return <BaseContext.Provider value={base}>{children}</BaseContext.Provider>;
}

export function useConsoleHref() {
  const base = useContext(BaseContext);
  return (path = "") => `${base}${path && !path.startsWith("/") ? "/" : ""}${path}`;
}

/** A link to a console page, by its path inside the console ("/forms"). */
export function ConsoleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const toHref = useConsoleHref();
  return <Link href={toHref(href)} {...props} />;
}
