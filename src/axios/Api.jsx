import axios from 'axios';

const baseUrl = "https://ecom-api-zdk9.onrender.com/api/v1"
const Api = axios.create({
    baseURL: baseUrl
});
export default Api;
