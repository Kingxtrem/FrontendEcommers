import axios from 'axios';

const baseUrl = "https://ecom-api-zdk9.onrender.com/api/v1"
const Api = axios.create({  
    baseURL: baseUrl
});
export default Api;


// import React, { useEffect } from 'react'
// import axios from 'axios';
// const Api = () => {
//     const options = {
//         method: 'GET',
//         url: baseUrl,
//         params: { page: '1', limit: '10' },
//         headers: { accept: 'application/json' }
//     };
//     const Get = async () => {
//         try {
//             const { data } = await axios.request(options);
//             console.log(data);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     useEffect(() => {
//         Get();
//     }, [])

//     return (
//         <div>

//         </div>
//     )
// }

// export default Api
