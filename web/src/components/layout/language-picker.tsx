"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

// Read the site in another language (client markup, Oct 2026: "French,
// German…"). Opens the current page through Google's translation proxy
// (<host-with-dashes>.translate.goog), which needs no script on our pages and
// keeps the English site as the one source of truth. Only works on the public
// domain; the proxy cannot reach localhost.

function translatedUrl(code: string) {
  const { hostname, pathname, search, hash } = window.location;
  // translate.goog's host scheme: "-" becomes "--", then "." becomes "-".
  const proxyHost = `${hostname.replace(/-/g, "--").replace(/\./g, "-")}.translate.goog`;
  const query = new URLSearchParams(search);
  query.set("_x_tr_sl", "en");
  query.set("_x_tr_tl", code);
  query.set("_x_tr_hl", "en");
  return `https://${proxyHost}${pathname}?${query}${hash}`;
}

export function LanguagePicker({ className, languages }: { className?: string; languages: { code: string; label: string }[] }) {
  return (
    <label className={cn("inline-flex items-center gap-1.5 text-text-muted hover:text-text", className)}>
      <Languages className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">Read this page in another language</span>
      <select
        defaultValue=""
        onChange={(event) => {
          const code = event.target.value;
          event.target.value = "";
          if (code) window.location.href = translatedUrl(code);
        }}
        className="field-sizing-content max-w-24 cursor-pointer appearance-none truncate bg-transparent pr-1 font-body text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <option value="">English</option>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
