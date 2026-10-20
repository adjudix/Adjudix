import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHeader } from "@/components/layout/page-header";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { CompetitionPage } from "@/components/patterns/competition-page";
import { CoursePage } from "@/components/patterns/course-page";
import { MechanismPage } from "@/components/patterns/mechanism-page";
import { MemberCard } from "@/components/patterns/member-card";
import { MembershipTierPage } from "@/components/patterns/membership-tier-page";
import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { CardGrid } from "@/components/ui/card-grid";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LinkButton } from "@/components/ui/link-button";
import { NumberedList } from "@/components/ui/numbered-list";
import { Inline } from "@/components/blocks/inline";
import { AudienceFinder } from "@/components/layout/audience-finder";
import { CodeExplainer } from "@/components/patterns/code-explainer";
import { PortalAccess } from "@/components/patterns/portal-access";
import { FeeCalculator } from "@/app/(site)/dispute-resolution/fees/fee-calculator";
import type { Block } from "@/lib/blocks/types";
import { getArticles, getCodeEditions, getCompetitions, getFeeSchedule, getMembers, getSiteSettings, getStudentCourses, getTrainingTracks } from "@/lib/content/data";
import { getForm } from "@/lib/forms";
import { membershipCodes } from "@/lib/members";
import { renderCodeSection } from "@/lib/pages/code-pages";
import { formatRupees } from "@/lib/training-tracks";
import { cn } from "@/lib/utils";

// Draws a page's blocks with the site's own components, so a page built in
// the console looks exactly like one built in code.

type P = Record<string, unknown>;
const str = (value: unknown) => (typeof value === "string" ? value : "");
const strings = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && v.trim() !== "") : []);
const list = <T,>(value: unknown) => (Array.isArray(value) ? (value as T[]) : []);
const linkOf = (value: unknown) => {
  const v = (value ?? {}) as { label?: string; href?: string };
  return v.label && v.href ? { label: v.label, href: v.href } : undefined;
};

export interface RenderContext {
  /** The page being shown, for its original sections. */
  path: string;
  /** What the route received, for original sections that read params. */
  routeProps: Record<string, unknown>;
}

function Band({ background, width = "wide", children, className }: { background?: unknown; width?: "narrow" | "wide" | "full"; children: ReactNode; className?: string }) {
  const tone = background === "surface" ? "bg-surface" : background === "hero" ? "bg-hero text-text-on-hero" : "";
  const inner = width === "narrow" ? "max-w-4xl" : width === "full" ? "max-w-7xl" : "max-w-5xl";
  return (
    <section className={cn("px-6 py-14 md:py-16", tone, className)}>
      <div className={cn("mx-auto", inner)}>{children}</div>
    </section>
  );
}

function Heading({ eyebrow, title, intro, dark }: { eyebrow?: string; title?: string; intro?: string; dark?: boolean }) {
  if (!eyebrow && !title && !intro) return null;
  return (
    <div className="mb-8">
      {eyebrow && <p className={cn("mb-2 font-body text-xs font-semibold tracking-[0.14em] uppercase", dark ? "text-primary" : "text-primary-ink")}>{eyebrow}</p>}
      {title && <h2 className={cn("font-heading text-2xl font-semibold text-balance md:text-3xl", dark ? "text-text-on-hero" : "text-text")}>{title}</h2>}
      {intro && <p className={cn("mt-3 max-w-2xl font-body", dark ? "text-text-on-hero-muted" : "text-text-muted")}><Inline text={intro} /></p>}
    </div>
  );
}

