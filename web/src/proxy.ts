import { NextResponse, type NextRequest } from "next/server";

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

  return NextResponse.next();
}

export const config = {
  // Everything but static files and image optimisation.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|mp4|pdf|glb|woff2?)$).*)"],
};
