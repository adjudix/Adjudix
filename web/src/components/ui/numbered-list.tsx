import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

export interface NumberedListItem {
  title: string;
  description: string;
  href?: string;
}

export interface NumberedListProps {
  items: NumberedListItem[];
  columns?: 2 | 3 | 4;
}

export function NumberedList({ items, columns = 3 }: NumberedListProps) {
  const colClass =
    columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <div
      className={`grid divide-y divide-border border-t border-b border-border md:divide-x md:divide-y-0 ${colClass}`}
    >
      {items.map((item, index) => {
        const number = String(index + 1).padStart(2, "0");
        const inner = (
          <>
            <span className="font-mono text-xs tracking-widest text-primary">{number}</span>
            <h3 className="mt-3 text-lg font-semibold text-text group-hover:text-primary">
              {item.title}
            </h3>
            <p className="mt-2 font-body text-sm text-text-muted">{item.description}</p>
          </>
        );
        const className =
          "group block h-full px-1 py-6 transition-transform duration-300 md:px-8 md:py-8 md:hover:-translate-y-1";

        return (
          <Reveal key={item.title} delay={index * 90}>
            {item.href ? (
              <Link href={item.href} className={className}>
                {inner}
              </Link>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
