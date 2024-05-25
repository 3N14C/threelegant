import { axiosInstance } from "@/config/axios-config";
import { Product } from "@prisma/client";

export const getAllProducts = async () => {
  const response = await axiosInstance.get<Product[]>("products/get-all");

  return response.data;
};
