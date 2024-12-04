import { FilterContext } from "../../../context/FilterContext";
import { MenuFilterProps } from "../../../types/interface/interface";
import { handleClickOutside } from "../../../utils/handleClickOutside/HandleClickOutside";
import { useContext, useEffect, useRef } from "react";

export default function FilterModal({ toggle, setToggle }: MenuFilterProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Context to filter items
  const filter = useContext(FilterContext);

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
      } absolute top-6 -left-3 bg-white border border-black rounded-md w-28 h-52 flex-col justify-around z-50 font-Roboto`}
      ref={ref}
    >
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-slate-100"
        onClick={() => filter?.changeFilter("low")}
      >
        <span className="text-sm">Lowest price</span>
      </div>
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-slate-100"
        onClick={() => filter?.changeFilter("high")}
      >
        <span className="text-sm">Highest price</span>
      </div>
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-slate-100"
        onClick={() => filter?.changeFilter("name")}
      >
        <span className="text-sm">Name a - ö</span>
      </div>
    </div>
  );
}
