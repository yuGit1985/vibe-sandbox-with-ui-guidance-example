import type {
  AuthenticatedSession,
  AuthenticatedUser,
  AuthenticationGateway,
} from "@/ports/authentication-gateway";

const demoUser: AuthenticatedUser = {
  id: "user-1",
  name: "佐藤 美咲",
  email: "misaki.sato@knot.example.jp",
  role: "セールスマネージャー",
};

const demoPassword = "knot-demo";
const demoSessionToken = "knot-demo-session-user-1";

export const demoCredentials = {
  email: demoUser.email,
  password: demoPassword,
};

export class FixedAuthenticationGateway implements AuthenticationGateway {
  authenticate(
    email: string,
    password: string,
  ): AuthenticatedSession | undefined {
    if (email !== demoUser.email || password !== demoPassword) {
      return undefined;
    }

    return {
      token: demoSessionToken,
      user: { ...demoUser },
    };
  }

  findUserBySessionToken(token: string): AuthenticatedUser | undefined {
    return token === demoSessionToken ? { ...demoUser } : undefined;
  }
}
