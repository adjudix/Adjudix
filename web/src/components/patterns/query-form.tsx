"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export interface QueryField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "file";
  required?: boolean;
  options?: string[];
  inputMode?: "numeric" | "text";
  // Renders the sub-fields side by side under one label (e.g. a case
  // reference split into case type | case number | year).
  group?: QueryField[];
}

export interface QueryFormProps {
  // Names the form in the email the Secretariat receives.
  formName: string;
  fields: QueryField[];
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  messageLabel?: string;
  // Adds a document upload after the message, labelled with this text.
  attachmentsLabel?: string;
}

// Email and phone are each optional, but at least one is required
// (client brief: "Either email or phone").
const BASE_FIELDS: QueryField[] = [
  { name: "name", label: "Full name", required: true },
  { name: "organization", label: "Organization (optional)" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
];

const controlClass =
  "rounded-md border border-border bg-canvas px-4 py-2.5 font-body text-text outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function Control({ field, id }: { field: QueryField; id: string }) {
  if (field.type === "textarea") {
    return <textarea id={id} name={field.name} required={field.required} rows={4} className={controlClass} />;
  }
  if (field.type === "select") {
    return (
      <select id={id} name={field.name} required={field.required} className={controlClass} defaultValue="">
        <option value="" disabled>
          Select&hellip;
        </option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "file") {
    return (
      <input
        id={id}
        name={field.name}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        className="rounded-md border border-dashed border-border bg-canvas px-4 py-2.5 font-body text-sm text-text-muted file:mr-4 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-1.5 file:font-medium file:text-text"
      />
    );
  }
  return (
    <input
      id={id}
      name={field.name}
      type={field.type ?? "text"}
      inputMode={field.inputMode}
      required={field.required}
      className={controlClass}
    />
  );
}

function Label({ htmlFor, field }: { htmlFor?: string; field: QueryField }) {
  const Tag = htmlFor ? "label" : "span";
  return (
    <Tag htmlFor={htmlFor} className="font-body text-sm font-medium text-text">
      {field.label}
      {field.required && <span className="text-ember"> *</span>}
    </Tag>
  );
}

export function QueryForm({
  formName,
  fields,
  submitLabel = "Submit",
  successTitle = "Received",
  successBody = "Thank you — a member of our team will be in touch shortly.",
  messageLabel = "Message",
  attachmentsLabel,
}: QueryFormProps) {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [sendError, setSendError] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);

  const allFields: QueryField[] = [
    ...BASE_FIELDS,
    ...fields,
    { name: "message", label: messageLabel, type: "textarea" },
    ...(attachmentsLabel ? [{ name: "attachments", label: attachmentsLabel, type: "file" as const }] : []),
  ];

  // Field labels travel with the submission so the email reads naturally.
  const labels = Object.fromEntries(
    allFields.flatMap((field) =>
      field.group ? field.group.map((sub) => [sub.name, `${field.label} — ${sub.label}`]) : [[field.name, field.label]],
    ),
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!email && !phone) {
      setContactError(true);
      emailRef.current?.focus();
      return;
    }
    setContactError(false);
    setSendError("");
    setLoading(true);
    data.set("_form", formName);
    data.set("_labels", JSON.stringify(labels));
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: data });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "We couldn't send your submission. Please try again.");
      }
      setSubmitted(true);
    } catch (cause) {
      setSendError(cause instanceof Error ? cause.message : "We couldn't send your submission. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <h2 className="font-heading text-xl font-semibold text-text">{successTitle}</h2>
        <p className="mt-2 text-center font-body text-sm text-text-muted">{successBody}</p>
      </div>
    );
  }

  const contactHintId = `${formId}-contact-hint`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {allFields.map((field) => {
        const fieldId = `${formId}-${field.name}`;

        if (field.group) {
          return (
            <fieldset key={field.name} className="flex flex-col gap-1.5">
              <legend className="mb-1.5">
                <Label field={field} />
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {field.group.map((sub) => {
                  const subId = `${formId}-${sub.name}`;
                  return (
                    <div key={sub.name} className="flex flex-col gap-1">
                      <label htmlFor={subId} className="font-body text-xs text-text-muted">
                        {sub.label}
                      </label>
                      <Control field={{ ...sub, required: sub.required ?? field.required }} id={subId} />
                    </div>
                  );
                })}
              </div>
            </fieldset>
          );
        }

        const isContact = field.name === "email" || field.name === "phone";
        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <Label htmlFor={fieldId} field={field} />
            {isContact ? (
              <input
                id={fieldId}
                name={field.name}
                type={field.type}
                ref={field.name === "email" ? emailRef : undefined}
                aria-describedby={contactHintId}
                aria-invalid={contactError || undefined}
                className={controlClass}
              />
            ) : (
              <Control field={field} id={fieldId} />
            )}
            {field.name === "email" && (
              <p id={contactHintId} className="text-left font-body text-xs text-text-muted">
                Email <strong className="font-semibold">or</strong> phone — at least one is required.
              </p>
            )}
          </div>
        );
      })}
      <p role="alert" className="text-left font-body text-sm text-ember empty:hidden">
        {contactError ? "Please enter either an email address or a phone number." : sendError}
      </p>
      <Button type="submit" variant="primary" size="lg" loading={loading} className="mt-2 self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
