import { NextResponse, type NextRequest } from "next/server";
import { findLocale, LOCALE_COOKIE, localeForCountry } from "@/lib/i18n/locales";

// The admin console lives in app/(console)/console, but is only reachable at
// the private address in ADMIN_PATH (e.g. "adx-7f3k2q"). Visiting /console
// directly, or anything else, gets the ordinary 404. With ADMIN_PATH unset
// the console is switched off entirely.

const INTERNAL = "/console";
// Rewritten here to a path that matches no page, so the site's 404 renders.
const NOT_FOUND = "/__not-found";

function adminPath() {
  const value = process.env.ADMIN_PATH?.trim().replace(/^\/+|\/+$/g, "");
  return value && /^[A-Za-z0-9_-]{6,64}$/.test(value) ? `/${value}` : null;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === INTERNAL || pathname.startsWith(`${INTERNAL}/`)) {
    return NextResponse.rewrite(new URL(NOT_FOUND, request.url));
  }

  const base = adminPath();
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    const target = new URL(`${INTERNAL}${pathname.slice(base.length)}${search}`, request.url);
    const response = NextResponse.rewrite(target);
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  }

  return withLocale(request, NextResponse.next());
}

// The visitor's language (see lib/i18n/locales.ts). A ?lang=fr link sets it;
// otherwise, on the first visit, it follows the country Vercel reports, with
// India and unlisted countries in English. Once set — automatically or from
// the language menu — it is kept for a year and never re-guessed.
const YEAR = 60 * 60 * 24 * 365;

function withLocale(request: NextRequest, response: NextResponse) {
  const chosen = findLocale(request.nextUrl.searchParams.get("lang"));
  const code = chosen?.code ?? (request.cookies.has(LOCALE_COOKIE) ? null : localeForCountry(request.headers.get("x-vercel-ip-country")));
  if (code) response.cookies.set(LOCALE_COOKIE, code, { path: "/", maxAge: YEAR, sameSite: "lax" });
  return response;
}

export const config = {
  // Everything but static files and image optimisation.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|mp4|pdf|glb|woff2?)$).*)"],
};
