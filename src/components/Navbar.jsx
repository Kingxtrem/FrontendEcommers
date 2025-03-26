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
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className='bg-slate-950 p-2 text-white font-bold w-full'>
      <div className='flex justify-between items-center'>
        <NavLink to={'/'} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800 px-5 py-2.5" : "cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5"}>
          <div className='flex items-center'>
            <img className='w-10 border-0 rounded-full mr-1 cursor-pointer' src={TechCart} alt="TechCart Logo" />
            <p className='cursor-pointer'>Home</p>
          </div>
        </NavLink>

        <div className={`${menuOpen ? "flex" : "hidden"} flex-col md:flex-row items-center justify-between md:gap-7 mt-2 md:mt-0`}>
          <NavLink to={"/products"} className={({ isActive }) => isActive ? "bg-red-500 rounded-lg cursor-pointer hover:bg-blue-800" : "cursor-pointer hover:bg-blue-800 rounded-lg"}>
            <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5'>
              <LuBoxes className='mr-1' />Products
            </li>
          </NavLink>
          <li className='flex items-center cursor-pointer relative' onClick={toggleDropdown}>
            <button className="text-center inline-flex items-center cursor-pointer  hover:bg-blue-800 rounded-lg px-5 py-2.5">
              <TbBrandSafari className='mr-1' />
              Brands
            </button>
            <div className={`z-10 ${dropdownOpen ? 'block' : 'hidden'} bg-blue-800 text-white rounded-lg shadow-sm w-auto absolute top-full opacity-85`}>
              <ul className=" text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">Apple</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">HP</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">Infinix</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">MOTOROLA</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">OnePlus</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">POCO</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">Realme</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">REDMI</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">SAMSUNG</a>
                </li>
              </ul>
            </div>
          </li>
          <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5'>
            <TbCategoryPlus className='mr-1' />Categories
          </li>
          <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5'>
            <SiGnuprivacyguard className='mr-1' />Login
          </li>
          <li className='flex items-center cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5'>
            <IoCartOutline className='mr-1' />Cart
          </li>
        </div>
        <div className='cursor-pointer hover:bg-blue-800 rounded-lg px-5 py-2.5' onClick={toggleMenu}>
          <GiHamburgerMenu />
        </div>
      </div>

    </div>
  )
}

export default Navbar
