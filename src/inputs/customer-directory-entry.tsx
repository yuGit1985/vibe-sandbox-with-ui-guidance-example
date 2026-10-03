"use client";

import { useState } from "react";
import { InMemoryCustomerRepository } from "@/fakes/in-memory-customer-repository";
import { InMemoryEmailGateway } from "@/fakes/in-memory-email-gateway";
import { CustomerDirectoryController } from "@/inputs/customer-directory-controller";
import type { AuthenticatedUser } from "@/ports/authentication-gateway";
import { CustomerDirectoryScreen } from "@/ui/screens/customer-directory-screen";
import { CustomerDirectory } from "@/usecases/customer-directory";
import { SendCustomerEmail } from "@/usecases/send-customer-email";

export function CustomerDirectoryEntry({ user }: { user: AuthenticatedUser }) {
  const [controller] = useState(() => {
    const customerRepository = new InMemoryCustomerRepository();
    return new CustomerDirectoryController(
      new CustomerDirectory(customerRepository),
      new SendCustomerEmail(customerRepository, new InMemoryEmailGateway()),
      user.name,
    );
  });

  return <CustomerDirectoryScreen controller={controller} user={user} />;
}
