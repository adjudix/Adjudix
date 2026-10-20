import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { getSiteSettings } from "@/lib/content/data";
import { FORM_DEFAULTS, getForm } from "@/lib/forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "One form, routed to the right team — whether you're filing a dispute, joining our panel, enrolling in training, or just have a question.",
  path: "/contact",
});


async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // Older links such as /contact?type=Scholarship+Application still pre-select the query.
  const params = await searchParams;
  const prefill = { ...params, queryType: params.queryType ?? params.type };
  const key = JSON.stringify(prefill);
  const form = (await getForm("enquiry")) ?? FORM_DEFAULTS.enquiry;
  const { mailboxes: MAILBOXES } = await getSiteSettings();

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
                    <a href={`mailto:${box.email}`} className="text-primary-ink hover:underline">
                      {box.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="enquiry" className="scroll-mt-24 md:scroll-mt-64">
            <ApplyFormBody key={key} form={form} params={prefill} />
          </div>
        </div>
      </section>
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/contact", metadata);
export default editablePage("/contact", ContactPage, metadata);
