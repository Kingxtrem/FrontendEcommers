import React, { useState } from 'react'
import TechCart from "../assets/logos/TechCart.jpg"
import { TbBrandSafari } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoCartOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDropdown = (e) => {
    e.stopPropagation() // Prevent parent onClick from being triggered
    setDropdownOpen(!dropdownOpen)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className='bg-slate-950 p-2 text-white font-bold w-full' onClick={() => { setDropdownOpen(false) }}>
      <div className='flex justify-between items-start md:items-center'>
        <NavLink to={'/'} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800  py-2.5" : "cursor-pointer hover:bg-blue-800 rounded-lg  py-2.5"}>
          <div className='flex items-center'>
            <img className='w-10 border-0 rounded-full mr-1 cursor-pointer' src={TechCart} alt="TechCart Logo" />
            <p className='cursor-pointer'>Home</p>
          </div>
        </NavLink>
        <div className='flex flex-col md:flex-row justify-end items-end'>
          <div className='md:hidden cursor-pointer hover:bg-blue-800 rounded-lg  py-2.5 text-3xl' onClick={toggleMenu}>
            <GiHamburgerMenu />
          </div>
          <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-end md:items-center justify-evenly md:justify-end md:mt-0 absolute top-15 right-0 rounded-lg md:static md:top-0 md:right-0 bg-slate-950 p-2 md:p-0 h-auto w-fit md:w-auto md:h-fit opacity-80 md:opacity-100 md:gap-1`}>
            <NavLink to={"/products"} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 rounded-lg"}>
              <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg  py-2.5 w-35 md:justify-center justify-start'>
                <LuBoxes className='mr-1' />Products
              </li>
            </NavLink>
            <li className='flex items-center cursor-pointer relative' onClick={(e) => toggleDropdown(e)}>
              <button className="text-center inline-flex items-center cursor-pointer hover:bg-blue-800 rounded-lg  py-2.5 w-35 md:justify-center justify-start">
                <TbBrandSafari className='mr-1' />
                Brands
              </button>
              <div className={`z-10 ${dropdownOpen ? 'block' : 'hidden'} bg-gray-950 text-white rounded-lg absolute top-full opacity-100 md:opacity-90 w-35`}>
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
            <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg  py-2.5 w-35 md:justify-center justify-start'>
              <TbCategoryPlus className='mr-1' />Categories
            </li>
            <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg  py-2.5 w-35 md:justify-center justify-start'>
              <SiGnuprivacyguard className='mr-1' />Login
            </li>
            <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg  py-2.5 w-35 md:justify-center justify-start'>
              <IoCartOutline className='mr-1' />Cart
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
