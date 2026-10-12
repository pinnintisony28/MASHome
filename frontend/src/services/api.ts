import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-production-31fe.up.railway.app",
  // baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
