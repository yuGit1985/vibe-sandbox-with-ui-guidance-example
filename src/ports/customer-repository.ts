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

export interface CustomerRepository {
  findAll(): Customer[];
  findById(customerId: string): Customer | undefined;
  addNote(customerId: string, note: CustomerNote): Customer;
}
