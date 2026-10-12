import { PageHeader } from "@/components/layout/page-header";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { ENQUIRY_FORM } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "One form, routed to the right team — whether you're filing a dispute, joining our panel, enrolling in training, or just have a question.",
  path: "/contact",
});

// Mail IDs by purpose, as confirmed by the client (domain adjudixADR.com).
const MAILBOXES = [
  { team: "Secretariat", purpose: "For all formal communications", email: "secretariat@adjudixadr.com" },
  { team: "HR", purpose: "For relationship building", email: "hr@adjudixadr.com" },
  { team: "Customer Support", purpose: "For any help or support", email: "support@adjudixadr.com" },
  { team: "Director", purpose: "Only in an emergency", email: "director@adjudixadr.com" },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // Older links such as /contact?type=Scholarship+Application still pre-select the query.
  const params = await searchParams;
  const prefill = { ...params, queryType: params.queryType ?? params.type };
  const key = JSON.stringify(prefill);

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
          <div id="enquiry" className="scroll-mt-24 md:scroll-mt-64">
            <ApplyFormBody key={key} form={ENQUIRY_FORM} params={prefill} />
          </div>
        </div>
      </section>
    </main>
  );
}
