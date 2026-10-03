export type CustomerStatus = "active" | "follow-up" | "inactive";
type CustomerRank = "S" | "A" | "B" | "C";

export type CustomerNote = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  nameKana: string;
  company: string;
  department: string;
  title: string;
  email: string;
  phone: string;
  rank: CustomerRank;
  status: CustomerStatus;
  lastContactAt: string;
  registeredAt: string;
  tags: string[];
  avatarColor: string;
  notes: CustomerNote[];
};

export type CustomerUpdate = Pick<
  Customer,
  | "name"
  | "nameKana"
  | "company"
  | "department"
  | "title"
  | "email"
  | "phone"
  | "rank"
  | "status"
  | "lastContactAt"
  | "tags"
>;

export interface CustomerRepository {
  findAll(): Customer[];
  findById(customerId: string): Customer | undefined;
  update(customerId: string, details: CustomerUpdate): Customer;
  delete(customerId: string): void;
  addNote(customerId: string, note: CustomerNote): Customer;
}
