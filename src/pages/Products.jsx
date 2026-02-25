import { useEffect, useState } from "react";
import Api from "../axios/Api";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { FiChevronLeft, FiChevronRight, FiBox } from "react-icons/fi";


const LIMIT = 8;

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getProducts = async (currentPage) => {
    setLoading(true);
    try {
      const res = await Api.get(`/product/all?page=${currentPage}&limit=${LIMIT}`);
      setData(res.data.data);
      setTotal(res.data.total || 0);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(page);
  }, [page]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Helmet>
        <title>All Products | TechCart Store</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
              <FiBox /> Catalog
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Explore All <span className="text-blue-600">Gadgets</span>
            </h1>
            <p className="text-slate-500 mt-2">
              Discover the latest tech arrivals. Showing {data.length} of {total} items.
            </p>
          </div>


          <div className="hidden md:block text-xs font-bold text-slate-400 uppercase tracking-tighter bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
            Step {page} of {totalPages || 1}
          </div>
        </div>


        {loading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((item) => (
              <Card item={item} key={item._id} />
            ))}
          </div>
        )}


        {!loading && totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <button
                className="p-3 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <FiChevronLeft size={24} />
              </button>

              <div className="flex items-center px-4">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;

                  if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - page) <= 1) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 mx-1 rounded-lg font-bold text-sm transition-all ${page === pageNum
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                          : "text-slate-400 hover:bg-slate-50 hover:text-slate-800"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="px-1 text-slate-300">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                className="p-3 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;