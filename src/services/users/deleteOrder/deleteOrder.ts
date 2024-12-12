const url = import.meta.env.VITE_DELETE_ORDER_URL;

export default async function deleteOrder({ orderId }: { orderId: string }) {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${url}/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting ${orderId}. Status: ${response.status}`);
    }

    console.log(`Order ${orderId} deleted successfully`);
    return true; // Indicate success
  } catch (error) {
    console.error("Failed to delete order:", error);
    return false; // Indicate failure
  }
}
