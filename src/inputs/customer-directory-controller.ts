import type { Customer } from "@/ports/customer-repository";
import type { CustomerDirectory } from "@/usecases/customer-directory";

export class CustomerDirectoryController {
  constructor(
    private readonly directory: CustomerDirectory,
    private readonly author: string,
    private readonly now: () => Date = () => new Date(),
    private readonly createId: () => string = () => crypto.randomUUID(),
  ) {}

  search(rawQuery: string): Customer[] {
    return this.directory.searchCustomers(rawQuery);
  }

  find(customerId: string): Customer | undefined {
    return this.directory.getCustomer(customerId);
  }

  addNote(customerId: string, rawBody: string): Customer {
    return this.directory.addNote({
      customerId,
      body: rawBody,
      author: this.author,
      createdAt: this.now().toISOString(),
      noteId: this.createId(),
    });
  }
}
