import React, { useState } from 'react'
import Home from './components/Home'
import Products from './components/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Brands from './components/Brands'
import Categories from './components/Categories'


const App = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <BrowserRouter>
    <div onClick={()=>{setDropdownOpen1(false);setDropdownOpen2(false);setMenuOpen(false)}}>
      <Header dropdownOpen1={dropdownOpen1}
        dropdownOpen2={dropdownOpen2}
        setDropdownOpen1={setDropdownOpen1}
        setDropdownOpen2={setDropdownOpen2} 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/brands/:brand' element={<Brands />} />
        <Route path='/categories/:category' element={<Categories />} />
        <Route path='*' element={<div className='container flex justify-center items-center mx-auto my-auto'><h1>404:Not Found</h1></div>} />
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
