"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  MessageSquare,
  PenLine,
  Scale,
  Siren,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChoiceCards,
  ChoicePills,
  ChoiceSelect,
  FieldError,
  FieldHint,
  FieldLabel,
  FileDrop,
  MAX_ATTACHMENT_BYTES,
  inputClass,
} from "@/components/forms/controls";
import { cn } from "@/lib/utils";

export interface QueryField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "file" | "date" | "month" | "url";
  required?: boolean;
  placeholder?: string;
  // Takes half the row from small screens up, so short fields sit in pairs.
  half?: boolean;
  options?: string[];
  // A select's options in labelled groups.
  optionGroups?: { label: string; options: string[] }[];
  // A select whose options depend on another select's current value.
  optionsFrom?: { field: string; map: Record<string, string[]> };
  // Only shown (and submitted) while another select has one of these values.
  showWhen?: { field: string; values: string[] };
  defaultValue?: string;
  inputMode?: "numeric" | "text";
  // Renders the sub-fields side by side under one label (e.g. a case
  // reference split into case type | case number | year).
  group?: QueryField[];
  // How a select is drawn. Left out, short option sets become pills, mid-sized
  // ones cards, and long or dependent lists a dropdown.
  display?: "pills" | "cards" | "cards-large" | "select" | "tiles";
}

/**
 * The shape of a form follows its purpose:
 * - filing: a case filed in steps, ending on a review of everything entered
 * - application: one page in titled sections, for committees to assess
 * - registration: choose first, then a ticket that sums up the choice
 * - enquiry: a conversation — what it's about, who's asking, the message
 * - subscribe: a single line
 */
export type FormKind = "filing" | "application" | "registration" | "enquiry" | "subscribe";

export interface FormSection {
  title: string;
  description?: string;
  // Field names, including the built-in name, organization, email, phone,
  // message and attachments.
  fields: string[];
}

export interface QueryFormProps {
  // Names the form in the email the Secretariat receives.
  formName: string;
  fields: QueryField[];
  kind?: FormKind;
  sections?: FormSection[];
  // "urgent" flags a same-day process (emergency arbitration).
  tone?: "urgent";
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  messageLabel?: string;
  messageRequired?: boolean;
  // Leaves out the free-text message box.
  noMessage?: boolean;
  // Adds a document upload after the message, labelled with this text.
  attachmentsLabel?: string;
  organization?: "optional" | "required" | "hidden";
  organizationLabel?: string;
  // "either": email or phone, at least one. "email": email only (newsletters).
  contact?: "either" | "email";
}

// Email and phone are each optional, but at least one is required
// (client brief: "Either email or phone").
function baseFields(
  organization: QueryFormProps["organization"],
  organizationLabel: string | undefined,
  contact: QueryFormProps["contact"],
): QueryField[] {
  const fields: QueryField[] = [{ name: "name", label: "Full name", required: true, half: organization !== "hidden" }];
  if (organization !== "hidden") {
    fields.push({
      name: "organization",
      label: organizationLabel ?? (organization === "required" ? "Organization" : "Organization (optional)"),
      required: organization === "required",
      half: true,
    });
  }
  if (contact === "email") {
    fields.push({ name: "email", label: "Email", type: "email", required: true });
  } else {
    fields.push({ name: "email", label: "Email", type: "email", half: true }, { name: "phone", label: "Phone", type: "tel", half: true });
  }
  return fields;
}

const GROUP_ICONS: Record<string, LucideIcon> = {
  Disputes: Scale,
  Drafting: PenLine,
  "Training & Careers": GraduationCap,
  "Join Adjudix": Users,
  Other: MessageSquare,
};

const isChoice = (field: QueryField) => field.type === "select";

function displayOf(field: QueryField, kind: FormKind, firstSection: boolean): NonNullable<QueryField["display"]> | "input" {
  if (field.display) return field.display;
  if (!isChoice(field)) return "input";
  if (field.optionGroups || field.optionsFrom) return "select";
  const options = field.options ?? [];
  const longest = Math.max(0, ...options.map((option) => option.length));
  if (kind === "registration" && firstSection && options.length <= 6) return "cards-large";
  if (options.length <= 5 && longest <= 22) return "pills";
  if (options.length <= 6) return "cards";
  return "select";
}

