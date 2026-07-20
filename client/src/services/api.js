import axios from "axios";

const api = axios.create({
  baseURL: "https://orbitcrm-yvex.onrender.com/api",
  withCredentials: true,
});

export default api;