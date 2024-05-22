"use server";

import { axiosInstance } from "@/config/axios-config";
import { reviewSchema } from "@/zod-schema/review-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createReview = async (data: z.infer<typeof reviewSchema>) => {
  const response = await axiosInstance.post("/reviews/create", data);
  return response.data;
};
