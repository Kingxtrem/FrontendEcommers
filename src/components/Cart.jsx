import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
const Cart = () => {
    const Navigate = useNavigate()
    const islogin = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            alert("You are not logged in")
            Navigate("/login")
            return
        }
    }
    useEffect(() => {
        islogin()
    }, [])
    return (
        <div className='bg-slate-700 min-h-screen w-full mx-auto p-5 ' >
            <div className='container w-full  p-3 border-2 border-gray-500 rounded-2xl bg-white mx-auto shadow-lg shadow-gray-200 flex flex-col'>
                <MdOutlineRemoveShoppingCart className='text-9xl text-red-500 mx-auto' />
                <p className='text-3xl text-red-500 mx-auto'>No Items found. The Cart is Empty.... </p>
                <button onClick={() => Navigate("/products")} className='cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xl flex justify-center items-center mx-auto m-5  hover:bg-blue-800 active:bg-blue-950 transition duration-300'>Start Shopping</button>
            </div>
        </div >
    )
}

export default Cart
