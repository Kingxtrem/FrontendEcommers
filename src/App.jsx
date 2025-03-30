import React from 'react'
import Home from './components/Home'
import Products from './components/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='*' element={<div className='container flex justify-center items-center mx-auto my-auto'><h1>404:Not Found</h1></div>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default App
