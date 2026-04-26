import axios from "axios";

const BASE_URL =
    import.meta.env.MODE === "/api";

const api = axios.create({
    baseURL: "/api"
});

export default api;