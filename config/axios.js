import axios from "axios";
import API from "./api";

const axiosInstance = axios.create({
    baseURL: API.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;