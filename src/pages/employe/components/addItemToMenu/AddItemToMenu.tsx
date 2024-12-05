import { useState } from "react";
import addItem from "../../../../assets/img/check-color.svg";
import deleteItem from "../../../../assets/img/delete.svg";
import { FormDataNewItem } from "../../../../types/types/types";

export default function AddItemToMenu({
  toggleItem,
  closeNewItem,
}: {
  toggleItem: boolean;
  closeNewItem: VoidFunction;
}) {
  const [formData, setFormData] = useState<FormDataNewItem>({
    category: "",
    name: "",
    description: "",
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("formData: ", formData);
    closeNewItem();
  };

  return (
    <form
      className={`${
        toggleItem ? "flex" : "hidden"
      }  w-full h-auto border border-black rounded-md flex-col md:flex-row justify-between px-2 py-5`}
    >
      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Category</h2>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          required
          autoComplete="off"
          className="border px-1 focus:outline-none"
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Name</h2>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
          autoComplete="off"
          className="border px-1 focus:outline-none"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-start justify-start w-62">
        <h2 className="font-medium">Description</h2>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          required
          autoComplete="off"
          className="border px-1 focus:outline-none"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Price</h2>
        <input
          type="number"
          name="price"
          id="price"
          min={100}
          placeholder="0 :-"
          required
          autoComplete="off"
          className="border px-1 w-16 focus:outline-none"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full md:w-24 h-auto flex items-center justify-between ml-4">
        <img
          src={addItem}
          alt="Add item icon"
          className="cursor-pointer active:scale-95 w-7"
          onClick={handleSubmit}
        />
        <img
          src={deleteItem}
          alt="Delete item icon"
          className="cursor-pointer active:scale-95 h-8 select-none"
          onClick={() => {
            closeNewItem();
          }}
        />
      </div>
    </form>
  );
}
