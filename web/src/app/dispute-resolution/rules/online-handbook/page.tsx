import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";

const STEPS = [
  { title: "Create an account", description: "Register on the ODR Platform as a party, then verify your identity." },
  { title: "File or respond", description: "Submit a new case, or respond to a case you've been named in, with a reference number." },
  { title: "Track your case", description: "Follow every filing, hearing date, and order from your case dashboard." },
];

export default function OnlineHandbookPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Rules & Governance"
        title="Online Procedure Handbook"
        breadcrumbs={[
          { label: "Dispute Resolution", href: "/dispute-resolution" },
          { label: "Rules & Governance", href: "/dispute-resolution/rules" },
          { label: "Online Handbook" },
        ]}
        intro="Step-by-step guidance for parties, panelists, and case managers using the ODR Platform — everything the Code of Procedure requires, translated into the platform's actual screens and workflow."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <NumberedList items={STEPS} />
      </section>

      <CtaBand
        title="Ready to use the platform?"
        primary={{ label: "Go to the ODR Platform", href: "/odr" }}
        secondary={{ label: "Get Help", href: "/odr/help" }}
      />
    </main>
  );
}
