import { PageHeader } from "@/components/layout/page-header";
import { QueryForm } from "@/components/patterns/query-form";

export default function FileDisputePage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="File a Dispute"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "File a Dispute" }]}
        intro="Tell us about your dispute. We'll confirm your dispute-type panel and an indicative fee before anything is finalized."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <QueryForm
          formName="New dispute filing"
          fields={[
            {
              name: "disputeType",
              label: "Dispute type",
              type: "select",
              required: true,
              options: [
                "Debt Recovery & Financial Claims",
                "Property Disputes",
                "Contractual Disputes",
                "Construction Disputes",
                "Intellectual Property Disputes",
                "Employer–Employee Disputes",
                "Tenancy Disputes",
                "Insurance Claims",
                "Partnership Disputes",
                "Not Listed Otherwise",
              ],
            },
            { name: "amount", label: "Amount in dispute (₹, approximate)", type: "text" },
            { name: "claimant", label: "Claimant name(s)", required: true },
            { name: "respondent", label: "Respondent name(s)", required: true },
          ]}
          messageLabel="Message (brief)"
          attachmentsLabel="Attach relevant documents"
          submitLabel="Submit Filing"
          successTitle="Filing received"
          successBody="Thank you — our Secretariat will review your filing and appoint a panelist from the relevant specialized panel. You'll receive a case reference number shortly."
        />
      </section>
    </main>
  );
}
