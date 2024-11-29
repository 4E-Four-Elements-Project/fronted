import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import Landing from "./pages/landing/landing.tsx";
import Login from "./pages/login/Login.tsx";
import Menu from "./pages/menu/Menu.tsx";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
