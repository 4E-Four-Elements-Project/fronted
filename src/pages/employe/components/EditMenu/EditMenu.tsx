import { useState } from "react";
import AddItemToMenu from "../addItemToMenu/AddItemToMenu";
import MenuItemEdit from "../MenuItemEditor/MenuItemEdit";
import { motion } from "motion/react";

export default function EditMenu() {
  const [toggleNewItem, setToggleNewItem] = useState<boolean>(false);

  const handleCloseNewItem = (): void => {
    setToggleNewItem((prev) => !prev);
    console.log(toggleNewItem);
  };

  return (
    <div className="w-full bg-white h-80 overflow-y-scroll rounded-md scroll-smooth no-scrollbar col-span-3 border border-black flex flex-col gap-4 px-2 py-3 font-Roboto ">
      <div className="w-full flex justify-between items-center">
        <h5 className="">Edit menu</h5>
        <div className="w-24 h-8 border border-black bg-secondary-0 cursor-pointer select-none">
          <motion.div
            whileHover={{ x: 2, y: 2 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-8 border border-black bg-white flex items-center justify-center rounded-sm relative -top-1 -left-1"
            onClick={() => {
              setToggleNewItem(!toggleNewItem);
            }}
          >
            Add item
          </motion.div>
        </div>
      </div>
      {/* Add every menu and a edit function */}
      {toggleNewItem && (
        <AddItemToMenu
          toggleItem={toggleNewItem}
          closeNewItem={handleCloseNewItem}
        />
      )}
      <MenuItemEdit
        itemCategory={"Meat"}
        itemDesc={
          "God hamburgare som har senap på locket istället för i brödet. Herregud va fult detta blev. Men detta kanske fungerar bra?!"
        }
        itemName={"Hamburgare"}
        itemPrice={239}
      />
      <MenuItemEdit
        itemCategory={"Meat"}
        itemDesc={"En stor pizza"}
        itemName={"Pizza"}
        itemPrice={239}
      />
      <MenuItemEdit
        itemCategory={"Meat"}
        itemDesc={"Go' chebab"}
        itemName={"Kebab"}
        itemPrice={239}
      />
      <MenuItemEdit
        itemCategory={"Meat"}
        itemDesc={"En Calzone"}
        itemName={"Calzone"}
        itemPrice={239}
      />
    </div>
  );
}
