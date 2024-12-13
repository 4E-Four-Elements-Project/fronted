import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import getSpecificOrder from "../../services/employe/getSpecificOrder/getSpecificOrder";
import {useEffect, useState} from "react";

interface UpdatedCartItem {
  orderId: string,
  createdAt: string,
  menuDetails: MenuDetails[];
  orderStatus: string;
  totalPrice: number;
  orderLocked: boolean;
  userId: string;
  comment: string;
  paymentMethod: string;
}

interface MenuDetails {
  menuId: string;
  price: number;
  quantity: number;
}

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [order, setOrder] = useState<UpdatedCartItem | undefined>(undefined)
  const [orderExist, setOrderExist] = useState(false)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getSpecificOrder({orderId});
        console.log('response', response.data["Order-details"]);
        const orderDetails = response.data["Order-details"];

        if(orderDetails){
          setOrder(orderDetails as UpdatedCartItem);
          setOrderExist(true)
        } else {
          console.error("Order details not found in response");
          setOrderExist(false)
        }

      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
  
    fetchOrders();
  }, [orderId])
  
  const Status = () => {
    if (!order) return null; 
    if(order.orderStatus === "pending"){
      return <p className="text-[#78BC61] font-extrabold text-xl">{order.orderStatus}</p>
    } else if (order.orderStatus === "kitchen"){
      return <p className="text-[#FF0000]">{order.orderStatus}</p>
    } else if (order.orderStatus === "cooking"){
      return <p className="text-[#FFA500]">{order.orderStatus}</p>
    } else if (order.orderStatus === "done"){
      return <p className="text-[#411bff]">{order.orderStatus}</p>
    }
    return null;
  }
    
  

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-screen h-[550px]">
        <div className="flex flex-col items-center justify-center w-[550px] h-full gap-5 m-10 font-Roboto">
          <div className="mb-16 font-Londrina text-4xl after:content-[''] after:mt-2 after:border-2 after:border-b-black after:w-66 after:block after:-skew-y-1">
            <h1>Order Confirmation</h1>
          </div>

          {orderExist && order ? (
            <>
              <h1 className="flex flex-col sm:flex-row items-center justi gap-3 font-Londrina text-2xl">Order Number:<p className="font-Roboto text-lg">{orderId}</p></h1>

              <ul className="w-full">
                {order.menuDetails.map((item: MenuDetails, index: number) => (
                  <li key={index} className="flex justify-between border-b py-2">
                    <span className="italic">
                      {item.menuId.replace("_", " ")}{" "}
                      <span className="font-bold text-sm">x{item.quantity}</span>
                    </span>
                    <span>{item.price * item.quantity} KR</span>
                  </li>
                ))}
              </ul>
              <div className="flex w-full justify-between">
                <div className="font-bold font-Roboto">TOTAL</div>
                <div className="font-bold font-Roboto">{order.totalPrice} KR</div>
              </div>

              <div className="text-l flex items-center justify-between w-full">

                {/* <h1>Order status: {order.orderStatus}</h1> */}
                <div><p>Status:</p><Status /></div>
                  <button
                    onClick={() =>
                      navigate("/edit", {
                        state: {
                          order, // Skickar varukorgens innehåll
                          orderId, // Skickar order-ID
                        },
                      })
                    }
                    className="relative bg-white w-1/6 text-sm text-center border border-black rounded before:absolute before:content-[''] before:top-1/4 before:left-0 before:ml-4 before:w-14 before:sm:w-20 before:h-5 before:bg-secondary before:rounded before:border before:border-black before:-z-10 before:transition-transform before:duration-300 hover:before:translate-x-[-8px] hover:before:translate-y-[-6px] before:bg-secondary-0"
                  >
                    Edit
                  </button>
              </div>

              <div className="flex flex-col items-end w-full gap-3 mt-4">
                <button onClick={() => navigate ("/history")}>Order History</button>
                <button onClick={() => navigate ("/menu")}>Menu</button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Din varukorg är tom.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
