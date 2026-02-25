import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../axios/Api";

import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      toast.info("You are already logged in");
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setDisable(true);
    try {
      const res = await Api.post("/user/login", data);
      const token = res.data.token;



      const profileRes = await Api.get("/user/profile", {
        headers: { Authorization: token },
      });
      const user = profileRes.data.user;


      dispatch(loginSuccess({
        token: token,
        user: user
      }));

      toast.success(res.data.message || "Welcome back!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
      <title>Login | TechCart</title>
      <meta name="description" content="Access your TechCart account to track orders, manage your wishlist, and check out faster." />

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Tech<span className="text-blue-600">Cart</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Welcome back! Please enter your details.</p>
        </div>


        <div className="bg-white shadow-xl shadow-slate-200/60 rounded-3xl p-8 border border-slate-100">
          <form onSubmit={onSubmitHandler} className="space-y-5">

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800"
                  value={data.email}
                  onChange={onChangeHandler}
                  autoComplete="email"
                  required
                />
              </div>
            </div>


            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-sm font-bold text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800"
                  value={data.password}
                  onChange={onChangeHandler}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>


            <button
              type="submit"
              disabled={disable}
              className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {disable ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>


          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-slate-600 text-sm font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 underline underline-offset-4">
                Create one for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;