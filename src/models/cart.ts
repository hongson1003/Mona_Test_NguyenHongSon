import { IBaseModel } from "./base";
import { IDiscount } from "./discount";

interface ICartProduct {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
}

export interface ICartItem extends IBaseModel {
  product: ICartProduct;
  quantity: number;
  discount?: IDiscount; // Mỗi sản phẩm có thể có 1 mã khuyến mãi
}

export interface ICartState {
  items: ICartItem[];
}
