import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Api from "./axios/Api";
import { setUser, logout } from "./redux/slices/authSlice";
import { setCart } from "./redux/slices/cartSlice";



import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminPage from "./pages/AdminPage";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";


import PrivateRouting from "./security/PrivateRouting";
import AdminRouting from "./security/AdminRouting";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

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
        } catch {

          dispatch(logout());
        }
      }
    };
    fetchUser();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

const Layout = () => {
  return (
    <>

      <meta
        name="description"
        content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!"
      />
      <meta
        name="keywords"
        content="tech, ecommerce, gadgets, electronics, shop, buy online"
      />

      <ScrollToTop />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <Navbar />

      <main className="min-h-[80vh] bg-slate-50">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
};


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductPage /> },
      { path: "/brands/:brand", element: <Brands /> },
      { path: "/categories/:category", element: <Categories /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/profile",
        element: <PrivateRouting><Profile /></PrivateRouting>
      },
      {
        path: "/cart",
        element: <PrivateRouting><Cart /></PrivateRouting>
      },
      {
        path: "/checkout",
        element: <PrivateRouting><Checkout /></PrivateRouting>
      },
      {
        path: "/admin",
        element: <AdminRouting><AdminPage /></AdminRouting>
      },
      {
        path: "/addproduct",
        element: <AdminRouting><AddProduct /></AdminRouting>
      },
      {
        path: "/edit/:id",
        element: <AdminRouting><AddProduct /></AdminRouting>
      },
      { path: "*", element: <NotFound /> }
    ],
  }
]);

export default App;