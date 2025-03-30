import React, { useState } from 'react'
import TechCart from "../assets/logos/TechCart.jpg"
import { TbBrandSafari } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoCartOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaL, FaS } from 'react-icons/fa6';

const Navbar = () => {

  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDropdown1 = (e) => {
    e.stopPropagation()
    setDropdownOpen1(!dropdownOpen1)
  }
  const toggleDropdown2 = (e) => {
    e.stopPropagation()
    setDropdownOpen2(!dropdownOpen2)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (

    <div className='bg-slate-950 p-2 text-white font-bold w-full' onClick={() => { setDropdownOpen1(false); setDropdownOpen2(false)}}>

      <div className='flex justify-between items-start md:items-center'>

        <NavLink to={'/'} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800 px-5 py-2.5" : "cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5"}>

          <div className='flex items-center'>
            <img className='w-10 border-0 rounded-full mr-1 cursor-pointer' src={TechCart} alt="TechCart Logo" />
            <p className='cursor-pointer'>Home</p>
          </div>

        </NavLink>

        <div className='flex flex-col md:flex-row justify-center items-center'>

          <div className='md:hidden cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5 text-3xl' onClick={toggleMenu}>
            <GiHamburgerMenu />
          </div>

          <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-start md:items-center justify-between md:justify-end md:mt-0 absolute top-15 right-0 rounded-lg md:static md:top-0 md:right-0 bg-slate-950 p-5 md:p-0 h-auto w-fit md:w-auto md:h-fit opacity-80 md:opacity-100 gap-1`}>

            <NavLink to={"/products"} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 rounded-lg"}>
              <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-30 md:justify-center justify-start'>
                <LuBoxes className='mr-1' />Products
              </li>
            </NavLink>

            <li className='text-center relative flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-30 md:justify-center justify-start' onClick={(e) => toggleDropdown1(e)}>

              <TbBrandSafari className='mr-1' /> Brands

              <div className={`z-10 ${dropdownOpen1 ? 'block' : 'hidden'} bg-gray-950 text-white rounded-lg absolute top-full opacity-100 md:opacity-90 w-30`}>
                <ul className="text-sm">
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">Apple</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">HP</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">Infinix</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">MOTOROLA</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">OnePlus</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">POCO</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">Realme</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">REDMI</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">SAMSUNG</a>
                  </li>
                </ul>
              </div>

            </li>

            <li className='text-center relative flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-30 md:justify-center justify-start' onClick={(e) => toggleDropdown2(e)}>

              <TbCategoryPlus className='mr-1' />Categories

              <div className={`z-10 ${dropdownOpen2 ? 'block' : 'hidden'} bg-gray-950 text-white rounded-lg absolute top-full opacity-100 md:opacity-90 w-30`}>
                <ul className="text-sm">
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">Mobiles</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">Monitors</a>
                  </li>
                  <li>
                    <a href="#" className="block px-5 py-2.5 hover:bg-gray-100 hover:text-black">Laptops</a>
                  </li>
                </ul>
              </div>

            </li>

            <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-30 md:justify-center justify-start'>
              <SiGnuprivacyguard className='mr-1' />Login
            </li>

            <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 md:px-0 py-2.5 w-30 md:justify-center justify-start'>
              <IoCartOutline className='mr-1' />Cart
            </li>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Navbar
