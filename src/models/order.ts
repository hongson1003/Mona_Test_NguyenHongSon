export type PaymentMethod = "cash" | "card";

export interface IOrderForm {
  name: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethod;
  amountReceived?: number;
}
