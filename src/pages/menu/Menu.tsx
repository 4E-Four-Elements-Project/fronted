import Header from "../../components/layout/header/Header";
import MenuItem from "../../components/ui/MenuItem";
// import soupIcon from "../../assets/img/soup.svg";
// import meatIcon from "../../assets/img/meat.svg";
import MenuHeader from "./components/MenuHeader";

export default function Menu() {
  return (
    <main className="w-screen h-screen bg-primary-0 flex flex-col items-center md:items-start">
      <Header link="/cart" />
      {/* Menu starts */}
      <section className="px-4 w-full h-auto">
        {/* Menu filter header */}
        <MenuHeader />
        {/* underline */}
        <div className="w-72 h-[1px] bg-black md:w-full mb-5"></div>
        {/* Menu items */}
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </section>
    </main>
  );
}
