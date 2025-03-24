import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
const App = () => {
  return (
    <BrowserRouter>
      <div className='sticky top-0'>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='*' element={<Home/>} />


      </Routes>
    </BrowserRouter >
  )
}

export default App
