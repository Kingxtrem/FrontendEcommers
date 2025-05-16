import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const Navigate = useNavigate();
    const [Data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [profilePic, setProfilePic] = useState(null);
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(false);

    const onchangeHandler = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const onFileChangeHandler = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!Data.username) newErrors.username = 'Username is required.';
        if (!Data.email) newErrors.email = 'Email is required.';
        if (!Data.password) newErrors.password = 'Password is required.';
        if (Data.password.length < 8) newErrors.password = 'Password is minimum 8 characters.';
        if (!profilePic) newErrors.profilePic = 'Profile picture is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const formData = new FormData();
        formData.append('name', Data.username);
        formData.append('email', Data.email);
        formData.append('password', Data.password);
        formData.append('profilePic', profilePic);

        try {
            setDisable(true);
            const res = await Api.post('/user/register', formData);
            res.data.message && toast.success(res.data.message);
            toast.info("Redirecting to login page");
            setData({ username: '', email: '', password: '' });
            setProfilePic(null);
            setErrors({});
            setTimeout(() => {
            setDisable(false);
            Navigate('/login');
            }
            , 2000);
        } catch (error) {
            console.error('Registration failed:', error);
            error.response?.data?.message && toast.error(error.response.data.message);
            setErrors({});
            setDisable(false);
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
            <div className="sm:w-full w-80  max-w-md bg-white shadow-lg shadow-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Register Here</h2>
                <form onSubmit={onsubmitHandler}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium">
                                User Name
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.username}
                                onChange={onchangeHandler}
                                autoComplete="current-username"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.email}
                                onChange={onchangeHandler}
                                autoComplete="current-email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="profilePic" className="block text-sm font-medium">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                id="profilePic"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={onFileChangeHandler}
                            />
                            {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic}</p>}
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
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.password}
                                onChange={onchangeHandler}
                                autoComplete="current-password"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={disable}
                            className={disable ? "w-full bg-black text-white rounded-lg py-2 hover:bg-black transition duration-200" : "w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition duration-200 cursor-pointer"}
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Already Registered?{' '}
                        <Link to="/login" className="text-green-600 hover:underline">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;



// import axios from 'axios'
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// const Register = () => {
//     const [Data, setData] = useState({
//         username: "",
//         email: "",
//         password: "",
//     })
//     const [profilePic, setProfilePic] = useState(null)
//     const onchangeHandler = (e) => {
//         setData({ ...Data, [e.target.name]: e.target.value })
//     }
//     const onFileChangeHandler = (e) => {
//         setProfilePic(e.target.files[0]);
//     };
//     const onsubmitHandler = async (e) => {
//         e.preventDefault();

//         if (!Data.username || !Data.email || !Data.password || !profilePic) {
//             alert("All fields are required!");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("name", Data.username);
//         formData.append("email", Data.email);
//         formData.append("password", Data.password);
//         formData.append("profilePic", profilePic);

//         try {
//             const res = await axios.post("http://localhost:5000/user/register", formData);
//             console.log(res);
//             alert("Registration successful!");
//             setData({ username: "", email: "", password: "" });
//             setProfilePic(null);
//         } catch (error) {
//             console.error("Registration failed:", error);
//             alert("Registration failed. Please try again.");
//         }
//     };

//     return (
//         <div className='bg-slate-700 text-white min-h-screen flex conainer'>
//             <div className='w-fit h-fit flex flex-col justify-items-center bg-white text-black mx-auto m-5 border-0 rounded-2xl items-center p-3'>
//                 <div className='text-3xl text-green-700 font-bold underline'>Register Here</div>
//                 <form action="" onSubmit={onsubmitHandler}>
//                     <div className='container p-3 flex flex-col items-center gap-4'>
//                         <label htmlFor="username" className="w-70">User Name: <input type="text" placeholder='Enter your user name here' className='w-70 border-2 rounded-lg p-2' name='username' value={Data.username} onChange={onchangeHandler} autoComplete='current-username' /></label>
//                         <label htmlFor="email" className="w-70">Email: <input type="email" placeholder='Enter your email here' className='w-70 border-2 rounded-lg p-2' name='email' value={Data.email} onChange={onchangeHandler} autoComplete="current-email" /></label>
//                         <label htmlFor="profilePic" className="w-70">Profile Pic:<input type="file" className="w-70 border-2 rounded-lg p-2" onChange={onFileChangeHandler} /></label>
//                         <label htmlFor="password" className="w-70">Password: <input type="password" placeholder='Enter your password here' className='w-70 border-2 rounded-lg p-2' name='password' value={Data.password} onChange={onchangeHandler} autoComplete="current-password" /></label>
//                         <input type="submit" className='border-2 bg-blue-700 rounded-3xl hover:bg-blue-900 active:bg-red-800 text-2xl w-fit box-border text-white border-black px-5 py-2.5 cursor-pointer' value="Register" />
//                     </div>
//                 </form>
//                 <div>
//                     Already Registered
//                     <Link to={"/login"} className='text-blue-700 ml-1'>Login Now </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Register
