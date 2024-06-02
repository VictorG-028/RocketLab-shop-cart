import { CartModel } from '@/models/Cart';
import { formatDate } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from '@/dto/UserDto';
import { ProductDto } from '@/dto/ProductDto';
import { InvoiceModel } from '@/models/Invoice';

export function generateInvoice(user: UserDto, cart: CartModel, productsInCart: ProductDto[]): InvoiceModel {
  const currentDate = new Date();

  const invoice: InvoiceModel = {
    id: uuidv4(),
    currentDate: formatDate(currentDate, 'dd/MM/yyyy'),
    billTo: user,
    names: productsInCart.map((p) => p.name),
    quantity: Array.from(cart.values()),
    prices: productsInCart.map((p) => p.price),
  }

  return invoice;
}
