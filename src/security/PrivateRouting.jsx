import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const PrivateRouting = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      toast.error("You are not logged in please log in first");
    }
  }, [isAuth]);

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRouting;
