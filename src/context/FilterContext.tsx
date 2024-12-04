import { createContext, useState } from "react";
import { FilterContextType } from "../types/interface/interface";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  // No filter as default
  const [filter, setFilter] = useState("default");

  // Change filter
  const changeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Return the provider
  return (
    <FilterContext.Provider value={{ filter, changeFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
