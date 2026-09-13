import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
  image?: { src: string; alt: string };
}

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs text-text-muted">
      <Link href="/" className="hover:text-text">
        Home
      </Link>
      {breadcrumbs.map((crumb) => (
        <span key={crumb.label} className="flex items-center gap-1.5">
          <span aria-hidden="true">/</span>
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-text">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-text">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({ eyebrow, title, intro, breadcrumbs, image }: PageHeaderProps) {
  if (image) {
    return (
      <section className="border-b border-border bg-surface px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <Reveal>
            {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            {eyebrow && (
              <span className="font-mono text-xs tracking-widest uppercase text-primary">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-text text-balance">
              {title}
            </h1>
            {intro && <p className="mt-4 max-w-lg font-body text-lg text-text-muted">{intro}</p>}
          </Reveal>
          <Reveal delay={120} className="order-first md:order-last">
            <div className="relative aspect-4/3 overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-surface px-6 py-14 md:py-16">
      <Reveal className="mx-auto max-w-4xl">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {eyebrow && (
          <span className="font-mono text-xs tracking-widest uppercase text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-text text-balance">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl font-body text-lg text-text-muted">{intro}</p>}
      </Reveal>
    </section>
  );
}
