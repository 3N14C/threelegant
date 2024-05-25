import { axiosInstance } from "@/config/axios-config";
import { IProductFields } from "@/types/product-fields-interface";

export const createProduct = async (data: IProductFields) => {
  const response = await axiosInstance.post("products/create", data);

  return response.data;
};
