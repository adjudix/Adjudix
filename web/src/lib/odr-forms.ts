import type { ApplyForm } from "@/lib/apply-forms";

// The two ODR forms, on their own pages (/odr/file, /odr/respond) rather
// than as /apply modals. Their titles name the form in the Secretariat's
// email and the visitor's acknowledgement.

export const ODR_FILING: ApplyForm = {
  slug: "odr-file",
  kind: "filing",
  title: "New dispute filing",
  intro: "Tell us about your dispute. We'll confirm your dispute-type panel and an indicative fee before anything is finalized.",
  section: { label: "ODR Platform", href: "/odr" },
  sections: [
    { title: "The dispute", fields: ["disputeType", "amount", "message"] },
    { title: "The parties", fields: ["claimant", "respondent"] },
    { title: "Documents", fields: ["attachments"], description: "Agreements, notices, invoices: anything that shows what happened." },
    { title: "Your details", fields: ["name", "organization", "email", "phone"] },
  ],
  fields: [
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
  ],
  messageLabel: "Message (brief)",
  attachmentsLabel: "Attach relevant documents",
  submitLabel: "Submit Filing",
  successTitle: "Filing received",
  successBody:
    "Thank you — our Secretariat will review your filing and appoint a neutral from our Professional Panel for the relevant practice area. You'll receive a case reference number shortly.",
};

export const ODR_RESPONSE: ApplyForm = {
  slug: "odr-respond",
  kind: "filing",
  title: "Response to a dispute",
  intro: "Been named as a respondent in a case? Enter your reference number below to confirm your participation and view the claim against you.",
  section: { label: "ODR Platform", href: "/odr" },
  sections: [
    { title: "The case", fields: ["caseReference", "relationship", "message"] },
    { title: "Documents", fields: ["attachments"] },
    { title: "Your details", fields: ["name", "organization", "email", "phone"] },
  ],
  fields: [
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
  ],
  attachmentsLabel: "Attach documents",
  submitLabel: "Submit Response",
  successTitle: "Response recorded",
  successBody: "Thank you — you'll receive access to the case file and next steps by email.",
};
