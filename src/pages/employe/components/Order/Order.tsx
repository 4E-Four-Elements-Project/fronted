import greenMark from "../../../../assets/img/check-color.svg";
import deleteMark from "../../../../assets/img/delete.svg";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export default function Order() {
  const [orderId, setOrderId] = useState<string>("Order ID not found");
  const [additionalInfo, setAdditionalInfo] = useState<string | undefined>("");
  const [isOrderItemVisible, setIsOrderItemsVisible] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   console.log(additionalInfo);
  // }, [additionalInfo]);

  const handleInfoField = (): void => {
    setAdditionalInfo(textareaRef.current?.value);
  };

  return (
    <div className="w-full h-auto border border-black flex flex-col items-start px-4 font-Roboto rounded-md">
      <div
        className={`w-full h-auto grid py-1 ${
          isOrderItemVisible ? "grid-rows-3" : "grid-rows-3"
        }`}
      >
        <div className="flex justify-between items-center h-full w-full row-span-1">
          <div className="flex-col">
            <p className="font-semibold select-none">Order</p>
            <span className="p-1 border border-black">{orderId}</span>
          </div>
          <div className="border border-black rounded-sm bg-secondary-0 w-20 h-8 relative top-3">
            <motion.div
              whileHover={{ x: 2, y: 2 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm w-20 h-8 relative -top-1 -left-1 bg-white border border-black rounded-sm flex items-center justify-center cursor-pointer select-none"
              onClick={() => {
                setIsOrderItemsVisible(!isOrderItemVisible);
              }}
            >
              {isOrderItemVisible ? "Close" : "More info"}
            </motion.div>
          </div>
        </div>
        {/* See ordered items */}
        {isOrderItemVisible && (
          <div className="w-full h-auto row-span-2 flex flex-col border border-red-400 mt-2">
            <p className="font-semibold select-none">Ordered Items</p>
            {/* Map out all the items */}
            <span>Kebab</span>
            <span>Kebab</span>
            <span>Kebab</span>
          </div>
        )}
        <div className={`${""} w-full`}>
          <p className="font-semibold select-none">Info</p>
          <textarea
            ref={textareaRef}
            name="additionalInfo"
            id="additionalInfo"
            value={additionalInfo}
            onChange={handleInfoField}
            placeholder="No additional info"
            className="border border-black w-full h-3/5 p-1 resize-none focus:outline-none"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-between">
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
