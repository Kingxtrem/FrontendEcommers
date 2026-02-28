import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Api from "./axios/Api";
import { setUser, logout } from "./redux/slices/authSlice";
import { clearCart, setCart } from "./redux/slices/cartSlice";
import Routes from "./routes/Routes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {

          const res = await Api.get("/user/profile");
          dispatch(setUser(res.data.user));
          if (res.data.user.cart) {
            dispatch(setCart(res.data.user.cart));
          }
        } catch (error) {
          console.error("Error fetching user:", error);

          dispatch(logout());
          dispatch(clearCart());
        }
      }
    };
    fetchUser();
  }, [dispatch]);

  return <RouterProvider router={Routes} />;
};



export default App;