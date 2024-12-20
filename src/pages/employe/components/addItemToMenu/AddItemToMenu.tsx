import { useState } from "react";
import addItem from "/img/check-color.svg";
import deleteItem from "/img/delete.svg";
import { FormDataNewItem } from "../../../../types/types/types";
import addNewItem from "../../../../services/menu/addNewItem/addNewItemApi";

export default function AddItemToMenu({
  toggleItem,
  closeNewItem,
  fetchAllItems,
}: {
  toggleItem: boolean;
  closeNewItem: VoidFunction;
  fetchAllItems: VoidFunction;
}) {
  const [formData, setFormData] = useState<FormDataNewItem>({
    category: "",
    menuId: "",
    description: "",
    price: 0,
    ingredients: [],
  });

  // Add new item
  const handleSubmit = async () => {
    console.log("testar innan await");

    await addNewItem(formData);
    // BEHÖVER UPPDATERAS, DEN OMRENDERAS INTE
    fetchAllItems();

    closeNewItem();
  };

  // Hande input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Take name and value from every input
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        // Convert price to a number and ingredients to []
        name === "price"
          ? parseFloat(value)
          : name === "ingredients"
          ? value.split(",")
          : // Else keep value as a string
            value,
    }));
  };

  return (
    <form
      className={`${
        toggleItem ? "flex" : "hidden"
      }  w-full h-auto border border-black rounded-md flex-col lg:flex-row justify-between px-2 py-5 `}
    >
      <div className="flex flex-col items-start justify-start w-20">
        <h2 className="font-medium">Category</h2>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          required
          autoComplete="off"
          className="border px-1 focus:outline-none w-full"
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-start justify-start w-16">
        <h2 className="font-medium">Name</h2>
        <input
          type="text"
          name="menuId"
          id="name"
          placeholder="Name"
          required
          autoComplete="off"
          className="border px-1 focus:outline-none w-full"
          value={formData.menuId}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Ingredients</h2>
        <input
          type="text"
          name="ingredients"
          id="ingredients"
          placeholder="tex salad, meat"
          className="border px-1 focus:outline-none w-full"
          autoComplete="off"
          value={formData.ingredients}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-start justify-start w-32">
        <h2 className="font-medium">Description</h2>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          required
          autoComplete="off"
          className="border px-1 focus:outline-none w-full"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-start justify-start w-16">
        <h2 className="font-medium">Price</h2>
        <input
          type="number"
          name="price"
          id="price"
          min={100}
          placeholder="0 :-"
          required
          autoComplete="off"
          className="border px-1 focus:outline-none w-full"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-24 self-center h-auto flex items-center justify-between ml-4">
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
