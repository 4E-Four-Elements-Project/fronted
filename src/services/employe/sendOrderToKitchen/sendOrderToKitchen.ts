import getSpecificOrder from "../getSpecificOrder/getSpecificOrder";

const url = import.meta.env.VITE_PUT_ORDER_URL;

export default async function sendOrderToKitchen({
  orderId,
}: {
  orderId: string;
}) {
  try {
    const orderDataResponse = await getSpecificOrder({ orderId });

    const orderData = orderDataResponse.data["Order-details"];

    const updatedOrder = {
      ...orderData,
      status: "kitchen",
      price: parseFloat(orderData.price),
    };

    const response = await fetch(`${url}${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) {
      throw new Error(`Error updating ${orderId}. Status: ${response.status}`);
    }

    // const json = await response.json();
  } catch (error) {
    console.error(error);
  }
}
