import Contact from "../../components/layout/contact/contact";
import Header from "../../components/layout/header/Header";
import MenuButton from "../../components/layout/menu-button/menu-button";
// import SearchButton from "../../components/layout/search-button/SearchButton";

const HeroSection: React.FC = () => {
  return (
    <div>
      {/* <Header className="w-2/3 pr-20 md:3/5 absolute top-0 z-20 w-screen" /> */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-screen">
        {/* Video Background for Mobile */}

        <video
          src="./src/assets/video/landing-video.mp4"
          className="absolute top-0 left-0 w-screen h-screen object-cover -z-10 md:hidden"
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
        />

        {/* Content */}

        <div className="relative z-10 w-full flex flex-col items-center md:flex-row justify-between h-screen">
          <div className="w-full flex items-center  h-screen">
            {/* Left Section */}
            <Header className="md:w-2/3 md:pr-20 md:pl-20 md:3/5 absolute top-0 z-20 w-screen" />
            <div className=" flex flex-col justify-between items-center w-full h-44">
            <h1 className="font-Londrina text-7xl">Welcome</h1>
            <p>Please check out our menu :)</p>
              <div className="w-72 space-y-4">
                <MenuButton className="before:bg-secondary-0" to="/menu">
                  Menu
                </MenuButton>
              </div>
              {/* <div className="flex items-center mt-4">
                <input
                  type="text"
                  placeholder="Order nr..."
                  className="flex-1 px-4 py-2 border border-green-300 rounded-l focus:outline-none"
                />

                <SearchButton />
              </div> */}
              </div>
            <Contact />
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
};

export default HeroSection;
