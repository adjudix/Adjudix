import { PageHeader } from "@/components/layout/page-header";
import { QueryForm } from "@/components/patterns/query-form";

// Mail IDs by purpose, as listed by the client. The domain is written as
// "adjudixADR.com" in their notes — confirm the exact spelling before launch.
const MAILBOXES = [
  { team: "Secretariat", purpose: "For all formal communications", email: "secretariat@adjudixadr.com" },
  { team: "HR", purpose: "For relationship building", email: "hr@adjudixadr.com" },
  { team: "Customer Support", purpose: "For any help or support", email: "support@adjudixadr.com" },
  { team: "Director", purpose: "Only in an emergency", email: "director@adjudixadr.com" },
];

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
            <dl className="mt-6 flex flex-col gap-5 font-body text-sm text-text-muted">
              {MAILBOXES.map((box) => (
                <div key={box.email}>
                  <dt className="font-medium text-text">{box.team}</dt>
                  <dd className="mt-0.5">{box.purpose}</dd>
                  <dd>
                    <a href={`mailto:${box.email}`} className="text-primary hover:underline">
                      {box.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
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
                  "Implementation of an Order or Award",
                  "Contract / Clause Drafting",
                  "Free Consultation",
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
