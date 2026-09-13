import { PageHeader } from "@/components/layout/page-header";
import { QueryForm } from "@/components/patterns/query-form";

export default function ContactPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Contact"
        title="Contact Us"
        intro="One form, routed to the right team — whether you're filing a dispute, joining our panel, enrolling in training, or just have a question."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-heading text-xl font-semibold text-text">Get in touch</h2>
            <div className="mt-6 flex flex-col gap-4 font-body text-sm text-text-muted">
              <div>
                <span className="block font-medium text-text">Email</span>
                <span>contact@adjudix.org</span>
              </div>
              <div>
                <span className="block font-medium text-text">Phone</span>
                <span>Available on request via the form</span>
              </div>
              <div>
                <span className="block font-medium text-text">Office</span>
                <span>Details published once our registered office is confirmed.</span>
              </div>
            </div>
          </div>
          <QueryForm
            fields={[
              {
                name: "queryType",
                label: "Type of query",
                type: "select",
                required: true,
                options: [
                  "General Contact Query",
                  "File a Dispute",
                  "Respond to a Dispute",
                  "Join as Panelist / Arbitrator / Mediator",
                  "Membership Application",
                  "Training Enrollment",
                  "Partnership Inquiry",
                ],
              },
              { name: "location", label: "City / Location (optional)" },
            ]}
            submitLabel="Submit Query"
            successTitle="Query received"
            successBody="Thank you — your query has been routed to the right team and we'll be in touch shortly."
          />
        </div>
      </section>
    </main>
  );
}
