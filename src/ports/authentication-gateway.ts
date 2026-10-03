export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthenticatedSession = {
  token: string;
  user: AuthenticatedUser;
};

export interface AuthenticationGateway {
  authenticate(
    email: string,
    password: string,
  ): AuthenticatedSession | undefined;
  findUserBySessionToken(token: string): AuthenticatedUser | undefined;
}
