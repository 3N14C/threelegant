import { axiosInstance } from "@/config/axios-config";
import { TProduct } from "@/types/product.interface";
import { Product } from "@prisma/client";

export const getProductById = async ({
  id,
  take,
}: {
  id: string;
  take?: number;
}) => {
  if (take) {
    const product = await axiosInstance.get<TProduct>(
      `/products/${id}?take=${take}`
    );
    return product.data;
  }

  const product = await axiosInstance.get<Product>(`/products/${id}`);
  return product.data;
};
