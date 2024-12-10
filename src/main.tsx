import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Landing from "./pages/landing/landing.tsx";
import Login from "./pages/login/Login.tsx";
import Menu from "./pages/menu/Menu.tsx";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart.tsx";
import Employe from "./pages/employe/Employe.tsx";
import { FilterProvider } from "./context/FilterContext.tsx";
import CreateAccount from "./pages/createAccount/CreateAccount.tsx";
import EditOrder from "./pages/edit/EditOrder.tsx";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation.tsx";
import ProtectedRoute from "./context/protectedRoutes.tsx";
import { AuthProvider } from "./services/auth/auth.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <FilterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
            <Route path="/edit" element={<EditOrder />} />
            {/* Protected routes */}
            <Route
              path="/employe"
              element={
                <ProtectedRoute>
                  <Employe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </StrictMode>
  </AuthProvider>
);
