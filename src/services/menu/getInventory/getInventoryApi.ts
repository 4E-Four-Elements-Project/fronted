const url = import.meta.env.VITE_GET_INVENTORY_URL;

export default async function getInventory() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
    // console.log(json);
  } catch (error) {
    console.error((error as Error).message);
  }
}
