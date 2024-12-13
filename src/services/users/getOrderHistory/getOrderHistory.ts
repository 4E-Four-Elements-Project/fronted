export default async function getOrderHistory(userId: string) {
    try {
      const token = localStorage.getItem("authToken");
      // console.log("Auth Token:", token);
  
      if (!token) {
        throw new Error("Authentication token not found");
      }
  
      // console.log("User ID:", userId);
      const url = `${import.meta.env.VITE_GET_USER_ORDER_URL}/${userId}`;
      // console.log("API URL:", url);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // console.log("API Response:", response);
  
      if (!response.ok) {
        console.error(`Response Error: ${response.status} - ${response.statusText}`);
        throw new Error(`Failed to fetch: ${response.status}`);
      }
  
      const json = await response.json();
      // console.log("Parsed JSON:", json);
  
      return json;
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  }
  