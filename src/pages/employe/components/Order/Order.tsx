import greenMark from "../../../../assets/img/check-color.svg";
import deleteMark from "../../../../assets/img/delete.svg";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export default function Order() {
  const [orderId, setOrderId] = useState<string>("Order ID not found");
  const [additionalInfo, setAdditionalInfo] = useState<string | undefined>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   console.log(additionalInfo);
  // }, [additionalInfo]);

  const handleInfoField = (): void => {
    setAdditionalInfo(textareaRef.current?.value);
  };

  return (
    <div className="w-full h-64 border border-black flex flex-col items-start py-2 px-4 font-Roboto rounded-md">
      <div className="w-full h-full grid grid-rows-6">
        <div className="flex justify-between items-center h-full w-full row-span-2">
          <div className="flex-col">
            <p className="font-semibold select-none">Order</p>
            <span className="p-1 border border-black">{orderId}</span>
          </div>
          <div className="border border-black rounded-sm bg-secondary-0 w-20 h-8 relative top-3">
            <motion.div
              whileHover={{ x: 2, y: 2 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm w-20 h-8 relative -top-1 -left-1 bg-white border border-black rounded-sm flex items-center justify-center cursor-pointer select-none"
            >
              More info
            </motion.div>
          </div>
        </div>
        <div className="row-span-2 w-full h-full">
          <p className="font-semibold select-none">Info</p>
          <textarea
            ref={textareaRef}
            name="additionalInfo"
            id="additionalInfo"
            value={additionalInfo}
            onChange={handleInfoField}
            placeholder="No additional info"
            className="border border-black w-full h-2/3 p-1 resize-none focus:outline-none"
          />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-between">
          <p className="font-semibold">Mark as ready</p>
          <div className="w-1/3 md:w-32 flex items-center justify-between">
            <img
              src={greenMark}
              alt="Green mark"
              className="cursor-pointer w-8"
            />
            <img
              src={deleteMark}
              alt="Trash can"
              className="cursor-pointer w-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
