import { IBaseModel } from "./base";
import { IVoucher } from "./voucher";

export interface ICartProduct {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
}

export interface ICartItem extends IBaseModel {
  product: ICartProduct;
  quantity: number;
  voucher: IVoucher | null;
}

export interface ICartState {
  items: ICartItem[];
}
