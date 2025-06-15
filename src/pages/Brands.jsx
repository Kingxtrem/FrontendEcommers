import { useState, useEffect } from 'react'
import Api from '../axios/Api'
import Loader from '../components/Loader';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const Brands = () => {
  const [data, setData] = useState([]);
  const { brand } = useParams();
  const [loading, setLoading] = useState(true);

  const GetAllProducts = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/product/all");
      setData(res.data.data);
    } catch (error) {
      console.log(error)
      toast.error('Failed to load products')
    } finally { setLoading(false); }

  };

  const filteredData = data.filter((item) => item.name.toLowerCase().includes(brand.toLowerCase()));

  useEffect(() => {
    GetAllProducts();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen w-full mx-auto flex flex-wrap pb-50 p-10 md:p-0'>
      <Helmet>
        <title>TechCart Store | {brand}</title>
        <meta name="description" content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!" />
        <meta name="keywords" content="tech, ecommerce, gadgets, electronics, shop, buy online" />
      </Helmet>
      {loading ? <Loader /> : (
        <>
          {
            filteredData.map((item) => {
              return (
                <Card item={item} key={item._id} />)
            }
            )}
        </>)}
    </div>
  );
};

export default Brands;
