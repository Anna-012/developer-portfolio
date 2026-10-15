import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://developer-portfoliso-q0a0.onrender.com/api",
});

export default api;
