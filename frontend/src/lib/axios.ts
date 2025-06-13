import axios from "axios";

const axiosInst = axios.create({
    baseURL: import.meta.env.DEV ? "http://localhost:5000/api" : "/api",
    withCredentials: true,
    timeout: 10000,
})

export default axiosInst;
