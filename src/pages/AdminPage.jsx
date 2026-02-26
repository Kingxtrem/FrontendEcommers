import React, { useEffect, useState } from "react";
import Api from "../axios/Api";
import { FaStar, FaPlus, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Loader from "../components/Loader";


const AdminPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/product/all");
      setData(res.data.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
      customClass: {
        confirmButton: "rounded-lg px-4 py-2 font-bold",
        cancelButton: "rounded-lg px-4 py-2 font-bold"
      }
    });

    if (result.isConfirmed) {
      try {
        await Api.delete(`/product/delete/${id}`);
        toast.success("Product removed successfully");
        getAllProducts();
      } catch {
        Swal.fire("Error!", "Failed to delete.", "error");
      }
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8">
      <title>Admin Dashboard | TechCart</title>
      <meta name="robots" content="noindex, nofollow" />

      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory Management</h1>
              <p className="text-slate-500 text-sm">You have {data.length} total products in your store.</p>
            </div>
            <button
              onClick={() => navigate("/addproduct")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <FaPlus size={14} /> Add New Product
            </button>
          </div>


          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Info</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Product Details</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Price</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Stock</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.map((item, index) => (
                    <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-slate-300 font-mono text-xs">#{index + 1}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <Link to={`/products/${item._id}`} className="shrink-0 group">
                            <img
                              className="w-12 h-12 rounded-xl object-cover bg-slate-100 group-hover:ring-2 ring-blue-500 transition-all"
                              src={item.image}
                              alt={item.name}
                            />
                          </Link>
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1">{item.name}</p>
                            <div className="flex gap-0.5 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} size={10} className={i < item.rating ? "text-amber-400" : "text-slate-200"} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.inStock > 5 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}>
                          {item.inStock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/edit/${item._id}`)}
                            className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <FaRegEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <MdDeleteForever size={22} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.length === 0 && (
              <div className="p-20 text-center">
                <p className="text-slate-400">No products found in the catalog.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;