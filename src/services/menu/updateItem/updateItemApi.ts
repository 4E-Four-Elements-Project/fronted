import { MenuItems } from "../../../types/interface/interface";

const url = import.meta.env.VITE_UPDATE_ITEM_URL;

export default async function updateItem({
  updatedItem,
}: {
  updatedItem: MenuItems;
}) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Can't find token");
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      throw new Error(
        `Error updating ${updatedItem}. Status: ${response.status}`
      );
    }

  } catch (error) {
    console.error(error);
  }
}
