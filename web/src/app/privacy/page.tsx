import { PageHeader } from "@/components/layout/page-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Adjudix collects, uses, and protects your personal and case data. Effective from the institute's founding; version 1.0.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "Name, contact details, and case-related documents you submit through the ODR Platform or Contact Us form. We do not collect more than is needed to administer your case or query.",
  },
  {
    title: "How we use it",
    body: "Solely to administer your case, process your application, or respond to your query — never sold to third parties, and never used for unrelated marketing without your consent.",
  },
  {
    title: "Confidentiality of case data",
    body: "Case documents and hearing content are confidential to the parties and the appointed neutral, consistent with the confidentiality principle in our Moral Code of Principles.",
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal data, subject to our obligation to retain case records as required by law.",
  },
  {
    title: "Data protection law",
    body: "Adjudix processes personal data in a manner consistent with India's Digital Personal Data Protection Act, 2023.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How Adjudix collects, uses, and protects your personal and case data. Effective from the institute's founding; version 1.0."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="divide-y divide-border border-t border-b border-border">
          {SECTIONS.map((section) => (
            <div key={section.title} className="py-6">
              <h2 className="font-heading text-lg font-semibold text-text">{section.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
