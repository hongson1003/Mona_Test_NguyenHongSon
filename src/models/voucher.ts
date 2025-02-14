export type DiscountType = "percentage" | "fixed";

export interface IVoucher {
  code: string;
  type: DiscountType;
  value: number;
}
