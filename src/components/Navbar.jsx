import TechCart from "../assets/logos/TechCart.jpg"
import { TbBrandSafari } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoCartOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { NavLink, Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = ({ dropdownOpen1, setDropdownOpen1, dropdownOpen2, setDropdownOpen2, menuOpen, setMenuOpen }) => {

  const toggleDropdown1 = (e) => {
    e.stopPropagation()
    setDropdownOpen1(!dropdownOpen1)
    setDropdownOpen2(false)
  }
  const toggleDropdown2 = (e) => {
    e.stopPropagation()
    setDropdownOpen2(!dropdownOpen2)
    setDropdownOpen1(false)
  }

  const toggleMenu = (e) => {
    e.stopPropagation()
    setMenuOpen(!menuOpen)
  }
  const handleOutsideClick = (e) => {
    if (menuOpen) {
      setMenuOpen(false)
    }
    if (dropdownOpen1) {
      setDropdownOpen1(false)
    }
    if (dropdownOpen2) {
      setDropdownOpen2(false)
    }
  }
  let [cartValue,setCartValue] = useState(0)
  let [token,setToken] = useState(null);
useEffect(() => {
  const updateAuth = () => {
    setCartValue(localStorage.getItem('cartValue'));
    setToken(localStorage.getItem('token'));
  };

  updateAuth();

  // Listen for both custom and cross-tab events
  window.addEventListener('tokenChange', updateAuth);
  window.addEventListener('cartChange', updateAuth);
  window.addEventListener('storage', updateAuth); // for cross-tab sync

  return () => {
    window.removeEventListener('tokenChange', updateAuth);
    window.removeEventListener('cartChange', updateAuth);
    window.removeEventListener('storage', updateAuth);
  };
}, []);


  return (

    <div className='bg-gray-200 p-1 font-bold text-sm w-full z-50 sticky top-0' onClick={handleOutsideClick}>

      <div className='flex justify-between items-start md:items-center'>

        <NavLink to={'/'} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800 px-5 py-2.5" : "cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5"}>

          <div className='flex items-center'>
            <img className='w-10 border-0 rounded-full mr-1 cursor-pointer' src={TechCart} alt="TechCart Logo" />
            <p className='cursor-pointer'>Home</p>
          </div>

        </NavLink>

        <div className='flex flex-col md:flex-row justify-center items-center'>

          <div className='md:hidden cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5 text-3xl' onClick={(e) => { toggleMenu(e) }}>
            <GiHamburgerMenu />
          </div>

          <ul>
            <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-start md:items-center justify-between md:justify-end md:mt-0 absolute top-15 right-0 rounded-lg md:static md:top-0 md:right-0 bg-gray-200 p-5 md:p-0 h-auto w-fit md:w-auto md:h-fit gap-1`}>

              <NavLink to={"/products"} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 rounded-lg"}>
                <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <LuBoxes className='mr-1' />Products
                </li>
              </NavLink>

              <li className='text-center relative flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start' onClick={(e) => toggleDropdown1(e)}>

                <TbBrandSafari className='mr-1' /> Brands {dropdownOpen1 ? <IoIosArrowDropup className='ml-1' /> : <IoIosArrowDropdown className='ml-1' />}

                <div className={`z-10 ${dropdownOpen1 ? 'block' : 'hidden'} bg-gray-200 rounded-lg absolute top-full w-30 `}>
                  <ul className="text-sm">
                    <li><Link to={"/brands/Apple"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Apple</Link></li>
                    <li><Link to={"/brands/HP"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>HP</Link></li>
                    <li><Link to={"/brands/MSI "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>MSI </Link></li>
                    <li><Link to={"/brands/Nothing "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Nothing </Link></li>
                    <li><Link to={"/brands/Google "} className="block px-5 py-2 hover:bg-black hover:text-white " onClick={() => { setMenuOpen(false) }}>Google </Link></li>
                    <li><Link to={"/brands/ASUS "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>ASUS </Link></li>
                    <li><Link to={"/brands/Realme"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Realme</Link></li>
                    <li><Link to={"/brands/IQOO "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>IQOO </Link></li>
                    <li><Link to={"/brands/SAMSUNG"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>SAMSUNG</Link></li>
                    <li><Link to={"/brands/LENOVO"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>LENOVO</Link></li>
                    <li><Link to={"/brands/Fastrack "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Fastrack </Link></li>
                    <li><Link to={"/brands/Fire-Boltt"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Fire-Boltt </Link></li>
                    <li><Link to={"/brands/boAt"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>boAt </Link></li>
                    <li><Link to={"/brands/AMAZFIT "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>AMAZFIT  </Link></li>
                  </ul>
                </div>

              </li>

              <li className='text-center relative flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start' onClick={(e) => toggleDropdown2(e)}>

                <TbCategoryPlus className='mr-1' />Categories {dropdownOpen2 ? <IoIosArrowDropup className='ml-1' /> : <IoIosArrowDropdown className='ml-1' />}

                <div className={`z-10 ${dropdownOpen2 ? 'block' : 'hidden'} bg-gray-200  rounded-lg absolute top-full w-30`}>
                  <ul className="text-sm">
                    <li>
                      <Link to={"/categories/Mobiles"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Mobiles</Link>
                    </li>
                    <li>
                      <Link to={"/categories/Audio"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Audio</Link>
                    </li>
                    <li>
                      <Link to={"/categories/Laptops"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Laptops</Link>
                    </li>
                    <li>
                      <Link to={"/categories/Gaming Laptops"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Gaming Laptops</Link>
                    </li>
                    <li>
                      <Link to={"/categories/Watches"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Watches</Link>
                    </li>
                  </ul>
                </div>

              </li>
              {token ? <NavLink to={"/profile"} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 rounded-lg"}>
                <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <CgProfile className='mr-1' />Profile
                </li>
              </NavLink> : <NavLink to={"/login"} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 rounded-lg"}>
                <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <SiGnuprivacyguard className='mr-1' />Login
                </li>
              </NavLink>}
              <NavLink to={"/cart"} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 rounded-lg"}>
                <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <IoCartOutline className='mr-1' />Cart:{cartValue ? cartValue : 0}
                </li>
              </NavLink>


            </div>
          </ul>

        </div>

      </div>

    </div>

  )

}

export default Navbar
