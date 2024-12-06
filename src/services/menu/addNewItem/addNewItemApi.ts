const url = import.meta.env.VITE_ADD_ITEM_URL;

export default async function addNewItem(body: object) {
  try {
    console.log(body, "Body");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.error((error as Error).message);
  }
}
