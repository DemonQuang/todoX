import axios from "axios";

// const BASE_URL =
//     import.meta.env.MODE === "development"
//         ? "http://localhost:3007/api"
//         : "https://qtodox.onrender.com/api";

const api = axios.create({
    baseURL: "https://qtodox.onrender.com/api"
});

export default api;