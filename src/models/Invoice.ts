import { UserModel } from "./User";

export interface InvoiceModel {
  id: string;
  currentDate: string;
  billTo: UserModel;

  names: string[];
  quantity: number[];
  prices: number[];
}
