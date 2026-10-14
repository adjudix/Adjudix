import { PageHeader } from "@/components/layout/page-header";
import { QueryForm } from "@/components/patterns/query-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "File a Dispute",
  description:
    "Tell us about your dispute. We'll confirm your dispute-type panel and an indicative fee before anything is finalized.",
  path: "/odr/file",
});

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
          kind="filing"
          sections={[
            { title: "The dispute", fields: ["disputeType", "amount", "message"] },
            { title: "The parties", fields: ["claimant", "respondent"] },
            { title: "Documents", fields: ["attachments"], description: "Agreements, notices, invoices: anything that shows what happened." },
            { title: "Your details", fields: ["name", "organization", "email", "phone"] },
          ]}
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
          successBody="Thank you — our Secretariat will review your filing and appoint a neutral from our Professional Panel for the relevant practice area. You'll receive a case reference number shortly."
        />
      </section>
    </main>
  );
}
