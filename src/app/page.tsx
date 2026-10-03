import { demoCredentials } from "@/fakes/fixed-authentication-gateway";
import { getAuthenticatedUser } from "@/inputs/authentication-actions";
import { CustomerDirectoryEntry } from "@/inputs/customer-directory-entry";
import { LoginScreen } from "@/ui/screens/login-screen";

export default async function Home() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return (
      <LoginScreen
        demoEmail={demoCredentials.email}
        demoPassword={demoCredentials.password}
      />
    );
  }

  return <CustomerDirectoryEntry user={user} />;
}
