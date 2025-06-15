import { useState, useEffect } from 'react'
import Api from '../axios/Api'
import Loader from '../components/Loader';
import Card from '../components/Card';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const Products = () => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true)

    const GetAllProducts = async () => {
        setLoading(true);
        try {
            const res = await Api.get("/product/all");
            setData(res.data.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            console.error(error);
           toast.error('failed to load products')
        }
        setLoading(false);
    }

    useEffect(() => {
        GetAllProducts()
    }, [])

    return (

        <div className='bg-gray-100 min-h-screen w-full mx-auto flex flex-wrap pb-50 p-10 md:p-0 ' >
 <Helmet>
        <title>TechCart Store | Products</title>
        <meta name="description" content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!" />
        <meta name="keywords" content="tech, ecommerce, gadgets, electronics, shop, buy online" />
      </Helmet>
            {loading ? <Loader /> : (
                <>
                    {
                        data.map((item) => {
                            return (
                                <Card item={item} key={item._id} />
                            )
                        })
                    }
                </>)}
        </div >

    )
}

export default Products
