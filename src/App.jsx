import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
const App = () => {
  return (
    <BrowserRouter>
      
        <Navbar />
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Products' element={<Products />} />
        <Route path='*' element={<Home/>} />


      </Routes>
    </BrowserRouter >
  )
}

export default App
