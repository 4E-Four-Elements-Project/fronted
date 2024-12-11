import { useEffect, useState } from "react";
import Order from "../Order/Order";
import getOrders from "../../../../services/employe/getOrders/getOrders";

export default function ActiveOrders() {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string>("newest");

  // Change value on the checkboxes
  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
  };

  // Fetch orders
  useEffect(() => {
    const fetchData = async () => {
      await getOrders();
    };

    fetchData();
  }, []);

  return (
    <section className="w-72 md:w-full h-80 overflow-y-scroll rounded-md scroll-smooth no-scrollbar flex flex-col gap-4 font-Roboto p-2 py-4 bg-white border border-black col-span-2 relative">
      <div className="flex justify-between items-center w-full">
        <p>Active orders</p>

        <div className="w-34 h-12 flex flex-col justify-between items-end lg:w-64 lg:items-center lg:flex-row">
          <div className="flex items-center justify-between gap-3 text-sm">
            <label
              htmlFor="checkboxFilterNewest"
              className="select-none cursor-pointer"
            >
              Newest first
            </label>
            <input
              type="checkbox"
              name="checkboxFilterNewest"
              id="checkboxFilterNewest"
              checked={selectedCheckbox === "newest"}
              onChange={() => handleCheckboxChange("newest")}
              className="w-5 h-5 cursor-pointer focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <label
              htmlFor="checkboxFilterOldest"
              className="select-none cursor-pointer"
            >
              Oldest first
            </label>
            <input
              type="checkbox"
              name="checkboxFilterOldest"
              id="checkboxFilterOldest"
              checked={selectedCheckbox === "oldest"}
              onChange={() => handleCheckboxChange("oldest")}
              className="w-5 h-5 cursor-pointer focus:outline-none"
            />
          </div>
        </div>
      </div>
      {/* Send selectedCheckbox as a prop */}
      <Order filterStatus={selectedCheckbox} />
    </section>
  );
}
