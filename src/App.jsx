import { useState } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Brands from './pages/Brands'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import PrivateRouting from './security/PrivateRouting'
import AddProduct from './pages/AddProduct'
import Navbar from './components/Navbar'

const App = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <BrowserRouter>
      <div onClick={() => { setDropdownOpen1(false); setDropdownOpen2(false); setMenuOpen(false) }}>
        <Navbar dropdownOpen1={dropdownOpen1}
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
          <Route path='/brands/:brand' element={<Brands />} />
          <Route path='/categories/:category' element={<Categories />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<PrivateRouting><Profile /></PrivateRouting>} />
          <Route path='/cart' element={<PrivateRouting><Cart/></PrivateRouting>} />
          <Route path='/addproduct' element={<PrivateRouting><AddProduct /></PrivateRouting>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
