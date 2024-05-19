import { InvoiceModel } from "@/models/Invoice";
import { createContext, useCallback, useState } from "react";

interface OrderContextModel {
  orders: InvoiceModel[];
  addOrder: (invoice: InvoiceModel) => void;
}

export const OrderContext = createContext({} as OrderContextModel);

interface Props {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<Props> = ({ children }) => {
  const [orders, serOrders] = useState<InvoiceModel[]>([]);

  const AddOrder = useCallback((invoice: InvoiceModel) => {
    orders.push(invoice);
    serOrders(orders);
  }, []);

  return (
    <OrderContext.Provider value={{
      orders: orders,
      addOrder: AddOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
}
