"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { findLocale, LOCALE_COOKIE, LOCALES, SOURCE_LOCALE, TOP_BAR_COUNT, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

// The language menu. English and the first four languages sit on the top
// bar, the rest under "More"; on phones all of them are in the menu sheet.
// Choosing one stores it (see proxy.ts) and reloads the page in it. Each
// language is named in its own language with English in brackets, and
// never translated.

const subscribe = () => () => {};
const currentLocale = () => document.documentElement.dataset.locale ?? SOURCE_LOCALE.code;

function choose(code: string) {
  document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
  // A ?lang= in the address would set the language back on reload.
  const url = new URL(window.location.href);
  url.searchParams.delete("lang");
  window.location.replace(url);
}

// The console's Site settings choose which languages are offered; the order
// and the names are fixed here, so the top bar is always French, German,
// Spanish and Arabic.
function useLocales(languages: { code: string; label: string }[]) {
  const active = useSyncExternalStore(subscribe, currentLocale, () => SOURCE_LOCALE.code);
  const offered = new Set(languages.map((language) => findLocale(language.code)?.code));
  return { active, locales: [SOURCE_LOCALE, ...LOCALES.filter((locale) => offered.has(locale.code))] };
}

// "Français (French)"; English is just "English".
function name(locale: Locale) {
  return locale.code === SOURCE_LOCALE.code ? locale.label : `${locale.label} (${locale.english})`;
}

function Option({ locale, active, stacked, className }: { locale: Locale; active: boolean; stacked?: boolean; className?: string }) {
  // On the top bar the English name goes on a second line, so the row fits
  // beside the centred logo.
  const label =
    stacked && locale.code !== SOURCE_LOCALE.code ? (
      <span className="flex flex-col items-center leading-tight">
        <span>{locale.label}</span>
        <span className="text-[0.625rem] font-normal opacity-75">({locale.english})</span>
      </span>
    ) : (
      name(locale)
    );
  return (
    <button
      type="button"
      lang={locale.code}
      dir={locale.dir}
      data-no-translate
      aria-current={active ? "true" : undefined}
      onClick={() => !active && choose(locale.code)}
      className={cn(
        "rounded-sm px-1.5 py-1 font-body transition-colors",
        active ? "font-semibold text-primary-ink" : "text-text-muted hover:text-text",
        className,
      )}
    >
      {label}
    </button>
  );
}

/** The top-bar menu (tablet and up). */
export function LanguageBar({ languages, className }: { languages: { code: string; label: string }[]; className?: string }) {
  const { active, locales } = useLocales(languages);
  const inline = locales.slice(0, TOP_BAR_COUNT + 1);
  const more = locales.slice(TOP_BAR_COUNT + 1);
  const details = useRef<HTMLDetailsElement>(null);
  const current = locales.find((locale) => locale.code === active) ?? SOURCE_LOCALE;
  const activeMore = more.find((locale) => locale.code === active);

  // Close the list on a click elsewhere or Escape.
  useEffect(() => {
    const close = (event: Event) => {
      const el = details.current;
      if (!el?.open) return;
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !el.contains(event.target as Node)) el.open = false;
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <nav aria-label="Language" className={cn("flex items-center gap-0.5 text-xs", className)}>
      <Languages className="mr-1 size-3.5 shrink-0 text-text-muted" aria-hidden="true" />
      {/* English and the top four inline only where there is room beside the logo. */}
      <div className="hidden items-center gap-0.5 xl:flex">
        {inline.map((locale) => (
          <Option key={locale.code} locale={locale} active={locale.code === active} stacked />
        ))}
      </div>
      {more.length > 0 && (
        <details ref={details} className="group relative">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center gap-1 rounded-sm px-1.5 py-1 font-body [&::-webkit-details-marker]:hidden",
              activeMore ? "font-semibold text-primary-ink" : "text-text-muted hover:text-text",
            )}
          >
            <span className="xl:hidden" data-no-translate lang={current.code}>
              {name(current)}
            </span>
            {activeMore ? (
              <span className="hidden xl:inline" data-no-translate lang={activeMore.code}>
                {name(activeMore)}
              </span>
            ) : (
              <span className="hidden xl:inline">More</span>
            )}
            <ChevronDown className="size-3 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="absolute end-0 top-full z-50 mt-1 flex min-w-48 flex-col whitespace-nowrap rounded-md border border-border bg-canvas p-1 shadow-lg">
            {/* Below xl the inline five are listed here too. */}
            {inline.map((locale) => (
              <Option key={locale.code} locale={locale} active={locale.code === active} className="px-3 py-1.5 text-start xl:hidden" />
            ))}
            <div className="my-1 border-t border-border xl:hidden" />
            {more.map((locale) => (
              <Option key={locale.code} locale={locale} active={locale.code === active} className="px-3 py-1.5 text-start" />
            ))}
          </div>
        </details>
      )}
    </nav>
  );
}

/** Every language as a grid, for the phone menu sheet. */
export function LanguageGrid({ languages, className }: { languages: { code: string; label: string }[]; className?: string }) {
  const { active, locales } = useLocales(languages);
  return (
    <div className={className}>
      <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-text-muted">
        <Languages className="size-3.5" aria-hidden="true" />
        Language
      </p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {locales.map((locale) => (
          <Option
            key={locale.code}
            locale={locale}
            active={locale.code === active}
            stacked
            className={cn("border px-2 py-2 text-center text-sm", locale.code === active ? "border-primary bg-primary/10" : "border-border")}
          />
        ))}
      </div>
    </div>
  );
}
