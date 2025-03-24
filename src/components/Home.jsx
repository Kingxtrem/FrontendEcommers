import React, { useState, useEffect } from 'react'
import Api from '../axios/Api'

const Home = () => {
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
    <div className='bg-slate-700 text-white min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold mb-4'>Welcome to TechCart Store</h1>
        <p className='text-base sm:text-lg md:text-xl mb-8'>Find the best Tech products here.</p>
      </div>
      <div className='container mx-auto px-4 py-8 text-2xl text-white flex flex-wrap m-5'>
        {data.map((item) => {
          return (
            <div key={item._id} className='container p-3 border-2 border-blue-500 rounded-2xl m-5 box-content bg-white md:flex gap-5'>
              <div className='md:w-50 w-auto my-auto mx-auto'>
                <img src={item.images.imgUrl} alt="image" className='rounded w-auto h-auto max-h-50 object-cover mx-auto my-auto' />
              </div>
              <div className='text-black text-xs mx-auto container p-5 break-words'>
                <p className='m-5'><span className='font-bold'>Product Name:</span> {item.name}</p>
                <p className='m-5'><span className='font-bold'>Product Description:</span> {item.description}</p>
                <div className='flex justify-center items-center'>
                  <button className='m-5 border-2 rounded-xl text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 transition duration-300'>View Details</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
