import { PageHeader } from "@/components/layout/page-header";
import { PortalAccess } from "@/components/patterns/portal-access";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portal Login",
  description:
    "Role-based access for parties, arbitrators, and case managers. Portal accounts are issued once a case is filed or an appointment is confirmed.",
  path: "/odr/portal",
});

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

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:items-start">
        <PortalAccess />
        <div>
          <h2 className="font-heading text-xl font-semibold text-text">Who the portal is for</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {PORTALS.map((portal) => (
              <li key={portal.title} className="rounded-lg border border-border bg-surface p-5">
                <h3 className="font-heading text-base font-semibold text-text">{portal.title}</h3>
                <p className="mt-1 font-body text-sm text-text-muted">{portal.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-body text-sm text-text-muted">
            Sign up once; the Secretariat verifies every account before it is activated, so only
            the parties and neutrals on a case can see it.
          </p>
        </div>
      </section>
    </main>
  );
}
