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

const { POST } = await import("./route");

function submit(fields: Record<string, string | File>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return POST(new Request("http://localhost/api/enquiry", { method: "POST", body: data }));
}

describe("POST /api/enquiry", () => {
  beforeEach(() => {
    send.mockReset();
    acknowledge.mockReset();
    configured = true;
  });

  it("requires an email or a phone number", async () => {
    const response = await submit({ name: "A. Party", message: "Hello" });
    expect(response.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("emails the Secretariat with labels and attachments", async () => {
    const response = await submit({
      _form: "New dispute filing",
      _labels: JSON.stringify({ name: "Full name", phone: "Phone" }),
      name: "A. Party",
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
    expect(mail.html).toContain("agreement.pdf");
    expect(mail.attachments[0].filename).toBe("agreement.pdf");
    // No email address given, so nobody to acknowledge.
    expect(acknowledge).not.toHaveBeenCalled();
  });

  it("acknowledges the visitor with the same reference", async () => {
    const response = await submit({
      _form: "New dispute filing",
      name: "A. Party",
      email: "a@example.com",
      message: "Private details",
    });
    const { reference, acknowledged } = await response.json();
    expect(acknowledged).toBe(true);
    const [to, mail] = acknowledge.mock.calls[0];
    expect(to).toBe("a@example.com");
    expect(mail.subject).toBe(`Filing received · Ref ${reference}`);
    expect(mail.html).not.toContain("Private details");
  });

  it("sends general queries to the Query mailbox", async () => {
    const response = await submit({ _form: "Send us a query", name: "A. Party", email: "a@example.com" });
    expect(response.status).toBe(200);
    expect(send.mock.calls[0][1]).toBe("query");
    expect(acknowledge.mock.calls[0][2]).toBe("query");
  });

  it("still succeeds when only the acknowledgement fails", async () => {
    acknowledge.mockRejectedValueOnce(new Error("bounced"));
    const response = await submit({ name: "A. Party", email: "a@example.com" });
    expect(response.status).toBe(200);
    expect((await response.json()).acknowledged).toBe(false);
  });

  it("rejects disallowed file types", async () => {
    const response = await submit({
      name: "A. Party",
      email: "a@example.com",
      attachments: new File(["x"], "run.exe"),
    });
    expect(response.status).toBe(400);
  });

  it("silently drops honeypot submissions", async () => {
    const response = await submit({ name: "Bot", email: "b@example.com", website: "spam" });
    expect(response.status).toBe(204);
    expect(send).not.toHaveBeenCalled();
  });

  it("reports when mail is not configured", async () => {
    configured = false;
    const response = await submit({ name: "A. Party", email: "a@example.com" });
    expect(response.status).toBe(503);
    expect((await response.json()).error).toContain("query@adjudixADR.com");
  });
});
