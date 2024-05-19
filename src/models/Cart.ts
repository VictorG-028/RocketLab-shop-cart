import { productId, quantity } from "./Product";

export type CartModel = Map<productId, quantity>;

export function newCartModel(): CartModel {
  return new Map<productId, quantity>();
}
