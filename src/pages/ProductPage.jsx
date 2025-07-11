import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../axios/Api";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosFlash } from "react-icons/io";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qnt, setQnt] = useState(1);

  const GetProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await Api.get(`/product/${id}`);
      setProduct(response.data.productData);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      toast.error("Failed to load product details. Please try again.");
    }
    setLoading(false);
  }, [id]);

  const handleAddtocart = async () => {
    const cartItem = {
      product_id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: qnt > 0 ? qnt : 1,
    };
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to the cart");
      Navigate("/login");
      return;
    }
    try {
      await Api.post(
        "/user/addtocart",
        { cart: cartItem },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      Navigate("/cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };
  useEffect(() => {
    GetProductDetails();
  }, [GetProductDetails]);

  return (
    <div className="bg-gray-100 min-h-screen w-full mx-auto p-5 ">
      <Helmet>
        <title>TechCart Store |{`${product.name}`}</title>
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
        <div className="container w-full  p-3  rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col md:flex-row">
          <div className="w-auto md:w-2xl my-auto mx-auto p-5">
            <img
              src={product.image}
              alt={product.name}
              className="w-auto h-auto object-cover mx-auto my-auto"
            />

            <div className="flex justify-between items-center w-auto gap-3 text-nowrap mt-2 pt-3">
              <div onClick={() => setQnt(qnt - 1)}>
                {" "}
                <button className="cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xs md:text-xl flex justify-center items-center  hover:bg-blue-800 active:bg-blue-950 transition duration-300">
                  -
                </button>
              </div>
              {qnt > 0 ? qnt : 1}
              <div onClick={() => setQnt(qnt + 1)}>
                {" "}
                <button className="cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xs md:text-xl flex justify-center items-center  hover:bg-blue-800 active:bg-blue-950 transition duration-300">
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center w-auto gap-3 text-nowrap mt-2 pt-3">
              <div onClick={handleAddtocart}>
                {" "}
                <button className="cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xs md:text-xl flex justify-center items-center  hover:bg-blue-800 active:bg-blue-950 transition duration-300">
                  Add to Cart
                  <FaCartPlus />
                </button>
              </div>
              <div>
                {" "}
                <button className="cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xs md:text-xl flex justify-center items-center  hover:bg-blue-800 active:bg-blue-950 transition duration-300">
                  Buy Now
                  <IoIosFlash />
                </button>
              </div>
            </div>
          </div>

          <div className="text-black text-xs md:text-l mx-auto container p-5 flex flex-col flex-wrap box-border justify-items-start items-start">
            <div className="w-auto h-auto">
              <div className=" p-2 font-bold text-blue-700 break-all">
                {" "}
                {product.name}
              </div>
              <div className="m-2 ">
                <span className="text-blue-700 font-bold">
                  Product Description: <br />
                </span>{" "}
                {product.description}
              </div>

              <div className="flex items-center m-2">
                <span className="font-bold text-blue-700">Price:</span>
                <FaIndianRupeeSign /> {product.price}
              </div>

              <div className="font-bold flex items-center m-2 text-blue-700">
                Rating:
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < product.rating ? "text-yellow-400" : "text-black"
                    }
                  />
                ))}
                {/*<span className='text-black'>{product.rating}</span>*/}
              </div>
              <div className="m-2">
                <span className="font-bold text-blue-700">In Stocks:</span>{" "}
                {product.inStock}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
