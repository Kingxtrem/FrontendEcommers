import { useState, useEffect } from 'react'
import Api from '../axios/Api'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Card from '../components/Card';
import { toast } from 'react-toastify';

const Categories = () => {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);

  const GetAllProducts = async () => {
    setLoading(true);
    try {
      const res = await Api.get("/product/all");
      setData(res.data.data);
    } catch (error) {
      console.log(error)
      toast.error('Failed to load products');
    }
    setLoading(false);
  };

  const filteredData = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());

  useEffect(() => {
    GetAllProducts();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen w-full mx-auto flex flex-wrap pb-50 p-10 md:p-0'>
      {loading ? <Loader /> : (
        <>
          {
            filteredData.map((item) => (
              <Card item={item} key={item._id} />
            ))
          }
        </>)}
    </div>
  );
};

export default Categories;
