import Header from "../../components/layout/header/Header";
import { useEffect, useState } from "react";
import {GetOrderInformation, GetOrderHistory } from "../../types/interface/interface";
import deleteOrder from "../../services/users/deleteOrder/deleteOrder";


const Orders = () => {
  // const [currentOrder, setCurrentOrder] = useState<GetOrderInformation | null>(
  //   null
  // ); // Latest order
  const [currentOrder, setCurrentOrder] = useState<GetOrderHistory[]>([]); // Latest order
  const [orderHistory, setOrderHistory] = useState<GetOrderInformation[]>([]); // All past orders
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");
      // Construct headers dynamically
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const url = `${import.meta.env.VITE_GET_USER_ORDER_URL}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers
      });
  
      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} - ${response.statusText}`
        );
      }

      const json = await response.json();
      const orders = json.data.orders
      const currentOrders = orders.filter(
        (order: GetOrderInformation) =>
          order.orderStatus === "pending" || order.orderStatus === "cooking" || order.orderStatus === "kitchen" || order.orderStatus === "updated"
      );  
      
      
      const historyOrders = orders.filter(
        (order: GetOrderInformation) =>
          order.orderStatus === "done" 
      );

   
      setCurrentOrder(currentOrders)
      setOrderHistory(historyOrders)

     
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex justify-end items-center h-screen w-screen bg-primary-0">
      <div className="flex flex-col justify-center items-center bg-primary-0 w-full">
      {/* Header */}
      <div className="flex-grow w-full mb-5 p-0 m-0">
        <Header className="md:w-2/3 md:pr-20 md:pl-20 md:3/5 absolute top-0 z-20" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center items-center w-4/6 bg-primary-0">

        {/* Current Order Section */}
   <div className="flex flex-col items-start w-full mb-7 p-5 overflow-hidden">
      <h1 className="font-Londrina text-4xl lg:text-6xl lg:pl-5 pb-2 border-b-2 border-black w-full -rotate-1">
            Current Order
          </h1>
          {currentOrder ? (
            <ul className="flex flex-col gap-3 font-thin pt-5">
              {currentOrder?.map((item, index
              ) => (
              <li
                key={index}
                className="border border-black rounded-xl p-2 flex flex-row gap-2 bg-white justify-between"
              >
                <div className="font-roboto flex flex-col gap-2">
                <p className="text-sm">Date: {item.createdAt}</p>
                <p className="text-sm">Order ID: {item.orderId}</p>
                <p className="">Status: {item.orderStatus}</p>
                <p><strong>Total Price:</strong> {item.totalPrice} SEK</p>
                </div>
                <button
                onClick={async () => {
                  await deleteOrder({ orderId: item.orderId });
                  // setCurrentOrder(null);
                }}
                className="text-red-500 hover:text-red-700 font-bold ml-4"
              >
                X
              </button>
          
              </li>))}
            </ul>
          ) : (
            <p>No current order available.</p>
          )}
        </div>

        {/* Order History Section */}
        <div className="flex flex-col items-start w-full mb-7 p-5 overflow-y-auto max-h-[40vh]">
        <h1 className="font-Londrina text-4xl lg:text-6xl lg:pl-5 pb-2 border-b-2 border-black w-full -rotate-1">
            Order History
          </h1>
          {orderHistory.length > 0 ? (
            <ul className="flex flex-col gap-3 font-thin pt-5">
              {orderHistory.map((item: GetOrderInformation) => (
                <li
                  key={item.orderId}
                  className="border border-black rounded-xl p-2 flex flex-row gap-2 bg-white justify-between"
                >
                  <div className="font-roboto flex flex-col gap-2">
                    <p className="text-sm">Date: {item.createdAt}</p>
                    <p className="text-sm">Order ID: {item.orderId}</p>
                    <p className="text-sm"><strong>Total Price:</strong> {item.totalPrice} SEK</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No past orders found.</p>
          )}
        </div>
      </div>
      </div>
      {/* Right Section */}
      <div className="hidden md:block">
        <figure className="h-sm mw-auto">
          <video
            src="/video/landing-video.mp4"
            className="rounded shadow-lg h-full w-[800px] object-cover"
            autoPlay
            muted
            loop
          />
        </figure>
      </div>
    </div>
  );
};

export default Orders;
