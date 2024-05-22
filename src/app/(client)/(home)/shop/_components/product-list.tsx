"use client";

import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC, useEffect } from "react";
import { ProductCard } from "../../_components/ui/product-card";
import { useQuery } from "@tanstack/react-query";
import { getProductsBySlug } from "@/actions/product/get-by-slug";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";

interface IProps {}

export const ProductList: FC<IProps> = ({}) => {
  const [sortBy] = useQueryState("sortBy" as Prisma.SortOrder);
  const [categoryId] = useQueryState("categoryId");
  const [price] = useQueryState("price", parseAsInteger);
  const [take] = useQueryState("take", parseAsInteger);
  const [orientation] = useQueryState("orientation");

  const {
    data: products,
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["product-by-slug"],
    queryFn: async () => {
      const response = await getProductsBySlug({
        categoryId: categoryId || "all-rooms",
        price: price || 0,
        sortBy: sortBy as Prisma.SortOrder,
        take: take || 9,
      });

      return response;
    },
    // notifyOnChangeProps: ["data"],
  });

  useEffect(() => {
    refetch();
  }, [categoryId, price, sortBy, take]);

  if (isLoading || isFetching)
    return (
      <div className="grid lg:grid-cols-3 gap-y-10 items-center gap-x-20">
        {Array.from({ length: 9 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    );

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
