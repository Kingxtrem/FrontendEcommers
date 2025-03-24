import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const productPage = () => {
    navigate('/products')
  }

  return (
    <div className='bg-slate-700 text-white min-h-screen'>
      <div className='container mx-auto px-4 py-4'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold mb-4'>Welcome to TechCart Store</h1>
        <p className='text-base sm:text-lg md:text-xl mb-4'>Find the best Tech products here.</p>
        <div className='flex justify-center items-center'>
          <button className='m-5 rounded-xl text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300' onClick={productPage}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Home
