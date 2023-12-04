import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.15.50:8085/"
})

export default api;