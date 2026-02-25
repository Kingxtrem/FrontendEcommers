import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../axios/Api";

import { FiUser, FiMail, FiLock, FiCamera, FiEye, FiEyeOff } from "react-icons/fi";


const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false);


  useEffect(() => {
    if (!profilePic) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(profilePic);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePic]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.username.trim()) newErrors.username = "Username is required.";
    if (!data.email.trim()) newErrors.email = "Email is required.";
    if (!data.password) newErrors.password = "Password is required.";
    else if (data.password.length < 8) newErrors.password = "Minimum 8 characters required.";
    if (!profilePic) newErrors.profilePic = "Please upload a profile picture.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profilePic", profilePic);

    try {
      setDisable(true);
      const res = await Api.post("/user/register", formData);
      toast.success(res.data.message || "Registration Successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setDisable(false);
    }
  };

  const inputClass = (name) => `
    w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl outline-none transition-all duration-200
    ${errors[name] ? "border-red-400 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
  `;

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4 py-12">
      <title>Join TechCart | Register</title>
      <meta name="description" content="Create a new TechCart account to join the community of tech enthusiasts and enjoy exclusive offers." />

      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Create <span className="text-blue-600">Account</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Join the community of tech enthusiasts.</p>
        </div>

        <div className="bg-white shadow-xl shadow-slate-200/60 rounded-[2.5rem] p-8 md:p-10 border border-slate-100">
          <form onSubmit={onSubmitHandler} className="space-y-5">


            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FiCamera className="text-slate-400 text-2xl" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  title="Upload profile picture"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Upload Photo</p>
              {errors.profilePic && <p className="text-red-500 text-xs mt-1 font-bold">{errors.profilePic}</p>}
            </div>


            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">User Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="tech_wizard"
                  className={inputClass("username")}
                  value={data.username}
                  onChange={onChangeHandler}
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1 ml-1">{errors.username}</p>}
            </div>


            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={inputClass("email")}
                  value={data.email}
                  onChange={onChangeHandler}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>


            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  className={inputClass("password")}
                  value={data.password}
                  onChange={onChangeHandler}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={disable}
              className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-70 mt-4"
            >
              {disable ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;