import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from "../axios/Api"
import { Helmet } from 'react-helmet';

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
            setData({ username: '', email: '', password: '' });
            setProfilePic(null);
            setErrors({});
            setDisable(false);
            Navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            error.response?.data?.message && toast.error(error.response.data.message);
            setErrors({});
            setDisable(false);
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
             <Helmet>
        <title>TechCart Store | Register</title>
        <meta name="description" content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!" />
        <meta name="keywords" content="tech, ecommerce, gadgets, electronics, shop, buy online" />
      </Helmet>
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
                                autoComplete="username"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.username}
                                onChange={onchangeHandler}
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
                                autoComplete="email"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.email}
                                onChange={onchangeHandler}
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
                                aria-label="Profile picture"
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
                            aria-busy={disable}
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


