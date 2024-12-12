import { MenuItems } from "../../../types/interface/interface";

const handleAddToCart = async (menuItem: MenuItems) => {
  //if token exist it should add it to the authorization header, if not nothing should be in the authorization header
  const token = localStorage.getItem("token");
   // Construct headers dynamically
   const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log('headers',headers);
  


    try {
      const response = await fetch("https://j4u384wgne.execute-api.eu-north-1.amazonaws.com/cart/post", {
        method: "POST",
        headers,
        body: JSON.stringify({
          menuId: menuItem.menuId,
          price: menuItem.price,
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.errorMessage || "Failed to add to cart");
      }
  
      return responseData.data; // Returnerar data från servern
    } catch (error) {
      console.error("Misslyckades med att lägga till i cart:", error);
      throw error; // Skicka felet vidare för att hanteras i komponenten
    }
  };
  
  export default handleAddToCart;