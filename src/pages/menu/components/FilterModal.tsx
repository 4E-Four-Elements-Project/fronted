import { MenuFilterProps } from "../../../types/interface/interface";
import { handleClickOutside } from "../../../utils/handleClickOutside/HandleClickOutside";
import { useEffect, useRef } from "react";

export default function FilterModal({ toggle, setToggle }: MenuFilterProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Handle click outside the modal
  useEffect(() => {
    const clickOutside = handleClickOutside(ref, setToggle);
    document.addEventListener("mousedown", clickOutside);

    return () => removeEventListener("mousedown", clickOutside);
  }, [setToggle]);

  return (
    <div
      className={`${
        toggle ? "flex" : "hidden"
      } absolute top-6 -left-3 bg-white border border-black rounded-md w-28 h-52 flex-col justify-around z-50`}
      ref={ref}
    >
      {/* TEMP */}
      <button>filter1</button>
      <button>filter2</button>
      <button>filter3</button>
      <button>filter4</button>
      <button>filter5</button>
    </div>
  );
}
