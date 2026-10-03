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

  it("顧客のランクを取得できる", () => {
    const customers = createDirectory().searchCustomers("");
    expect(customers.map(({ rank }) => rank)).toEqual([
      "S",
      "A",
      "A",
      "B",
      "C",
      "B",
    ]);
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

  it("顧客情報を編集できる", () => {
    const directory = createDirectory();
    const customer = directory.updateCustomer({
      customerId: "customer-1",
      name: "  山田 花子  ",
      nameKana: " ヤマダ ハナコ ",
      company: " 株式会社ブルーム ",
      department: " 営業部 ",
      title: " 課長 ",
      email: " hanako.yamada@example.jp ",
      phone: " 03-0000-0000 ",
      rank: "A",
      status: "follow-up",
      lastContactAt: "2026-10-03",
      tags: [" 重点顧客 ", "東京", "重点顧客", " "],
    });

    expect(customer).toMatchObject({
      name: "山田 花子",
      email: "hanako.yamada@example.jp",
      rank: "A",
      status: "follow-up",
      tags: ["重点顧客", "東京"],
    });
    expect(directory.searchCustomers("花子")[0]?.id).toBe("customer-1");
  });

  it("必須項目が空の顧客情報は更新しない", () => {
    const directory = createDirectory();
    const customer = directory.getCustomer("customer-1");
    if (!customer) throw new Error("テスト対象の顧客が見つかりません。");

    expect(() =>
      directory.updateCustomer({
        ...customer,
        customerId: "customer-1",
        name: " ",
      }),
    ).toThrow("氏名を入力してください。");
    expect(directory.getCustomer("customer-1")?.name).toBe("山田 太郎");
  });

  it("顧客を削除できる", () => {
    const directory = createDirectory();

    directory.deleteCustomer("customer-2");

    expect(directory.getCustomer("customer-2")).toBeUndefined();
    expect(directory.searchCustomers("")).toHaveLength(5);
  });

  it("存在しない顧客は削除できない", () => {
    expect(() => createDirectory().deleteCustomer("unknown")).toThrow(
      "顧客が見つかりませんでした。",
    );
  });
});
