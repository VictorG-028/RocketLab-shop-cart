export interface UserModel {
  id: number;
  name: string;
  email: string;
  currency: string;
  balance: number;
  address: Address;
};

export interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
}
