"use client";

import { useActionState } from "react";
import {
  type LoginFormState,
  loginAction,
} from "@/inputs/authentication-actions";
import { Icon } from "@/ui/components/icon";

const initialState: LoginFormState = { message: "" };

export function LoginForm({
  demoEmail,
  demoPassword,
}: {
  demoEmail: string;
  demoPassword: string;
}) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="login-form">
      <label htmlFor="email">メールアドレス</label>
      <div className="login-field">
        <Icon name="mail" size={18} />
        <input
          autoComplete="username"
          defaultValue={demoEmail}
          id="email"
          name="email"
          placeholder="name@company.jp"
          required
          type="email"
        />
      </div>

      <label htmlFor="password">パスワード</label>
      <div className="login-field">
        <Icon name="lock" size={18} />
        <input
          autoComplete="current-password"
          defaultValue={demoPassword}
          id="password"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </div>

      <p className="login-error" aria-live="polite">
        {state.message}
      </p>

      <button className="login-button" disabled={pending} type="submit">
        {pending ? "ログイン中..." : "ログイン"}
        <Icon name="arrow-right" size={17} />
      </button>
    </form>
  );
}
