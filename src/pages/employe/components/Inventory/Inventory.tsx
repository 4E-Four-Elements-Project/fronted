import { useEffect, useState } from "react";

// Api
import getInventory from "../../../../services/menu/getInventory/getInventoryApi";

export default function Inventory() {
  // Update with api from inventory
  const [meatAmount, setMeatAmount] = useState<number>(50);
  const [saladAmount, setSaladAmount] = useState<number>(6);
  const [soupAmount, setSoupAmount] = useState<number>(100);
  const [sauceAmount, setSauceAmount] = useState<number>(100);

  // useEffect(() => {
  //   // getInventory();

  //   const fetchData = async () => {
  //     const data = await getInventory();
  //     console.log(data?.quantity);
  //   };

  //   fetchData();
  //   // const data = getInventory();
  //   // console.log(data?.quatity);
  // }, []);

  return (
    <div className="w-full h-80 border border-black bg-white rounded-md col-start-3 flex flex-col items-start justify-around px-6 ">
      <div className="text-sm font-semibold w-full flex justify-between">
        <p>INGREDIENTS</p>
        <p>STATUS</p>
      </div>
      <div className="flex justify-between w-full text-xl">
        <span className="font-roboto">Meat</span>
        <div className="font-semibold">
          <span
            className={`${
              meatAmount >= 65
                ? "text-secondary-0"
                : meatAmount <= 25
                ? "text-red-400"
                : "text-yellow-0"
            }
 text-shadow-titleBlack text-md`}
          >
            {meatAmount}
          </span>{" "}
          /<span> 100</span>
        </div>
      </div>
      <div className="flex justify-between w-full text-xl">
        <span className="font-roboto">Salad</span>
        <div className="font-semibold">
          <span
            className={`${
              saladAmount >= 65
                ? "text-secondary-0"
                : saladAmount <= 25
                ? "text-red-400"
                : "text-yellow-0"
            }
 text-shadow-titleBlack`}
          >
            {saladAmount}
          </span>{" "}
          /<span> 100</span>
        </div>
      </div>
      <div className="flex justify-between w-full text-xl">
        <span className="font-roboto">Soup</span>
        <div className="font-semibold">
          <span
            className={`${
              soupAmount >= 65
                ? "text-secondary-0"
                : soupAmount <= 25
                ? "text-red-400"
                : "text-yellow-0"
            }
 text-shadow-titleBlack`}
          >
            {soupAmount}
          </span>{" "}
          /<span> 100</span>
        </div>
      </div>
      <div className="flex justify-between w-full text-xl">
        <span className="font-roboto">Sauce</span>
        <div className="font-semibold">
          <span
            className={`${
              sauceAmount >= 65
                ? "text-secondary-0"
                : sauceAmount <= 25
                ? "text-red-400"
                : "text-yellow-0"
            }
 text-shadow-titleBlack`}
          >
            {sauceAmount}
          </span>{" "}
          /<span> 100</span>
        </div>
      </div>
    </div>
  );
}
