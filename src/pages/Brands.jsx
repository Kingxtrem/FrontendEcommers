import { useState, useEffect, useCallback } from "react";
import Api from "../axios/Api";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";


const Brands = () => {
  const [data, setData] = useState([]);
  const { brand } = useParams();
  const [loading, setLoading] = useState(true);
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Api.get(`/product/all?brand=${brand}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [brand]);


  const filteredData = data;

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    document.title = `TechCart | ${brand}`;
  }, [brand]);

  return (
    <>
      <title>TechCart | {brand}</title>
      <meta name="description" content={`Browse the complete ${brand} collection.`} />
      <div className="bg-slate-50 min-h-screen">

        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-10">


            <div className="mb-10">
              <Link to="/products" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium mb-4">
                <FiArrowLeft /> Back to all products
              </Link>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight capitalize">
                    {brand} <span className="text-blue-600">Collection</span>
                  </h1>
                  <p className="text-slate-500 mt-2">
                    Showing {filteredData.length} premium gadgets from {brand}.
                  </p>
                </div>

                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  TechCart Verified
                </div>
              </div>
            </div>


            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {data.map((item) => (
                  <Card item={item} key={item._id} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <FiShoppingBag size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">No products found</h2>
                <p className="text-slate-500 max-w-xs mt-2">
                  We couldn't find any products under the brand "{brand}" at the moment.
                </p>
                <Link to="/products" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Brands;