import getSpecificOrder from "../getSpecificOrder/getSpecificOrder";

const url = import.meta.env.VITE_PUT_ORDER_URL;

export default async function updateOrderStatus({
  orderId,
  status,
  additionalInfo,
}: {
  orderId: string;
  status: string;
  additionalInfo?: string;
}) {
  try {
    const orderDataResponse = await getSpecificOrder({ orderId });

    const orderData = orderDataResponse.data["Order-details"];
    console.log("logging from api", additionalInfo);

    const updatedOrder = {
      ...orderData,
      orderStatus: status,
      price: parseFloat(orderData.price),
      comment: additionalInfo,
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