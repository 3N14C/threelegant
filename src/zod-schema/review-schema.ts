import { z } from "zod";

export const reviewSchema = z.object({
  userId: z.string().optional().nullable(),
  comment: z.string().min(1, "Отзыв не может быть пустым"),
  rating: z.number().optional().nullable(),
  productId: z.string().optional().nullable(),
});
