import type { Metadata } from "next";

export const SITE_NAME = "Adjudix Dispute Resolution Institute";

// Link-preview image (WhatsApp, LinkedIn, X, …) for every page.
export const SHARE_IMAGE = {
  url: "/images/og-default.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

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
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
