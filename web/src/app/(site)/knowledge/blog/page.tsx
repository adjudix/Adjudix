import { editableMetadata, editablePage } from "@/lib/pages/editable";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { readingMinutes } from "@/lib/articles";
import { getArticles } from "@/lib/content/data";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Blogs & Articles",
  description:
    "Plain-language explainers on ADR mechanisms, procedure, and practice — from the basics of arbitration to how awards are implemented worldwide.",
  path: "/knowledge/blog",
});

async function BlogPage() {
  const ARTICLES = await getArticles();
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="Blogs & Articles"
        breadcrumbs={[{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Blogs & Articles" }]}
        intro="Plain-language explainers on ADR mechanisms, procedure, and practice — from the basics of arbitration to how awards are implemented worldwide."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/knowledge/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/50"
              >
                <span className="font-mono text-xs tracking-widest uppercase text-primary-ink">{article.category}</span>
                <h2 className="mt-3 font-heading text-lg leading-snug font-semibold text-text group-hover:text-primary-ink">
                  {article.title}
                </h2>
                <p className="mt-2 mb-4 text-left font-body text-sm text-text-muted">{article.summary}</p>
                <span className="mt-auto font-body text-xs text-text-muted">{readingMinutes(article)} min read</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Get notified when we publish"
        primary={{ label: "Subscribe", href: applyHref("subscribe") }}
        secondary={{ label: "Research & Publications", href: "/knowledge/research" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/knowledge/blog", metadata);
export default editablePage("/knowledge/blog", BlogPage, metadata);
