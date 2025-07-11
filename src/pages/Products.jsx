import { useState, useEffect } from "react";
import Api from "../axios/Api";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const LIMIT = 8;

const Products = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const GetProducts = async (page) => {
    setLoading(true);
    try {
      const res = await Api.get(`/product/all?page=${page}&limit=${LIMIT}`);
      setData(res.data.data);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  useEffect(() => {
    GetProducts(page);
  }, [page]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="bg-gray-100 min-h-screen w-full mx-auto flex flex-wrap pb-50 p-10 md:p-0 ">
      <Helmet>
        <title>TechCart Store | Products</title>
        <meta
          name="description"
          content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!"
        />
        <meta
          name="keywords"
          content="tech, ecommerce, gadgets, electronics, shop, buy online"
        />
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.map((item) => (
            <Card item={item} key={item._id} />
          ))}
        </>
      )}
      <div className="w-full h-fit flex justify-evenly text-xs md:text-2xl items-center text-nowrap mx-3 my-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
