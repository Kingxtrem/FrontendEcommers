import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotal, clearCart } from "../redux/slices/cartSlice";
import Api from "../axios/Api";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import { FaShieldHalved, FaTruckFast, FaCreditCard } from "react-icons/fa6";
import { IoLockClosedOutline, IoChevronBackOutline } from "react-icons/io5";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  const totalAmount = useSelector(selectCartTotal);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", address: "", city: "", state: "", zipCode: "", phone: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      toast.info("Your cart is empty");
      navigate("/cart");
      return;
    }
    setLoading(false);
  }, [isAuthenticated, cartItems.length, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Load native browser script intercept
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // 1. Ask backend to compute and create pending transaction
      const { data } = await Api.post("/order/create", { shippingAddress: formData });

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      // 2. Launch Client UI Configuration Options
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "TechCart Global",
        description: "Premium Tech Gadgets Payment",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            // 3. Complete native verification loops post-transaction
            const verifyRes = await Api.post("/order/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              dispatch(clearCart());
              toast.success("Payment Received Successfully!");
              navigate("/");
            }
          } catch {
            toast.error("Payment verification failed! Please try again.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: "customer@techcart.com",
          contact: formData.phone || "9999999999"
        },
        theme: {
          color: "#4f46e5"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      toast.error("Unable to process your request correctly. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const SectionHeader = ({ number, title }) => (
    <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold">
        {number}
      </span>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <title>Checkout | TechCart</title>
      <meta name="description" content="Complete your TechCart order securely. Fast, reliable delivery for your premium tech gadgets." />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <IoChevronBackOutline className="mr-1" /> Return to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-8">


            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8">
              <SectionHeader number="1" title="Shipping Address" />
              <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-2 block">First Name</label>
                  <input type="text" name="firstName" className={inputClass} value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-2 block">Last Name</label>
                  <input type="text" name="lastName" className={inputClass} value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-2 block">Street Address</label>
                  <input type="text" name="address" className={inputClass} value={formData.address} onChange={handleChange} required />
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-2 block">City</label>
                  <input type="text" name="city" className={inputClass} value={formData.city} onChange={handleChange} required />
                </div>
                <div className="col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-2 block">ZIP Code</label>
                  <input type="text" name="zipCode" className={inputClass} value={formData.zipCode} onChange={handleChange} required />
                </div>
              </form>
            </div>


            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8">
              <SectionHeader number="2" title="Payment Method" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-4 border-2 border-indigo-600 bg-indigo-50/50 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="text-indigo-600 text-xl" />
                    <span className="font-bold text-slate-700">Online Payment</span>
                  </div>
                  <input type="radio" checked readOnly className="accent-indigo-600 w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-4 border-2 border-slate-100 rounded-2xl cursor-not-allowed opacity-50">
                  <div className="flex items-center gap-3">
                    <FaTruckFast className="text-slate-400 text-xl" />
                    <span className="font-bold text-slate-400">Cash on Delivery</span>
                  </div>
                  <input type="radio" disabled className="w-4 h-4" />
                </label>
              </div>
            </div>
          </div>


          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-5 sm:p-8 sticky top-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Checkout Summary</h3>

              <div className="space-y-4 mb-8 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                      <p className="text-xs text-slate-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-800">₹{((item.price || 0) * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{(totalAmount || 0).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-tight text-xs">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-lg font-bold text-slate-800">Total</span>
                  <span className="text-2xl font-black text-indigo-600">₹{(totalAmount || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                form="checkout-form"
                type="submit"
                className="w-full mt-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <IoLockClosedOutline className="text-xl" /> Complete Purchase
              </button>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                  <FaShieldHalved className="text-emerald-500" /> Secure 256-bit SSL Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all";

export default Checkout;