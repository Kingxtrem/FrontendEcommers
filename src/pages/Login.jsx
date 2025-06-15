import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../axios/Api';
import { Helmet } from 'react-helmet';


const Login = () => {
    const Navigate = useNavigate();
    const [Data, setData] = useState({
        email: '',
        password: '',
    });

    const [disable, setDisable] = useState(false);

    const isLogin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            toast.info("You are already logged in");
            Navigate("/profile");
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
        try {
            setDisable(true);
            let res = await Api.post('/user/login', Data);
            localStorage.setItem('token', res.data.token);
            window.dispatchEvent(new Event("tokenChange"));
            setData({
                email: '',
                password: '',
            });
            toast.success(res.data.message);
            Navigate('/profile');
            setDisable(false)
        } catch (error) {
            console.error('Login failed:', error);
            error.response?.data?.message && toast.error(error.response.data.message);
            setDisable(false);
        }


    };

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <Helmet>
                <title>TechCart Store | Login</title>
                <meta name="description" content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!" />
                <meta name="keywords" content="tech, ecommerce, gadgets, electronics, shop, buy online" />
            </Helmet>
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
                                autoComplete="email"
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
