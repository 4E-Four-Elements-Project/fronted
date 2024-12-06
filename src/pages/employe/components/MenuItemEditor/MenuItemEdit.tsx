import { useState } from "react";
import editPen from "../../../../assets/img/editPen.svg";
import delteItem from "../../../../assets/img/delete.svg";
import submitEditIcon from "../../../../assets/img/check-color.svg";
import { MenuItemProps } from "../../../../types/interface/interface";
import * as React from "react";
import deleteItem from "../../../../services/menu/deleteItem/deleteItem";

// break down ingredients sting to an array
const stringToArray = (ingredientsString: string) => {
  const ingredientsArr = ingredientsString.split(", ");
  console.log(ingredientsArr);

  return ingredientsArr;
};

export default function MenuItemEdit(props: MenuItemProps) {
  const { itemCategory, itemName, itemDesc, itemPrice, itemIngredients } =
    props;
  const [categoryName, setCategoryName] = useState(itemCategory);
  const [name, setName] = useState(itemName);
  const [description, setDescription] = useState(itemDesc);
  const [price, setPrice] = useState(itemPrice || 0);
  const [ingredients, setIngredients] = useState(itemIngredients);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [submitEdit, setSubmitEdit] = useState<boolean>(false);

  const handleIngredients = (e: React.ChangeEvent<HTMLInputElement>) => {
    stringToArray(e.target.value);
    setIngredients(stringToArray(e.target.value));
  };

  // console.log(ingredients);

  //   Delete item from menu
  const deleteMenuItem = async () => {
    const menuId = name ?? "invalid";
    if (menuId === "invalid") {
      alert("ERROR mayday mayday");
    }
    const response = await deleteItem({ menuId: menuId });
    console.log(response);
  };

  //   Send update to db
  const handleSubmitEdit = (): void => {
    setSubmitEdit(!submitEdit);
  };

  return (
    <div className="w-full h-auto border border-black rounded-md flex flex-col md:flex-row justify-between px-2 py-1">
      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Category</h2>
        {isEditing ? (
          <input
            type="text"
            placeholder={categoryName}
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
            placeholder={name}
            className="border px-1  focus:outline-none"
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
          ingredients?.map((ingredient, index) => (
            <p key={index} className="font-light">
              {ingredient}
            </p>
          ))
        )}
      </div>
      <div className="flex flex-col items-start justify-start w-44">
        <h2 className="font-medium">Description</h2>
        {isEditing ? (
          <input
            type="text"
            placeholder={description}
            className="border px-1  focus:outline-none"
            autoComplete="off"
          />
        ) : (
          <p className="font-light">{description}</p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start w-24">
        <h2 className="font-medium">Price</h2>
        {isEditing ? (
          <input
            type="number"
            min={100}
            placeholder={price.toString()}
            className="border px-1 w-16 focus:outline-none"
            autoComplete="off"
          />
        ) : (
          <p className="font-light">
            {price} <span className="font-bold tracking-widest">:-</span>
          </p>
        )}
      </div>
      <div className="w-full md:w-32 flex justify-evenly items-center">
        {submitEdit ? (
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
