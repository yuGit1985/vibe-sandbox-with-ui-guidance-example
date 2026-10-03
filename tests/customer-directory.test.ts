import { describe, expect, it } from "vitest";
import { InMemoryCustomerRepository } from "@/fakes/in-memory-customer-repository";
import { CustomerDirectory } from "@/usecases/customer-directory";

const createDirectory = () =>
  new CustomerDirectory(new InMemoryCustomerRepository());

describe("CustomerDirectory", () => {
  it("名前の一部で顧客を検索できる", () => {
    const customers = createDirectory().searchCustomers("山田");
    expect(customers).toHaveLength(1);
    expect(customers[0]?.name).toBe("山田 太郎");
  });

  it("カナ名でも顧客を検索できる", () => {
    const customers = createDirectory().searchCustomers("ササキ");
    expect(customers[0]?.name).toBe("佐々木 彩");
  });

  it("顧客にメモを追加できる", () => {
    const customer = createDirectory().addNote({
      customerId: "customer-3",
      body: "  次回は見積書を持参する  ",
      author: "担当者",
      createdAt: "2026-10-03T00:00:00.000Z",
      noteId: "new-note",
    });
    expect(customer.notes[0]).toMatchObject({
      id: "new-note",
      body: "次回は見積書を持参する",
    });
  });

  it("空のメモは追加しない", () => {
    expect(() =>
      createDirectory().addNote({
        customerId: "customer-3",
        body: "   ",
        author: "担当者",
        createdAt: "2026-10-03T00:00:00.000Z",
        noteId: "new-note",
      }),
    ).toThrow("メモを入力してください。");
  });
});
