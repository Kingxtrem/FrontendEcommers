import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouting = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRouting;
