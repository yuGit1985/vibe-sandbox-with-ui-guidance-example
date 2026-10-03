"use client";

import { useState } from "react";
import { InMemoryCustomerRepository } from "@/fakes/in-memory-customer-repository";
import { CustomerDirectoryController } from "@/inputs/customer-directory-controller";
import { CustomerDirectoryScreen } from "@/ui/screens/customer-directory-screen";
import { CustomerDirectory } from "@/usecases/customer-directory";

export default function Home() {
  const [controller] = useState(
    () =>
      new CustomerDirectoryController(
        new CustomerDirectory(new InMemoryCustomerRepository()),
      ),
  );

  return <CustomerDirectoryScreen controller={controller} />;
}
