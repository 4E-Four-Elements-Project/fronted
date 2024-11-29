import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import Employe from "./pages/employe/Employe";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/employe" element={<Employe />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
