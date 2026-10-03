import type { CustomerRepository } from "@/ports/customer-repository";
import type { EmailGateway, OutboundEmail } from "@/ports/email-gateway";

type SendCustomerEmailInput = {
  customerId: string;
  subject: string;
  body: string;
  sentBy: string;
  sentAt: string;
  emailId: string;
};

export class SendCustomerEmail {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly emailGateway: EmailGateway,
  ) {}

  execute(input: SendCustomerEmailInput): OutboundEmail {
    const customer = this.customerRepository.findById(input.customerId);
    if (!customer) {
      throw new Error("顧客が見つかりませんでした。");
    }

    const subject = input.subject.trim();
    if (!subject) {
      throw new Error("件名を入力してください。");
    }

    const body = input.body.trim();
    if (!body) {
      throw new Error("本文を入力してください。");
    }

    const email: OutboundEmail = {
      id: input.emailId,
      to: customer.email,
      recipientName: customer.name,
      subject,
      body,
      sentBy: input.sentBy,
      sentAt: input.sentAt,
    };

    this.emailGateway.send(email);
    return email;
  }
}
