import { Navigate } from "react-router";
import { ProtectedRoutes } from "../types/interface/interface";

const ProtectedRoute: React.FC<ProtectedRoutes> = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
