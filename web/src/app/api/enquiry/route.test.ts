// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
let configured = true;
vi.mock("@/lib/mail", () => ({
  SECRETARIAT_EMAIL: "secretariat@adjudixadr.com",
  mailConfigured: () => configured,
  sendToSecretariat: (mail: unknown) => send(mail),
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
    expect(response.status).toBe(204);
    const mail = send.mock.calls[0][0];
    expect(mail.subject).toBe("New dispute filing: A. Party");
    expect(mail.text).toContain("Phone: 9876543210");
    expect(mail.attachments[0].filename).toBe("agreement.pdf");
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
  });
});
