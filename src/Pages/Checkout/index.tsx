import Invoice from "@/components/Invoice";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/UseCart";
import { useOrder } from "@/hooks/UseOrder";
import { useUser } from "@/hooks/UseUser";
import { generateInvoice } from "@/utils/createInvoiceDetails";
import { exampleUser } from "@/utils/createMockUser";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import checkmark from "../../assets/checkmark.svg";

export default function Checkout() {
  const [ finished, setSFinished ] = useState(false);
  const { cart, updateCart } = useCart();
  const { user } = useUser();
  const { addOrder } = useOrder();
  const { subtractFunds } = useUser();
  const [userBalance, setUserBalance] = useState(user.balance); // To use in the freezed invoice HTML
  const [invoiceData, setInvoiceData] = useState(generateInvoice(exampleUser, cart));

  const pricesWithQuantity = invoiceData.prices.map((price, i) => price * invoiceData.quantity[i]);
  const totalPrice = pricesWithQuantity.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const childRef = React.createRef<typeof Navbar>();

  function handleBuyButton() {
    if (user.balance >= totalPrice) {
      toast.success("Compra efetuada");
      addOrder(invoiceData);
      subtractFunds(totalPrice);
      setSFinished(true);
      cart.clear();
      updateCart(cart);
    } else {
      toast.error("Fundos insuficientes");
    }
  }
  
  return (
    <main className="min-w-[450px] bg-gray-50 min-h-screen">
      <section>
        <Navbar routeName="checkout" ref={childRef}></Navbar>
      </section>

      <section className="mb-32">
        {finished ? 
          <h1 className="font-bold text-2xl my-4 text-center text-primary">Compra finalizada</h1>
          :
          <h1 className="font-bold text-2xl my-4 text-center text-primary">Finalizando a compra</h1>
        }
        <Invoice data={invoiceData} totalPrice={totalPrice} userFreezedBalance={userBalance}>
        <div className={`flex flex-row items-center ${finished ? "justify-between" : "justify-center"} w-full mb-2`}>
          {finished ? (
            <>
              <div className="text-primary justify-items-start">Obrigado pela sua compra!</div>
              <div className="justify-items-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" className="checkmark w-16 h-16 mx-auto mt-8">
                  <circle cx="26" cy="26" r="25" fill="none" className="checkmark__circle stroke-current text-green-500" />
                  <path fill="none" d="M14 27l7 7 16-16" className="checkmark__check stroke-current text-green-500 animate-draw-check" strokeWidth="4" />
                </svg>
              </div>
            </>
          ) : (
            <Button onClick={() => handleBuyButton()} className="bg-primary rounded-full max-w-32">
              Finalizar compra
            </Button>
          )}
        </div>
        </Invoice>
      </section>
    </main>
  );
}
