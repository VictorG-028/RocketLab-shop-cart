import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MessageCircleWarningIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import Product from "@/components/Product"
import { products } from "@/utils/createMockProduts";
import ScrollUpButton from "@/components/ScrollUpButton";
import Navbar from "@/components/Navbar";
import Filter from "@/components/Filter";
import { ProductModel } from "@/models/Product";
import { FilterModel } from "@/models/Filter";
import { useCart } from "@/hooks/UseCart";


const maxPrice = Math.ceil(products.reduce((maxPriceSoFar, product) => {
  const currentPrice = product.price;
  if (currentPrice > maxPriceSoFar) {
    maxPriceSoFar = currentPrice;
  }
  return maxPriceSoFar;
}, 0));

const defaultFilter: FilterModel = {
  minPrice: 0, 
  maxPrice: maxPrice,
  readyToShipToday: false,
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterModel>(defaultFilter);
  const navigate = useNavigate();
  const { cart, updateCart } = useCart();


  function toggleAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    product: ProductModel, 
    setIsInsideCart: React.Dispatch<React.SetStateAction<boolean>>, 
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) {
    e.stopPropagation();
    let isInside = undefined;
    if (cart.has(product.id)) {
      toast.success("Removido do carrinho");
      cart.delete(product.id);
      isInside = false;
    } else {
      toast.success("Adicionado no carrinho");
      cart.set(product.id, 1);
      isInside = true;
    }
    updateCart(cart);
    setIsInsideCart(isInside);
    setQuantity(1);
  }

  function updateQuantity(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    product: ProductModel, shouldIncrement: boolean, 
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) {
    e.stopPropagation();
    const prevQuantity = (cart.get(product.id) || 0);
    const newQuantity = Math.max(prevQuantity + (shouldIncrement ? +1 : -1), 1);

    cart.set(product.id, newQuantity);
    updateCart(cart)
    setQuantity(newQuantity);
  }

  const filteredProducts = products.filter((product) => {

    let searchAllowDisplay = false;
    let filtersAllowDisplay = false;

    // Filter by search
    const words = search.toLowerCase().split(" ");
    const productDescription = product.description.toLowerCase();
    const first_10_words = words.slice(0, Math.min(words.length, 10)); // Consider long text edge case
    first_10_words.forEach(word => {
      if (productDescription.includes(word)) {
        searchAllowDisplay = true;
      }
    });

    // Filter by filter options
    filtersAllowDisplay = product.price >= filter.minPrice && product.price <= filter.maxPrice;
    if (filter.readyToShipToday) filtersAllowDisplay = product.readyToShipToday;

    return (searchAllowDisplay && filtersAllowDisplay);
  });


  function handleBuyButton() {
    if (cart.size == 0) {
      toast("O carrinho está vazio");
      return;
    }
    navigate("/checkout");
  }

  return (
    <main className="min-w-[450px] bg-gray-50 min-h-screen">
      <ScrollUpButton></ScrollUpButton>

      <section>
        <Navbar routeName="home"></Navbar>
      </section>

      <section className="sm:hidden my-4">
      <Filter horizontal={true}
        currency={products[0].currency}
        filter={filter} setFilter={setFilter} 
        maxPrice={maxPrice} 
        search={search} setSearch={setSearch}
      >
      </Filter>
      </section>

      <section className="my-4 flex flex-row items-center justify-center">
        <Button onClick={() => {handleBuyButton()}}
          className="bg-primary rounded-full max-w-20"
        >
          Comprar
        </Button>
      </section>
      <section className="space-y-2 sm:flex sm:flex-row xl:justify-between"> 
        <aside className={`
            hidden sm:flex sm:flex-col 
            xl:w-[17%] md:w-[30%] sm:w-[32%]
        `}>
          <Filter horizontal={false} // vertical={true}
            currency={products[0].currency}
            filter={filter} setFilter={setFilter} 
            maxPrice={maxPrice} 
            search={search} setSearch={setSearch}
          >
          </Filter>
        </aside>
        <div className={`lg:grid
          xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 
          xl:w-[83%] md:w-[70%] sm:w-[68%] 
          xl:gap-x-0 
          xl:gap-y-8 xl:space-y-0 lg:space-y-8 md:space-y-6 space-y-4 
          sm:justify-start sm:justify-items-start sm:items-start
          md:justify-start md:justify-items-start md:items-start
          lg:justify-center lg:justify-items-center lg:items-center
        `}>
          {filteredProducts.map((product, i) => {
            return (
              <div key={i}>
                <Product product={product} 
                  initInsideCart={cart.has(product.id)} 
                  initProductQuantity={cart.has(product.id) ? cart.get(product.id) : 1} 
                  cartButtonAction={toggleAddToCart}
                  handleUpdateQuantiy={updateQuantity}
                >
                </Product>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
