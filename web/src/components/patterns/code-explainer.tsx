import Link from "next/link";

// Adjudix has two "codes" and visitors confuse them. Like CIArb, which keeps
// its Arbitration Rules separate from its Code of Professional and Ethical
// Conduct, one governs procedure (the rule book) and the other conduct.
const CODES = [
  {
    tag: "The Rule Book",
    title: "Adjudix Code of ADR Procedure",
    body: "How a case runs: filing, appointment of neutrals, hearings, evidence, awards and settlements, fees, and enforcement. Published in three editions — 2018, 2021, and 2026.",
    href: "/dispute-resolution/rules/code-of-procedure",
    cta: "Read the Code of ADR Procedure",
  },
  {
    tag: "The Code of Conduct",
    title: "Moral Code of Principles & Doctrines",
    body: "How everyone must behave: impartiality, independence, disclosure, confidentiality, and fairness. It forms the Preamble of the rule book and binds every neutral who accepts an appointment.",
    href: "/about/moral-code",
    cta: "Read the Moral Code",
  },
];

export function CodeExplainer({ className = "" }: { className?: string }) {
  return (
    <section className={`rounded-lg border border-border bg-surface p-6 md:p-8 ${className}`}>
      <h2 className="font-heading text-lg font-semibold text-text">Two codes, one framework</h2>
      <p className="mt-1 text-left font-body text-sm text-text-muted">
        The rule book is the Code of ADR Procedure. The Moral Code is the code of conduct that
        opens it.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {CODES.map((code) => (
          <div key={code.title} className="border-l-2 border-primary pl-4">
            <span className="font-mono text-xs tracking-widest uppercase text-primary-ink">{code.tag}</span>
            <h3 className="mt-1 font-heading text-base font-semibold text-text">{code.title}</h3>
            <p className="mt-2 text-left font-body text-sm text-text-muted">{code.body}</p>
            <Link href={code.href} className="mt-3 inline-block font-body text-sm font-medium text-primary-ink hover:underline">
              {code.cta} &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
