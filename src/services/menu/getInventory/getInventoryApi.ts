const url = import.meta.env.VITE_GET_INVENTORY_URL;

export default async function getInventory() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response stataus: ${response.status}`);
    }

    const json = response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.error((error as Error).message);
  }
}
