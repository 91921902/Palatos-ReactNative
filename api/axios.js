import axios from "axios";

const api = axios.create({
    baseURL: "http://45.224.129.126:8085"
})

export default api