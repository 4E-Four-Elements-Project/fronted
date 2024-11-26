import filterFront from "../../../assets/img/filterFront.svg";
import filterBack from "../../../assets/img/filterBack.svg";
import { motion, Variants } from "motion/react";

export default function MenuHeader() {
  const filterBtnAnimation: Variants = {
    initial: { y: 0, x: 0 },
    animate: { y: -1, x: -1 },
  };

  return (
    <section className="flex items-end justify-between">
      <div className="flex items-end">
        {/* <img src={meatIcon} alt="Meat icon" className="w-16 mb-1 mr-1" /> */}
        <h3 className="font-Londrina text-5xl tracking-widest select-none">
          Menu
        </h3>
      </div>
      {/* Filter Button */}
      <motion.div
        initial="inital"
        animate="inital"
        whileHover="animate"
        className="relative -top-1 left-0 w-auto h-auto cursor-pointer"
      >
        <motion.img
          src={filterFront}
          variants={filterBtnAnimation}
          alt="Filter button front"
          className="absolute top-0 left-0 w-auto h-auto z-10"
        />
        <motion.img
          src={filterBack}
          alt="Filter button background"
          className="relative -top-1 -left-1 w-auto h-auto"
        />
      </motion.div>
    </section>
  );
}
