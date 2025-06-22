import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../axios/Api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AdminRouting = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, false = not admin, true = admin

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAdmin(false);
        return;
      }
      try {
        const response = await Api.get("/user/profile", {
          headers: {
            Authorization: token,
          },
        });
        setIsAdmin(response.data.user.isAdmin);
      } catch (error) {
        error && setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      toast.error("You are not Authorized");
    }
  }, [isAdmin]);

  if (isAdmin === null) {
    return <Loader />;
  }

  if (!isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default AdminRouting;
