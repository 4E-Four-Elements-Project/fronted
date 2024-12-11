const handleLogout = async () => {
    const LOGOUT_API_URL = import.meta.env.VITE_POST_LOGOUT_URL;

    console.log("LOGOUT_API_URL:", LOGOUT_API_URL);
    console.log("Environment variables:", import.meta.env);

    // Hämta token från localStorage
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }
  
    try {
      console.log("Sending logout request to:", LOGOUT_API_URL);
      console.log("Data sent:", { token });
  
      const response = await fetch(LOGOUT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(errorText || "Logout failed.");
      }
  
      const data = await response.json();
      console.log("Logout successful. Response data:", data);
  
      // Rensa token från localStorage och navigera till login
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } catch (err: any) {
      console.error("Error during logout:", err);
      alert(err.message || "Something went wrong during logout.");
    }
  };
export default handleLogout;  
