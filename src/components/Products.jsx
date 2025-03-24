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
        <div className='bg-slate-700 text-white min-h-screen w-full mx-auto text-2xl flex flex-wrap pb-50 p-10 md:p-0' >
            {
                data.map((item) => {
                    return (
                        <div key={item._id} className='w-100 min-h-80 p-3 border-2 border-gray-500 rounded-2xl m-5 box-border bg-white md:flex gap-2 mx-auto shadow-lg shadow-gray-200'>
                            <div className='md:w-50 w- my-auto mx-auto'>
                                <img src={item.images.imgUrl} alt="image" className='rounded w-auto h-auto max-h-50 object-cover mx-auto my-auto' />
                            </div>
                            <div className='text-black text-xs mx-auto container p-2 flex flex-col flex-wrap box-border justify-between'>
                                <div>
                                    <div className='m-2'><span className='font-bold'>Product Name:</span> {item.name}</div>
                                    <div className='font-bold flex items-center m-2'>Price:<FaIndianRupeeSign /> {item.price}</div>
                                </div>
                                <div className='flex justify-center items-end'>
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
