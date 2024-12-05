import { useState } from "react";
import Header from "../../components/layout/header/Header";

const ShoppingCart = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Maträtt 1", price: 239, description: "Beskrivning av maträtt?", quantity: 0 },
    { id: 2, name: "Maträtt 2", price: 239, description: "Beskrivning av maträtt?", quantity: 0 },
    { id: 3, name: "Maträtt 3", price: 239, description: "Beskrivning av maträtt?", quantity: 0 },
  ]);

  const increase = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
        <Header/>
      <div className="w-1/2 h-full flex justify-center flex-col">
        <div className="flex items-start w-full mb-7">
          <h1 className="font-Londrina text-6xl pl-10 pb-2 border-b-2 border-black w-full">
            Cart
          </h1>
        </div>

        <ul className="flex flex-col gap-3 font-thin">
          {items.map((item) => (
            <li
              key={item.id}
              className="border rounded-xl p-3 flex flex-row gap-2 justify-between"
            >
              <div className="font-roboto flex flex-col gap-2">
                {item.name}
                <p className="m-0 p-0">{item.price} kr</p>
              </div>
              <div className="flex items-center">
                <h2>{item.description}</h2>
              </div>
              <div className="font-bold flex flex-row items-center justify-center gap-2">
                <button onClick={() => decrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-5">
          <h2 className="font-bold">Total</h2>
          <h2>{calculateTotal()} kr</h2>
        </div>

        <div className="mt-6">
          <h1 className="mb-2 font-Londrina text-3xl">
            Additional information? Allergies etc?
          </h1>
          <input
            type="text"
            className="border border-black rounded-xl p-10 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;