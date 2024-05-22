"use server";

import { axiosInstance } from "@/config/axios-config";
import { formOrderSchema } from "@/zod-schema/form-order-schema";
import { Order } from "@prisma/client";
import { z } from "zod";

export const createOrder = async (
  data: z.infer<typeof formOrderSchema> & {
    code: string;
    totalSum: number;
    productId: string[];
  }
) => {
  const response = await axiosInstance.post<Order>("/order/create", data);

  return response.data;
};
