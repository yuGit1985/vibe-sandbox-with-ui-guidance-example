import { describe, expect, it } from "vitest";
import { InMemoryCustomerRepository } from "@/fakes/in-memory-customer-repository";
import { InMemoryEmailGateway } from "@/fakes/in-memory-email-gateway";
import { SendCustomerEmail } from "@/usecases/send-customer-email";

const createUseCase = () => {
  const gateway = new InMemoryEmailGateway();
  return {
    gateway,
    useCase: new SendCustomerEmail(new InMemoryCustomerRepository(), gateway),
  };
};

const validInput = {
  customerId: "customer-1",
  subject: "  次回のお打ち合わせについて  ",
  body: "  山田様\n次回の日程をご相談させてください。  ",
  sentBy: "佐藤 美咲",
  sentAt: "2026-10-03T00:00:00.000Z",
  emailId: "email-1",
};

describe("SendCustomerEmail", () => {
  it("選択した顧客へメールを送信できる", () => {
    const { gateway, useCase } = createUseCase();

    const email = useCase.execute(validInput);

    expect(email).toMatchObject({
      to: "taro.yamada@bloom.example.jp",
      recipientName: "山田 太郎",
      subject: "次回のお打ち合わせについて",
      body: "山田様\n次回の日程をご相談させてください。",
    });
    expect(gateway.findSentEmails()).toEqual([email]);
  });

  it.each([
    ["件名", { subject: "   " }, "件名を入力してください。"],
    ["本文", { body: "   " }, "本文を入力してください。"],
  ])("空の%sでは送信しない", (_field, override, expectedMessage) => {
    const { gateway, useCase } = createUseCase();

    expect(() => useCase.execute({ ...validInput, ...override })).toThrow(
      expectedMessage,
    );
    expect(gateway.findSentEmails()).toHaveLength(0);
  });

  it("存在しない顧客には送信しない", () => {
    const { gateway, useCase } = createUseCase();

    expect(() =>
      useCase.execute({ ...validInput, customerId: "unknown" }),
    ).toThrow("顧客が見つかりませんでした。");
    expect(gateway.findSentEmails()).toHaveLength(0);
  });
});
