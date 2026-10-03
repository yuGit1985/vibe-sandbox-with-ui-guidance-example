import type {
  AuthenticatedSession,
  AuthenticatedUser,
  AuthenticationGateway,
} from "@/ports/authentication-gateway";

export class AuthenticateUser {
  constructor(private readonly gateway: AuthenticationGateway) {}

  signIn(email: string, password: string): AuthenticatedSession | undefined {
    const normalizedEmail = email.trim().toLocaleLowerCase("en-US");
    if (!normalizedEmail || !password) {
      return undefined;
    }

    return this.gateway.authenticate(normalizedEmail, password);
  }

  getCurrentUser(
    sessionToken: string | undefined,
  ): AuthenticatedUser | undefined {
    if (!sessionToken) {
      return undefined;
    }

    return this.gateway.findUserBySessionToken(sessionToken);
  }
}
