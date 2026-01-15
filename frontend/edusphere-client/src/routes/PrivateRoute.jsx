import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useAuth();

  // ⛔ Not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Admin-only route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Allowed
  return children;
};

export default PrivateRoute;
