import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IsAuth from '../security/IsAuth';

const Login = () => {
    const Navigate = useNavigate();
    const [Data, setData] = useState({
        email: '',
        password: '',
    });

    const [disable, setDisable] = useState(false)

    const isLogin = () => {
        if (IsAuth) {
            alert('You are already logged in');
            Navigate('/profile');
            return;
        }
    };

    useEffect(() => {
        isLogin();
    }, []);

    const onchangeHandler = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        console.log(Data);
        try {
            setDisable(true)
            let res = await axios.post('https://backend-63h6.onrender.com/user/login', Data);
            localStorage.setItem('token', res.data.token);
            alert('Login successful!');
            Navigate('/profile');
            setDisable(false)
        } catch (error) {
            console.error('Login failed:', error);
            const errorMessage = error.response?.data?.message
            alert(errorMessage);
            setDisable(false)
        }

        setData({
            email: '',
            password: '',
        });
    };

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className="sm:w-full w-80 max-w-md bg-white shadow-lg shadow-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login Here</h2>
                <form onSubmit={onsubmitHandler}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={Data.email}
                                onChange={onchangeHandler}
                                autoComplete="current-email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={Data.password}
                                onChange={onchangeHandler}
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={disable}
                            className={disable ? "w-full bg-black text-white rounded-lg py-2 hover:bg-black transition duration-200" : "w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-200 cursor-pointer"}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        New Here?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;


// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate()
//     const [Data, setData] = useState({
//         email: "",
//         password: ""
//     })
//     const isLogin = () => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             alert("You are already logged in")
//             navigate("/profile")
//             return
//         }
//     }
//     useEffect(()=>{
//         isLogin()
//     }, [])
//     const onchangeHandler = (e) => {
//         setData({ ...Data, [e.target.name]: e.target.value })
//     }
//     const onsubmitHandler = async (e) => {
//         e.preventDefault()
//         console.log(Data)
//         try {
//             let res = await axios.post("http://localhost:5000/user/login", Data);
//             localStorage.setItem("token", res.data.token);
//             alert("Login successful!");
//             navigate("/profile")
//         } catch (error) {
//             console.error("Login failed:", error);
//             alert("Invalid credentials. Please try again.");
//         }

//         setData({
//             email: "",
//             password: ""
//         })
//     }
//     return (
//         <div className='bg-slate-700 text-white min-h-screen flex '>
//             <div className='w-fit h-fit flex flex-col justify-items-center bg-white text-black mx-auto m-5 border-0 rounded-2xl items-center p-3'>
//                 <div className='text-3xl text-green-700 font-bold underline'>Login Here</div>
//                 <form action="" onSubmit={onsubmitHandler}>
//                     <div className='container p-3 flex flex-col items-center gap-4'>
//                         <label htmlFor="email" className="w-70">Email: <input type="email" placeholder='Enter your email here' className='w-70 border-2 rounded-lg p-2' name='email' value={Data.email} onChange={onchangeHandler} autoComplete="current-email" /></label>
//                         <label htmlFor="password" className="w-70">Password: <input type="password" placeholder='Enter your password here' className='w-70 border-2 rounded-lg p-2' name='password' value={Data.password} onChange={onchangeHandler} autoComplete="current-password" /></label>
//                         <input type="submit" className='border-2 bg-blue-700 rounded-3xl hover:bg-blue-900 active:bg-red-800 text-2xl w-fit box-border text-white border-black px-5 py-2.5 cursor-pointer' value="Login" />
//                     </div>
//                 </form>
//                 <div>
//                     New Here
//                     <Link to={"/register"} className='text-blue-700 ml-1'>Register Now </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login
