import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Api from '../axios/Api';
import { Helmet } from 'react-helmet';



const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const GetProfileDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You are not logged in Login first')
        navigate('/login')
        return
      }
      const response = await Api.get("/user/profile", {
        headers: {
          'Authorization': token,
        },
      });
      setProfile(response.data.user);
      localStorage.setItem('cartValue', response.data.user.cart.length);
      window.dispatchEvent(new Event("cartChange"));
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
      error.response?.data?.message && toast.error(error.response.data.message);
      handelLogout();
    }
    setLoading(false);
  };

  const handelLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event("tokenChange"));
    localStorage.removeItem('cartValue');
    window.dispatchEvent(new Event("cartChange"));
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const AdminPage = () => {
    navigate("/admin");
  }

  useEffect(() => {
    GetProfileDetails();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
       <Helmet>
        <title>TechCart Store | Profile</title>
        <meta name="description" content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!" />
        <meta name="keywords" content="tech, ecommerce, gadgets, electronics, shop, buy online" />
      </Helmet>
      {loading ? <Loader /> : (
        <div className="w-auto max-w-4xl bg-white shadow-lg shadow-black rounded-lg p-6 flex flex-col md:flex-row items-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-gray-800 text-lg md:ml-8 mt-6 md:mt-0 flex flex-col items-center md:items-start">
            <div className="mb-4">
              <span className="text-blue-700 font-bold">Name:</span>
              <br />
              {profile.name}
            </div>
            <div className="mb-4">
              <span className="text-blue-700 font-bold">Email:</span>
              <br />
              {profile.email}
            </div>
            <button
              onClick={handelLogout}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-300 cursor-pointer"
            >
              Log Out
            </button>

            <button
              onClick={AdminPage}

              className={profile.isAdmin ? "mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-300 cursor-pointer" : "hidden"}
            >
              View Admin Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

