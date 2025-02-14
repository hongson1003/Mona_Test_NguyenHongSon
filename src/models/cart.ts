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
  discount?: IVoucher; // Mỗi sản phẩm có thể có 1 mã khuyến mãi
}

export interface ICartState {
  items: ICartItem[];
}
