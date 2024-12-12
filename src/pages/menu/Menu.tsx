import Header from "../../components/layout/header/Header";
import MenuItem from "../../components/ui/MenuItem/MenuItem";
import MenuHeader from "./components/MenuHeader";
import { FilterContext } from "../../context/FilterContext";

// Assets
import frame from "../../assets/img/frame.svg";
import meat from "../../assets/img/meat.svg";
import salad from "../../assets/img/sallad.svg";
import soup from "../../assets/img/soup.svg";
import sauce from "../../assets/img/sauce.svg";

import { useContext, useEffect, useState } from "react";

// Api
import getMenuApi from "../../services/menu/getMenu/getMenuApi";
import { MenuApiResponse, MenuItems } from "../../types/interface/interface";

export default function Menu() {
  const [meatCategory, setMeatCategory] = useState<MenuItems[]>([]);
  const [saladCategory, setSaladCategory] = useState<MenuItems[]>([]);
  const [sauceCategory, setSauceCategory] = useState<MenuItems[]>([]);
  const [soupCategory, setSoupCategory] = useState<MenuItems[]>([]);
  const [cart, setCart] = useState<MenuItems[]>([]);

  const filter = useContext(FilterContext);

  useEffect(() => {
    const fetchData = async () => {
      const response: MenuApiResponse = await getMenuApi();
      const menuData = response.data.menu;

      const meat = menuData.filter((item) => item.category === "meat");
      const salad = menuData.filter((item) => item.category === "salad");
      const sauce = menuData.filter((item) => item.category === "sauce");
      const soup = menuData.filter((item) => item.category === "soup");

      const sortItems = (items: MenuItems[]) => {
        switch (filter?.filter) {
          case "high":
            return items.sort((a, b) => b.price - a.price);
          case "low":
            return items.sort((a, b) => a.price - b.price);
          case "alphabetical":
            return items.sort((a, b) => {
              const menuIdA = a.menuId ? String(a.menuId) : "";
              const menuIdB = b.menuId ? String(b.menuId) : "";
              return menuIdA.localeCompare(menuIdB);
            });
          default:
            return items;
        }
      };

      setMeatCategory(sortItems(meat));
      setSaladCategory(sortItems(salad));
      setSauceCategory(sortItems(sauce));
      setSoupCategory(sortItems(soup));
    };
    fetchData();
  }, [filter]);
  
  const handleAddToCart = async (menuItem: MenuItems) => {
    try {
      // Logga datan som skickas till servern
      console.log("Skickar följande data till /cart:", {
        menuId: menuItem.menuId,
        // ingredients: menuItem.ingredients,
        price: menuItem.price,
        // category: menuItem.category,
        // description: menuItem.description,
        // quantity: 1,
      });
  
      // Skicka POST-förfrågan till /cart
      const token = localStorage.getItem("authToken");
       // Construct headers dynamically
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

  console.log('headers',headers);
      const response = await fetch("https://j4u384wgne.execute-api.eu-north-1.amazonaws.com/cart/post", {
        method: "POST",
        headers,
        body: JSON.stringify({
          menuId: menuItem.menuId,
          price: menuItem.price,
        }),
      });
  
      // Logga responsen från servern
      const responseData = await response.json();
      console.log("Respons från servern:", responseData);
  
      // Kontrollera om servern returnerade ett fel
      if (!response.ok) {
        console.error("Serverfel vid POST till /cart:", response.statusText);
        return;
      }
  
      // Kontrollera om cartId finns i svaret och uppdatera cart med det nya objektet
      if (responseData?.data?.cartItem?.cartId) {
        const cartId = responseData.data.cartItem.cartId;
        
        // Uppdatera cart med det nya objektet
        setCart((prevCart) => {
          console.log("Tidigare innehåll i cart:", prevCart);
  
          // Kolla om objektet redan finns i cart
          const existingItemIndex = prevCart.findIndex((item) => item.menuId === menuItem.menuId);
          
          if (existingItemIndex !== -1) {
            // Om det finns, uppdatera mängden
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: (updatedCart[existingItemIndex].quantity || 0) + 1,
              cartId,  // Lägg till cartId till det uppdaterade objektet
            };
  
            console.log("Uppdaterad cart:", updatedCart);
            return updatedCart;
          }
  
          // Annars, skapa ett nytt objekt i cart
          const newCart = [
            ...prevCart,
            { ...menuItem, quantity: 1, cartId },  // Lägg till cartId till det nya objektet
          ];
          console.log("Ny cart:", newCart);
          return newCart;
        });
      } else {
        console.error("Inget cartId mottaget från servern");
      }
    } catch (error) {
      // Logga eventuella fel
      console.error("Misslyckades med att lägga till i cart:", error);
    }
  };
  

  return (
    <main className="w-full min-h-screen bg-primary-0 flex flex-col items-center md:items-start xl:flex-row">
      <div className="flex-grow w-full mb-5">
        <Header cartCount={cart.length} cart={cart} link="/cart" />
        {/* Menu starts */}

        {/* Menu header */}
        <MenuHeader />

        {/* Menu items */}
        <div className="flex flex-col items-center md:items-center">
          {/* Meat */}
          <section className="w-auto h-auto flex flex-col items-center sm:items-start ">
            <h2 className="font-Londrina text-4xl mt-3 self-start ml-5">
              Meat
            </h2>
            <section className="flex flex-col gap-5 w-full lg:flex-row border-t border-black pt-2 md:grid md:grid-cols-md2Cols lg:grid-cols-lg2Cols lg:px-5">
              {meatCategory.map((item) => (
                <MenuItem
                  key={item.menuId}
                  {...item}
                  onAddToCart={handleAddToCart}
                  menuId={item.menuId}
                  category={item.category}
                  price={item.price}
                  description={item.description}
                  ingredients={item.ingredients}
                />
              ))}
            </section>
          </section>

          {/* Salad */}
          <section className="w-auto h-auto flex flex-col items-center sm:items-start ">
            <h2 className="font-Londrina text-4xl mt-3 self-start ml-5">
              Salad
            </h2>
            <section className="flex flex-col gap-5 w-full lg:flex-row border-t border-black pt-2 md:grid md:grid-cols-md2Cols lg:grid-cols-lg2Cols lg:px-5">
              {saladCategory.map((item) => (
                <MenuItem
                  key={item.menuId}
                  {...item}
                  onAddToCart={handleAddToCart}
                  menuId={item.menuId}
                  category={item.category}
                  price={item.price}
                  description={item.description}
                  ingredients={item.ingredients}
                />
              ))}
            </section>
          </section>

          {/* Soup */}
          <section className="w-auto h-auto flex flex-col items-center sm:items-start ">
            <h2 className="font-Londrina text-4xl mt-3 self-start ml-5">
              Soup
            </h2>
            <section className="flex flex-col gap-5 w-full lg:flex-row border-t border-black pt-2 md:grid md:grid-cols-md2Cols lg:grid-cols-lg2Cols lg:px-5">
              {soupCategory.map((item, index) => (
                <MenuItem
                  key={index}
                  menuId={item.menuId}
                  category={item.category}
                  price={item.price}
                  description={item.description}
                  ingredients={item.ingredients}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </section>
          </section>

          {/* Sauce */}
          <section className="w-auto h-auto flex flex-col items-center sm:items-start ">
            <h2 className="font-Londrina text-4xl mt-3 self-start ml-5">
              Sauce
            </h2>
            <section className="flex flex-col gap-5 w-full lg:flex-row border-t border-black pt-2 md:grid md:grid-cols-md2Cols lg:grid-cols-lg2Cols lg:px-5">
              {sauceCategory.map((item, index) => (
                <MenuItem
                  key={index}
                  menuId={item.menuId}
                  category={item.category}
                  price={item.price}
                  description={item.description}
                  ingredients={item.ingredients}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </section>
          </section>
        </div>
      </div>
      <section className="xl:flex-grow xl:w-1/3 w-auto h-full min-h-screen bg-secondary-0 flex flex-col items-center justify-center px-10 py-10 sm:py-5 sticky top-0 left-0 mt-7 lg:mt-0 overflow-hidden">
        <h2 className="font-Londrina text-5xl">About us</h2>
        <p className="font-Roboto text-sm sm:text-xl mt-4">
          Welcome to Four elements, where every meal is made with love and a
          passion for bringing people together through great food. Founded in
          2024, our journey began with a simple goal: to share the rich flavors
          and culinary traditions of four elements with our community. At Four
          elements, we believe food should be fresh, flavorful, and prepared
          with care. That’s why we use only the finest ingredients, sourced
          locally whenever possible, to create dishes that will delight your
          taste buds and keep you coming back for more. Whether you’re in the
          mood for a quick lunch, a cozy dinner at home, or a late-night
          craving, we’re here to deliver not just delicious food but also a
          taste of comfort and joy.
        </p>

        <p className="font-Roboto text-sm sm:text-xl mt-10">
          Our team is dedicated to providing top-notch service and ensuring
          every bite is as satisfying as the last. Thank you for choosing Four
          elements. We’re more than just a takeaway — we’re a part of your
          story. Let us make your next meal unforgettable!
        </p>
        {/* Background images */}
        <img
          src={frame}
          alt=""
          className="absolute -z-10 top-80 left-5 opacity-15 lg:top-96"
        />
        <img
          src={meat}
          alt=""
          className="absolute -z-10 top-52 -right-10 rotate-45 opacity-15 md:right-24 md:top-96"
        />
        <img
          src={salad}
          alt=""
          className="absolute -z-10 top-40 left-3 opacity-15 lg:top-56"
        />
        <img
          src={soup}
          alt=""
          className="absolute -z-10 bottom-24 left-56 -rotate-12 opacity-15 md:left-96 lg:left-44"
        />
        <img
          src={sauce}
          alt=""
          className="absolute -z-10 top-24 right-14 opacity-15"
        />
      </section>
    </main>
  );
}

