import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Api from "../axios/Api";
import { setUser, logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const AdminRouting = ({ children }) => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {

    let isMounted = true;
    if (isAuthenticated && isAdmin === null && !fetching) {
      setFetching(true);
      Api.get("/user/profile").then(res => {
        if (isMounted) dispatch(setUser(res.data.user));
      }).catch(() => {
        if (isMounted) {
          dispatch(logout());
          dispatch(clearCart());
        }
      }).finally(() => {
        if (isMounted) setFetching(false);
      });
    }
    return () => { isMounted = false; };
  }, [isAuthenticated, isAdmin, dispatch, fetching]);

  useEffect(() => {
    if (isAdmin === false) {
      toast.error("You are not Authorized");
    }
  }, [isAdmin]);


  if (isAuthenticated && (isAdmin === null || fetching)) {
    return <Loader />;
  }


  if (!isAuthenticated || isAdmin === false) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default AdminRouting;
