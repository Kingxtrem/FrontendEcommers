import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";
import Api from "../axios/Api";
import { FaIndianRupeeSign, FaStar, FaCartPlus, FaTruckFast, FaShieldHalved } from "react-icons/fa6";
import { IoIosFlash } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import Loader from "../components/Loader";
import { toast } from "react-toastify";



const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qnt, setQnt] = useState(1);

  const getProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await Api.get(`/product/${id}`);
      setProduct(response.data.productData);
    } catch {
      toast.error("Failed to load product details.");
    }
    setLoading(false);
  }, [id]);

  const handleAddtocart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to the cart");
      navigate("/login");
      return;
    }
    try {
      const cartItem = {
        product_id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qnt,
      };
      const { data } = await Api.post("/user/addtocart", { cart: cartItem });

      if (data && data.user && data.user.cart) {
        dispatch(setCart(data.user.cart));
      }
      toast.success("Added to cart!");
      navigate("/cart");
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    try {
      const cartItem = {
        product_id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qnt,
      };
      const { data } = await Api.post("/user/addtocart", { cart: cartItem });
      if (data && data.user && data.user.cart) {
        dispatch(setCart(data.user.cart));
      }
      navigate("/checkout");
    } catch {
      toast.error("Failed to proceed. Please try again.");
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  if (loading) return <Loader />;

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
        <title>{product.name} | TechCart</title>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col md:flex-row">


          <div className="md:w-1/2 p-8 bg-slate-50 flex items-center justify-center">
            <div className="relative group">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[500px] w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>


          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="flex-1">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">
                {product.category || "Premium Tech"}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < product.rating ? "text-amber-400" : "text-slate-200"} size={14} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-amber-700">{product.rating}</span>
                </div>
                <span className="text-slate-400 text-sm">|</span>
                <span className={`text-sm font-bold ${product.inStock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {product.inStock > 0 ? `${product.inStock} in stock` : "Out of Stock"}
                </span>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 flex items-center">
                  <FaIndianRupeeSign className="text-2xl" />
                  {product.price?.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-400 line-through text-lg italic">
                  ₹{(product.price * 1.2).toFixed(0)}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>
            </div>


            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-slate-100 rounded-2xl p-1 bg-slate-50">
                  <button
                    onClick={() => setQnt(Math.max(1, qnt - 1))}
                    className="p-2 hover:bg-white rounded-xl transition-colors text-slate-600"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-black text-slate-800">{qnt}</span>
                  <button
                    onClick={() => setQnt(Math.min(product.inStock || 99, qnt + 1))}
                    className="p-2 hover:bg-white rounded-xl transition-colors text-slate-600"
                  >
                    <FiPlus />
                  </button>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Select quantity for your order
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddtocart}
                  className="flex items-center justify-center gap-3 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95"
                >
                  <FaCartPlus /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-3 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
                >
                  <IoIosFlash /> Buy Now
                </button>
              </div>


              <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <FaTruckFast className="text-blue-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <FaShieldHalved className="text-blue-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Secure Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;