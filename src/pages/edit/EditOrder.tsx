import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import MenuButton from "../../components/layout/menu-button/menu-button";
import deleteItem from "../../assets/img/delete.svg";

interface CartItem {
  menuId: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

const EditOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || ""; // Hämta orderId från state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let numberOfItemsInCart = ""
  useEffect(() => {
    const fetchOrder = async () => {
      console.log("Försöker hämta order med orderId:", orderId); // Debug
      try {
        const response = await fetch(
          `https://j4u384wgne.execute-api.eu-north-1.amazonaws.com/order/get/${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify( orderId ), // Skicka orderId i body
          }
        );

        console.log("Svar från API:", response); // Debug API-respons

        if (!response.ok) {
          const errorResponse = await response.text();
          console.error("Fel från API:", errorResponse); // Debug vid fel
          throw new Error("Kunde inte hämta orderdata.");
        }

        const data = await response.json();
        console.log("Orderdata mottaget:", data.data["Order-details"].menuDetails.length); // Debug JSON-data
        numberOfItemsInCart = data.data["Order-details"].menuDetails.length
        setCart(data.data["Order-details"]); // Förutsätter att API:t returnerar en `items`-array
      } catch (error) {
        console.error("Fel vid hämtning av order:", error); // Debug vid exception
        setError(error instanceof Error ? error.message : "Okänt fel.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    } else {
      console.warn("Ingen orderId tillgänglig."); // Debug vid saknad orderId
      setError("Ingen orderId tillgänglig.");
      setLoading(false);
    }
  }, [orderId]);

  console.log(typeof cart);
  

  const handleIncrease = (id: string) => {
    console.log("Ökar kvantitet för menuId:", id); // Debug vid kvantitetsökning
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    console.log("Minskar kvantitet för menuId:", id); // Debug vid kvantitetsminskning
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteCartItem = (id: string) => {
    console.log("Tar bort menuId:", id); // Debug vid borttagning
    setCart((prevCart) => prevCart.filter((item) => item.menuId !== id));
  };

  // const calculateTotal = () => {
  //   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //   console.log("Totalpris beräknat:", total); // Debug vid totalberäkning
  //   return total;
  // };

  if (loading) {
    console.log("Laddar orderdata..."); // Debug vid laddning
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    console.error("Fel i komponenten:", error); // Debug vid renderingsfel
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (cart.length === 0) {
    console.log("Varukorgen är tom."); // Debug om varukorgen är tom
    return (
      <div className="flex flex-col justify-center items-center">
        <Header />
        <h2 className="mt-20 text-xl">Your cart is empty.</h2>
      </div>
    );
  }

  console.log("Varukorg att redigera:", cart); // Debug innan renderingen
  console.log("typeof cart", typeof cart);
  

  return (
    <div className="flex flex-col justify-center items-center mb-24">
      <Header cartCount={numberOfItemsInCart} />
      <div className="w-1/2 h-full flex justify-center flex-col mt-5">
        <div className="flex items-start w-full mb-7">
          <h1 className="font-Londrina text-4xl lg:text-6xl lg:pl-5 pb-2 border-b-2 border-black w-full">
            Edit Order
          </h1>
        </div>

        <ul className="flex flex-col gap-3 font-thin">
          {cart.menuDetails.map((item) => (
            <li
              key={item.menuId}
              className="border border-black rounded-xl p-3 flex items-center flex-row gap-2 bg-[#f1f1f1] justify-between"
            >
              <div className="font-roboto flex flex-col gap-2">
                <p>{item.description}</p>
                <p>{item.price} kr</p>
              </div>
              <div className="flex gap-3 items-center justify-center">
                <button
                  onClick={() => handleDecrease(item.menuId)}
                  className="px-3 py-1 bg-gray-400 rounded"
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  onClick={() => handleIncrease(item.menuId)}
                  className="px-3 py-1 bg-gray-400 rounded"
                >
                  +
                </button>
                <button onClick={() => deleteCartItem(item.menuId)} className="w-5 h-5">
                  <img
                    src={deleteItem}
                    alt="Delete item"
                    className="flex item-center justify-center w-5 h-5"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-5">
          <h2 className="font-bold text-xl">TOTAL</h2>
          {/* <h2 className="font-bold text-xl">{calculateTotal()} kr</h2> */}
        </div>

        <MenuButton
          type="button"
          onClick={() => {
            console.log("Bekräftar ändringar, navigerar till OrderConfirmation"); // Debug vid navigering
            navigate("/confirmation", { state: { cart, orderId } });
          }}
          className="before:bg-secondary-0 mt-14 w-1/4"
        >
          Confirm Changes
        </MenuButton>
      </div>
    </div>
  );
};

export default EditOrder;




// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../../components/layout/header/Header";
// import MenuButton from "../../components/layout/menu-button/menu-button";
// import deleteItem from "../../assets/img/delete.svg";

// interface CartItem {
//   menuId: string;
//   name: string;
//   price: number;
//   description: string;
//   quantity: number;
// }

// const EditOrder = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialCart: CartItem[] = location.state?.cart || []; // Hämta varukorgen från state
//   const [cart, setCart] = useState<CartItem[]>(initialCart);

//   // Funktion för att öka kvantiteten
//   const handleIncrease = (id: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.menuId === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // Funktion för att minska kvantiteten
//   const handleDecrease = (id: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.menuId === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // Funktion för att ta bort ett objekt från korgen
//   const deleteCartItem = (id: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item.menuId !== id));
//   };

//   // Beräkna totalen för korgen
//   const calculateTotal = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   // Om korgen är tom
//   if (cart.length === 0) {
//     return (
//       <div className="flex flex-col justify-center items-center">
//         <Header />
//         <h2 className="mt-20 text-xl">Your cart is empty.</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col justify-center items-center mb-24">
//       <Header cartCount={cart.reduce((count, item) => count + item.quantity, 0)} />
//       <div className="w-1/2 h-full flex justify-center flex-col mt-5">
//         <div className="flex items-start w-full mb-7">
//           <h1 className="font-Londrina text-4xl lg:text-6xl lg:pl-5 pb-2 border-b-2 border-black w-full">
//             Edit Order
//           </h1>
//         </div>

//         <ul className="flex flex-col gap-3 font-thin">
//           {cart.map((item) => (
//             <li
//               key={item.menuId}
//               className="border border-black rounded-xl p-3 flex items-center flex-row gap-2 bg-[#f1f1f1] justify-between"
//             >
//               <div className="font-roboto flex flex-col gap-2">
//                 <p>{item.description}</p>
//                 <p>{item.price} kr</p>
//               </div>
//               <div className="flex gap-3 items-center justify-center">
//                 <button
//                   onClick={() => handleDecrease(item.menuId)}
//                   className="px-3 py-1 bg-gray-400 rounded"
//                 >
//                   -
//                 </button>
//                 <p>{item.quantity}</p>
//                 <button
//                   onClick={() => handleIncrease(item.menuId)}
//                   className="px-3 py-1 bg-gray-400 rounded"
//                 >
//                   +
//                 </button>
//                 <button onClick={() => deleteCartItem(item.menuId)} className="w-5 h-5">
//                   <img
//                     src={deleteItem}
//                     alt="Delete item"
//                     className="flex item-center justify-center w-5 h-5"
//                   />
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <div className="flex justify-between mt-5">
//           <h2 className="font-bold text-xl">TOTAL</h2>
//           <h2 className="font-bold text-xl">{calculateTotal()} kr</h2>
//         </div>

//         <div className="mt-[60px]">
//           <h1 className="font-Londrina text-3xl">Additional information? Allergies etc?</h1>
//           <input
//             type="text"
//             className="border border-black rounded-lg w-full h-20 mt-5"
//           />
//         </div>

//         <MenuButton
//           type="button"
//           onClick={() => {
//             navigate("/confirmation", { state: { cart: cart } }); // Skicka cart till OrderConfirmation
//           }}
//           className="before:bg-secondary-0 mt-14 w-1/4"
//         >
//           Confirm Changes
//         </MenuButton>
//       </div>
//     </div>
//   );
// };

// export default EditOrder;