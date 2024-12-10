const url = import.meta.env.VITE_GET_MENU_URL;

export default async function getMenu() {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Can't find token");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
