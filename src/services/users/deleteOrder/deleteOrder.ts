const url = import.meta.env.VITE_DELETE_ORDER_URL;

export default async function deleteOrder({ orderId }: { orderId: string }) {
  try {

    const response = await fetch(`${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      throw new Error(`Error deleting ${orderId}. Status: ${response.status}`);
    }
    return true; // Indicate success
  } catch (error) {
    console.error("Failed to delete order:", error);
    return false; // Indicate failure
  }
}
