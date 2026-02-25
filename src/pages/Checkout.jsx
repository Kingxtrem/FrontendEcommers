import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import { FaShieldHalved, FaTruckFast, FaCreditCard } from "react-icons/fa6";
import { IoLockClosedOutline, IoChevronBackOutline } from "react-icons/io5";


const Checkout = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Processing Payment...");
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


            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
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
                <div className="col-span-2">
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


            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
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
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sticky top-8">
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
                    <p className="text-sm font-bold text-slate-800">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-tight text-xs">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-lg font-bold text-slate-800">Total</span>
                  <span className="text-2xl font-black text-indigo-600">₹{totalAmount.toLocaleString("en-IN")}</span>
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