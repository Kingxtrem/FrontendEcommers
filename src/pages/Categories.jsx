import { useState, useEffect, useCallback } from "react";
import Api from "../axios/Api";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FiChevronRight, FiGrid, FiInbox } from "react-icons/fi";


const Categories = () => {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);

  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Api.get(`/product/all?category=${category}`);
      setData(res.data.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [category]);

  const filteredData = data;

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    document.title = `TechCart | ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }, [category]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <title>TechCart | {category.charAt(0).toUpperCase() + category.slice(1)}</title>
      <meta name="description" content={`Explore our latest collection of ${category}. Quality guaranteed tech picked just for you.`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">


          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <FiChevronRight className="text-slate-300" />
            <span className="font-semibold text-blue-600 capitalize">{category}</span>
          </nav>


          <div className="relative overflow-hidden bg-white rounded-3xl p-8 mb-10 border border-slate-100 shadow-sm">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight capitalize">
                  {category}
                </h1>
                <p className="text-slate-500 mt-2 max-w-lg">
                  Explore our latest collection of {category}. Quality guaranteed tech picked just for you.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                <FiGrid className="text-blue-600" />
                <span className="text-sm font-bold text-slate-700">
                  {filteredData.length} Products Found
                </span>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
          </div>


          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((item) => (
                <Card item={item} key={item._id} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl py-20 px-4 text-center border border-slate-100 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                <FiInbox size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">No items in this category</h2>
              <p className="text-slate-500 mt-2 mb-8 max-w-xs mx-auto">
                We're currently restocking our {category} inventory. Check back soon or explore other categories!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Browse All Tech
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;