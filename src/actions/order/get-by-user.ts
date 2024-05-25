import { axiosInstance } from "@/config/axios-config";
import { Order, Prisma } from "@prisma/client";

interface IData {
  userId: string;
}

type TOrder = Prisma.OrderGetPayload<{ include: { products: true } }>;

export const getOrdersByUser = async ({ userId }: IData) => {
  const response = await axiosInstance.get<TOrder[]>(
    `/order/get-by-user?userId=${userId}`
  );

  return response.data;
};
