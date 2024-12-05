import { motion } from "motion/react";

export default function PendingOrders() {
  return (
    <div className="w-full min-h-64 bg-white rounded-md px-2 py-4 flex flex-col justify-around border border-pink-0">
      <h2 className="font-light">
        Order id: <span className="font-regular">12312312</span>
      </h2>
      <div className="w-full h-auto flex flex-col items-start justify-between">
        {/* Mappa ut maträtterna */}
        <p className="font-light">Kebab</p>
        <p className="font-light">Kebab</p>
        <p className="font-light">Kebab</p>
        <p className="font-light">Kebab</p>
      </div>
      <div className="w-full h-auto border border-black rounded-sm px-1">
        <p className="">Vill inte har potatis</p>
      </div>
      <div className="border border-black rounded-sm bg-pink-0 w-20 h-8 relative top-3 self-center">
        <motion.div
          whileHover={{ x: 2, y: 2 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm w-20 h-8 relative -top-1 -left-1 bg-white border border-black rounded-sm flex items-center justify-center cursor-pointer select-none"
        >
          Pick order
        </motion.div>
      </div>
    </div>
  );
}
