import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveShoppingCart, MdDeleteForever } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { setCart, increaseQuantity, decreaseQuantity, removeItem } from "../redux/slices/cartSlice";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Api from "../axios/Api";
import Loader from "../components/Loader";


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  const [loading, setLoading] = useState(false);

  const calculateTotal = (items) => items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const fetchCart = useCallback(async () => {

    if (cartItems.length > 0) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const { data } = await Api.get("/user/profile");
      dispatch(setCart(data.user.cart));
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, [dispatch, cartItems.length]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const handleQuantityAction = async (productId, action) => {

    if (action === "increase") dispatch(increaseQuantity(productId));
    else if (action === "decrease") dispatch(decreaseQuantity(productId));
    else if (action === "remove") dispatch(removeItem(productId));

    const endpoints = {
      increase: "/user/addonequantity",
      decrease: "/user/removeonequantity",
      remove: "/user/removefromcart"
    };

    try {

      const { data } = await Api.post(endpoints[action], { product_id: productId });

      dispatch(setCart(data.user.cart));
    } catch {
      toast.error("Update failed, syncing with server...");

      try {
        const { data } = await Api.get("/user/profile");
        dispatch(setCart(data.user.cart));
      } catch { /* empty */ }
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Remove Item?",
      text: "This will remove the product from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Remove"
    }).then((res) => res.isConfirmed && handleQuantityAction(id, "remove"));
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
        <title>TechCart | Your Shopping Cart</title>

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          Your Cart <span className="text-blue-600">({cartItems.length} items)</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <MdOutlineRemoveShoppingCart className="text-8xl text-slate-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-800">Your cart is feeling light</h2>
            <p className="text-slate-500 mt-2 mb-8">Add some cutting-edge tech to get started.</p>
            <button onClick={() => navigate("/products")} className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product_id} className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-50 flex flex-col md:flex-row items-center gap-6">
                  <Link to={`/products/${item.product_id}`} className="w-24 h-24 shrink-0 bg-slate-50 rounded-2xl p-2 hover:scale-105 transition-transform">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </Link>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{item.name}</h3>
                    <p className="text-blue-600 font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl">
                    <button onClick={() => item.quantity > 1 ? handleQuantityAction(item.product_id, "decrease") : confirmDelete(item.product_id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <CiCircleMinus size={28} />
                    </button>
                    <span className="font-black text-slate-800 w-6 text-center">{item.quantity}</span>
                    <button onClick={() => handleQuantityAction(item.product_id, "increase")} className="text-slate-400 hover:text-blue-600 transition-colors">
                      <CiCirclePlus size={28} />
                    </button>
                  </div>

                  <div className="text-right hidden md:block w-32">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Subtotal</p>
                    <p className="font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>

                  <button onClick={() => confirmDelete(item.product_id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                    <MdDeleteForever size={24} />
                  </button>
                </div>
              ))}

              <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors pt-4">
                <FaArrowLeft /> Continue Shopping
              </button>
            </div>


            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
                <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>

                <div className="space-y-4 text-slate-600 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">₹{calculateTotal(cartItems).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-slate-900">Total Amount</span>
                  <span className="text-3xl font-black text-blue-600">₹{calculateTotal(cartItems).toLocaleString('en-IN')}</span>
                </div>

                <button onClick={() => navigate("/checkout")} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 mb-4">
                  CHECKOUT NOW
                </button>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold">
                  <FaShieldAlt /> Secure Checkout Powered by TechCart
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;