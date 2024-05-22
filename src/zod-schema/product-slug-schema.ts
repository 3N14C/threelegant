import { z } from "zod";

export const productSlugSchema = z.object({
  categoryId: z.string().default("all-rooms"),
  sortBy: z.enum(["asc", "desc"]).default("asc"),
  price: z.number().default(0),
  take: z.number().default(9),
});
