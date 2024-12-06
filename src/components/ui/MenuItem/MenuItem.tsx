import { MenuItems } from "../../../types/interface/interface";
import { motion, Variants } from "motion/react";
import addBtnFront from "../../../assets/img/addBtn.svg";
import addBtnOutline from "../../../assets/img/addBtnOutline.svg";


interface MenuItemProps extends MenuItems {
  onAddToCart: (menuItem: MenuItems) => void;
}

export default function MenuItem({ menuId, description, price, onAddToCart, }: MenuItemProps) {
  const addBtnAnimation: Variants = {
    initial: { y: 0, x: 0 },
    animate: { y: -1, x: -2 },
  };

  return (
    <section className="w-72 lg:w-full h-44 border border-slate-300 rounded-lg bg-white px-2 pt-2">
      <h3 className="font-Londrina font-semibold text-2xl tracking-widest">
        {(menuId ?? "").replace("_", " ")}
      </h3>
      <p className="font-Roboto font-sm">{description}</p>
      <p className="font-semibold font-Londrina relative top-6 left-0 text-2xl tracking-widest lg:top-10 lg:left-5 lg:text-3xl">
        {price} :-
      </p>

      {/* Add Button */}
      <motion.div
        initial="initial"
        animate="initial"
        whileHover="animate"
        onClick={() => onAddToCart({ menuId, description, price })}
        className="relative -top-3 left-36 cursor-pointer w-24 lg:top-1 lg:left-80"
      >
        <motion.img
          src={addBtnFront}
          variants={addBtnAnimation}
          whileTap={{ scale: 0.95 }}
          className="absolute top-0 left-0 w-auto h-auto z-10"
          alt=""
        />
        <motion.img
          src={addBtnOutline}
          alt=""
          className="absolute -top-1 -left-1"
        />
      </motion.div>
    </section>
  );
}
