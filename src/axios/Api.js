import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const baseUrl = import.meta.env.VITE_API_URL || "https://backend-ecommers-theta.vercel.app";

const Api = axios.create({
  baseURL: baseUrl,
});


Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      store.dispatch(clearCart());

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
