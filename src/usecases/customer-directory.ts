import type { Customer, CustomerRepository } from "@/ports/customer-repository";

type AddNoteInput = {
  customerId: string;
  body: string;
  author: string;
  createdAt: string;
  noteId: string;
};

export class CustomerDirectory {
  constructor(private readonly repository: CustomerRepository) {}

  searchCustomers(query: string): Customer[] {
    const normalizedQuery = query.trim().toLocaleLowerCase("ja");
    const customers = this.repository.findAll();

    if (!normalizedQuery) {
      return customers;
    }

    return customers.filter((customer) =>
      [customer.name, customer.nameKana].some((value) =>
        value.toLocaleLowerCase("ja").includes(normalizedQuery),
      ),
    );
  }

  getCustomer(customerId: string): Customer | undefined {
    return this.repository.findById(customerId);
  }

  addNote(input: AddNoteInput): Customer {
    const body = input.body.trim();
    if (!body) {
      throw new Error("メモを入力してください。");
    }

    return this.repository.addNote(input.customerId, {
      id: input.noteId,
      body,
      author: input.author,
      createdAt: input.createdAt,
    });
  }
}
