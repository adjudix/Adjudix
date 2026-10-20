// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
const acknowledge = vi.fn();
let configured = true;
vi.mock("@/lib/mail", () => ({
  SECRETARIAT_EMAIL: "secretariat@adjudixADR.com",
  QUERY_EMAIL: "query@adjudixADR.com",
  mailConfigured: () => configured,
  sendToInbox: (inbox: string, mail: unknown) => send(mail, inbox),
  sendToVisitor: (inbox: string, to: string, mail: unknown) => acknowledge(to, mail, inbox),
}));
// No database in tests: forms come from their code defaults, except any
// published copy a test puts in `published`.
const published = new Map<string, unknown>();
vi.mock("@/db", () => ({ databaseConfigured: () => false, db: () => null, schema: {} }));
vi.mock("@/lib/content/store", () => ({
  getContent: async (type: string, key: string, fallback: unknown) => published.get(`${type}:${key}`) ?? fallback,
  listPublishedKeys: async () => [],
}));

const { POST } = await import("./route");
const { FORM_DEFAULTS } = await import("@/lib/forms");

function submit(fields: Record<string, string | File>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return POST(new Request("http://localhost/api/enquiry", { method: "POST", body: data }));
}

const filing = {
  _formKey: "odr-file",
  disputeType: "Contractual Disputes",
  claimant: "A. Party",
  respondent: "B. Party",
  name: "A. Party",
};

describe("POST /api/enquiry", () => {
  beforeEach(() => {
    send.mockReset();
    acknowledge.mockReset();
    configured = true;
    published.clear();
  });

  it("requires an email or a phone number", async () => {
    const response = await submit({ _formKey: "enquiry", queryType: "General Contact Query", name: "A. Party", message: "Hello" });
    expect(response.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("emails the Secretariat with labels and attachments", async () => {
    const response = await submit({
      ...filing,
      phone: "9876543210",
      attachments: new File(["%PDF"], "agreement.pdf", { type: "application/pdf" }),
    });
    expect(response.status).toBe(200);
    const { reference, acknowledged } = await response.json();
    expect(reference).toMatch(/^ADX-\d{6}-[A-Z2-9]{4}$/);
    expect(acknowledged).toBe(false);
    const [mail, inbox] = send.mock.calls[0];
    // A case filing goes to the Secretariat.
    expect(inbox).toBe("secretariat");
    expect(mail.subject).toBe(`New dispute filing — A. Party [${reference}]`);
    expect(mail.text).toContain("9876543210");
    expect(mail.text).toContain("Claimant name(s)");
    expect(mail.html).toContain("agreement.pdf");
    expect(mail.attachments[0].filename).toBe("agreement.pdf");
    // No email address given, so nobody to acknowledge.
    expect(acknowledge).not.toHaveBeenCalled();
  });

  it("acknowledges the visitor with the same reference", async () => {
    const response = await submit({ ...filing, email: "a@example.com", message: "Private details" });
    const { reference, acknowledged } = await response.json();
    expect(acknowledged).toBe(true);
    const [to, mail] = acknowledge.mock.calls[0];
    expect(to).toBe("a@example.com");
    expect(mail.subject).toBe(`Filing received · Ref ${reference}`);
    expect(mail.html).not.toContain("Private details");
  });

  it("still finds a form sent by its title, and routes queries to the Query mailbox", async () => {
    const response = await submit({ _form: "Send us a query", queryType: "General Contact Query", name: "A. Party", email: "a@example.com" });
    expect(response.status).toBe(200);
    expect(send.mock.calls[0][1]).toBe("query");
    expect(acknowledge.mock.calls[0][2]).toBe("query");
  });

  it("enforces the form's required fields", async () => {
    const response = await submit({ ...filing, claimant: "", phone: "9876543210" });
    expect(response.status).toBe(400);
    expect((await response.json()).error).toContain("Claimant");
  });

  it("rejects a choice the form doesn't offer", async () => {
    const response = await submit({ ...filing, disputeType: "<script>", phone: "9876543210" });
    expect(response.status).toBe(400);
  });

  it("drops answers to questions the form doesn't ask", async () => {
    await submit({ ...filing, phone: "9876543210", injected: "free text" });
    expect(send.mock.calls[0][0].text).not.toContain("free text");
  });

  it("refuses a form the console has closed", async () => {
    published.set("form:odr-file", { ...FORM_DEFAULTS["odr-file"], enabled: false, closedTitle: "Closed for now.", closedBody: "" });
    const response = await submit({ ...filing, phone: "9876543210" });
    expect(response.status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("checks fields a console edit added", async () => {
    const form = FORM_DEFAULTS["odr-file"];
    published.set("form:odr-file", { ...form, fields: [...form.fields, { name: "city", label: "City", required: true }] });
    expect((await submit({ ...filing, phone: "9876543210" })).status).toBe(400);
    expect((await submit({ ...filing, phone: "9876543210", city: "Indore" })).status).toBe(200);
  });

  it("still succeeds when only the acknowledgement fails", async () => {
    acknowledge.mockRejectedValueOnce(new Error("bounced"));
    const response = await submit({ ...filing, email: "a@example.com" });
    expect(response.status).toBe(200);
    expect((await response.json()).acknowledged).toBe(false);
  });

  it("rejects disallowed file types", async () => {
    const response = await submit({ ...filing, email: "a@example.com", attachments: new File(["x"], "run.exe") });
    expect(response.status).toBe(400);
  });

  it("silently drops honeypot submissions", async () => {
    const response = await submit({ ...filing, email: "b@example.com", website: "spam" });
    expect(response.status).toBe(204);
    expect(send).not.toHaveBeenCalled();
  });

  it("answers 404 for a form that doesn't exist", async () => {
    const response = await submit({ _formKey: "no-such-form", name: "A. Party", email: "a@example.com" });
    expect(response.status).toBe(404);
  });

  it("reports when neither the inbox nor mail is configured", async () => {
    configured = false;
    const response = await submit({ ...filing, email: "a@example.com" });
    expect(response.status).toBe(503);
    expect((await response.json()).error).toContain("secretariat@adjudixADR.com");
  });
});
