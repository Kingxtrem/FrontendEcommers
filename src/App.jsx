import { useState } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import { BrowserRouter, Route, Routes, ScrollRestoration, UNSAFE_useScrollRestoration } from 'react-router-dom'
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
import AdminPage from './pages/AdminPage'
import AdminRouting from './security/AdminRouting'
import { Bounce, ToastContainer } from 'react-toastify'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  return (

    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div onClick={() => { setDropdownOpen1(false); setDropdownOpen2(false); setMenuOpen(false) }}>
        <Navbar dropdownOpen1={dropdownOpen1}
          dropdownOpen2={dropdownOpen2}
          setDropdownOpen1={setDropdownOpen1}
          setDropdownOpen2={setDropdownOpen2}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <Routes>
          {/* Basic Rooutes */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/brands/:brand' element={<Brands />} />
          <Route path='/categories/:category' element={<Categories />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* Private Routes */}
          <Route path='/profile' element={<PrivateRouting><Profile /></PrivateRouting>} />
          <Route path='/cart' element={<PrivateRouting><Cart /></PrivateRouting>} />
          {/* Admin Routes */}
          <Route path='/admin' element={<AdminRouting><AdminPage /></AdminRouting>} />
          <Route path='/addproduct' element={<AdminRouting><AddProduct /></AdminRouting>} />
          <Route path='/edit/:id' element={<AdminRouting><AddProduct /></AdminRouting>} />
          {/* Not found */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
