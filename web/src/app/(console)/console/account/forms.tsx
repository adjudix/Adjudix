"use client";

import { useActionState } from "react";
import { consoleButton, consoleInput, Field, Notice } from "@/components/console/ui";
import { changePassword, confirmTwoStep, disableTwoStep, type AccountState } from "./actions";

export function PasswordForm() {
  const [state, action, pending] = useActionState<AccountState, FormData>(changePassword, {});
  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Field label="Current password" htmlFor="current">
        <input id="current" name="current" type="password" autoComplete="current-password" required className={consoleInput} />
      </Field>
      <Field label="New password" htmlFor="next" hint="At least 12 characters. A short sentence works well.">
        <input id="next" name="next" type="password" autoComplete="new-password" minLength={12} required className={consoleInput} />
      </Field>
      <Field label="New password, again" htmlFor="confirm">
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={12} required className={consoleInput} />
      </Field>
      <button type="submit" disabled={pending} className={`${consoleButton.navy} h-11 w-full`}>
        {pending ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}

export function TwoStepConfirmForm() {
  const [state, action, pending] = useActionState<AccountState, FormData>(confirmTwoStep, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Field label="Enter the 6-digit code it shows" htmlFor="code">
        <input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={7}
          required
          className={`${consoleInput} h-12 text-center font-mono text-xl tracking-[0.45em]`}
        />
      </Field>
      <button type="submit" disabled={pending} className={`${consoleButton.navy} h-11 w-full`}>
        {pending ? "Checking…" : "Turn on two-step verification"}
      </button>
    </form>
  );
}

export function TwoStepDisableForm() {
  const [state, action, pending] = useActionState<AccountState, FormData>(disableTwoStep, {});
  if (state.done) return <Notice tone="success">Two-step verification is off for your account.</Notice>;
  return (
    <form action={action} className="flex flex-col gap-4">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Field label="Confirm with your password" htmlFor="password">
        <input id="password" name="password" type="password" autoComplete="current-password" required className={consoleInput} />
      </Field>
      <button type="submit" disabled={pending} className={`${consoleButton.danger} w-full`}>
        Turn off two-step verification
      </button>
    </form>
  );
}
