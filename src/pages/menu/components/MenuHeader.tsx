import filterFront from "/img/filterFront.svg";
import filterBack from "/img/filterBack.svg";
import { motion, Variants } from "motion/react";
import { useState } from "react";
import FilterModal from "./FilterModal";

export default function MenuHeader() {
  const [toggle, setToggle] = useState<boolean>(false);

  // Animation
  const filterBtnAnimation: Variants = {
    initial: { y: 0, x: 0 },
    animate: { y: -1, x: -1 },
  };

  // Toggle filter
  const toggleFilter = (): void => {
    setToggle(!toggle);
  };

  return (
    <section className="w-full px-4 flex items-end justify-between relative">
      <div className="flex items-end">
        <h3 className="font-Londrina text-5xl tracking-widest select-none">
          Menu
        </h3>
      </div>

      {/* Filter Button */}
      <motion.div className="relative -top-1 left-0 w-auto h-auto cursor-pointer">
        <motion.img
          src={filterFront}
          initial="initial"
          animate="initial"
          whileHover="animate"
          variants={filterBtnAnimation}
          whileTap={{ scale: 0.95 }}
          alt="Filter button front"
          className="absolute top-0 left-0 w-auto h-auto z-10"
          onClick={toggleFilter}
        />
        <motion.img
          src={filterBack}
          alt="Filter button background"
          className="relative -top-1 -left-1 w-auto h-auto"
        />
        <FilterModal toggle={toggle} setToggle={setToggle} />
      </motion.div>
    </section>
  );
}
