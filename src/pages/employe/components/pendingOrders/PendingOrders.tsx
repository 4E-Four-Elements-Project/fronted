import { motion } from "motion/react";
import { useState } from "react";
import { GetOrderInformation } from "../../../../types/interface/interface";

import updateOrderStatus from "../../../../services/employe/updateOrderStatus/updateOrderStatus";

export default function PendingOrders({
  kitchenOrders,
  refreshOrders,
}: {
  kitchenOrders: GetOrderInformation;
  refreshOrders: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [cooking, setCooking] = useState<boolean>(false);

  const handleCookingBtn = async () => {
    setCooking(!cooking);
    refreshOrders(true);
    const orderId = kitchenOrders.orderId;
    if (cooking) {
      // Update order status to done
      await updateOrderStatus({ orderId, status: "done" });
    } else {
      // Update order status to cooking
      await updateOrderStatus({ orderId, status: "cooking" });
    }
  };

  return (
    <div className="max-w-72 min-h-64 bg-white rounded-md px-2 py-4 flex flex-col justify-around border border-pink-0">
      <h2 className="font-light">
        Order id:{" "}
        <span className="font-regular text-sm">{kitchenOrders.orderId}</span>
      </h2>
      <div className="w-full h-auto flex flex-col items-start justify-between">
        {/* Items */}
        {kitchenOrders.menuDetails.map((item, index) => (
          <div className="flex w-full justify-between items-center" key={index}>
            <span>{item.menuId}</span>
            <span>{item.quantity}</span>
          </div>
        ))}
      </div>
      {kitchenOrders.comment && (
        <div className="w-full h-auto border border-black rounded-sm px-1">
          <p className="">{kitchenOrders.comment}</p>
        </div>
      )}
      <div className="border border-black rounded-sm bg-pink-0 w-24 h-8 relative top-3 self-center">
        {cooking ? (
          <motion.div
            whileHover={{ x: 2, y: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCookingBtn}
            className="text-sm w-24 h-8 relative -top-1 -left-1 bg-white border border-black rounded-sm flex items-center justify-center cursor-pointer select-none"
          >
            Finish
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ x: 2, y: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCookingBtn}
            className="text-sm w-24 h-8 relative -top-1 -left-1 bg-white border border-black rounded-sm flex items-center justify-center cursor-pointer select-none"
          >
            Start cooking
          </motion.div>
        )}
      </div>
    </div>
  );
}
