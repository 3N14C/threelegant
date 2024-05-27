import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://threelegant.vercel.app/api/api"
      : "http://localhost:3400/api",
});
