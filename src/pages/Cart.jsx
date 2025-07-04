import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import Api from "../axios/Api";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartvalue, setCartvalue] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const GetCartItems = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view your cart");
      navigate("/login");
      return;
    }
    try {
      const response = await Api.get("/user/profile", {
        headers: {
          Authorization: token,
        },
      });
      setCartItems(response.data.user.cart);
      setCartvalue(response.data.user.cart.length);
      localStorage.setItem("cartValue", response.data.user.cart.length);
      window.dispatchEvent(new Event("cartChange"));
      setTotalAmount(
        response.data.user.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      toast.error("Failed to load cart items. Please try again.");
    }
    setLoading(false);
  }, [navigate]);
  useEffect(() => {
    GetCartItems();
  }, [GetCartItems]);
  const handelremovefromcart = async (product_id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to remove items from the cart");
      navigate("/login");
      return;
    }
    try {
      const response = await Api.post(
        "/user/removefromcart",
        { product_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCartItems(response.data.user.cart);
      setCartvalue(response.data.user.cart.length);
      localStorage.setItem("cartValue", response.data.user.cart.length);
      window.dispatchEvent(new Event("cartChange"));
      setTotalAmount(
        response.data.user.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.");
    }
    setLoading(false);
  };
  const handleDecrease = async (product_id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to remove items from the cart");
      navigate("/login");
      return;
    }
    try {
      const response = await Api.post(
        "/user/removeonequantity",
        { product_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCartItems(response.data.user.cart);
      setCartvalue(response.data.user.cart.length);
      localStorage.setItem("cartValue", response.data.user.cart.length);
      window.dispatchEvent(new Event("cartChange"));
      setTotalAmount(
        response.data.user.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.");
    }
    setLoading(false);
  };
  const handleIncrease = async (product_id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to remove items from the cart");
      navigate("/login");
      return;
    }
    try {
      const response = await Api.post(
        "/user/addonequantity",
        { product_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCartItems(response.data.user.cart);
      setCartvalue(response.data.user.cart.length);
      localStorage.setItem("cartValue", response.data.user.cart.length);
      setTotalAmount(
        response.data.user.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
      window.dispatchEvent(new Event("cartChange"));
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = (product_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handelremovefromcart(product_id);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full mx-auto p-5">
      <Helmet>
        <title>TechCart Store | Cart </title>
        <meta
          name="description"
          content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!"
        />
        <meta
          name="keywords"
          content="tech, ecommerce, gadgets, electronics, shop, buy online"
        />
      </Helmet>
      {cartvalue < 1 ? (
        loading ? (
          <Loader />
        ) : (
          <div className="container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col">
            <MdOutlineRemoveShoppingCart className="text-9xl text-red-500 mx-auto" />
            <p className="text-3xl text-red-500 mx-auto">
              No Items found. The Cart is Empty....{" "}
            </p>
            <button
              onClick={() => navigate("/products")}
              className="cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xl flex justify-center items-center mx-auto m-5 hover:bg-blue-800 active:bg-blue-950 transition duration-300"
            >
              Start Shopping
            </button>
          </div>
        )
      ) : loading ? (
        <Loader />
      ) : (
        <div className="container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col overflow-x-auto">
          <table className="text-center w-full">
            <thead>
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Item Name</th>
                <th className="p-2">Item Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total Item Price</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr
                    key={item.product_id}
                    className="border-y-2 border-gray-300"
                  >
                    <td className="w-16 h-16">
                      <Link to={`/products/${item.product_id}`}>
                        <img
                          className="hover:scale-95"
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <button
                        onClick={() => handleDecrease(item.product_id)}
                        className="text-red-600 hover:scale-125 cursor-pointer"
                      >
                        <CiCircleMinus />
                      </button>
                      <span className="p-1 text-xl">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.product_id)}
                        className="text-red-600 hover:scale-125 cursor-pointer"
                      >
                        <CiCirclePlus />
                      </button>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.product_id)}
                        className="text-red-600 hover:scale-125 m-1 cursor-pointer text-4xl"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-end font-bold m-6">
            Total Amount:₹ {totalAmount}
          </div>
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={() => navigate("/products")}
              className="animate-bounce rounded-xl md:text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 w-fit text-nowrap"
            >
              Continue Shopping
            </button>
            <button className="animate-bounce rounded-xl md:text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 w-fit text-nowrap">
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
