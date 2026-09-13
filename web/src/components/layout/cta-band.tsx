import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/ui/reveal";

export interface CtaBandProps {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <section className="bg-hero px-6 py-16 text-text-on-hero">
      <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-balance max-w-lg">
            {title}
          </h2>
          {description && (
            <p className="mt-2 font-body text-text-on-hero-muted max-w-md">{description}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <LinkButton variant="primary" size="lg" href={primary.href}>
            {primary.label}
          </LinkButton>
          {secondary && (
            <LinkButton variant="secondaryInverse" size="lg" href={secondary.href}>
              {secondary.label}
            </LinkButton>
          )}
        </div>
      </Reveal>
    </section>
  );
}
