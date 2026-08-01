import axios from "axios";

const api = axios.create({
    baseURL:"https://personal-life-operating-system.onrender.com",
    withCredentials:true
});

export default api;