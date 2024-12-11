const url = import.meta.env.VITE_GET_SPECIFIC_ORDER_URL;

export default async function getSpecificOrder({
  orderId,
}: {
  orderId: string;
}) {
  try {
    const response = await fetch(`${url}${orderId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error fetching ${orderId}. Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}
