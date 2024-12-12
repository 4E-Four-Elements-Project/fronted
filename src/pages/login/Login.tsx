import { useState } from "react";
import Contact from "../../components/layout/contact/contact";
import Header from "../../components/layout/header/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const LOGIN_API_URL = import.meta.env.VITE_POST_LOGIN_URL;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(
          errorText || "Login failed. Please check your credentials."
        );
      }

      // Hämta texten från svaret
      const responseText = await response.text();

      // Extrahera token från texten
      const tokenMatch = responseText.match(/token:\s*([\w.-]+)/); // Regex för att hitta token
      const token = tokenMatch ? tokenMatch[1] : null;

      const roleMatch = responseText.match(/role:\s*([\w.-]+)/); // Regex för att hitta role
      const role = roleMatch ? roleMatch[1] : null;

      if (token && role === "staff") {
        // Spara token i localStorage
        localStorage.setItem("authToken", token);

        // Navigera till en annan sida
        window.location.href = "/employe";
      } else if (token && role === "user") {
        // Spara token i localStorage
        localStorage.setItem("authToken", token);

        // Navigera till en annan sida
        window.location.href = "/";
      } else {
        console.warn("Token not found in response.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Video */}
      <figure className="absolute right-0 h-sm mw-auto hidden lg:block">
        <video
          src="./src/assets/video/landing-video.mp4"
          className="rounded shadow-lg h-full xl:w-[600px] lg:w-[400px] object-cover"
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
        />
      </figure>

      <video
        src="./src/assets/video/landing-video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 lg:hidden"
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
      />

      {/* Login-formulär */}
      <Header className="xl:w-1/2 xl:z-10 w-full z-10 absolute" />
      <div className="w-full lg:w-3/5 h-screen flex items-center justify-center">
        <form
          className="max-w-md p-6 flex flex-col justify-center z-0 md:shadow-none rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => {
                console.log("Username changed:", e.target.value); // Loggar användarnamnändring
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => {
                console.log("Password changed"); // Loggar lösenordändring
                setPassword(e.target.value);
              }}
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            className="relative block w-full px-4 py-2 text-lg text-green-600 border border-solid border-black rounded bg-white before:absolute before:content-[''] before:top-1/4 before:left-0 before:ml-2 before:w-[calc(100%)] before:h-10 before:bg-secondary before:rounded before:border before:border-black before:-z-10 before:bg-secondary-0 before:transition-transform before:duration-300 hover:before:translate-x-[-8px] hover:before:translate-y-[-7px]"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <Contact />
    </div>
  );
};

export default Login;
