import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../axios/Api'
import { AiOutlineLoading } from "react-icons/ai";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";


const ProductPage = () => {

  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  const GetProductDetails = async () => {
    setLoading(true)
    const response = await Api.get(`/products/${id}`)
    setProduct(response.data.product)
    setLoading(false)
  }

  useEffect(() => {
    GetProductDetails()
    console.log(product)
  }, [id])

  return (

    <div className='bg-slate-700 text-white min-h-screen w-full mx-auto p-5 ' >

      <div className={loading ? 'w-full flex justify-center items-center' : "hidden"}>
        <div className='w-fit flex justify-center rounded-xl p-5 bg-blue-700 text-yellow-400 text-2xl font-extrabold text-nowrap'>
          <AiOutlineLoading className='animate-spin mr-5' />Loading Please Wait
        </div>
      </div>

      <div className='container w-full min-h-screen p-5 border-2 border-gray-500 rounded-2xl bg-white  mx-auto shadow-lg shadow-gray-200'>

        <div className='w-auto my-auto mx-auto p-5'>
          <img src={product.images?.imgUrl} alt={product.name} className='w-auto h-auto object-cover mx-auto my-auto' />
        </div>

        <div className='text-black text-xs md:text-xl mx-auto container p-5 flex flex-col flex-wrap box-border justify-center items-center'>

          <div className='w-auto h-auto'>

            <div className=' p-2 flex items-center justify-center font-bold'> {product.name}</div>

            <div className='m-2 '><span className='text-blue-700 font-bold'>Product Description:</span> {product.description}</div>

            <div className='flex items-center m-2'><span className='font-bold text-blue-700'>Price:</span><FaIndianRupeeSign /> {product.price}</div>

            <div className='font-bold flex items-center m-2 text-blue-700'>Rating:
              {Array.from({ length: 5 }, (_, index) => (
                <CiStar key={index} className={index < product.rating ? 'text-yellow-500' : 'text-black'} />
              ))}
            </div>

            <div className='m-2'><span className='font-bold text-blue-700'>Reviews:</span> {product.numOfReviews}</div>

          </div>

        </div>

      </div>

    </div >
  )
}

export default ProductPage
