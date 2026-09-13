import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
}

export function PageHeader({ eyebrow, title, intro, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-surface px-6 py-14 md:py-16">
      <div className="mx-auto max-w-4xl">
        {breadcrumbs && breadcrumbs.length > 0 && (
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
        )}
        {eyebrow && (
          <span className="font-mono text-xs tracking-widest uppercase text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-text text-balance">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl font-body text-lg text-text-muted">{intro}</p>
        )}
      </div>
    </section>
  );
}
