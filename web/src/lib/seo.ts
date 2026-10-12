import type { Metadata } from "next";

export const SITE_NAME = "Adjudix Dispute Resolution Institute";

// Per-page metadata: its own title and description (Search Console flags
// pages that share them as duplicates), a canonical URL so Google never
// splits a page across ?query variants, and matching social-share tags.
// The root layout's title template appends the site name to `title`.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: { card: "summary", title: `${title} | ${SITE_NAME}`, description },
  };
}
