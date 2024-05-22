import { axiosInstance } from "@/config/axios-config";
import { Prisma } from "@prisma/client";

export const getOrderById = async ({ orderId }: { orderId: string }) => {
  const response = await axiosInstance.get<
    Prisma.OrderGetPayload<{ include: { products: true } }>
  >(`/order/get-by-id/${orderId}`);

  return response.data;
};
