"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FixedAuthenticationGateway } from "@/fakes/fixed-authentication-gateway";
import { AuthenticateUser } from "@/usecases/authenticate-user";

const sessionCookieName = "knot-session";
const sessionDurationSeconds = 60 * 60 * 8;

export type LoginFormState = {
  message: string;
};

const authentication = () =>
  new AuthenticateUser(new FixedAuthenticationGateway());

export async function loginAction(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");
  const email = typeof rawEmail === "string" ? rawEmail : "";
  const password = typeof rawPassword === "string" ? rawPassword : "";
  const session = authentication().signIn(email, password);

  if (!session) {
    return {
      message: "メールアドレスまたはパスワードが正しくありません。",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, session.token, {
    httpOnly: true,
    maxAge: sessionDurationSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
  redirect("/");
}

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(sessionCookieName)?.value;
  return authentication().getCurrentUser(sessionToken);
}
