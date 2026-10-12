import { MechanismPage } from "@/components/patterns/mechanism-page";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Emergency Arbitration",
  description:
    "Urgent interim relief — an asset freeze, an injunction, preservation of evidence — before a full arbitral tribunal is even constituted. Built for the cases…",
  path: "/dispute-resolution/emergency",
});

export default function EmergencyArbitrationPage() {
  return (
    <MechanismPage
      eyebrow="Urgent relief"
      title="Emergency Arbitration"
      intro="Urgent interim relief — an asset freeze, an injunction, preservation of evidence — before a full arbitral tribunal is even constituted. Built for the cases that can't wait."
      howItWorks={[
        {
          title: "Application filed",
          description: "A party facing urgent, irreparable harm files an emergency application.",
        },
        {
          title: "Emergency Arbitrator appointed",
          description: "Adjudix appoints an Emergency Arbitrator within a strict, published timeline.",
        },
        {
          title: "Urgent hearing",
          description: "A short-notice hearing is held, often within 48 hours of appointment.",
        },
        {
          title: "Interim order",
          description: "The Emergency Arbitrator issues interim relief, effective immediately and binding on the parties.",
        },
      ]}
      legalBasis="Emergency Arbitration is available under the Adjudix Code of ADR Procedure to any party with an existing or prospective arbitration clause naming Adjudix as the administering institution. Interim orders remain in force until the full tribunal is constituted and can confirm, modify, or vacate them."
      faqs={[
        {
          question: "How fast can an emergency arbitrator be appointed?",
          answer: "The Adjudix Code of ADR Procedure sets a strict appointment timeline for emergency applications, designed to be measured in hours, not weeks — details are provided directly on request given the urgency involved.",
        },
        {
          question: "Is emergency relief the same as a final award?",
          answer: "No. It's interim relief intended to preserve the status quo or prevent irreparable harm until the full tribunal can hear the underlying case.",
        },
      ]}
      filingLabel="File an Emergency Application"
      filingHref={applyHref("emergency")}
    />
  );
}
