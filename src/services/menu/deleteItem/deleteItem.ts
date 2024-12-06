const url = import.meta.env.VITE_DELETE_ITEM_URL;

export default async function deleteItem({ menuId }: { menuId: string }) {
  try {
    const response = await fetch(`${url}${menuId}`, {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${token}`,
        // userId: userId,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting ${menuId}. Status: ${response.status}`);
    }

    const json = response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

// "Authorization": `Bearer ${token}`,
// "userId": userId,