function validate(field: QueryField, raw: FormDataEntryValue | null): string | undefined {
  if (field.type === "file") return undefined;
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) {
    if (!field.required) return undefined;
    return isChoice(field) ? "Choose one of the options." : "This field is required.";
  }
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter an email address like name@example.com.";
  }
  if (field.type === "url" && !/^https?:\/\/[^\s.]+\.\S+$/.test(value)) {
    return "Enter the full web address, starting with https://.";
  }
  return undefined;
}

const flatten = (fields: QueryField[]) =>
  fields.flatMap((field) => (field.group ? field.group.map((sub) => ({ ...sub, required: sub.required ?? field.required })) : [field]));

export function QueryForm({
  formName,
  fields,
  kind = "application",
  sections: declaredSections,
  tone,
  submitLabel = "Submit",
  successTitle = "Received",
  successBody = "Thank you — a member of our team will be in touch shortly.",
  messageLabel = "Message",
  messageRequired,
  noMessage,
  attachmentsLabel,
  organization = "optional",
  organizationLabel,
  contact = "either",
}: QueryFormProps) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const headingRefs = useRef<(HTMLElement | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  // From the server: the reference quoted in both emails, and whether the
  // acknowledgement reached the visitor's inbox.
  const [receipt, setReceipt] = useState<{ reference?: string; acknowledged?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachmentBytes, setAttachmentBytes] = useState(0);
  const [step, setStep] = useState(0);
  const [review, setReview] = useState<{ title: string; items: { label: string; value: string }[] }[]>([]);
  const stepChanged = useRef(false);

  const declaredFields: QueryField[] = [
    ...baseFields(organization, organizationLabel, contact),
    ...fields,
    ...(noMessage ? [] : [{ name: "message", label: messageLabel, type: "textarea" as const, required: messageRequired }]),
    ...(attachmentsLabel ? [{ name: "attachments", label: attachmentsLabel, type: "file" as const }] : []),
  ];

  // Current choice values, so dependent fields can appear and re-filter.
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(declaredFields.filter((f) => f.defaultValue).map((f) => [f.name, f.defaultValue!])),
  );
  const isShown = (field: QueryField) =>
    !field.showWhen || field.showWhen.values.includes(selected[field.showWhen.field] ?? "");
  const resolve = (field: QueryField): QueryField =>
    field.optionsFrom ? { ...field, options: field.optionsFrom.map[selected[field.optionsFrom.field] ?? ""] ?? [] } : field;
  const byName = new Map(declaredFields.map((field) => [field.name, field]));

  // Every declared field lands in exactly one section; anything a section
  // list leaves out joins the last one, so no field is ever dropped.
  const sections: FormSection[] = (() => {
    const base = declaredSections?.length
      ? declaredSections.map((section) => ({ ...section, fields: section.fields.filter((name) => byName.has(name)) }))
      : [{ title: "", fields: [] as string[] }];
    const placed = new Set(base.flatMap((section) => section.fields));
    const rest = declaredFields.map((field) => field.name).filter((name) => !placed.has(name));
    base[base.length - 1] = { ...base[base.length - 1], fields: [...base[base.length - 1].fields, ...rest] };
    return base.filter((section) => section.fields.length > 0);
  })();

  function onSelect(name: string, value: string) {
    setSelected((current) => {
      const next = { ...current, [name]: value };
      // Clear dependants whose options no longer include their value.
      for (const field of declaredFields) {
        if (field.optionsFrom?.field === name && !(field.optionsFrom.map[value] ?? []).includes(next[field.name])) {
          delete next[field.name];
        }
      }
      return next;
    });
    clearError(name);
  }

  function clearError(name: string) {
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  // Field labels travel with the submission so the email reads naturally.
  const labels = Object.fromEntries(
    declaredFields.flatMap((field) =>
      field.group ? field.group.map((sub) => [sub.name, `${field.label} — ${sub.label}`]) : [[field.name, field.label]],
    ),
  );

  /** Checks the given sections; returns the errors found (also shown inline). */
  function check(sectionIndexes: number[]): Record<string, string> {
    const data = new FormData(formRef.current!);
    const found: Record<string, string> = {};
    for (const index of sectionIndexes) {
      const shown = sections[index].fields.map((name) => byName.get(name)!).filter(isShown);
      for (const field of flatten(shown)) {
        const message = validate(field, data.get(field.name));
        if (message) found[field.name] = message;
      }
      const names = sections[index].fields;
      if (contact === "either" && names.includes("email")) {
        const email = String(data.get("email") ?? "").trim();
        const phone = String(data.get("phone") ?? "").trim();
        if (!email && !phone) found.email = "Enter an email address or a phone number, so we can reach you.";
      }
      if (names.includes("attachments") && attachmentBytes > MAX_ATTACHMENT_BYTES) {
        found.attachments = "Attachments must total 10 MB or less. Remove a file or send a smaller copy.";
      }
    }
    setErrors((current) => {
      const next = { ...current };
      for (const index of sectionIndexes) {
        for (const name of flatten(sections[index].fields.map((n) => byName.get(n)!)).map((f) => f.name)) delete next[name];
      }
      return { ...next, ...found };
    });
    return found;
  }

  function focusField(name: string) {
    const form = formRef.current;
    if (!form) return;
    const target =
      form.querySelector<HTMLElement>(`#${CSS.escape(`${formId}-${name}`)}`) ??
      form.querySelector<HTMLElement>(`[name="${CSS.escape(name)}"]`);
    target?.focus();
  }

  const isFiling = kind === "filing";
  const reviewStep = sections.length;

  function goTo(next: number) {
    if (next === reviewStep) {
      const data = new FormData(formRef.current!);
      setReview(
        sections.map((section) => ({
          title: section.title,
          items: flatten(section.fields.map((name) => byName.get(name)!).filter(isShown))
            .map((field) => {
              const value =
                field.type === "file"
                  ? data
                      .getAll(field.name)
                      .filter((entry): entry is File => entry instanceof File && entry.size > 0)
                      .map((file) => file.name)
                      .join(", ")
                  : String(data.get(field.name) ?? "").trim();
              return { label: labels[field.name] ?? field.label, value };
            })
            .filter((item) => item.value),
        })),
      );
    }
    stepChanged.current = true;
    setStep(next);
  }

  // A new step starts at the top of the form, with focus on its heading.
  useEffect(() => {
    if (!stepChanged.current) return;
    formRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    headingRefs.current[step]?.focus({ preventScroll: true });
  }, [step]);

  function advance() {
    const found = check([step]);
    const first = Object.keys(found)[0];
    if (first) {
      focusField(first);
      return;
    }
    goTo(step + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFiling && step < reviewStep) {
      advance();
      return;
    }
    const found = check(sections.map((_, index) => index));
    const first = Object.keys(found)[0];
    if (first) {
      if (isFiling) {
        const owner = sections.findIndex((section) =>
          flatten(section.fields.map((n) => byName.get(n)!)).some((f) => f.name === first),
        );
        goTo(Math.max(0, owner));
        requestAnimationFrame(() => focusField(first));
      } else {
        focusField(first);
      }
      return;
    }
    setSendError("");
    setLoading(true);
    const data = new FormData(event.currentTarget);
    data.set("_form", formName);
    data.set("_labels", JSON.stringify(labels));
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: data });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "We couldn't send your submission. Please try again.");
      }
      setReceipt((await response.json().catch(() => null)) ?? {});
      setSubmitted(true);
    } catch (cause) {
      setSendError(cause instanceof Error ? cause.message : "We couldn't send your submission. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="flex flex-col items-center px-4 py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 ring-8 ring-primary/8">
          <Check className="size-6 text-primary-ink" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-heading text-2xl font-semibold text-balance text-foreground">{successTitle}</h2>
        <p className="mt-3 max-w-md text-center font-body text-[0.95rem] leading-relaxed text-muted-foreground">
          {successBody}
        </p>
        {receipt.reference && (
          <div className="mt-6 rounded-lg border border-border bg-muted px-6 py-4">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your reference</p>
            <p className="mt-1 font-mono text-lg font-semibold tracking-wider text-foreground">{receipt.reference}</p>
          </div>
        )}
        {receipt.acknowledged && (
          <p className="mt-4 max-w-md text-center font-body text-sm text-muted-foreground">
            A confirmation has been sent to your email. If it isn&apos;t in your inbox, check spam or promotions.
          </p>
        )}
      </div>
    );
  }

  // ── Field rendering ────────────────────────────────────────────────────
  const contactHintId = `${formId}-contact-hint`;

  function renderField(raw: QueryField, sectionIndex: number): ReactNode {
    if (!isShown(raw)) return null;
    const field = resolve(raw);
    const fieldId = `${formId}-${field.name}`;
    const errorId = `${fieldId}-error`;
    const error = errors[field.name];

    if (field.group) {
      return (
        <fieldset key={field.name} className="sm:col-span-2">
          <FieldLabel as="legend" required={field.required}>
            {field.label}
          </FieldLabel>
          <div className="grid gap-3 sm:grid-cols-3">
            {field.group.map((sub) => {
              const subId = `${formId}-${sub.name}`;
              const subField = { ...sub, required: sub.required ?? field.required };
              return (
                <div key={sub.name}>
                  <label htmlFor={subId} className="mb-1.5 block font-body text-xs text-muted-foreground">
                    {sub.label}
                  </label>
                  {isChoice(subField) ? (
                    <ChoiceSelect
                      id={subId}
                      name={sub.name}
                      options={sub.options}
                      value={selected[sub.name]}
                      invalid={!!errors[sub.name]}
                      describedBy={`${subId}-error`}
                      onChange={(value) => onSelect(sub.name, value)}
                    />
                  ) : (
                    <TextControl field={subField} id={subId} invalid={!!errors[sub.name]} describedBy={`${subId}-error`} />
                  )}
                  <FieldError id={`${subId}-error`} message={errors[sub.name]} />
                </div>
              );
            })}
          </div>
        </fieldset>
      );
    }

    const display = displayOf(field, kind, sectionIndex === 0);
    // Pills stay in a half column only when two or three short ones fit.
    const pillsFitHalf =
      display === "pills" && (field.options?.length ?? 0) <= 3 && (field.options ?? []).join("").length <= 24;
    const wide =
      !field.half || display === "cards" || display === "cards-large" || display === "tiles" || (display === "pills" && !pillsFitHalf);

    if (display === "tiles") {
      return (
        <QueryTiles
          key={field.name}
          id={fieldId}
          field={field}
          value={selected[field.name]}
          error={error}
          onChange={(value) => onSelect(field.name, value)}
        />
      );
    }

    if (display === "pills" || display === "cards" || display === "cards-large") {
      const Choice = display === "pills" ? ChoicePills : ChoiceCards;
      return (
        <div key={field.name} role="group" aria-labelledby={`${fieldId}-legend`} className={cn(wide && "sm:col-span-2")}>
          <FieldLabel as="span" required={field.required}>
            <span id={`${fieldId}-legend`}>{field.label}</span>
          </FieldLabel>
          <Choice
            id={fieldId}
            name={field.name}
            options={field.options ?? []}
            value={selected[field.name]}
            invalid={!!error}
            describedBy={errorId}
            onChange={(value) => onSelect(field.name, value)}
            {...(display === "cards-large" ? { large: true } : {})}
          />
          <FieldError id={errorId} message={error} />
        </div>
      );
    }

    if (display === "select") {
      return (
        <div key={field.name} className={cn(wide && "sm:col-span-2")}>
          <FieldLabel htmlFor={fieldId} required={field.required}>
            {field.label}
          </FieldLabel>
          <ChoiceSelect
            id={fieldId}
            name={field.name}
            options={field.options}
            groups={field.optionGroups}
            value={selected[field.name]}
            invalid={!!error}
            describedBy={errorId}
            onChange={(value) => onSelect(field.name, value)}
          />
          <FieldError id={errorId} message={error} />
        </div>
      );
    }

    if (field.type === "file") {
      return (
        <div key={field.name} className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
          <FileDrop
            id={fieldId}
            name={field.name}
            error={error}
            describedBy={errorId}
            onFilesChange={(files) => {
              setAttachmentBytes(files.reduce((sum, file) => sum + file.size, 0));
              clearError(field.name);
            }}
          />
          <FieldError id={errorId} message={error} />
        </div>
      );
    }

    const isContact = contact === "either" && (field.name === "email" || field.name === "phone");
    const describedBy = [errorId, isContact ? contactHintId : ""].filter(Boolean).join(" ");
    return (
      <div key={field.name} className={cn(wide && "sm:col-span-2")}>
        <FieldLabel htmlFor={fieldId} required={field.required}>
          {field.label}
        </FieldLabel>
        <TextControl
          field={field}
          id={fieldId}
          invalid={!!error}
          describedBy={describedBy}
          onBlur={(value) => {
            const message = validate(field, value);
            setErrors((current) => {
              const next = { ...current };
              if (message) next[field.name] = message;
              else delete next[field.name];
              return next;
            });
          }}
          onInput={() => clearError(field.name)}
        />
        <FieldError id={errorId} message={error} />
        {isContact && field.name === "email" && !error && (
          <FieldHint id={contactHintId}>
            Email <strong className="font-semibold">or</strong> phone — at least one is required.
          </FieldHint>
        )}
      </div>
    );
  }

  const renderFields = (section: FormSection, index: number) => (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
      {section.fields.map((name) => renderField(byName.get(name)!, index))}
    </div>
  );

  const sendAlert = (
    <p role="alert" className="font-body text-sm text-ember empty:hidden">
      {sendError}
    </p>
  );

  const submitButton = (className?: string) => (
    <Button
      type="submit"
      variant={tone === "urgent" ? "ember" : "primary"}
      size="lg"
      loading={loading}
      className={cn("h-12 px-6 text-[0.95rem]", className)}
    >
      {submitLabel}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Button>
  );

  const formProps = {
    ref: formRef,
    onSubmit: handleSubmit,
    noValidate: true,
    "data-form-kind": kind,
  };
  const honeypot = (
    // Honeypot for bots; hidden from people and assistive tech.
    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
  );

  // ── Filing: steps, then a review ───────────────────────────────────────
  if (isFiling) {
    const titles = [...sections.map((section) => section.title), "Review"];
    return (
      <form {...formProps} className="flex scroll-mt-24 flex-col gap-7 md:scroll-mt-56">
        {honeypot}
        <Stepper titles={titles} current={step} onJump={(index) => index < step && goTo(index)} />
        {tone === "urgent" && step === 0 && (
          <div className="flex items-start gap-3 rounded-xl bg-ember/8 px-4 py-3 font-body text-sm text-foreground ring-1 ring-ember/25 ring-inset">
            <Siren className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden="true" />
            <p className="text-left">
              <strong className="font-semibold">Same-day review.</strong> The Secretariat reviews every emergency application
              on the day it is received.
            </p>
          </div>
        )}
        {sections.map((section, index) => (
          <section key={section.title} hidden={step !== index} aria-labelledby={`${formId}-step-${index}`}>
            <StepHeading
              id={`${formId}-step-${index}`}
              ref={(node) => {
                headingRefs.current[index] = node;
              }}
              index={index}
              total={titles.length}
              title={section.title}
              description={section.description}
            />
            {renderFields(section, index)}
          </section>
        ))}
        <section hidden={step !== reviewStep} aria-labelledby={`${formId}-step-${reviewStep}`}>
          <StepHeading
            id={`${formId}-step-${reviewStep}`}
            ref={(node) => {
              headingRefs.current[reviewStep] = node;
            }}
            index={reviewStep}
            total={titles.length}
            title="Review your filing"
            description="Check the details below before you submit. Use Edit to change anything."
          />
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-canvas">
            {review.map((group, index) => (
              <div key={group.title} className="px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-heading text-base font-semibold text-foreground">{group.title}</h4>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    className="rounded-md px-2 py-1 font-body text-sm font-medium text-primary-ink underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                  >
                    Edit<span className="sr-only"> {group.title}</span>
                  </button>
                </div>
                {group.items.length ? (
                  <dl className="mt-2 grid gap-x-6 gap-y-2 font-body text-sm sm:grid-cols-[minmax(0,14rem)_1fr]">
                    {group.items.map((item) => (
                      <div key={item.label} className="contents">
                        <dt className="text-muted-foreground">{item.label}</dt>
                        <dd className="text-left break-words whitespace-pre-line text-foreground">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-2 font-body text-sm text-muted-foreground">Nothing entered.</p>
                )}
              </div>
            ))}
          </div>
        </section>
        {sendAlert}
        <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" size="lg" className="h-12 px-3 no-underline" onClick={() => goTo(step - 1)}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </Button>
          ) : (
            <span className="font-body text-xs text-muted-foreground">
              <span className="text-ember">*</span> Required
            </span>
          )}
          {step < reviewStep ? (
            <Button type="button" variant="primary" size="lg" className="h-12 px-6 text-[0.95rem]" onClick={advance}>
              {step === reviewStep - 1 ? "Review" : "Continue"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          ) : (
            submitButton()
          )}
        </div>
      </form>
    );
  }

  // ── Subscribe: one line ────────────────────────────────────────────────
  if (kind === "subscribe") {
    const others = declaredFields.filter((field) => !["name", "email"].includes(field.name));
    const name = byName.get("name")!;
    const email = byName.get("email")!;
    return (
      <form {...formProps} className="flex flex-col gap-6">
        {honeypot}
        {others.length > 0 && <div className="grid gap-6">{others.map((field) => renderField(field, 0))}</div>}
        <div className="grid items-start gap-3 sm:grid-cols-[1fr_1.3fr_auto]">
          {[name, email].map((field) => {
            const id = `${formId}-${field.name}`;
            return (
              <div key={field.name}>
                <label htmlFor={id} className="sr-only">
                  {field.label}
                </label>
                <TextControl
                  field={{ ...field, placeholder: field.name === "name" ? "Your name" : "you@example.com" }}
                  id={id}
                  invalid={!!errors[field.name]}
                  describedBy={`${id}-error`}
                  onInput={() => clearError(field.name)}
                />
                <FieldError id={`${id}-error`} message={errors[field.name]} />
              </div>
            );
          })}
          {submitButton("w-full sm:w-auto")}
        </div>
        <p className="font-body text-xs text-muted-foreground">No more than twice a month. Unsubscribe from any email.</p>
        {sendAlert}
      </form>
    );
  }

  // ── Registration: choose, then a ticket that sums up the choice ────────
  if (kind === "registration") {
    const [choose, ...rest] = sections;
    const summary = choose.fields
      .map((name) => byName.get(name)!)
      .filter((field) => isChoice(field) && isShown(field) && selected[field.name])
      .map((field) => ({ label: field.label, value: selected[field.name] }));
    return (
      <form {...formProps} className="flex flex-col gap-10">
        {honeypot}
        <SectionBlock title={choose.title} description={choose.description}>
          {renderFields(choose, 0)}
        </SectionBlock>
        {rest.map((section, index) => (
          <SectionBlock key={section.title} title={section.title} description={section.description} ruled>
            {renderFields(section, index + 1)}
          </SectionBlock>
        ))}
        {sendAlert}
        <div className="grid overflow-hidden rounded-2xl border border-border bg-canvas shadow-[0_16px_36px_-24px_rgb(15_31_61/0.55)] sm:grid-cols-[1fr_auto]">
          <div className="px-6 py-5">
            <p className="font-body text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">Your registration</p>
            {summary.length ? (
              <dl className="mt-3 grid gap-x-6 gap-y-2 font-body text-sm sm:grid-cols-2">
                {summary.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs text-muted-foreground">{item.label}</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-2 font-body text-sm text-muted-foreground">Your choices will appear here.</p>
            )}
          </div>
          <div className="relative flex items-center justify-center border-t border-dashed border-border bg-primary/8 px-6 py-5 sm:border-t-0 sm:border-l">
            <span
              aria-hidden="true"
              className="absolute -top-2.5 -left-2.5 hidden size-5 rounded-full border border-border bg-(--form-ground,var(--color-canvas)) sm:block"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2.5 -left-2.5 hidden size-5 rounded-full border border-border bg-(--form-ground,var(--color-canvas)) sm:block"
            />
            {submitButton("w-full sm:w-auto")}
          </div>
        </div>
      </form>
    );
  }

  // ── Application & enquiry: titled sections on one page ─────────────────
  const conversational = kind === "enquiry";
  return (
    <form {...formProps} className={cn("flex flex-col", conversational ? "gap-9" : "gap-10")}>
      {honeypot}
      {sections.map((section, index) => (
        <SectionBlock
          key={section.title || index}
          title={section.title}
          description={section.description}
          ruled={!conversational && index > 0}
          prompt={conversational}
        >
          {renderFields(section, index)}
        </SectionBlock>
      ))}
      {sendAlert}
      <div
        className={cn(
          "flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between",
          !conversational && "border-t border-border pt-6",
        )}
      >
        <p className="font-body text-xs text-muted-foreground">
          <span className="text-ember">*</span> Required
        </p>
        {submitButton()}
      </div>
    </form>
  );
}

function TextControl({
  field,
  id,
  invalid,
  describedBy,
  onBlur,
  onInput,
}: {
  field: QueryField;
  id: string;
  invalid?: boolean;
  describedBy?: string;
  onBlur?: (value: string) => void;
  onInput?: () => void;
}) {
  const common = {
    id,
    name: field.name,
    "aria-required": field.required || undefined,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
    placeholder: field.placeholder,
    onBlur: onBlur ? (event: { target: { value: string } }) => onBlur(event.target.value) : undefined,
    onInput,
  };
  if (field.type === "textarea") {
    return <textarea {...common} rows={5} className={cn(inputClass, "scrollbar-refined h-auto min-h-32 resize-y py-3 leading-relaxed")} />;
  }
  const autoComplete =
    field.name === "name" ? "name" : field.name === "email" ? "email" : field.name === "phone" ? "tel" : field.name === "organization" ? "organization" : undefined;
  return (
    <input
      {...common}
      type={field.type ?? "text"}
      inputMode={field.inputMode}
      autoComplete={autoComplete}
      className={inputClass}
    />
  );
}

function SectionBlock({
  title,
  description,
  ruled,
  prompt,
  children,
}: {
  title: string;
  description?: string;
  ruled?: boolean;
  prompt?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={cn(ruled && "border-t border-border pt-8")}>
      {title && (
        <div className="mb-5">
          <h3
            className={cn(
              "text-left font-heading font-semibold text-balance text-foreground",
              prompt ? "text-xl" : "text-lg",
            )}
          >
            {title}
          </h3>
          {description && <p className="mt-1 text-left font-body text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

function Stepper({ titles, current, onJump }: { titles: string[]; current: number; onJump: (index: number) => void }) {
  return (
    <nav aria-label="Filing steps">
      <ol className="flex items-center">
        {titles.map((title, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={title} className={cn("flex items-center", index < titles.length - 1 && "flex-1")}>
              <button
                type="button"
                onClick={() => onJump(index)}
                disabled={!done}
                aria-current={active ? "step" : undefined}
                className="group flex items-center gap-2.5 rounded-full py-1 pr-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:cursor-default"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full font-body text-sm font-semibold tabular-nums transition-colors duration-200",
                    done && "bg-secondary-text text-canvas group-hover:bg-primary-ink",
                    active && "bg-primary text-primary-foreground ring-4 ring-primary/25",
                    !done && !active && "border border-border bg-canvas text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-4" strokeWidth={2.5} aria-hidden="true" /> : index + 1}
                </span>
                <span
                  className={cn(
                    "hidden font-body text-sm whitespace-nowrap md:inline",
                    active ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {title}
                  {done && <span className="sr-only"> (completed)</span>}
                </span>
              </button>
              {index < titles.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn("mx-2 h-px flex-1 transition-colors duration-300", done ? "bg-secondary-text" : "bg-border")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepHeading({
  id,
  ref,
  index,
  total,
  title,
  description,
}: {
  id: string;
  ref: (node: HTMLHeadingElement | null) => void;
  index: number;
  total: number;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <p className="font-body text-xs font-medium text-muted-foreground tabular-nums">
        Step {index + 1} of {total}
      </p>
      <h3
        id={id}
        ref={ref}
        tabIndex={-1}
        className="mt-1 text-left font-heading text-xl font-semibold text-balance text-foreground outline-none"
      >
        {title}
      </h3>
      {description && <p className="mt-1 text-left font-body text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

/** The general query: pick a topic, then the exact query within it. */
function QueryTiles({
  id,
  field,
  value,
  error,
  onChange,
}: {
  id: string;
  field: QueryField;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const groups = field.optionGroups ?? [];
  const owner = groups.find((group) => value && group.options.includes(value))?.label;
  const [open, setOpen] = useState<string | undefined>(owner);
  const active = groups.find((group) => group.label === (open ?? owner));
  const errorId = `${id}-error`;

  return (
    <div className="sm:col-span-2">
      <FieldLabel as="span" required={field.required}>
        <span id={`${id}-topic`}>{field.label}</span>
      </FieldLabel>
      <div role="group" aria-labelledby={`${id}-topic`} className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {groups.map((group, index) => {
          const Icon = GROUP_ICONS[group.label] ?? MessageSquare;
          const isOpen = active?.label === group.label;
          return (
            <button
              key={group.label}
              id={index === 0 ? id : undefined}
              type="button"
              aria-pressed={isOpen}
              onClick={() => setOpen(group.label)}
              className={cn(
                "flex min-h-20 flex-col items-start justify-between gap-2 rounded-xl border bg-canvas p-3.5 text-left font-body transition-[background-color,border-color,box-shadow] duration-150 outline-none",
                "hover:border-secondary-border/60 focus-visible:ring-4 focus-visible:ring-ring/25",
                isOpen
                  ? "border-secondary-text bg-secondary-text text-canvas shadow-[0_10px_24px_-16px_rgb(15_31_61/0.8)]"
                  : error
                    ? "border-ember/60 text-foreground"
                    : "border-border text-foreground",
              )}
            >
              <Icon className={cn("size-5", isOpen ? "text-primary" : "text-secondary-text")} aria-hidden="true" />
              <span className="text-sm leading-tight font-semibold">{group.label}</span>
            </button>
          );
        })}
      </div>
      {active && (
        <div className="mt-4 rounded-xl bg-surface p-4 ring-1 ring-border ring-inset">
          <p id={`${id}-pick`} className="mb-3 font-body text-sm font-medium text-foreground">
            {active.label}: which one?
          </p>
          <div role="radiogroup" aria-labelledby={`${id}-pick`} aria-describedby={errorId}>
            <ChoicePillsInline name={field.name} options={active.options} value={value} onChange={onChange} />
          </div>
        </div>
      )}
      {/* Keeps a prefilled query submittable before its topic is opened. */}
      {!active && value && <input type="hidden" name={field.name} value={value} />}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function ChoicePillsInline({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label
          key={option}
          className="group inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-canvas px-3.5 py-1.5 font-body text-sm text-foreground transition-colors duration-150 select-none hover:border-secondary-border/60 has-checked:border-primary-ink has-checked:bg-primary/15 has-checked:font-medium has-focus-visible:ring-4 has-focus-visible:ring-ring/25"
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          <Check
            className="size-0 text-primary-ink opacity-0 transition-all duration-150 group-has-checked:size-3.5 group-has-checked:opacity-100"
            aria-hidden="true"
          />
          {option}
        </label>
      ))}
    </div>
  );
}
