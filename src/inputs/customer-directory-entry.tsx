"use client";

import { useState } from "react";
import { InMemoryCustomerRepository } from "@/fakes/in-memory-customer-repository";
import { CustomerDirectoryController } from "@/inputs/customer-directory-controller";
import type { AuthenticatedUser } from "@/ports/authentication-gateway";
import { CustomerDirectoryScreen } from "@/ui/screens/customer-directory-screen";
import { CustomerDirectory } from "@/usecases/customer-directory";

export function CustomerDirectoryEntry({ user }: { user: AuthenticatedUser }) {
  const [controller] = useState(
    () =>
      new CustomerDirectoryController(
        new CustomerDirectory(new InMemoryCustomerRepository()),
        user.name,
      ),
  );

  return <CustomerDirectoryScreen controller={controller} user={user} />;
}
