import { axiosInstance } from "@/config/axios-config";
import { Order } from "@prisma/client";

export const getAllOrders = async () => {
  const response = await axiosInstance.get<Order[]>("/order/get-all");

  return response.data;
};
