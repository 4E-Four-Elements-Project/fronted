import { useEffect, useState } from "react";
import getInventory from "../../../../services/menu/getInventory/getInventoryApi";
import { InventoryApiResponse } from "../../../../types/interface/interface";

export default function Overview() {
  const [currentOverview, setCurrentOverview] = useState<string>("");
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [activeOrders, setActiveOrders] = useState<number>(0);
  const [totalInventory, setTotalInventory] = useState<number>(0);

  useEffect((): void => {
    if (location.pathname === "/employe") {
      setCurrentOverview("Employe");
      setShowStatus(!showStatus);
    } else {
      setCurrentOverview("Chef");
    }
  }, [location]);

  // Update status
  useEffect(() => {
    const fecthInventoryData = async () => {
      const response: InventoryApiResponse = await getInventory();
      const responseQuantity = response.data;
      const addTotalInventoryStock =
        responseQuantity[0]?.quantity +
        responseQuantity[1]?.quantity +
        responseQuantity[2]?.quantity +
        responseQuantity[3]?.quantity;
      setTotalInventory(addTotalInventoryStock);
    };

    fecthInventoryData();

    // 10 min
    const min = 100000;

    // Update inventory every min
    const interval = setInterval(() => {
      fecthInventoryData();
    }, min);

    return () => clearInterval(interval);
  }, []);

  //  Update orders
  useEffect(
    () => {
      // SetActiveOrders(activeOrders)
    },
    [
      // Active orders API
    ]
  );

  return (
    <section className="flex-col justify-between w-2/3 h-auto md:h-auto bortder-2 border-blue-700">
      <div className="flex flex-col md:flex-row  justify-between items-center w-full h-full">
        <p className="text-2xl md:text-4xl font-Londrina inline-block">{`${currentOverview} Overview`}</p>

        {showStatus ? (
          <div className="w-full h-14 border md:w-1/2 lg:1/3 border-black rounded-sm bg-white flex items-center justify-around text-sm font-Roboto">
            <div className="flex justify-between items-center h-auto">
              <h3>stock status: </h3>
              <div
                className={`
                  ${
                    totalInventory >= 300
                      ? "bg-green-0"
                      : totalInventory <= 100
                      ? "bg-red-400"
                      : "bg-yellow-0"
                  }
                  w-3 h-3 rounded-full  ml-2 border border-black`}
              ></div>
            </div>
            <div className="w-px h-full bg-black"></div>
            <h3 className="">Active orders: {activeOrders}</h3>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Underline */}
      <div className="w-full h-px bg-black -rotate-[.6deg] relative top-4"></div>
    </section>
  );
}
