import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <div className='sticky top-0'>
        <Navbar />
      </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          {/* <Route path='*' element={<div className='container flex justify-center items-center mx-auto my-auto'><h1>404:Not Found</h1></div>} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
