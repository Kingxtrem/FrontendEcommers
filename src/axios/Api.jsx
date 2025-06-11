import axios from 'axios';

const baseUrl = "https://backend-63h6.onrender.com"
// const baseUrl = "http://localhost:5000"
const Api = axios.create({
    baseURL: baseUrl
});
export default Api;
