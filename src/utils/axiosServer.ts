// lib/axiosServer.ts
import axios from "axios";

const axiosServer = axios.create({
  baseURL: process.env.API_URL, 
  headers: { "Content-Type": "application/json" },
});

export default axiosServer;
