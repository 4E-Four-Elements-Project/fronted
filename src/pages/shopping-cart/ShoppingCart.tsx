import { useLocation } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import MenuButton from "../../components/layout/menu-button/menu-button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

const ShoppingCart = () => {
  const location = useLocation();
  const cart = location.state?.cart || []; // Hämta varukorgen från state

  const calculateTotal = () =>
    cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Header />
        <h2 className="mt-20 text-xl">Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Header cartCount={cart.length} />
      <div className="w-1/2 h-full flex justify-center flex-col mt-5">
        <div className="flex items-start w-full mb-7">
          <h1 className="font-Londrina text-4xl lg:text-6xl lg:pl-5 pb-2 border-b-2 border-black w-full">
            Cart
          </h1>
        </div>

        <ul className="flex flex-col gap-3 font-thin">
          {cart.map((item: CartItem) => (
            <li
              key={item.id}
              className="border border-black rounded-xl p-3 flex flex-row gap-2 bg-[#f1f1f1] justify-between"
            >
              <div className="font-roboto flex flex-col gap-2">
                <p>{item.name}</p>
                <p>{item.price} kr</p>
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-5">
          <h2 className="font-bold">TOTAL</h2>
          <h2>{calculateTotal()} kr</h2>
        </div>

        <MenuButton
          type="button"
          to="/confirmation"
          className="before:bg-secondary-0 mt-14 w-full"
        >
          Checkout
        </MenuButton>
      </div>
    </div>
  );
};

export default ShoppingCart;