import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://threelegant.vercel.app/api",
});
