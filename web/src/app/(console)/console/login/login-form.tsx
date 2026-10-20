"use client";

import { useActionState } from "react";
import { consoleButton, consoleInput, Field, Notice } from "@/components/console/ui";
import { signIn, verifyCode, type FormState } from "./actions";

export function LoginForm({ notice }: { notice?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});
  return (
    <form action={action} className="flex flex-col gap-5">
      {notice && !state.error && <Notice tone="warning">{notice}</Notice>}
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Field label="Email" htmlFor="email">
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus className={`${consoleInput} h-11`} />
      </Field>
      <Field label="Password" htmlFor="password">
        <input id="password" name="password" type="password" autoComplete="current-password" required className={`${consoleInput} h-11`} />
      </Field>
      <button type="submit" disabled={pending} className={`${consoleButton.navy} h-12 w-full text-[0.95rem]`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        After 5 wrong attempts the account locks for 15 minutes.
      </p>
    </form>
  );
}

export function VerifyForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(verifyCode, {});
  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Field label="6-digit code" htmlFor="code" hint="From the authenticator app you set up for this account.">
        <input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]{6,7}"
          maxLength={7}
          required
          autoFocus
          className={`${consoleInput} h-14 text-center font-mono text-2xl tracking-[0.5em]`}
        />
      </Field>
      <button type="submit" disabled={pending} className={`${consoleButton.navy} h-12 w-full text-[0.95rem]`}>
        {pending ? "Checking…" : "Verify and continue"}
      </button>
    </form>
  );
}
