import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  const GetProfileDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://backend-63h6.onrender.com/user/profile", {
        headers: {
          'Authorization': token,
        },
      });
      setProfile(response.data.User);
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
      alert("Failed to load profile details. Please try again.");
    }
    setLoading(false);
  };

  const handelLogout = () => {
    localStorage.removeItem('token');
    Navigate("/login");
  };

  useEffect(() => {
    GetProfileDetails();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
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
              {profile.username}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;



// import React, { useEffect, useState } from 'react'
// import { AiOutlineLoading } from "react-icons/ai";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [profile, setProfile] = useState({})
//   const [loading, setLoading] = useState(true)
//   const Navigate = useNavigate()

//   const GetProfileDetails = async () => {
//     setLoading(true)
//     try {
//       const token = localStorage.getItem('token')
//       if (!token) {
//         alert("You are not logged in login first")
//         Navigate("/login")
//         return
//       }
//       const response = await axios.get("http://localhost:5000/user/profile", {
//         headers: {
//           'Authorization': token
//         }
//       })
//       setProfile(response.data.User)
//     } catch (error) {
//       console.error("Failed to fetch profile details:", error);
//       alert("Failed to load profile details. Please try again.");
//     }
//     setLoading(false)
//   }

//   const handelLogout = () => {
//     localStorage.removeItem('token')
//     Navigate("/login")
//   }

//   useEffect(() => {
//     GetProfileDetails()
//   }, [])

//   return (
//     <div className='bg-slate-700 text-white min-h-screen w-full mx-auto p-5 ' >
//       <div className={loading ? 'w-full flex justify-center items-center' : "hidden"}>
//         <div className='w-fit flex justify-center rounded-xl p-5 bg-blue-700 text-yellow-400 text-2xl font-extrabold text-nowrap'>
//           <AiOutlineLoading className='animate-spin mr-5' />Loading Please Wait
//         </div>
//       </div>
//       <div className='container w-full p-3 border-2 border-gray-500 rounded-2xl bg-white mx-auto shadow-lg shadow-gray-200 flex flex-col md:flex-row'>
//         <div className='w-auto md:w-xl my-auto mx-auto p-5'>
//           <img src={profile.profilePic} alt='profilePicture' className='w-auto h-auto object-cover mx-auto my-auto' />
//         </div>
//         <div className='text-black text-l mx-auto container p-5 flex flex-col flex-wrap box-border justify-items-start items-start '>
//           <div className='m-2 '><span className='text-blue-700 font-bold'>Name: <br /></span> {profile.username}</div>
//           <div className='m-2 '><span className='text-blue-700 font-bold'>Email: <br /></span> {profile.email}</div>
//           <button onClick={handelLogout} className='cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xs md:text-xl flex justify-center items-center mx-auto  hover:bg-blue-800 active:bg-blue-950 transition duration-300'>Log Out</button>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default Profile
