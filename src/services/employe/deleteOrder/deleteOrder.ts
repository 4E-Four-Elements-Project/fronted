const url = import.meta.env.VITE_DELETE_ORDER_URL;
const user = "guest";
console.log("API URL:", url);
export default async function deleteOrder({ orderId }: { orderId: string }) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Can't find token");
    }
    const response = await fetch(`${url}${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      //   body: JSON.parse("guest"),
      //   body: JSON.stringify(user),
    });
    console.log(url + orderId);

    if (!response.ok) {
      throw new Error(`Error deleting ${orderId}. Status: ${response.status}`);
    }

    // console.log(json);
  } catch (error) {
    console.error((error as Error).message);
  }
}
