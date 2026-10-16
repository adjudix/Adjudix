import { describe, expect, it } from "vitest";
import { acknowledgementEmail, newReference, secretariatEmail, type Submission } from "@/lib/email-templates";

const submission: Submission = {
  reference: "ADX-261015-7K3Q",
  formName: "New dispute filing",
  kind: "filing",
  urgent: false,
  receivedAt: new Date("2026-10-15T06:30:00Z"),
  site: "adjudixadr.com",
  name: "Asha <Rao>",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  organization: "Rao Traders",
  organizationLabel: "Organisation",
  answers: [
    { key: "disputeType", label: "Dispute type", value: "Contractual Disputes" },
    { key: "message", label: "Message (brief)", value: "Visit spam.example for a deal" },
  ],
  files: [{ name: "agreement.pdf", size: 240_000 }],
};

describe("email templates", () => {
  it("makes references dated in India time", () => {
    expect(newReference(new Date("2026-10-14T20:00:00Z"))).toMatch(/^ADX-261015-[A-Z2-9]{4}$/);
  });

  it("gives the Secretariat everything, escaped", () => {
    const mail = secretariatEmail(submission);
    expect(mail.subject).toBe("New dispute filing — Asha <Rao> [ADX-261015-7K3Q]");
    expect(mail.html).toContain("Asha &lt;Rao&gt;");
    expect(mail.html).not.toContain("<Rao>");
    expect(mail.html).toContain("Visit spam.example for a deal");
    expect(mail.html).toContain("agreement.pdf");
    expect(mail.text).toContain("Dispute type: Contractual Disputes");
  });

  it("never echoes the free-text message back to the visitor", () => {
    const mail = acknowledgementEmail(submission, { successTitle: "Filing received", successBody: "Thank you." });
    expect(mail.subject).toBe("Filing received · Ref ADX-261015-7K3Q");
    expect(mail.html).toContain("ADX-261015-7K3Q");
    expect(mail.html).toContain("Contractual Disputes");
    expect(mail.html).not.toContain("spam.example");
    expect(mail.text).not.toContain("spam.example");
  });

  it("flags urgent applications", () => {
    const mail = secretariatEmail({ ...submission, urgent: true });
    expect(mail.subject.startsWith("URGENT · ")).toBe(true);
  });
});
