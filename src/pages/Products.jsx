import { useState, useEffect } from 'react'
import Api from '../axios/Api'
import Loader from '../components/Loader';
import Card from '../components/Card';

const Products = () => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true)

    const GetAllProducts = async () => {
        setLoading(true)
        const res = await Api.get("/products")
        setData(res.data)
        setLoading(false)
    }

    useEffect(() => {
        GetAllProducts()
    }, [])

    return (

        <div className='bg-gray-100 min-h-screen w-full mx-auto flex flex-wrap pb-50 p-10 md:p-0 ' >

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
