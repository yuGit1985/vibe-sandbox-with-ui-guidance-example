export type OutboundEmail = {
  id: string;
  to: string;
  recipientName: string;
  subject: string;
  body: string;
  sentBy: string;
  sentAt: string;
};

export interface EmailGateway {
  send(email: OutboundEmail): void;
}
