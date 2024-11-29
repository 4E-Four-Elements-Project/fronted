import greenMark from "../../../assets/img/check-color.svg";
import deleteMark from "../../../assets/img/delete.svg";
import { useState, useRef, useEffect } from "react";

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
    <div className="w-full h-64 border border-black flex flex-col items-start p-2 font-Roboto rounded-md ">
      <div className="w-full h-full grid grid-rows-6">
        <div className="flex flex-col h-full w-full row-span-2">
          <p className="font-semibold">Order</p>
          <span className="p-1 border border-black">{orderId}</span>
        </div>
        <div className="row-span-2 w-full h-full">
          <p className="font-semibold">Info</p>
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
          <div className="w-1/3 flex items-center justify-between">
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
