import type {
  Customer,
  CustomerRepository,
  CustomerUpdate,
} from "@/ports/customer-repository";

type AddNoteInput = {
  customerId: string;
  body: string;
  author: string;
  createdAt: string;
  noteId: string;
};

type UpdateCustomerInput = CustomerUpdate & {
  customerId: string;
};

const requiredFields: Array<[keyof CustomerUpdate, string]> = [
  ["name", "氏名"],
  ["nameKana", "氏名（カナ）"],
  ["company", "会社名"],
  ["email", "メールアドレス"],
  ["phone", "電話番号"],
  ["lastContactAt", "最終接点"],
];

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

  updateCustomer(input: UpdateCustomerInput): Customer {
    const details: CustomerUpdate = {
      name: input.name.trim(),
      nameKana: input.nameKana.trim(),
      company: input.company.trim(),
      department: input.department.trim(),
      title: input.title.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      rank: input.rank,
      status: input.status,
      lastContactAt: input.lastContactAt.trim(),
      tags: [...new Set(input.tags.map((tag) => tag.trim()).filter(Boolean))],
    };

    const missingField = requiredFields.find(([field]) => !details[field]);
    if (missingField) {
      throw new Error(`${missingField[1]}を入力してください。`);
    }

    if (!/^\S+@\S+\.\S+$/.test(details.email)) {
      throw new Error("メールアドレスの形式を確認してください。");
    }

    return this.repository.update(input.customerId, details);
  }

  deleteCustomer(customerId: string): void {
    this.repository.delete(customerId);
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
