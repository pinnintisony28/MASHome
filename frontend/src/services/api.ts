import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-production-31fe.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
