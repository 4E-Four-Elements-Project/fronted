import { useState } from "react";
import Header from "../../components/layout/header/Header";
import MenuButton from "../../components/layout/menu-button/menu-button";
import { useNavigate } from "react-router";


const userLandingPage = () => {
    const setIsLoggedIn = useState<boolean>(false)[1];
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        navigate("/login");
      };

  return (
    <div>
      {/* <Header className="w-2/3 pr-20 md:3/5 absolute top-0 z-20 w-screen" /> */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-screen">
        {/* Video Background for Mobile */}

        <video
          src="/video/landing-video.mp4"
          className="absolute top-0 left-0 w-screen h-screen object-cover -z-10 md:hidden"
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
        />

        {/* Content */}

        <div className="relative z-10 w-full flex flex-col items-center md:flex-row justify-between h-screen">
          <div className="w-full flex items-center justify-center md:justify-center h-screen">
            {/* Left Section */}
            <Header className="md:w-2/3 md:pr-20 md:pl-20 md:3/5 absolute top-0 z-20 w-screen" />

            <div className="max-w-lg space-y-4">
              <MenuButton className="before:bg-secondary-0" to="/menu">
                Menu
              </MenuButton>

              <div className="flex items-center mt-4">  
              <MenuButton className="before:bg-secondary-0" to="/history">
                Order History
              </MenuButton>

              </div>
            
            <div className="flex items-center justify-center text-white">
                <button onClick={handleLogout} className="md:text-black">
                Logout
                </button>
            </div>

            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:block">
            <figure className="h-sm mw-auto">
              <video
                src="/video/landing-video.mp4"
                className="rounded shadow-lg h-full w-[800px] object-cover"
                autoPlay
                muted
                loop
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userLandingPage