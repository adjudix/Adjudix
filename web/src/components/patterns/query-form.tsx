"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export interface QueryField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
}

export interface QueryFormProps {
  fields: QueryField[];
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}

const BASE_FIELDS: QueryField[] = [
  { name: "name", label: "Full name", required: true },
  { name: "organization", label: "Organization (optional)" },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
];

export function QueryForm({
  fields,
  submitLabel = "Submit",
  successTitle = "Received",
  successBody = "Thank you — a member of our team will be in touch shortly.",
}: QueryFormProps) {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const allFields = [...BASE_FIELDS, ...fields, { name: "message", label: "Message", type: "textarea" as const }];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    // Frontend intake only — wire to case-management backend before launch.
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <h2 className="font-heading text-xl font-semibold text-text">{successTitle}</h2>
        <p className="mt-2 font-body text-sm text-text-muted">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {allFields.map((field) => {
        const fieldId = `${formId}-${field.name}`;
        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label htmlFor={fieldId} className="font-body text-sm font-medium text-text">
              {field.label}
              {field.required && <span className="text-ember"> *</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={fieldId}
                name={field.name}
                required={field.required}
                rows={4}
                className="rounded-md border border-border bg-canvas px-4 py-2.5 font-body text-text outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            ) : field.type === "select" ? (
              <select
                id={fieldId}
                name={field.name}
                required={field.required}
                className="rounded-md border border-border bg-canvas px-4 py-2.5 font-body text-text outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                defaultValue=""
              >
                <option value="" disabled>
                  Select&hellip;
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={fieldId}
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                className="rounded-md border border-border bg-canvas px-4 py-2.5 font-body text-text outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            )}
          </div>
        );
      })}
      <Button type="submit" variant="primary" size="lg" loading={loading} className="mt-2 self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
