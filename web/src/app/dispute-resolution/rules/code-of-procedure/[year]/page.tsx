import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CODE_EDITIONS } from "@/lib/code-editions";
import { chapterId, getCodeText, partId, sectionId, type CodeSection } from "@/lib/code";
import { CodeToc, type TocPart } from "@/components/patterns/code-toc";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The rule book, readable in full on the site: one page per edition, built
// from the same source as the PDFs (scripts/adjudix-code).

export function generateStaticParams() {
  return CODE_EDITIONS.map((edition) => ({ year: edition.year }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/dispute-resolution/rules/code-of-procedure/[year]">): Promise<Metadata> {
  const { year } = await params;
  const code = getCodeText(year);
  return code ? { title: code.title, description: code.note } : {};
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];

// "Section 14" inside the text links to that section of this edition;
// references to sections of the Act ("Section 9 of the Act", "Section 17(2)")
// are left as plain text.
function withSectionLinks(text: string, valid: Set<string>): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /Section (\d+[A-Z]?)(?![\w(])(?! of )/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (!valid.has(match[1])) continue;
    out.push(text.slice(last, match.index));
    out.push(
      <a key={match.index} href={`#${sectionId(match[1])}`} className="font-medium text-primary underline-offset-2 hover:underline">
        {match[0]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  out.push(text.slice(last));
  return out;
}

function NewBadge({ year }: { year: number }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-ember/10 px-2 py-0.5 font-mono text-[0.65rem] font-semibold tracking-wide text-ember uppercase">
      New in {year}
    </span>
  );
}

function Section({ section, year, valid }: { section: CodeSection; year: number; valid: Set<string> }) {
  const id = sectionId(section.no);
  const isNew = section.since === year && year !== 2018;
  return (
    <section id={id} className="group scroll-mt-[calc(var(--site-header-h,0px)+4.5rem)] py-7 lg:scroll-mt-[calc(var(--site-header-h,0px)+1.5rem)]">
      <div className="grid gap-x-6 sm:grid-cols-[4.5rem_1fr]">
        <a
          href={`#${id}`}
          className="font-mono text-sm font-semibold text-primary hover:underline sm:pt-0.5 sm:text-right"
          aria-label={`Link to Section ${section.no}`}
        >
          §&nbsp;{section.no}
        </a>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h4 className="font-heading text-lg font-semibold text-foreground">{section.title}</h4>
            {isNew && <NewBadge year={year} />}
          </div>

          {section.definitions ? (
            <>
              <p className="mt-3 text-left font-body text-[0.95rem] leading-relaxed text-foreground/85">
                In this Code, unless the context otherwise requires —
              </p>
              <dl className="mt-4 divide-y divide-border rounded-lg border border-border bg-surface">
                {section.definitions.map((definition) => (
                  <div key={definition.term} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                    <dt className="font-heading text-sm font-semibold text-foreground">“{definition.term}”</dt>
                    <dd className="text-left font-body text-sm leading-relaxed text-muted-foreground">{definition.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-left font-body text-sm text-muted-foreground">
                Words and expressions used but not defined in this Code have the meanings assigned to them in the Act.
              </p>
            </>
          ) : section.body && section.body.length === 1 ? (
            <p className="mt-3 text-left font-body text-[0.95rem] leading-relaxed text-foreground/85">
              {withSectionLinks(section.body[0], valid)}
            </p>
          ) : (
            <ol className="mt-3 flex flex-col gap-3">
              {section.body?.map((clause, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-1">
                  <span className="pt-px font-mono text-sm text-muted-foreground">({i + 1})</span>
                  <p className="text-left font-body text-[0.95rem] leading-relaxed text-foreground/85">
                    {withSectionLinks(clause, valid)}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

export default async function CodeReaderPage({ params }: PageProps<"/dispute-resolution/rules/code-of-procedure/[year]">) {
  const { year } = await params;
  const code = getCodeText(year);
  const edition = CODE_EDITIONS.find((e) => e.year === year);
  if (!code || !edition) notFound();

  const previous = CODE_EDITIONS[CODE_EDITIONS.indexOf(edition) - 1];
  const allSections = code.parts.flatMap((part) => part.chapters.flatMap((chapter) => chapter.sections));
  const valid = new Set(allSections.map((section) => section.no));
  const newCount = allSections.filter((section) => section.since === code.year).length;

  const toc: TocPart[] = code.parts.map((part) => ({
    id: partId(part.no),
    label: `Part ${part.no}`,
    title: part.title,
    chapters: part.chapters.map((chapter) => {
      const first = chapter.sections[0]?.no;
      const last = chapter.sections.at(-1)?.no;
      return {
        id: chapterId(chapter.no),
        no: chapter.no,
        title: chapter.title,
        sections: first === last ? `Section ${first}` : `Sections ${first}–${last}`,
        isNew: chapter.since === code.year && code.year !== 2018,
      };
    }),
  }));

  const stats = [
    { label: "Parts", value: code.parts.length },
    { label: "Chapters", value: code.parts.reduce((n, part) => n + part.chapters.length, 0) },
    { label: "Sections", value: allSections.length },
    { label: "Moral Principles", value: code.principles.length },
  ];

  return (
    <main className="bg-canvas flex-1">
      {/* Title page */}
      <section className="bg-hero px-6 pt-10 pb-14 text-text-on-hero md:pt-14 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 font-body text-xs text-text-on-hero-muted">
            <Link href="/" className="hover:text-text-on-hero">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/dispute-resolution/rules" className="hover:text-text-on-hero">Rules &amp; Governance</Link>
            <span aria-hidden="true">/</span>
            <Link href="/dispute-resolution/rules/code-of-procedure" className="hover:text-text-on-hero">The Rule Book</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-on-hero">{year} Edition</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                The Adjudix Rule Book &middot; {edition.edition}
              </span>
              <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-balance md:text-5xl">
                The Adjudix Code of ADR Procedure, {year}
              </h1>
              <p className="mt-5 max-w-2xl text-left font-body text-lg text-text-on-hero-muted">{edition.summary}</p>
              {previous && (
                <p className="mt-3 max-w-2xl text-left font-body text-sm text-text-on-hero-muted">
                  Builds on the {previous.year} edition &mdash; {newCount} new sections, each marked{" "}
                  <span className="rounded-full bg-ember/20 px-1.5 font-mono text-[0.65rem] font-semibold text-text-on-hero uppercase">
                    New in {year}
                  </span>{" "}
                  below.
                </p>
              )}
            </div>

            {/* Edition switcher */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[0.7rem] tracking-widest text-text-on-hero-muted uppercase">Edition</span>
              <div role="list" className="inline-flex self-start rounded-lg border border-border-on-hero p-1">
                {CODE_EDITIONS.map((e) => (
                  <Link
                    key={e.year}
                    role="listitem"
                    href={`/dispute-resolution/rules/code-of-procedure/${e.year}`}
                    aria-current={e.year === year ? "page" : undefined}
                    className={cn(
                      "rounded-md px-4 py-2 text-center font-heading text-lg font-semibold transition-colors",
                      e.year === year
                        ? "bg-primary text-primary-foreground"
                        : "text-text-on-hero-muted hover:bg-white/5 hover:text-text-on-hero",
                    )}
                  >
                    {e.year}
                    {e.current && <span className="block font-mono text-[0.55rem] tracking-widest uppercase opacity-80">Current</span>}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-border-on-hero pt-6 sm:flex-row sm:items-center sm:justify-between">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[0.65rem] tracking-widest text-text-on-hero-muted uppercase">{stat.label}</dt>
                  <dd className="font-heading text-2xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <a href={edition.pdf} download className={cn(buttonVariants({ variant: "primary", size: "lg" }), "self-start sm:self-auto")}>
              Download PDF &middot; {edition.pages} pages
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 lg:grid lg:grid-cols-[17rem_1fr] lg:gap-12 lg:py-14">
        <aside className="contents lg:block">
          <CodeToc year={code.year} parts={toc} />
        </aside>

        <article className="min-w-0 pb-20">
          {/* Preamble */}
          <section
            id="preamble"
            className="mt-8 scroll-mt-[calc(var(--site-header-h,0px)+4.5rem)] lg:mt-0 lg:scroll-mt-[calc(var(--site-header-h,0px)+1.5rem)]"
          >
            <div className="rounded-xl border border-border bg-surface p-6 md:p-10">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">Preamble</span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground md:text-3xl">Moral Principles</h2>
              <p className="mt-2 text-left font-body text-sm text-muted-foreground">
                The Adjudix code of conduct. It opens the rule book and binds every neutral acting under it.{" "}
                <Link href="/about/moral-code" className="font-medium text-primary hover:underline">
                  About the Moral Code
                </Link>
              </p>

              <div className="mt-6 flex flex-col gap-4 border-l-2 border-primary/60 pl-5">
                {code.intro.map((paragraph, i) => (
                  <p key={i} className="text-left font-heading text-[1.02rem] leading-relaxed text-foreground/85 italic">
                    {paragraph}
                  </p>
                ))}
              </div>

              <ol className="mt-8 grid gap-4 md:grid-cols-2">
                {code.principles.map((principle, i) => (
                  <li key={principle.title} className="rounded-lg border border-border bg-canvas p-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-2xl font-semibold text-primary">{ROMAN[i]}</span>
                      <h3 className="font-heading text-base font-semibold text-foreground">{principle.title}</h3>
                    </div>
                    <p className="mt-2 text-left font-body text-sm leading-relaxed text-muted-foreground hyphens-none">{principle.body}</p>
                  </li>
                ))}
              </ol>

              <blockquote className="mt-8 rounded-lg bg-hero p-6 text-left font-heading text-[0.98rem] leading-relaxed text-text-on-hero italic">
                {code.close}
              </blockquote>
            </div>
          </section>

          {/* Parts, chapters, sections */}
          {code.parts.map((part) => (
            <section key={part.no} id={partId(part.no)} className="mt-16 scroll-mt-[calc(var(--site-header-h,0px)+4.5rem)] lg:scroll-mt-[calc(var(--site-header-h,0px)+1.5rem)]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">Part {part.no}</span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground md:text-3xl">{part.title}</h2>

              {part.chapters.map((chapter) => (
                <div
                  key={chapter.no}
                  id={chapterId(chapter.no)}
                  className="mt-10 scroll-mt-[calc(var(--site-header-h,0px)+4.5rem)] lg:scroll-mt-[calc(var(--site-header-h,0px)+1.5rem)]"
                >
                  <div className="flex flex-wrap items-center gap-3 rounded-lg bg-surface px-5 py-4">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      <span className="mr-2 font-mono text-sm font-semibold text-primary">Chapter {chapter.no}</span>
                      {chapter.title}
                    </h3>
                    {chapter.since === code.year && code.year !== 2018 && <NewBadge year={code.year} />}
                  </div>
                  <div className="divide-y divide-border">
                    {chapter.sections.map((section) => (
                      <Section key={section.no} section={section} year={code.year} valid={valid} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}

          {/* End of the Code */}
          <div className="mt-16 rounded-xl border border-border bg-surface p-6 text-center md:p-10">
            <p className="text-center font-heading text-lg text-foreground italic">&mdash; End of {code.title} &mdash;</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={edition.pdf} download className={buttonVariants({ variant: "primary" })}>
                Download the {year} PDF
              </a>
              {CODE_EDITIONS.filter((e) => e.year !== year).map((e) => (
                <Link key={e.year} href={`/dispute-resolution/rules/code-of-procedure/${e.year}`} className={buttonVariants({ variant: "secondary" })}>
                  Read the {e.year} edition
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
