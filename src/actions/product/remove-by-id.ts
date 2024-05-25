import { axiosInstance } from "@/config/axios-config";
import { Product } from "@prisma/client";

export const removeProductById = async ({
  productId,
}: {
  productId: string;
}) => {
  const response = await axiosInstance.delete<Product>(
    `products/remove/by-id?productId=${productId}`
  );

  return response.data;
};
