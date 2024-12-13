import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import MenuButton from "../../components/layout/menu-button/menu-button";
import deleteItemsvg from "/img/delete.svg";
import getSpecificOrder from "../../services/employe/getSpecificOrder/getSpecificOrder";
import deleteItem from "../../services/menu/deleteItem/deleteItem";
import updateOrderStatus from "../../services/employe/updateOrderStatus/updateOrderStatus";

interface CartItem {
  menuId: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

const EditOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || "";
  const initialCart: CartItem[] = location.state?.cart || [];

  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [loading, setLoading] = useState<boolean>(!initialCart.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || initialCart.length) {
        setLoading(false);
        return;
      }

      try {
        const response = await getSpecificOrder({ orderId });
        const orderDetails = response?.data?.["Order-details"];
        const menuDetails = orderDetails?.menuDetails;

        if (Array.isArray(menuDetails)) {
          const cartItems = menuDetails.map((item) => ({
            menuId: item.menuId,
            name: item.name || item.menuId,
            price: item.price || 0,
            description: item.description || "No description available",
            quantity: item.quantity,
          }));
          setCart(cartItems);
        } else {
          console.error("menuDetails is not an array:", menuDetails);
          setCart([]);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, initialCart]);

  const handleIncrease = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      await updateOrderStatus({
        orderId,
        status: "updated",
        additionalInfo: "Order updated via EditOrder page.",
      });

      alert("Order updated successfully!");
      navigate("/confirmation", { state: { cart, orderId, total: calculateTotal(cart) } });
    } catch (error) {
      alert("Failed to update order. Please try again.");
      console.error(error);
    }
  };

  const deleteCartItem = async (menuId: string) => {
    try {
      await deleteItem({ menuId });
      setCart((prevCart) => prevCart.filter((item) => item.menuId !== menuId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateTotal = (cartItems: CartItem[] = cart) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mb-24">
      <Header cartCount={cart.reduce((count, item) => count + item.quantity, 0)} />
      <div className="w-80 md:w-1/2 h-full flex justify-center flex-col mt-5">
        <div className="flex items-start w-full mb-7">
          <h1 className="font-Londrina text-4xl lg:text-6xl lg:pl-5 pb-2 border-b-2 border-black w-full">
            Edit Order
          </h1>
        </div>

        <ul className="flex flex-col gap-3 font-thin">
          {cart.map((item) => (
            <li
              key={item.menuId}
              className="border border-black rounded-xl p-3 flex items-center flex-row gap-2 bg-[#f1f1f1] justify-between"
            >
              <div className="font-roboto flex flex-col gap-2">
                <p className="font-Roboto font-bold">{item.menuId}</p>
                <p className="font-medium">{item.price} kr</p>
              </div>
              <div className="flex gap-3 items-center justify-center">
                <button
                  onClick={() => handleDecrease(item.menuId)}
                  className="px-3 py-1 bg-gray-400 rounded"
                >
                  -
                </button>
                <p className="font-medium">{item.quantity}</p>
                <button
                  onClick={() => handleIncrease(item.menuId)}
                  className="px-3 py-1 bg-gray-400 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => deleteCartItem(item.menuId)}
                  className="w-5 h-5"
                >
                  <img
                    src={deleteItemsvg}
                    alt="Delete item"
                    className="flex item-center justify-center w-5 h-5"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-5">
          <h2 className="font-bold text-xl">TOTAL</h2>
          <h2 className="font-bold text-xl">{calculateTotal()} kr</h2>
        </div>

        <MenuButton
          type="button"
          onClick={handleSaveChanges}
          className="before:bg-secondary-0 mt-14 w-1/4 before:absolute before:content-[''] before:top-1/4 before:left-0 before:ml-2 before:w-[calc(100%)] before:h-10 before:bg-secondary before:rounded before:border before:border-black before:-z-10 before:transition-transform before:duration-300 hover:before:translate-x-[-8px] hover:before:translate-y-[-7px]"
        >
          Confirm Changes
        </MenuButton>
      </div>
    </div>
  );
};

export default EditOrder;