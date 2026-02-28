import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductPage from "../pages/ProductPage";
import Brands from "../pages/Brands";
import Categories from "../pages/Categories";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import AdminPage from "../pages/AdminPage";
import AddProduct from "../pages/AddProduct";
import NotFound from "../pages/NotFound";
import PrivateRouting from "../security/PrivateRouting";
import AdminRouting from "../security/AdminRouting";

const Routes = createBrowserRouter([
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
                path: "/orders",
                element: <PrivateRouting><Orders /></PrivateRouting>
            },
            {
                path: "/orders/:id",
                element: <PrivateRouting><OrderDetails /></PrivateRouting>
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

export default Routes;
