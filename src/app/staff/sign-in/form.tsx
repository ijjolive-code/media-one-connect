"use client";
import { useActionState } from "react";
import { signIn } from "../actions";
export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, {});
  return (
    <form action={action} className="staff-form sign-in-form">
      <label htmlFor="staff-email">Test staff email</label>
      <input
        id="staff-email"
        name="email"
        type="email"
        autoComplete="username"
        required
        maxLength={254}
      />
      <label htmlFor="staff-password">Password</label>
      <input
        id="staff-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        maxLength={256}
      />
      {state.error && (
        <p role="alert" className="form-error">
          {state.error}
        </p>
      )}
      <button className="button primary" disabled={pending} type="submit">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="form-hint">
        Access is assigned separately. Signing in alone does not grant editing
        permission.
      </p>
    </form>
  );
}
