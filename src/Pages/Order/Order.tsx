import React from "react";
import Navbar from "@/components/Navbar";
import { useOrder } from "@/hooks/UseOrder";
import { useUser } from "@/hooks/UseUser";

function calculateTotalCost(prices: number[], quantities: number[]) {
  return prices.map((p, i)=> p * quantities[i]).reduce((accum, price)=> accum + price, 0);
}

export default function Order() {
  const { user } = useUser();
  const { orders } = useOrder();

  const currency = user.currency;

  return (
    <main className="bg-gray-50 min-w-[450px] min-h-screen">
      <section>
        <Navbar routeName="orders"></Navbar>
      </section>

      <section className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Suas Compras</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 overflow-x-auto">
          {orders.map((order, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md mb-4 hover:bg-secondary">
              <h2 className="text-lg font-bold mb-2">{order.currentDate}</h2>
              <p className="text-primary mb-2 font-bold flex">
                Endereço: 
                <span className="ml-2 font-normal">
                  {order.billTo.address.street}, {order.billTo.address.number}, {order.billTo.address.city}
                </span>
              </p>
              <p className="text-primary mb-2 font-bold flex">
                Custo: 
                <span className="ml-2 font-normal">
                  {currency}{calculateTotalCost(order.prices, order.quantity).toFixed(2)}
                </span>
              </p>
              <p className="text-primary mb-2 font-bold">
                Itens:
              </p>
              <ul className="pl-4">
                {order.names.map((itemName, i) => (
                  <li key={i} className="text-primary">
                    <span className="font-semibold mr-1">{order.quantity[i]}x</span>
                    <span className="mx-1 italic">{itemName}</span>
                    ( Unidade:  
                    <span className="font-semibold mx-1">{currency}{order.prices[i]}</span>
                    )
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
