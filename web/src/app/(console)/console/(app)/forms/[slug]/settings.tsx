"use client";

import { Switch } from "@/components/console/switch";
import { consoleInput, consoleTextarea, Field, Panel } from "@/components/console/ui";
import type { FormConfig } from "@/lib/forms/config";

const KINDS: { value: FormConfig["kind"]; label: string; hint: string }[] = [
  { value: "application", label: "Application", hint: "One page in titled sections, for a committee to assess." },
  { value: "enquiry", label: "Enquiry", hint: "A conversation: what it's about, who's asking, the message." },
  { value: "filing", label: "Filing in steps", hint: "One section per step, ending on a review of every answer." },
  { value: "registration", label: "Registration", hint: "Choose first, then a ticket that sums up the choice." },
  { value: "subscribe", label: "Subscribe", hint: "A single line: name, email, button." },
];

export function FormSettings({
  form,
  onForm,
  readOnly,
  canStructure,
}: {
  form: FormConfig;
  onForm: (patch: Partial<FormConfig>) => void;
  readOnly: boolean;
  canStructure: boolean;
}) {
  return (
    <fieldset disabled={readOnly} className="grid min-w-0 gap-5 lg:grid-cols-2">
      <Panel title="Heading" description="What visitors see above the form." bodyClassName="flex flex-col gap-4">
        <Field label="Title" htmlFor="s-title">
          <input id="s-title" value={form.title} onChange={(e) => onForm({ title: e.target.value })} className={consoleInput} />
        </Field>
        <Field label="Introduction" htmlFor="s-intro" hint="One or two sentences: what happens after they submit.">
          <textarea id="s-intro" rows={3} value={form.intro} onChange={(e) => onForm({ intro: e.target.value })} className={consoleTextarea} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Section (breadcrumb)" htmlFor="s-section">
            <input id="s-section" value={form.section.label} onChange={(e) => onForm({ section: { ...form.section, label: e.target.value } })} className={consoleInput} />
          </Field>
          <Field label="Section page" htmlFor="s-section-href">
            <input id="s-section-href" value={form.section.href} onChange={(e) => onForm({ section: { ...form.section, href: e.target.value } })} className={`${consoleInput} font-mono text-[0.8rem]`} />
          </Field>
        </div>
      </Panel>

      <Panel title="Layout" description="The shape follows the form's purpose." bodyClassName="flex flex-col gap-2">
        <div role="radiogroup" aria-label="Layout" className="flex flex-col gap-2">
          {KINDS.map((kind) => (
            <button
              key={kind.value}
              type="button"
              role="radio"
              aria-checked={form.kind === kind.value}
              disabled={!canStructure}
              onClick={() => onForm({ kind: kind.value })}
              className={`flex flex-col items-start rounded-xl border px-4 py-3 text-left transition-colors disabled:opacity-60 ${form.kind === kind.value ? "border-primary bg-(--color-gold-100)" : "border-border hover:bg-surface"}`}
            >
              <span className="text-sm font-semibold">{kind.label}</span>
              <span className="text-xs text-muted-foreground">{kind.hint}</span>
            </button>
          ))}
        </div>
        <Switch
          className="mt-3"
          label="Urgent"
          description="Red submit button and a same-day notice, as on Emergency Arbitration."
          checked={form.tone === "urgent"}
          onChange={(on) => onForm({ tone: on ? "urgent" : undefined })}
        />
      </Panel>

      <Panel title="Submit button and confirmation" bodyClassName="flex flex-col gap-4">
        <Field label="Button label" htmlFor="s-submit">
          <input id="s-submit" value={form.submitLabel} onChange={(e) => onForm({ submitLabel: e.target.value })} className={consoleInput} />
        </Field>
        <Field label="Confirmation heading" htmlFor="s-success-title">
          <input id="s-success-title" value={form.successTitle} onChange={(e) => onForm({ successTitle: e.target.value })} className={consoleInput} />
        </Field>
        <Field label="Confirmation message" htmlFor="s-success-body" hint="Shown after sending, and repeated in the visitor's acknowledgement email.">
          <textarea id="s-success-body" rows={3} value={form.successBody} onChange={(e) => onForm({ successBody: e.target.value })} className={consoleTextarea} />
        </Field>
      </Panel>

      <Panel title="Delivery and closing" bodyClassName="flex flex-col gap-4">
        <Field label="Deliver to" htmlFor="s-inbox" hint="Every entry also lands in Submissions here.">
          <select id="s-inbox" value={form.inbox} onChange={(e) => onForm({ inbox: e.target.value as FormConfig["inbox"] })} className={consoleInput}>
            <option value="query">Query mailbox (query@adjudixADR.com)</option>
            <option value="secretariat">Secretariat (case filings)</option>
          </select>
        </Field>
        <Field label="While closed, show this heading" htmlFor="s-closed-title">
          <input id="s-closed-title" value={form.closedTitle} onChange={(e) => onForm({ closedTitle: e.target.value })} className={consoleInput} />
        </Field>
        <Field label="…and this message" htmlFor="s-closed-body">
          <textarea id="s-closed-body" rows={3} value={form.closedBody} onChange={(e) => onForm({ closedBody: e.target.value })} className={consoleTextarea} />
        </Field>
      </Panel>
    </fieldset>
  );
}
