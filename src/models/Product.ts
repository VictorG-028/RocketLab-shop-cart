export interface ProductModel {
  id: productId;
  imageUrl: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  readyToShipToday: boolean;
  brand: string;
  model: string;
  color: string;
  connectivity: string;
};

export type productId = number;
export type quantity = number;
