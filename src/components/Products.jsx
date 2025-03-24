import React, { useState, useEffect } from 'react'
import Api from '../axios/Api'
import { FaIndianRupeeSign } from "react-icons/fa6";

const Products = () => {
    const [data, setData] = useState([])
    const GetAllProducts = async () => {
        const res = await Api.get("/products")
        setData(res.data)
    }
    useEffect(() => {
        GetAllProducts()
    }, [])
    console.log(data)
    return (
        <div className='bg-slate-700 text-white min-h-screen w-full mx-auto px-4 py-4 text-2xl flex flex-wrap' >
            {
                data.map((item) => {
                    return (
                        <div key={item._id} className='w-100 p-3 border-2 border-blue-500 rounded-2xl m-2 box-border bg-white md:flex gap-2 mx-auto'>
                            <div className='md:w-50 w- my-auto mx-auto'>
                                <img src={item.images.imgUrl} alt="image" className='rounded w-auto h-auto max-h-50 object-cover mx-auto my-auto' />
                            </div>
                            <div className='text-black text-xs mx-auto container p-2'>
                                <p className='m-2 break-words'><span className='font-bold'>Product Name:</span> {item.name}</p>
                                {/* <p className='m-2 break-words'><span className='font-bold'>Product Description:</span> {item.description}</p> */}
                                <p className='m-2 break-words'><div className='font-bold flex items-center'>Price:<FaIndianRupeeSign /> {item.price}</div></p>
                                <div className='flex justify-center items-center'>
                                    <button className='m-5 border-2 rounded-xl text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300'>View Details</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Products
