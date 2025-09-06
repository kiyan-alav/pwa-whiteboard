// lib/axiosClient.ts
import axios from "axios";
import { toast } from "sonner";

const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
