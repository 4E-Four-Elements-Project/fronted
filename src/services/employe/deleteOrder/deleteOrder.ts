const url = import.meta.env.VITE_DELETE_ORDER_URL;

export default async function deleteOrder({ orderId }: { orderId: string }) {
  try {
    // const token = localStorage.getItem("authToken");

    // if (!token) {
    //   throw new Error("Can't find token");
    // }
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
  } catch (error) {
    console.error((error as Error).message);
  }
}
