import React from 'react'
import TechCart from "../assets/logos/TechCart.jpg"
import { TbBrandSafari } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoCartOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { LuBoxes } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row bg-slate-950 p-2 items-center text-white font-bold w-full justify-between md:gap-25'>
      <Link to={'/'}>
        <div className='flex justify-center items-center'>
          <img className='w-10 border-0 rounded-full mr-1 cursor-pointer' src={TechCart} alt="TechCart Logo" onClick={() => { }} />
          <p className='flex items-center cursor-pointer'>Home</p>
        </div>
      </Link>
      {/* <div className='relative w-full md:w-auto'>
        <input className='bg-white opacity-90 rounded-xl w-full text-black pl-3 pr-10 py-2 text-sm' type="text" placeholder='Search for Products' />
        <div className='bg-gray-600 absolute right-0 top-0 h-full text-white flex justify-center items-center border-none box-border pr-3 pl-3 rounded-r-xl hover:bg-blue-400 active:bg-blue-600 cursor-pointer' onClick={() => { }}>
          <GoSearch />
        </div>
      </div> */}
      <div className='w-full md:w-auto'>
        <ul className='flex flex-col md:flex-row list-none md:gap-7 items-center'>
          <Link to={"/Products"}> <li className='flex items-center cursor-pointer'><LuBoxes className='mr-1' />Products</li></Link>
          <li className='flex items-center cursor-pointer'><TbBrandSafari className='mr-1' />Brands</li>
          <li className='flex items-center cursor-pointer'><TbCategoryPlus className='mr-1' />Categories</li>
          <li className='flex items-center cursor-pointer'><SiGnuprivacyguard className='mr-1' />Login</li>
          <li className='flex items-center cursor-pointer'><IoCartOutline className='mr-1' />Cart</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
