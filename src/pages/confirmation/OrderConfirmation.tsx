import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layout/header/Header";

interface CartItem {
  menuId: string;
  price: number;
}
import MenuButton from "../../components/layout/menu-button/menu-button";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];

  const calculateTotal = () => {
    return cart.reduce((total: number, item: CartItem) => total + item.price, 0);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-screen h-[550px]">
        <div className="flex flex-col items-center justify-center w-[550px] h-full gap-5 m-10 font-Roboto">
          <div className="mb-16 font-Londrina text-4xl after:content-[''] after:mt-2 after:border-2 after:border-b-black after:w-66 after:block after:-skew-y-1">
            <h1>Order Confirmation</h1>
          </div>

          <div className="flex w-full justify-between">
            <div className="font-bold font-Roboto">TOTAL</div>
            <div className="font-bold font-Roboto">{calculateTotal()} KR</div>
          </div>

          <div className="flex w-full justify-between">
            <div>ORDER ID</div>
            <div>{cart.length > 0 ? "123456" : "No items in cart"}</div>
          </div>

          <ul className="w-full">
            {cart.map((item: CartItem, index: number) => (
              <li
                key={index}
                className="flex justify-between border-b py-2"
              >
                <span className="italic">{item.menuId.replace("_", " ")}</span>
                <span>{item.price} KR</span>
              </li>
            ))}
          </ul>

          <div className="w-full">
            <div className="flex justify-between">
              <div className="italic font-bold font-Roboto">ORDER STATUS:</div>
              <div>
                <MenuButton
                  onClick={() => {
                    console.log("Navigating with cart data:", cart);
                    navigate("/edit", { state: { cart } });
                  }}
                  className="h-[25px] pt-0 before:h-[21px] before:bg-secondary-0 before:ml-1 hover:before:translate-x-[-5px] hover:before:translate-y-[-5px]"
                  type="button"
                  to="#"
                >
                  Edit
                </MenuButton>
              </div>
            </div>
          </div>

          <div className="font-Roboto italic flex w-full gap-2 flex-col">
            <a className="flex w-full justify-end" href="/history">
              <div>Order History</div>
            </a>
            <a className="flex w-full justify-end" href="/menu">
              <div>Menu</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
