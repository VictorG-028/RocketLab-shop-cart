import { productId, quantity } from "../dto/ProductDto";

export type CartModel = Map<productId, quantity>;

export function newCartModel(): CartModel {
  return new Map<productId, quantity>();
}
