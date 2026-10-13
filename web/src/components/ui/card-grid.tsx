import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

export interface CardGridItem {
  title: string;
  description?: string;
  href: string;
}

export interface CardGridProps {
  items: CardGridItem[];
  columns?: 2 | 3;
}

export function CardGrid({ items, columns = 3 }: CardGridProps) {
  const colClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-3 ${colClass}`}>
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 70}>
          <Link
            href={item.href}
            className="group block h-full rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/5"
          >
            <h2 className="font-heading text-lg font-semibold text-text group-hover:text-primary-ink">
              {item.title}
            </h2>
            {item.description && (
              <p className="mt-2 font-body text-sm text-text-muted">{item.description}</p>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-ink opacity-0 transition-opacity group-hover:opacity-100">
              Learn more <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
