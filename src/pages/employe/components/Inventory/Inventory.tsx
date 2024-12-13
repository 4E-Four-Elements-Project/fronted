import { useEffect, useState } from "react";

// Api
import getInventory from "../../../../services/menu/getInventory/getInventoryApi";
import {
  InventoryApi,
  InventoryApiResponse,
} from "../../../../types/interface/interface";

export default function Inventory() {
  const [inventory, setInvetory] = useState<InventoryApi[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response: InventoryApiResponse = await getInventory();
      const inventoryData = response.data;

      setInvetory(inventoryData);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-80 border border-black bg-white rounded-md col-start-3 flex flex-col items-start justify-around px-6 ">
      <div className="text-sm font-semibold w-full flex justify-between">
        <p>INGREDIENTS</p>
        <p className="hidden lg:flex">STATUS</p>
      </div>
      {inventory?.map((item, index) => (
        <div
          key={index}
          className="flex justify-between w-full text-xl md:text-base"
        >
          <span className="font-roboto">{item.inventoryId}</span>
          <div className="font-semibold">
            <span
              className={`${
                item.quantity >= 65
                  ? "text-secondary-0"
                  : item.quantity <= 25
                  ? "text-red-400"
                  : "text-yellow-0"
              }
 text-shadow-titleBlack text-md`}
            >
              {item.quantity}
            </span>
            /<span> 100</span>
          </div>
        </div>
      ))}
    </div>
  );
}
