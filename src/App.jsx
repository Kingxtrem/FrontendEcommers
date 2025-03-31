import React, { useState } from 'react'
import Home from './components/Home'
import Products from './components/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  return (
    <BrowserRouter>
    <div onClick={()=>{setDropdownOpen1(false);setDropdownOpen2(false)}}>
      <Header dropdownOpen1={dropdownOpen1}
        dropdownOpen2={dropdownOpen2}
        setDropdownOpen1={setDropdownOpen1}
        setDropdownOpen2={setDropdownOpen2} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='*' element={<div className='container flex justify-center items-center mx-auto my-auto'><h1>404:Not Found</h1></div>} />
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
