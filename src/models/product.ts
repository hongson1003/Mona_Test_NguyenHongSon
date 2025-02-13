import { IBaseModel } from "./base";

export interface Product extends IBaseModel {
  id: number;
  name: string;
  imageSrc: string;
  price: number;
}
