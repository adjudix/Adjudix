import { PageHeader } from "@/components/layout/page-header";
import { QueryForm } from "@/components/patterns/query-form";

export default function RespondPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="Respond to a Dispute"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "Respond" }]}
        intro="Been named as a respondent in a case? Enter your reference number below to confirm your participation and view the claim against you."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <QueryForm
          formName="Response to a dispute"
          fields={[
            {
              name: "caseReference",
              label: "Case reference",
              required: true,
              group: [
                {
                  name: "caseType",
                  label: "Case type",
                  type: "select",
                  options: [
                    "Arbitration",
                    "Mediation",
                    "Conciliation",
                    "Lok Adalat",
                    "Emergency Arbitration",
                    "Hybrid (Med-Arb)",
                    "Corporate ADR",
                  ],
                },
                { name: "caseNumber", label: "Case number" },
                { name: "caseYear", label: "Year", inputMode: "numeric" },
              ],
            },
            { name: "relationship", label: "Your relationship to the case" },
          ]}
          attachmentsLabel="Attach documents"
          submitLabel="Submit Response"
          successTitle="Response recorded"
          successBody="Thank you — you'll receive access to the case file and next steps by email."
        />
      </section>
    </main>
  );
}
