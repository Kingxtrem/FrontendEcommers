import { useState, useEffect, useRef, useCallback } from "react";
import Api from "../axios/Api";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

// Helper to determine limit based on screen width
const getLimit = () => {
  if (window.innerWidth >= 1280) return 16; // xl screens
  if (window.innerWidth >= 1024) return 8;  // lg screens
  if (window.innerWidth >= 768) return 4;   // md screens
  return 1;                                 // sm and below
};

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(getLimit());
  const loaderRef = useRef(null);

  // Update limit on resize
  useEffect(() => {
    const handleResize = () => setLimit(getLimit());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const GetProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Api.get(`/product/all?page=${page}&limit=${limit}`);
      const products = res.data.data;
      setData((prev) => (page === 1 ? products : [...prev, ...products]));
      setHasMore(products.length === limit);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
    setLoading(false);
  }, [page, limit]);

  useEffect(() => {
    GetProducts();
  }, [GetProducts]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loading]);

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
      {data.map((item) => (
        <Card item={item} key={item._id} />
      ))}
      {/* Loader for infinite scroll */}
      {loading && <Loader />}
      <div ref={loaderRef} style={{ height: 1 }} />
      {!hasMore && !loading && (
        <div className="w-full text-center text-gray-500 py-4">
          No more products.
        </div>
      )}
    </div>
  );
};

export default Products;