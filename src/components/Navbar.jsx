import TechCart from "../assets/logos/TechCart.jpg"
import { TbBrandSafari } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoCartOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { NavLink, Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDropdown, IoMdClose } from "react-icons/io";
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
  let [cartValue, setCartValue] = useState(() => localStorage.getItem('cartValue') || 0);
  let [token, setToken] = useState(() => localStorage.getItem('token'));
  useEffect(() => {
    const updateAuth = () => {
      setCartValue(Number(localStorage.getItem('cartValue')) || 0);
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

        <NavLink autoFocus to={'/'} className={({ isActive }) => isActive ? "text-red-500 rounded-lg cursor-pointer hover:bg-blue-800 hover:text-white px-5 py-2.5" : "cursor-pointer hover:bg-blue-800 hover:text-white rounded-lg px-5 py-2.5"}>

          <div className='flex items-center'>
            <img className='w-10 border-0 rounded-full mr-1 cursor-pointer' src={TechCart} alt="TechCart Logo" />
            <p className='cursor-pointer'>Home</p>
          </div>

        </NavLink>

        <div className='flex flex-col md:flex-row justify-center items-center'>

          <div className='md:hidden cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5 text-3xl' onClick={(e) => { toggleMenu(e) }}>
            <GiHamburgerMenu />
          </div>

          <div>
            <div className={`
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
            md:translate-x-0 md:flex
            flex-col md:flex-row
            items-start md:items-center
            justify-between md:justify-end
            gap-1
            fixed md:static
            top-0 right-0
            h-full
            w-auto
            bg-gray-200 md:bg-transparent
            rounded-l-lg md:rounded-none
            p-5 md:p-0
            z-50
            transition-transform duration-300 ease-in-out
          `}>

              {/* <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-start md:items-center justify-between md:justify-end md:mt-0 absolute top-15 right-0 rounded-lg md:static md:top-0 md:right-0 bg-gray-200 p-5 md:p-0 h-auto w-fit md:w-auto md:h-fit gap-1`}></div> */}

              {/* Close Button */}
              <div className="flex justify-end mb-4 md:hidden">
                <button onClick={(e) => { toggleMenu(e) }} className="text-2xl p-2 hover:text-red-600">
                  <IoMdClose />
                </button>
              </div>

              <NavLink to={"/products"} className={({ isActive }) => isActive ? " text-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 hover:text-white rounded-lg"}>
                <div className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <LuBoxes className='mr-1' />Products
                </div>
              </NavLink>

              <div className='text-center relative flex items-center cursor-pointer hover:bg-blue-800 hover:text-white rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start' onClick={(e) => toggleDropdown1(e)}>

                <TbBrandSafari className='mr-1' /> Brands {dropdownOpen1 ? <IoIosArrowDropup className='ml-1' /> : <IoIosArrowDropdown className='ml-1' />}

                <div className={`z-10 ${dropdownOpen1 ? 'block' : 'hidden'} bg-gray-200 text-black rounded-lg absolute top-full w-30`}>
                  <div className="text-sm">
                    <div><Link to={"/brands/Apple"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Apple</Link></div>
                    <div><Link to={"/brands/HP"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>HP</Link></div>
                    <div><Link to={"/brands/MSI "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>MSI </Link></div>
                    <div><Link to={"/brands/Nothing "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Nothing </Link></div>
                    <div><Link to={"/brands/Google "} className="block px-5 py-2 hover:bg-black hover:text-white " onClick={() => { setMenuOpen(false) }}>Google </Link></div>
                    <div><Link to={"/brands/ASUS "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>ASUS </Link></div>
                    <div><Link to={"/brands/Realme"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Realme</Link></div>
                    <div><Link to={"/brands/IQOO "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>IQOO </Link></div>
                    <div><Link to={"/brands/SAMSUNG"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>SAMSUNG</Link></div>
                    <div><Link to={"/brands/LENOVO"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>LENOVO</Link></div>
                    <div><Link to={"/brands/Fastrack "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Fastrack </Link></div>
                    <div><Link to={"/brands/Fire-Boltt"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Fire-Boltt </Link></div>
                    <div><Link to={"/brands/boAt"} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>boAt </Link></div>
                    <div><Link to={"/brands/AMAZFIT "} className="block px-5 py-2 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>AMAZFIT  </Link></div>
                  </div>
                </div>

              </div>

              <div className='text-center relative flex items-center cursor-pointer hover:bg-blue-800 hover:text-white rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start' onClick={(e) => toggleDropdown2(e)}>

                <TbCategoryPlus className='mr-1' />Categories {dropdownOpen2 ? <IoIosArrowDropup className='ml-1' /> : <IoIosArrowDropdown className='ml-1' />}

                <div className={`z-10 ${dropdownOpen2 ? 'block' : 'hidden'} bg-gray-200 text-black  rounded-lg absolute top-full w-30`}>
                  <div className="text-sm">
                    <div>
                      <Link to={"/categories/Mobiles"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Mobiles</Link>
                    </div>
                    <div>
                      <Link to={"/categories/Audio"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Audio</Link>
                    </div>
                    <div>
                      <Link to={"/categories/Laptops"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Laptops</Link>
                    </div>
                    <div>
                      <Link to={"/categories/Gaming Laptops"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Gaming Laptops</Link>
                    </div>
                    <div>
                      <Link to={"/categories/Watches"} className="block px-5 py-2.5 hover:bg-black hover:text-white" onClick={() => { setMenuOpen(false) }}>Watches</Link>
                    </div>
                  </div>
                </div>

              </div>
              {token ? <NavLink to={"/profile"} className={({ isActive }) => isActive ? "text-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 hover:text-white rounded-lg"}>
                <div className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <CgProfile className='mr-1' />Profile
                </div>
              </NavLink> : <NavLink to={"/login"} className={({ isActive }) => isActive ? "text-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 hover:text-white rounded-lg"}>
                <div className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <SiGnuprivacyguard className='mr-1' />Login
                </div>
              </NavLink>}
              <NavLink to={"/cart"} className={({ isActive }) => isActive ? "text-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 hover:text-white rounded-lg"}>
                <div className='relative flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-40 md:w-30 md:justify-center justify-start'>
                  <IoCartOutline className='mr-1' /><span className="absolute top-1 left-18 md:left-22 text-white bg-gray-700  rounded-full px-1 ">{cartValue ? cartValue : 0}</span>Cart
                </div>
              </NavLink>


            </div>
          </div>

        </div>

      </div>

    </div>

  )

}

export default Navbar
