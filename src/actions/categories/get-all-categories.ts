import { axiosInstance } from "@/config/axios-config";
import { Category } from "@prisma/client";

export const getAllCategories = async () => {
  const categories = await axiosInstance.get<Category[]>("/category/get-all");

  return categories.data;
};
