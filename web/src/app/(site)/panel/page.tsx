import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { IdentityNote, MemberCard } from "@/components/patterns/member-card";
import { getMembers } from "@/lib/content/data";
import { IDENTITY_NOTE, membershipCodes, PROFESSIONS } from "@/lib/members";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Our Professional Panel",
  description:
    "Advocates, chartered accountants, civil engineers, IT engineers, and other professionals — vetted before appointment to any case and bound by the Adjudix…",
  path: "/panel",
});

// The panel is shown by profession (client brief): one common panel rather
// than a separate roster per dispute type.
async function PanelPage() {
  const members = await getMembers();
  const codes = membershipCodes(members);
  const PANEL = members.filter((member) => member.panel);
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Our Professional Panel"
        intro="Advocates, chartered accountants, civil engineers, IT engineers, architects, interior designers, and other professionals — vetted before appointment to any case and bound by the Adjudix Code of ADR Procedure, 2026."
      />

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <IdentityNote {...IDENTITY_NOTE} />
      </section>

      {PROFESSIONS.map((profession) => {
        const people = PANEL.filter((member) => member.profession === profession.id);
        return (
          <section key={profession.id} aria-labelledby={`panel-${profession.id}`} className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-semibold text-primary-ink">{profession.numeral}.</span>
              <h2 id={`panel-${profession.id}`} className="font-heading text-2xl font-semibold text-text">
                {profession.title}
              </h2>
              <span className="font-body text-sm text-text-muted">({people.length})</span>
            </div>
            <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">{profession.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((member) => (
                <li key={member.name}>
                  <MemberCard member={member} code={codes.get(member)} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <CtaBand
        title="Apply to join our panel"
        description="Advocates, chartered accountants, company secretaries, engineers of every discipline, architects, and interior designers with relevant experience can apply."
        primary={{ label: "Apply to the Panel", href: applyHref("panel") }}
        secondary={{ label: "Our Esteemed Members", href: "/membership/directory" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/panel", metadata);
export default editablePage("/panel", PanelPage, metadata);
