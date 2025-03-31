import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../axios/Api'
import { AiOutlineLoading } from "react-icons/ai";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';


const Home = () => {

  const [data, setData] = useState([])

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const productPage = () => {
    navigate('/products')
  }

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

    <div className='bg-slate-700 text-white min-h-screen flex items-center justify-center conainer'>

      <div className='container mx-auto px-4 py-4 text-center'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold mb-4'>Welcome to TechCart Store</h1>
        <p className='text-base sm:text-lg md:text-xl mb-4'>Find the best Tech products here.</p>

        <h2 className='text-base sm:text-lg md:text-xl mb-4 font-bold underline'>Our Featured Products:</h2>

        <div className={loading ? 'w-full flex justify-center items-center' : "hidden"}>
          <div className='w-fit flex justify-center rounded-xl p-5 bg-blue-700 text-yellow-400 text-2xl font-extrabold text-nowrap'>
            <AiOutlineLoading className='animate-spin mr-5' />Loading Please Wait
          </div>
        </div>
        <div className='bg-slate-700 text-white min-h-screen w-full mx-auto flex flex-wrap p-10 md:p-0 ' >
          {
            data.slice(0, 4).map((item) => (
              <div key={item._id} className='w-100 min-h-60 p-3 border-2 border-gray-500 rounded-2xl m-5 box-border bg-white md:flex gap-2 mx-auto shadow-lg shadow-gray-200'>

                <div className='md:w-50 w-auto my-auto mx-auto '>
                  <img src={item.images?.imgUrl} alt="image" className='w-auto max-h-60 object-cover mx-auto my-auto' />
                </div>

                <div className='text-black text-xs mx-auto container md:p-2 flex flex-col flex-wrap box-border justify-between'>

                  <div className='w-45 md:w-40 h-30'>

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
            ))
          }
        </div>
        <div className='flex justify-center items-center'>
          <button className='animate-bounce m-5 rounded-xl text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 text-nowrap' onClick={productPage}>Click for more product</button>
        </div>
      </div>

    </div>

  )
}

export default Home
