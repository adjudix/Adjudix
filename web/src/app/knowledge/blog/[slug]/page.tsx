import type { Metadata } from "next";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { ARTICLES, getArticle, readingMinutes } from "@/lib/articles";
import { applyHref } from "@/lib/apply-forms";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/knowledge/blog/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const metadata = pageMetadata({ title: article.title, description: article.summary, path: `/knowledge/blog/${article.slug}` });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" } };
}

export default async function ArticlePage({ params }: PageProps<"/knowledge/blog/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const index = ARTICLES.indexOf(article);
  const next = ARTICLES[(index + 1) % ARTICLES.length];

  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow={`${article.category} · ${readingMinutes(article)} min read`}
        title={article.title}
        breadcrumbs={[
          { label: "Knowledge Centre", href: "/knowledge" },
          { label: "Blogs & Articles", href: "/knowledge/blog" },
          { label: article.category },
        ]}
        intro={article.summary}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          articleSection: article.category,
          url: `${SITE_URL}/knowledge/blog/${article.slug}`,
          mainEntityOfPage: `${SITE_URL}/knowledge/blog/${article.slug}`,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-mini.png` },
          },
          inLanguage: "en-IN",
        }}
      />
      <article className="mx-auto max-w-3xl px-6 py-16">
        {article.sections.map((section, i) => (
          <section key={section.heading ?? i} className="mt-10 first:mt-0">
            {section.heading && (
              <h2 className="font-heading text-xl font-semibold text-text">{section.heading}</h2>
            )}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 font-body leading-relaxed text-text-muted">
                {paragraph}
              </p>
            ))}
            {section.points && (
              <ul className="mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-text-muted">
                {section.points.map((point) => (
                  <li key={point.slice(0, 40)}>{point}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <p className="mt-12 border-t border-border pt-6 font-body text-xs text-text-muted">
          This article is general information, not legal advice. For advice on a specific
          dispute, book a consultation with our professional panel.
        </p>

        <Link
          href={`/knowledge/blog/${next.slug}`}
          className="mt-8 block rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/50"
        >
          <span className="font-mono text-xs tracking-widest uppercase text-primary">Next article</span>
          <span className="mt-2 block font-heading text-lg font-semibold text-text">{next.title}</span>
        </Link>
      </article>

      <CtaBand
        title="Talk to us about your dispute"
        description="Your first professional consultation is free."
        primary={{ label: "Book a Consultation", href: applyHref("consultation") }}
        secondary={{ label: "All articles", href: "/knowledge/blog" }}
      />
    </main>
  );
}
