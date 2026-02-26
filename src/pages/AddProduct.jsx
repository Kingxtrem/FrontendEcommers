import Api from "../axios/Api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { FaCloudUploadAlt, FaSave, FaArrowLeft } from "react-icons/fa";


const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    rating: 0,
    category: "",
    inStock: 1,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (image && typeof image !== "string") {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof image === "string") {
      setPreview(image);
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "Product name is required";
    if (!data.description.trim()) newErrors.description = "Description is required";
    if (!data.price || data.price <= 0) newErrors.price = "Enter a valid price";
    if (!data.category) newErrors.category = "Category is required";
    if (!image && !id) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    if (image && typeof image !== "string") formData.append("image", image);

    setLoading(true);
    try {
      const endpoint = id ? `/product/update/${id}` : "/product/create";
      const method = id ? "put" : "post";
      const res = await Api[method](endpoint, formData);

      toast.success(res.data.message || "Success!");
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Operation failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const { data } = await Api.get(`/product/${id}`);
          setData(data.productData);
          setImage(data.productData.image);
        } catch (error) {
          console.log(error);
          toast.error("Failed to load product");
        }
      };
      fetchDetails();
    }
  }, [id]);

  const inputClasses = (name) => `
    w-full px-4 py-2.5 rounded-xl border transition-all duration-200 outline-none
    ${errors[name] ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
  `;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <title>TechCart | {id ? "Edit Product" : "Add Product"}</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="bg-blue-600 p-8 text-white text-center">
            <h2 className="text-3xl font-black tracking-tight">
              {id ? "Update Product" : "New Product"}
            </h2>
            <p className="text-blue-100 mt-2 text-sm">Fill in the details to manage your store inventory.</p>
          </div>

          <form onSubmit={handleAction} className="p-8 space-y-6">

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Product Name</label>
              <input
                name="name"
                type="text"
                className={inputClasses("name")}
                placeholder="e.g. MacBook Pro M3"
                value={data.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>


            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
              <textarea
                name="description"
                rows="3"
                className={inputClasses("description")}
                placeholder="Briefly describe the product features..."
                value={data.description}
                onChange={handleChange}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  className={inputClasses("price")}
                  value={data.price}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Rating (0-5)</label>
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  className={inputClasses("rating")}
                  value={data.rating}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">In Stock</label>
                <input
                  name="inStock"
                  type="number"
                  className={inputClasses("inStock")}
                  value={data.inStock}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
              <select
                name="category"
                className={inputClasses("category")}
                value={data.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio">Audio</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>


            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Product Image</label>
              <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors relative group">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-20 h-20 rounded-xl object-cover shadow-md" />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                    <FaCloudUploadAlt size={30} />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upload PNG, JPG</p>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <p className="text-sm text-blue-600 font-bold">Click to browse files</p>
                </div>
              </div>
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "PROCESSING..." : (
                <><FaSave /> {id ? "UPDATE PRODUCT" : "PUBLISH PRODUCT"}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;