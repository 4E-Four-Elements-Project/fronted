import { useState } from "react";
import Contact from "../../components/layout/contact/contact";
import Header from "../../components/layout/header/Header";
import MenuButton from "../../components/layout/menu-button/menu-button";
import {
  createAccount,
  UserData,
} from "../../services/users/createAccount/CreateAccount";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    // console.log(`Updating field: ${name} to value: ${value}`); // Loggar vilken fält som uppdateras
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // console.log("handleSubmit triggered"); // För att kontrollera att funktionen körs

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userData: UserData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      // console.log("Sending data to API:", userData); // Logga datan som skickas

      const response = await createAccount(userData);

      alert(response.message || "Account created successfully!");
    } catch (error) {
      alert("Failed to create account. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Video */}
      <figure className="absolute right-0 h-sm mw-auto hidden md:block">
        <video
          src="./src/assets/video/landing-video.mp4"
          className="rounded shadow-lg h-full w-[600px] object-cover"
          autoPlay
          muted
          loop
        />
      </figure>

      {/* Mobilbakgrund för videon */}
      <video
        src="./src/assets/video/landing-video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 md:hidden"
        autoPlay
        muted
        loop
      />

      {/* Login-formulär */}
      <Header />
      <div className="w-full md:w-[60vw] h-[500px] flex items-center justify-center">
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
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Enter a password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <MenuButton
              type="submit"
              className="before:absolute before:content-[''] before:top-1/4 before:left-0 before:ml-2 before:w-[calc(100%)] before:h-10 before:bg-pink-0 before:rounded before:border before:border-black before:-z-10 before:transition-transform before:duration-300 hover:before:translate-x-[-8px] hover:before:translate-y-[-7px]"
            >
              Sign Up
            </MenuButton>
          </div>
        </form>
      </div>

      {/* Kontaktsektion */}
      <Contact />
    </div>
  );
};

export default CreateAccount;
