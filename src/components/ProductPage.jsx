import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Api from '../axios/Api'
import { AiOutlineLoading } from "react-icons/ai";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosFlash } from "react-icons/io";

const ProductPage = ({setCartvalue}) => {
  const Navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  const GetProductDetails = async () => {
    setLoading(true)
    try {
      const response = await Api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      alert("Failed to load product details. Please try again.");
    }
    setLoading(false)
  }

  const handleAddtocart = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert("You are not logged in login first")
      Navigate("/login")
      return
    }
    const cartItem = {
      productId: id,
      quantity: 1
      
    }
    setCartvalue((prev) => prev + 1)
    Navigate("/cart")

  }
  useEffect(() => {
    GetProductDetails()
  }, [id])

  return (

    <div className='bg-slate-700 text-white min-h-screen w-full mx-auto p-5 ' >

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="flex items-center rounded-xl p-5 bg-blue-700 text-yellow-400 text-2xl font-extrabold">
            <AiOutlineLoading className="animate-spin mr-5" />
            Loading, Please Wait...
          </div>
        </div>
      ) : (

        <div className='container w-full  p-3 border-2 border-gray-500 rounded-2xl bg-white mx-auto shadow-lg shadow-gray-200 flex flex-col md:flex-row'>

          <div className='w-auto md:w-2xl my-auto mx-auto p-5'>

            <img src={product.images?.imgUrl} alt={product.name} className='w-auto h-auto object-cover mx-auto my-auto' />

            <div className='flex justify-between items-center w-auto gap-3 text-nowrap mt-2 pt-3'>

              <div onClick={handleAddtocart}> <button className='cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xs md:text-xl flex justify-center items-center  hover:bg-blue-800 active:bg-blue-950 transition duration-300'>Add to Cart<FaCartPlus /></button></div>
              <div> <button className='cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xs md:text-xl flex justify-center items-center  hover:bg-blue-800 active:bg-blue-950 transition duration-300'>Buy Now<IoIosFlash /></button></div>

            </div>

          </div>

          <div className='text-black text-xs md:text-l mx-auto container p-5 flex flex-col flex-wrap box-border justify-items-start items-start'>

            <div className='w-auto h-auto'>

              <div className=' p-2 font-bold text-blue-700 break-all'> {product.name}</div>
              {/* <div className='m-2 '><span className='text-blue-700 font-bold'>Product Name:</span> {product.name}</div> */}

              <div className='m-2 '><span className='text-blue-700 font-bold'>Product Description: <br /></span> {product.description}</div>

              <div className='flex items-center m-2'><span className='font-bold text-blue-700'>Price:</span><FaIndianRupeeSign /> {product.price}</div>

              <div className='font-bold flex items-center m-2 text-blue-700'>Rating:
                {Array.from({ length: 5 }, (_, index) => (
                  <CiStar key={index} className={index < product.rating ? 'text-yellow-500' : 'text-black'} />
                ))}
              </div>

              <div className='m-2'><span className='font-bold text-blue-700'>Reviews:</span> {product.numOfReviews}</div>

              <div className='m-2'><span className='font-bold text-blue-700'>In Stocks:</span> {product.stock}</div>

            </div>

          </div>

        </div>)}

    </div >

  )
}

export default ProductPage
