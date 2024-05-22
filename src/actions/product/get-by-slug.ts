import { ProductWithCreatedAt } from "@/app/(client)/(home)/_components/ui/product-card";
import { axiosInstance } from "@/config/axios-config";
import { productSlugSchema } from "@/zod-schema/product-slug-schema";
import { Product } from "@prisma/client";
import { z } from "zod";

export const getProductsBySlug = async (
  data: z.infer<typeof productSlugSchema>
) => {
  const products = await axiosInstance.get<ProductWithCreatedAt[]>(
    "/products/by-slug",
    { params: data }
  );

  return products.data;
};
