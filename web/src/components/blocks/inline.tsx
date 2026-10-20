import type { ReactNode } from "react";
import Link from "next/link";

// The little formatting page text may carry: **bold** and [label](/link).
// Anything else is shown as typed. Links go only to site paths, the web,
// email or phone — never javascript: or data: URLs.

const SAFE = /^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i;
const TOKEN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function Inline({ text, linkClassName = "font-medium text-primary-ink hover:underline" }: { text: string; linkClassName?: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const at = match.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    if (match[1] !== undefined) {
      parts.push(<strong key={at} className="font-semibold text-text">{match[1]}</strong>);
    } else {
      const [, , label, href] = match;
      if (!SAFE.test(href)) parts.push(label);
      else if (href.startsWith("/") || href.startsWith("#")) {
        parts.push(<Link key={at} href={href} className={linkClassName}>{label}</Link>);
      } else {
        parts.push(<a key={at} href={href} className={linkClassName} rel="noreferrer" target={href.startsWith("http") ? "_blank" : undefined}>{label}</a>);
      }
    }
    last = at + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
