import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";

const STEPS = [
  { title: "Tell us your case", description: "Describe the dispute you and the other party are already resolving yourselves." },
  { title: "We appoint a neutral", description: "Adjudix appoints an arbitrator or neutral from the relevant specialized panel." },
  { title: "You run the process", description: "The appointed neutral joins your existing process rather than starting a new one." },
];

export default function AdHocPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="Ad Hoc Platform"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "Ad Hoc Platform" }]}
        intro="An appointment-only service: Adjudix appoints a qualified arbitrator or neutral for a case the parties are otherwise running themselves, without requiring the full institutional process."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <NumberedList items={STEPS} />
      </section>

      <CtaBand
        title="Need a neutral appointed?"
        description="Tell us about your case and the kind of appointment you need."
        primary={{ label: "Request an Appointment", href: "/contact" }}
        secondary={{ label: "View Our Panel", href: "/panel" }}
      />
    </main>
  );
}
