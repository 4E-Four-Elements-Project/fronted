import { useEffect, useState } from "react";
import Order from "../Order/Order";
import getOrders from "../../../../services/employe/getOrders/getOrders";
import refreshIcon from "../../../../assets/img/refresh.svg";
import {
  GetOrderInformation,
  OrderInformationResponse,
} from "../../../../types/interface/interface";
import { motion } from "motion/react";

export default function ActiveOrders() {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string>("newest");
  const [orderItems, setOrderItems] = useState<OrderInformationResponse>();
  const [sortedItems, setSortedItems] = useState<GetOrderInformation[]>();
  const [refreshOrders, setRefreshOrders] = useState<boolean>(false);

  // Change value on the checkboxes
  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
  };

  // Fetch orders
  useEffect(() => {
    const fetchData = async () => {
      const response: OrderInformationResponse = await getOrders();

      // Filter by status.
      const pendingOrders = response.data.filter(
        (order) => order.orderStatus === "pending"
      );

      // Only use orders with status "PENDING"
      setOrderItems({ ...response, data: pendingOrders });
    };

    setRefreshOrders(false);

    fetchData();
    // Fetch every 60 sec
    const interval = setInterval(() => fetchData(), 60000);

    return () => clearInterval(interval);
  }, [refreshOrders]);

  // Sort orders by date
  useEffect(() => {
    const data = orderItems?.data || [];
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return selectedCheckbox === "newest" ? dateB - dateA : dateA - dateB;
    });
    setSortedItems(sortedData);
  }, [selectedCheckbox, orderItems]);

  return (
    <section className="w-72 md:w-full h-80 overflow-y-scroll rounded-md scroll-smooth no-scrollbar flex flex-col gap-4 font-Roboto p-2 py-4 bg-white border border-black col-span-2 relative">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center justify-between w-36">
          <p>Active orders</p>
          <div className="cursor-pointer">
            <motion.img
              whileTap={{ rotate: 360 }}
              src={refreshIcon}
              alt="Refresh icon"
              className="w-6 "
              onClick={() => setRefreshOrders(!refreshOrders)}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="w-34 h-12 flex flex-col justify-between items-end lg:w-64 lg:items-center lg:flex-row">
          <div className="flex items-center justify-between gap-3 text-sm">
            <label
              htmlFor="checkboxFilterNewest"
              className="select-none cursor-pointer"
            >
              Newest first
            </label>
            <input
              type="checkbox"
              name="checkboxFilterNewest"
              id="checkboxFilterNewest"
              checked={selectedCheckbox === "newest"}
              onChange={() => handleCheckboxChange("newest")}
              className="w-5 h-5 cursor-pointer focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <label
              htmlFor="checkboxFilterOldest"
              className="select-none cursor-pointer"
            >
              Oldest first
            </label>
            <input
              type="checkbox"
              name="checkboxFilterOldest"
              id="checkboxFilterOldest"
              checked={selectedCheckbox === "oldest"}
              onChange={() => handleCheckboxChange("oldest")}
              className="w-5 h-5 cursor-pointer focus:outline-none"
            />
          </div>
        </div>
      </div>
      {/* Render the sorted orders */}
      {sortedItems?.map((orderItem) => (
        <Order
          key={orderItem.orderId}
          orderItem={orderItem}
          refreshOrders={setRefreshOrders}
        />
      ))}
    </section>
  );
}
