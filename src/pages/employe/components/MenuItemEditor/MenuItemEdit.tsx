import { useState } from "react";
import editPen from "../../../../assets/img/editPen.svg";
import delteItem from "../../../../assets/img/delete.svg";
import submitEditIcon from "../../../../assets/img/check-color.svg";
import { MenuItems } from "../../../../types/interface/interface";
import * as React from "react";
import deleteItem from "../../../../services/menu/deleteItem/deleteItem";
import updateItem from "../../../../services/menu/updateItem/updateItemApi";

// break down ingredients string to an array
const stringToArray = (ingredientsString: string) => {
  const ingredientsArr = ingredientsString.split(", ");
  // console.log(ingredientsArr);

  return ingredientsArr;
};

export default function MenuItemEdit(props: MenuItems) {
  const { category, menuId, description, price, ingredients } = props;
  const [categoryName, setCategoryName] = useState(category);
  const [name, setName] = useState(menuId);
  const [desc, setDesc] = useState(description);
  const [unitPrice, setUnitPrice] = useState(price || 0);
  const [ingred, setIngred] = useState(ingredients || [""]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleIngredients = (e: React.ChangeEvent<HTMLInputElement>) => {
    stringToArray(e.target.value);
    setIngred(stringToArray(e.target.value));
  };

  //   Delete item from menu
  const deleteMenuItem = async () => {
    const menuId = name ?? "invalid";
    if (menuId === "invalid") {
      alert("ERROR mayday mayday");
    }
    await deleteItem({ menuId: menuId });
  };

  //   Send update to db
  const handleSubmitEdit = async () => {
    const updatedItem = {
      menuId: name,
      category: categoryName,
      description: desc,
      price: unitPrice,
      ingredients: ingred,
    };

    console.log("Calling updateItem with:", updatedItem);
    try {
      await updateItem({ updatedItem });
      setIsEditing(false);
    } catch (error) {
      console.error("Error in handleSubmitEdit:", error);
    }
  };

  return (
    <div className="w-full h-auto border border-black rounded-md flex flex-col lg:flex-row justify-between px-2 py-1 gap-1">
      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Category</h2>
        {isEditing ? (
          <input
            type="text"
            id="categoryName"
            placeholder={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            className="border px-1 focus:outline-none"
            autoComplete="off"
          />
        ) : (
          <p className="font-light">{categoryName}</p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Name</h2>
        {isEditing ? (
          <input
            type="text"
            id="name"
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-1 focus:outline-none"
            autoComplete="off"
          />
        ) : (
          <p className="font-light">{name}</p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Ingredients</h2>
        {isEditing ? (
          <div className="flex flex-col">
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              placeholder="tex salad, meat"
              className="w-24 border px-1 focus:outline-none"
              autoComplete="off"
              onChange={handleIngredients}
            />
          </div>
        ) : (
          ingredients?.map((ingred, index) => (
            <p key={index} className="font-light">
              {ingred}
            </p>
          ))
        )}
      </div>
      <div className="flex flex-col items-start justify-start w-32">
        <h2 className="font-medium">Description</h2>
        {isEditing ? (
          <input
            type="text"
            placeholder={desc}
            id="desc"
            onChange={(e) => setDesc(e.target.value)}
            className="border px-1  focus:outline-none"
            autoComplete="off"
          />
        ) : (
          <p className="font-light">{desc}</p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Price</h2>
        {isEditing ? (
          <input
            type="number"
            id="num"
            min={100}
            placeholder={unitPrice.toString()}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="border px-1 w-16 focus:outline-none"
            autoComplete="off"
          />
        ) : (
          <p className="font-light">
            {unitPrice} <span className="font-bold tracking-widest">:-</span>
          </p>
        )}
      </div>
      <div className="w-full self-center md:w-32 flex justify-evenly items-center">
        {isEditing ? (
          <img
            src={submitEditIcon}
            className="cursor-pointer active:scale-95 w-6 select-none"
            onClick={handleSubmitEdit}
          />
        ) : (
          <img
            src={editPen}
            alt="Edit pen"
            className="cursor-pointer active:scale-95 w-5 select-none"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        )}

        <img
          src={delteItem}
          alt="Delete menu"
          className="cursor-pointer active:scale-95 h-8 select-none"
          onClick={deleteMenuItem}
        />
      </div>
    </div>
  );
}
