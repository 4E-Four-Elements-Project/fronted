import { MenuItems } from "../../../types/interface/interface";

const handleAddToCart = async (menuItem: MenuItems) => {
    try {
      const response = await fetch("https://j4u384wgne.execute-api.eu-north-1.amazonaws.com/cart/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuId: menuItem.menuId,
          // ingredients: menuItem.ingredients || "Not specified",
          price: menuItem.price,
          // category: menuItem.category || "Unknown",
          // description: menuItem.description,
          // quantity: 1,
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