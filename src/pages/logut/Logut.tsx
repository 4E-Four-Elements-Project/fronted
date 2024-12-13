const handleLogout = async () => {
  const LOGOUT_API_URL = import.meta.env.VITE_POST_LOGOUT_URL;


  // Hämta token från localStorage
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No token found in localStorage.");
    return;
  }

  try {
    const response = await fetch(LOGOUT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Logout failed.");
    }

    // Rensa token från localStorage och navigera till login
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  } catch (err: any) {
    console.error("Error during logout:", err);
    alert(err.message || "Something went wrong during logout.");
  }
};
export default handleLogout;
