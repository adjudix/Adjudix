import { PageHeader } from "@/components/layout/page-header";
import { LinkButton } from "@/components/ui/link-button";

const PORTALS = [
  {
    title: "Parties",
    description: "Track your case, exchange documents, and view hearing dates.",
  },
  {
    title: "Arbitrators / Neutrals",
    description: "Manage appointments, submit orders, and review case files.",
  },
  {
    title: "Case Manager / Secretariat",
    description: "Internal access for Adjudix staff administering cases.",
  },
];

export default function PortalPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="Portal Login"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "Portal Login" }]}
        intro="Role-based access for parties, arbitrators, and case managers. Portal accounts are issued once a case is filed or an appointment is confirmed."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-3 sm:grid-cols-3">
          {PORTALS.map((portal) => (
            <div key={portal.title} className="rounded-lg border border-border bg-surface p-6">
              <h2 className="font-heading text-lg font-semibold text-text">{portal.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{portal.description}</p>
              <LinkButton variant="secondary" size="default" className="mt-4" href="/contact">
                Request Access
              </LinkButton>
            </div>
          ))}
        </div>
        <p className="mt-8 font-body text-sm text-text-muted">
          Portal credentials are issued by the Secretariat. If you&apos;ve filed a case or
          accepted a panel appointment, contact us directly for your access credentials.
        </p>
      </section>
    </main>
  );
}
