import { UserModel, Address } from "@/models/User";

const address: Address = {
  street: "Rua Apollo",
  number: "73",
  city: "Recife",
  state: "Brasil",
  zipCode: "50030-220",
}

export const exampleUser: UserModel = {
  id: 0,
  name: "Usuário de Exemplo da Silva",
  email: "exemplo@RocketLab.com",
  currency: "R$",
  balance: 1000.00,
  address: address,
}
