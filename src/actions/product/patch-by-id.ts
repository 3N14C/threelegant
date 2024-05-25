import { IDataForm } from "@/app/(client)/(home)/profile/[userId]/admin-panel/product/update-product/[productId]/_components/update-product-page";
import { axiosInstance } from "@/config/axios-config";

export const updateProductById = async (
  data: IDataForm & { productId: string }
) => {
  const response = await axiosInstance.patch(
    `/products/update/by-id?productId=${data.productId}`,
    data
  );

  return response.data;
};
