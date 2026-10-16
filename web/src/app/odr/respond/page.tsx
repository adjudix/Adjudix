import { PageHeader } from "@/components/layout/page-header";
import { QueryForm } from "@/components/patterns/query-form";
import { ODR_RESPONSE } from "@/lib/odr-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Respond to a Dispute",
  description:
    "Been named as a respondent in a case? Enter your reference number below to confirm your participation and view the claim against you.",
  path: "/odr/respond",
});

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
          formName={ODR_RESPONSE.formName}
          kind="filing"
          sections={[
            { title: "The case", fields: ["caseReference", "relationship", "message"] },
            { title: "Documents", fields: ["attachments"] },
            { title: "Your details", fields: ["name", "organization", "email", "phone"] },
          ]}
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
                    "Adjudix Lok Adalat",
                    "Emergency Arbitration",
                    "Hybrid (Med-Arb)",
                    "Corporate ADR",
                    "Other / not listed",
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
          successTitle={ODR_RESPONSE.successTitle}
          successBody={ODR_RESPONSE.successBody}
        />
      </section>
    </main>
  );
}
