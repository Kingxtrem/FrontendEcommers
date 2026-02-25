import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../axios/Api";

import Loader from "../components/Loader";
import { FiLogOut, FiSettings, FiShield, FiMail, FiUser } from "react-icons/fi";

import { useDispatch } from "react-redux";
import { setUser, logout } from "../redux/slices/authSlice";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  }, [dispatch, navigate]);

  const getProfileDetails = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await Api.get("/user/profile", {
        headers: { Authorization: token },
      });
      setProfile(response.data.user);
      dispatch(setUser(response.data.user));
    } catch {
      handleLogout();
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate, handleLogout]);

  useEffect(() => {
    getProfileDetails();
  }, [getProfileDetails]);

  if (loading) return <Loader />;

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 flex items-center justify-center">
        <title>Account Profile | TechCart</title>

      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col md:flex-row">


        <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex flex-col items-center justify-center text-white">
          <div className="relative group">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src={profile.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {profile.isAdmin && (
              <div className="absolute bottom-2 right-2 bg-amber-400 text-slate-900 p-2 rounded-full shadow-lg border-2 border-white" title="Admin Account">
                <FiShield size={20} />
              </div>
            )}
          </div>
          <h2 className="mt-6 text-2xl font-black tracking-tight">{profile.name?.split(' ')[0]}'s Space</h2>
          <p className="opacity-80 text-sm font-medium">Member since {profile.createdAt ? new Date(profile.createdAt).getFullYear() : new Date().getFullYear()}</p>
        </div>


        <div className="md:w-2/3 p-8 md:p-12">
          <div className="flex justify-between items-start mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account <span className="text-blue-600">Details</span></h1>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <FiSettings size={24} />
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                <p className="text-lg font-bold text-slate-800">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FiMail size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                <p className="text-lg font-bold text-slate-800">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 pt-8 border-t border-slate-100">
            {profile.isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                <FiShield /> Admin Dashboard
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-4 bg-white text-red-600 border-2 border-red-50 font-bold rounded-2xl hover:bg-red-50 transition-all active:scale-95"
            >
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;