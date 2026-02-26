import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../axios/Api";
import Loader from "../components/Loader";
import Card from "../components/Card";

import HeroSection from "../components/HeroSection";
import { FiArrowRight, FiZap } from "react-icons/fi";


const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/product/featured");
      setData(res.data.data);
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch featured products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <title>TechCart | Next-Gen Electronics</title>
      <meta name="description" content="Shop the latest gadgets at TechCart." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <HeroSection />


        <section className="mt-16">
          <div className="flex items-end justify-between mb-8 px-2">
            <div className="text-left">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
                <FiZap /> Featured Selection
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Hot This <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Week</span>
              </h2>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="hidden sm:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
            >
              View All <FiArrowRight />
            </button>
          </div>

          {loading ? (
            <div className="py-20"><Loader /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((item) => (
                <Card item={item} key={item._id} />
              ))}
            </div>
          )}


          <div className="mt-12 flex justify-center sm:hidden">
            <button
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
              onClick={() => navigate("/products")}
            >
              Browse Catalog <FiArrowRight />
            </button>
          </div>
        </section>


        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-16 pb-12">
          <div className="text-center md:text-left space-y-2">
            <h4 className="font-bold text-slate-900">Lightning Fast Delivery</h4>
            <p className="text-sm text-slate-500">Free shipping on all orders over ₹5,000 across India.</p>
          </div>
          <div className="text-center md:text-left space-y-2 border-y md:border-y-0 md:border-x border-slate-200 py-6 md:py-0 md:px-8">
            <h4 className="font-bold text-slate-900">Secure Payments</h4>
            <p className="text-sm text-slate-500">256-bit SSL encrypted payments and easy returns.</p>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h4 className="font-bold text-slate-900">24/7 Tech Support</h4>
            <p className="text-sm text-slate-500">Expert help available around the clock for your gadgets.</p>
          </div>
        </div>


        <div className="my-20 bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-center text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to upgrade?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join 50k+ tech enthusiasts who get early access to exclusive drops and flash sales.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
            >
              Shop Full Collection
            </button>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;