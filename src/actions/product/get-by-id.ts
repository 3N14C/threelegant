import { axiosInstance } from "@/config/axios-config";
import { TProduct } from "@/types/product.interface";
import { Product } from "@prisma/client";

export const getProductById = async ({
  id,
  take,
}: {
  id: string;
  take: number;
}) => {
  const product = await axiosInstance.get<TProduct>(
    `/products/${id}?take=${take}`
  );

  return product.data;
};
