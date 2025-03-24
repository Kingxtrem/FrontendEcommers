import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
     
    </BrowserRouter>
  )
}

export default App
