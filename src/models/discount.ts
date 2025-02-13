import { IBaseModel } from "./base";

export type DiscountType = "percentage" | "fixed";

export interface IDiscount extends IBaseModel {
  code: string;
  type: DiscountType;
  value: number;
}
