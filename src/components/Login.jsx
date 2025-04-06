import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [Data, setData] = useState({
        email: "",
        password: ""
    })
    const onchangeHandler = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }
    const onsubmitHandler = async (e) => {
        e.preventDefault()
        console.log(Data)
        // try {
        //     const res = await fetch("http://localhost:5000/user/login", {
        //         method: "POST", headers: {
        //             "content-type": "application/json"
        //         }
        //         , body: JSON.stringify(Data)
        //     })
        //     console.log(res)
        // }
        // catch (err) {
        //     console.log(err)
        // }

        setData({
            email: "",
            password: ""
        })
    }
    return (
        <div className='bg-slate-700 text-white min-h-screen flex conainer'>
            <div className='w-fit h-fit flex flex-col justify-items-center bg-white text-black mx-auto m-5 border-0 rounded-2xl items-center p-3'>
                <div className='text-3xl text-green-700 font-bold underline'>Login Here</div>
                <form action="" onSubmit={onsubmitHandler}>
                    <div className='container p-3 flex flex-col items-center gap-4'>
                        <label htmlFor="email" className="w-70">Email: <input type="email" placeholder='Enter your email here' className='w-70 border-2 rounded-lg p-2' name='email' value={Data.email} onChange={onchangeHandler} autoComplete="current-email" /></label>
                        <label htmlFor="password" className="w-70">Password: <input type="password" placeholder='Enter your password here' className='w-70 border-2 rounded-lg p-2' name='password' value={Data.password} onChange={onchangeHandler} autoComplete="current-password" /></label>
                        <input type="submit" className='border-2 bg-blue-700 rounded-3xl hover:bg-blue-900 active:bg-red-800 text-2xl w-fit box-border text-white border-black px-5 py-2.5 cursor-pointer' value="Login" />
                    </div>
                </form>
                <div>
                    New Here
                    <Link to={"/register"} className='text-blue-700 ml-1'>Register Now </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
