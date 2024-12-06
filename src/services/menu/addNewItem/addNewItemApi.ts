const url = import.meta.env.VITE_ADD_ITEM_URL;

export default async function addNewItem(body: object) {
  try {
    console.log(body, "Body");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlOTgyMWQ1NS1jMmQxLTQwYTgtODVhMC02MmM5MjA5OTg3ODkiLCJyb2xlIjoic3RhZmYiLCJpYXQiOjE3MzM0ODMzNjEsImV4cCI6MTczMzQ4Njk2MX0.HuHU_Mlgl8skGOR3KlbcA-4zw1-msgqAZvSKoI14Wwk`,
        userId: "e9821d55-c2d1-40a8-85a0-62c920998789",
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
