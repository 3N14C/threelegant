import { Prisma } from "@prisma/client";

export type TProduct = Prisma.ProductGetPayload<{
  include: {
    category: true;
    reviews: true;
  };
}>;
