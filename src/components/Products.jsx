import React, { useState, useEffect } from 'react'
import Api from '../axios/Api'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from 'react-router-dom';

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

        <div className='bg-slate-700 text-white min-h-screen w-full mx-auto flex flex-wrap pb-50 p-10 md:p-0 ' >

            {loading ? (
                <div className="flex justify-center items-center mx-auto">
                    <div className="flex items-center rounded-xl p-5 bg-blue-700 text-yellow-400 text-2xl font-extrabold">
                        <AiOutlineLoading className="animate-spin mr-5" />
                        Loading, Please Wait...
                    </div>
                </div>
            ) : (

                <>

                    {
                        data.map((item) => {

                            return (

                                <div key={item._id} className='w-100  min-h-60 p-3 border-2 border-gray-500 rounded-2xl m-5 box-border bg-white md:flex gap-2 mx-auto shadow-lg shadow-gray-200'>

                                    <div className='md:w-50 w-auto my-auto mx-auto '>
                                        <img src={item.images?.imgUrl} alt="image" className='w-auto max-h-60 object-cover mx-auto my-auto' />
                                    </div>

                                    <div className='text-black text-xs mx-auto container md:p-2 flex flex-col flex-wrap box-border justify-between'>

                                        <div className='w-50 h-30'>

                                            <div className='m-2 truncate'><span className='font-bold'>Product Name:</span> {item.name}</div>

                                            <div className='m-2 truncate'><span className='font-bold'>Product Description:</span> {item.description}</div>

                                            <div className='flex items-center m-2'><span className='font-bold'>Price:</span><FaIndianRupeeSign /> {item.price}</div>

                                            <div className='font-bold flex items-center m-2'>Rating:
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <CiStar key={index} className={index < item.rating ? 'text-yellow-500' : 'text-black'} />
                                                ))}
                                            </div>

                                            <div className='m-2'><span className='font-bold'>Reviews:</span> {item.numOfReviews}</div>

                                        </div>

                                        <Link to={`/products/${item._id}`}>
                                            <div className='flex justify-center items-end'>
                                                <button className='m-5 border-2 rounded-xl text-xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300'>View Details</button>
                                            </div>
                                        </Link>

                                    </div>

                                </div>

                            )


                        })

                    }
                </>)}

        </div >

    )
}

export default Products
