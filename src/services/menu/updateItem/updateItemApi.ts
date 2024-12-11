import { MenuItems } from "../../../types/interface/interface";

const url = import.meta.env.VITE_UPDATE_ITEM_URL;

export default async function updateItem({ body }: { body: MenuItems }) {
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
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Error updating ${"MATRÄTT"}. Status: ${response.status}`
      );
    }

    const json = response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}
