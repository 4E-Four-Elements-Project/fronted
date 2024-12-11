const url = import.meta.env.VITE_DELETE_ITEM_URL;

export default async function deleteItem({ menuId }: { menuId: string }) {
  try {
    // Get token from local storage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Can't find token");
    }

    // Delete item
    const response = await fetch(`${url}${menuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting ${menuId}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
