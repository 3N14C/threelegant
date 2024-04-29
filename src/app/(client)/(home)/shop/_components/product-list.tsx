"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/trpc-client";
import { Prisma } from "@prisma/client";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC, useEffect } from "react";
import { ProductCard } from "../../_components/ui/product-card";

interface IProps {}

export const ProductList: FC<IProps> = ({}) => {
  const [sortBy] = useQueryState("sortBy" as Prisma.SortOrder);
  const [categoryId] = useQueryState("categoryId");
  const [price] = useQueryState("price", parseAsInteger);
  const [take] = useQueryState("take", parseAsInteger);
  const [orientation] = useQueryState("orientation");

  const { data: products, refetch } = trpc.getProductsBySlug.useQuery({
    categoryId: categoryId || "all-rooms",
    price: price || 10,
    sortBy: sortBy! as Prisma.SortOrder,
    take: take || 9,
  });

  useEffect(() => {
    refetch();
  }, [categoryId, price, sortBy, take]);

  return (
    <div className="">
      <div
        className={cn("items-center", {
          "grid grid-cols-3 gap-y-10": orientation === "grid",
          "grid grid-cols-2 gap-x-20 gap-y-10 w-5/6": orientation === "fluent",
          "space-y-10": orientation === "table",
        })}
      >
        {products?.map((product) => (
          <ProductCard
            orientation={orientation || "grid"}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
