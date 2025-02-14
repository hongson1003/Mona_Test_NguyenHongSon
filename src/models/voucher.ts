export type DiscountType = "percent" | "fixed";

export interface IVoucher {
  code: string;
  type: DiscountType;
  value: number;
}