async function renderBlock(block: Block, context: RenderContext): Promise<ReactNode> {
  const p: P = block.props ?? {};
  const dark = p.background === "hero";
  switch (block.type) {
    case "pageHeader": {
      const image = str(p.image);
      return (
        <PageHeader
          eyebrow={str(p.eyebrow) || undefined}
          title={str(p.title)}
          intro={str(p.intro) || undefined}
          breadcrumbs={list<{ label: string; href?: string }>(p.breadcrumbs).filter((c) => c.label).map((c) => ({ label: c.label, href: c.href || undefined }))}
          image={image ? { src: image, alt: str(p.imageAlt) } : undefined}
        />
      );
    }
    case "text":
      return (
        <Band background={p.background} width={p.width === "wide" ? "wide" : "narrow"}>
          {str(p.eyebrow) && <p className={cn("mb-2 font-body text-xs font-semibold tracking-[0.14em] uppercase", dark ? "text-primary" : "text-primary-ink")}>{str(p.eyebrow)}</p>}
          {str(p.heading) && <h2 className={cn("font-heading text-2xl font-semibold text-balance", dark ? "text-text-on-hero" : "text-text")}>{str(p.heading)}</h2>}
          {strings(p.paragraphs).map((paragraph, i) => (
            <p key={i} className={cn("mt-4 font-body leading-relaxed", dark ? "text-text-on-hero-muted" : "text-text-muted")}>
              <Inline text={paragraph} />
            </p>
          ))}
          {strings(p.points).length > 0 && (
            <ul className={cn("mt-5 flex list-disc flex-col gap-2 pl-5 font-body marker:text-primary", dark ? "text-text-on-hero-muted" : "text-text-muted")}>
              {strings(p.points).map((point, i) => (
                <li key={i}>
                  <Inline text={point} />
                </li>
              ))}
            </ul>
          )}
        </Band>
      );
    case "tiles": {
      const columns = { "2": "sm:grid-cols-2", "3": "sm:grid-cols-2 lg:grid-cols-3", "4": "sm:grid-cols-2 lg:grid-cols-4", "5": "sm:grid-cols-3 lg:grid-cols-5" }[str(p.columns) || "3"] ?? "sm:grid-cols-2 lg:grid-cols-3";
      return (
        <Band background={p.background}>
          <Heading title={str(p.heading)} intro={str(p.intro)} dark={dark} />
          <ul className={cn("grid gap-3", columns)}>
            {list<{ eyebrow?: string; title: string; body?: string; points?: string[]; href?: string; buttonLabel?: string }>(p.items).map((item, i) => {
              const button = item.href && item.buttonLabel;
              const inner = (
                <>
                  {item.eyebrow && <p className="mb-2 font-mono text-xs font-semibold tracking-widest text-primary-ink uppercase">{item.eyebrow}</p>}
                  <h3 className="font-heading text-lg font-semibold text-text">{item.title}</h3>
                  {item.body && <p className="mt-2 text-left font-body text-sm text-text-muted"><Inline text={item.body} /></p>}
                  {strings(item.points).length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {strings(item.points).map((point, j) => (
                        <li key={j} className="flex gap-3 text-left font-body text-sm text-text">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              );
              return (
                <li key={i} className="flex flex-col rounded-lg border border-border bg-surface p-6">
                  {item.href && !button ? <Link href={item.href} className="block hover:[&_h3]:text-primary-ink">{inner}</Link> : inner}
                  {button && (
                    <LinkButton href={item.href!} className="mt-6 self-start" size="lg">
                      {item.buttonLabel}
                    </LinkButton>
                  )}
                </li>
              );
            })}
          </ul>
        </Band>
      );
    }
    case "cardGrid":
      return (
        <Band background={p.background}>
          <Heading title={str(p.heading)} intro={str(p.intro)} dark={dark} />
          <CardGrid items={list<{ title: string; description?: string; href: string }>(p.items).filter((i) => i.title && i.href)} columns={p.columns === "2" ? 2 : 3} />
        </Band>
      );
    case "numberedList":
      return (
        <Band background={p.background}>
          <Heading title={str(p.heading)} intro={str(p.intro)} dark={dark} />
          <NumberedList items={list<{ title: string; description: string; href?: string }>(p.items).map((i) => ({ ...i, href: i.href || undefined }))} columns={p.columns === "2" ? 2 : p.columns === "4" ? 4 : 3} />
        </Band>
      );
    case "comparison":
      return (
        <Band background={p.background ?? "surface"}>
          <Heading title={str(p.heading)} intro={str(p.intro)} dark={dark} />
          <ComparisonTable rows={list(p.rows)} adjudixLabel={str(p.adjudixLabel) || undefined} otherLabel={str(p.otherLabel) || undefined} />
        </Band>
      );
    case "table": {
      const columns = strings(p.columns);
      const rows = list<{ cells?: string[] }>(p.rows).map((row) => (Array.isArray(row.cells) ? row.cells : []));
      return (
        <Band background={p.background}>
          <Heading title={str(p.heading)} intro={str(p.intro)} dark={dark} />
          <div className="overflow-x-auto rounded-lg border border-border bg-canvas">
            <table className="w-full min-w-[36rem] border-collapse text-left font-body text-sm">
              {str(p.caption) && <caption className="sr-only">{str(p.caption)}</caption>}
              {columns.length > 0 && (
                <thead className="bg-surface text-xs tracking-wide text-text-muted uppercase">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((cells, r) => (
                  <tr key={r} className="border-t border-border">
                    {cells.map((cell, c) => (
                      <td key={c} className={cn("px-4 py-2.5", c === 0 ? "text-text" : "text-text-muted")}>
                        <Inline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Band>
      );
    }
    case "faq":
      return (
        <Band background={p.background} width="narrow">
          <Heading title={str(p.heading) || "Frequently asked questions"} dark={dark} />
          <FaqAccordion items={list<{ question: string; answer: string }>(p.items).filter((i) => i.question)} />
        </Band>
      );
    case "stats":
      return (
        <Band background={p.background}>
          <Heading title={str(p.heading)} dark={dark} />
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {list<{ value: string; label: string }>(p.items).map((item, i) => (
              <div key={i} className="flex flex-col-reverse gap-1">
                <dt className={cn("font-body text-sm", dark ? "text-text-on-hero-muted" : "text-text-muted")}>{item.label}</dt>
                <dd className={cn("font-heading text-4xl font-semibold tabular-nums", dark ? "text-primary" : "text-text")}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Band>
      );
    case "imageText": {
      const button = linkOf(p.button);
      const image = str(p.image);
      return (
        <Band background={p.background}>
          <div className={cn("grid items-center gap-10 md:grid-cols-2", p.imageSide === "left" && "md:[&>*:first-child]:order-2")}>
            <div>
              {str(p.eyebrow) && <p className="mb-2 font-body text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">{str(p.eyebrow)}</p>}
              {str(p.heading) && <h2 className={cn("font-heading text-2xl font-semibold text-balance md:text-3xl", dark ? "text-text-on-hero" : "text-text")}>{str(p.heading)}</h2>}
              {strings(p.paragraphs).map((paragraph, i) => (
                <p key={i} className={cn("mt-4 font-body leading-relaxed", dark ? "text-text-on-hero-muted" : "text-text-muted")}>
                  <Inline text={paragraph} />
                </p>
              ))}
              {button && (
                <LinkButton href={button.href} className="mt-6">
                  {button.label}
                </LinkButton>
              )}
            </div>
            {image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={image} alt={str(p.imageAlt)} fill sizes="(min-width: 768px) 40rem, 100vw" className="object-cover" unoptimized={image.startsWith("http")} />
              </div>
            )}
          </div>
        </Band>
      );
    }
    case "cta": {
      const primary = linkOf(p.primary);
      return primary ? <CtaBand title={str(p.title)} description={str(p.description) || undefined} primary={primary} secondary={linkOf(p.secondary)} /> : null;
    }
    case "buttons": {
      const items = list<{ label: string; href: string; style?: string }>(p.items).filter((b) => b.label && b.href);
      return (
        <Band background={p.background}>
          <Heading title={str(p.heading)} dark={dark} />
          <div className={cn("flex flex-wrap gap-3", p.align === "center" && "justify-center")}>
            {items.map((b, i) => (
              <LinkButton key={i} href={b.href} size="lg" variant={b.style === "primary" ? "primary" : b.style === "ember" ? "ember" : dark ? "secondaryInverse" : "secondary"}>
                {b.label}
              </LinkButton>
            ))}
          </div>
        </Band>
      );
    }
    case "form": {
      const form = str(p.form) ? await getForm(str(p.form)) : undefined;
      if (!form) return null;
      return (
        <Band width="narrow">
          <Heading title={str(p.heading)} intro={str(p.intro)} />
          <div className="rounded-2xl border border-border bg-surface p-6 [--form-ground:var(--color-surface)] sm:p-10">
            <ApplyFormBody form={form} />
          </div>
        </Band>
      );
    }
    case "collection":
      return <CollectionBlock p={p} />;
    case "widget": {
      let node: ReactNode = null;
      if (p.widget === "codeExplainer") node = <CodeExplainer />;
      else if (p.widget === "feeCalculator") node = <FeeCalculator schedule={await getFeeSchedule()} />;
      else if (p.widget === "audienceFinder") node = <AudienceFinder />;
      else if (p.widget === "portalAccess") node = <PortalAccess />;
      else if (p.widget === "mailboxes") {
        const { mailboxes } = await getSiteSettings();
        node = (
          <dl className="grid gap-5 font-body text-sm text-text-muted sm:grid-cols-2">
            {mailboxes.map((box) => (
              <div key={box.email}>
                <dt className="font-medium text-text">{box.team}</dt>
                <dd className="mt-0.5">{box.purpose}</dd>
                <dd>
                  <a href={`mailto:${box.email}`} className="text-primary-ink hover:underline">{box.email}</a>
                </dd>
              </div>
            ))}
          </dl>
        );
      }
      return node ? (
        <Band background={p.background}>
          <Heading title={str(p.heading)} intro={str(p.intro)} dark={dark} />
          {node}
        </Band>
      ) : null;
    }
    case "spacer":
      return <div aria-hidden="true" className={p.size === "sm" ? "h-6" : p.size === "lg" ? "h-24" : "h-12"} />;
    case "mechanism": {
      const extra = str(p.extraSection) ? await renderCodeSection(str(p.extraSection), context.routeProps, "extra") : undefined;
      return (
        <MechanismPage
          eyebrow={str(p.eyebrow) || undefined}
          title={str(p.title)}
          intro={str(p.intro)}
          legalBasisTitle={str(p.legalBasisTitle) || undefined}
          legalBasis={str(p.legalBasis)}
          howItWorks={list(p.howItWorks)}
          faqs={list(p.faqs)}
          filingLabel={str(p.filingLabel) || undefined}
          filingHref={str(p.filingHref) || undefined}
          panelHref={str(p.panelHref) || undefined}
          extra={extra ?? undefined}
        />
      );
    }
    case "course":
      return <CoursePage slug={str(p.slug)} title={str(p.title)} intro={str(p.intro)} who={strings(p.who)} curriculum={list(p.curriculum)} />;
    case "practiceArea":
      return <PracticeAreaPage title={str(p.title)} intro={str(p.intro)} qualifies={strings(p.qualifies)} />;
    case "membershipTier": {
      const stars = str(p.stars) === "beyond" ? "beyond" : Number(p.stars) || undefined;
      return (
        <MembershipTierPage
          title={str(p.title)}
          intro={str(p.intro)}
          eligibility={strings(p.eligibility)}
          benefits={strings(p.benefits)}
          fee={str(p.fee)}
          stars={stars}
          applyable={p.applyable !== false}
          applyLabel={str(p.applyLabel) || undefined}
          applyHref={str(p.applyHref) || undefined}
        />
      );
    }
    case "competition":
      return <CompetitionPage title={str(p.title)} intro={str(p.intro)} format={strings(p.format)} />;
    case "partnerCategory": {
      const status = (p.status ?? {}) as { title?: string; body?: string };
      return <PartnerCategoryPage title={str(p.title)} intro={str(p.intro)} benefits={strings(p.benefits)} status={status.title ? { title: status.title, body: status.body ?? "" } : undefined} />;
    }
    case "code":
      return renderCodeSection(str(p.source) || context.path, context.routeProps, "page");
    default:
      return null;
  }
}

async function CollectionBlock({ p }: { p: P }) {
  const limit = typeof p.limit === "number" && p.limit > 0 ? p.limit : Infinity;
  const take = <T,>(items: T[]) => items.slice(0, limit);
  const heading = <Heading title={str(p.heading)} intro={str(p.intro)} dark={p.background === "hero"} />;
  switch (p.source) {
    case "members":
    case "panel": {
      const all = await getMembers();
      const codes = membershipCodes(all);
      const shown = take(p.source === "panel" ? all.filter((m) => m.panel) : all);
      return (
        <Band background={p.background}>
          {heading}
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((member) => (
              <li key={member.name}>
                <MemberCard member={member} code={codes.get(member)} />
              </li>
            ))}
          </ul>
        </Band>
      );
    }
    case "trainingTracks":
      return (
        <Band background={p.background}>
          {heading}
          <CardGrid items={take(await getTrainingTracks())} columns={2} />
        </Band>
      );
    case "studentCourses": {
      const { fee, courses } = await getStudentCourses();
      return (
        <Band background={p.background}>
          {heading}
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {take(courses).map((course, i) => {
              const prefill = new URLSearchParams({ courseLevel: "Student Course", course: course.title, status: "Student" }).toString();
              return (
                <li key={course.slug} className="flex flex-col rounded-lg border border-border bg-canvas p-6">
                  <span className="font-mono text-xs font-semibold text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-text">{course.title}</h3>
                  <p className="mt-2 flex-1 text-left font-body text-sm text-text-muted">{course.description}</p>
                  <p className="mt-4 font-body text-sm text-text">
                    <span className="font-heading text-base font-semibold">{formatRupees(fee)}</span> <span className="text-text-muted">· refundable</span>
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm font-medium">
                    <Link href={`/apply/course?${prefill}`} className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover">Enrol</Link>
                    <Link href={`/apply/scholarship?${prefill}`} className="text-primary-ink hover:underline">Apply for Scholarship</Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </Band>
      );
    }
    case "competitions":
      return (
        <Band background={p.background}>
          {heading}
          <CardGrid items={take(await getCompetitions())} columns={2} />
        </Band>
      );
    case "articles":
      return (
        <Band background={p.background}>
          {heading}
          <CardGrid items={take(await getArticles()).map((a) => ({ title: a.title, description: a.summary, href: `/knowledge/blog/${a.slug}` }))} />
        </Band>
      );
    case "codeEditions":
      return (
        <Band background={p.background}>
          {heading}
          <CardGrid items={take(await getCodeEditions()).map((e) => ({ title: `${e.edition} (${e.year})`, description: e.summary, href: `/dispute-resolution/rules/code-of-procedure/${e.year}` }))} />
        </Band>
      );
    default:
      return null;
  }
}

// Blocks that lay out a whole page bring their own <main>.
const OWN_MAIN = new Set(["code", "mechanism", "course", "practiceArea", "membershipTier", "competition", "partnerCategory"]);

/** A page's visible blocks, in order. */
export async function Blocks({ blocks, context }: { blocks: Block[]; context: RenderContext }) {
  const visible = blocks.filter((block) => !block.hidden);
  const rendered = await Promise.all(
    visible.map(async (block) => {
      const anchor = str(block.props?.anchor).toLowerCase().replace(/[^a-z0-9-]/g, "") || undefined;
      return { id: block.id, anchor, node: await renderBlock(block, context) };
    }),
  );
  const Wrapper = visible.some((block) => OWN_MAIN.has(block.type)) ? "div" : "main";
  return (
    <Wrapper className="flex flex-1 flex-col bg-canvas">
      {rendered.map(({ id, anchor, node }) => (
        <div key={id} id={anchor} data-block={id} className={anchor ? "scroll-mt-20 md:scroll-mt-64" : "contents"}>
          {node}
        </div>
      ))}
    </Wrapper>
  );
}
