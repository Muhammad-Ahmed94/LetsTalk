import axios from "axios";

const axiosInst = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInst.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log("Api request", config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInst.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log("API response", response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.status, error.response?.data?.message || error.message);

    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log("Authentication error - redirecting to login");
    }
    return Promise.reject(error);
  }
);
export default axiosInst;
