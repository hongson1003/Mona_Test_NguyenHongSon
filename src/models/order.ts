import { DiscountType } from "./discount";

export interface IOrderForm {
  name: string;
  email: string;
  phone: string;
  paymentMethod: DiscountType;
  amountReceived: number;
  products: number[];
}
