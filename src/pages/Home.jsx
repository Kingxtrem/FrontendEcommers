import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../axios/Api';
import Loader from '../components/Loader';
import Card from '../components/Card';
import { Helmet } from 'react-helmet'
import HeroSection from '../components/HeroSection';
const Home = () => {


  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const productPage = () => {
    Navigate('/products');
  };

  const GetAllProducts = async () => {
    setLoading(true);
    try {
      const res = await Api.get("/product/all");
      const shuffled = res.data.data.sort(() => 0.5 - Math.random()).slice(0, 8)
      setData(shuffled);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllProducts();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center' >
      <Helmet>
        <title>TechCart Store | Home</title>
        <meta name="description" content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!" />
         <meta name="robots" content="index, follow" />
        <meta name="keywords" content="tech, ecommerce, gadgets, electronics, shop, buy online" />
      </Helmet>
      <div className='w-full mx-auto px-4 py-4 text-center'>
       <HeroSection/>
       <h2 className=' text-base sm:text-lg md:text-xl m-4 font-bold underline'>Our Featured Products:</h2>

        {loading ? <Loader /> : (
          <div >
            <div className=' min-h-0 w-full mx-auto flex flex-wrap p-10 md:p-0 ' >
              {
                data.map((item) => (
                  <Card item={item} key={item._id} />
                ))
              }
            </div>
            <div className='flex justify-center items-center'>
              <button className='animate-bounce m-5 rounded-xl text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 text-nowrap' onClick={productPage}>Click for more products</button>
            </div>
          </div>)}
      </div>
    </div>
  );
};

export default Home;
