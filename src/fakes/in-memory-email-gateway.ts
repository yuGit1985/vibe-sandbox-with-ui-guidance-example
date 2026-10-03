import type { EmailGateway, OutboundEmail } from "@/ports/email-gateway";

export class InMemoryEmailGateway implements EmailGateway {
  private sentEmails: OutboundEmail[] = [];

  send(email: OutboundEmail): void {
    this.sentEmails.push({ ...email });
  }

  findSentEmails(): OutboundEmail[] {
    return this.sentEmails.map((email) => ({ ...email }));
  }
}
