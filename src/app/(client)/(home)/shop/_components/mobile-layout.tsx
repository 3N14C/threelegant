"use client";

import { getAllCategories } from "@/actions/categories/get-all-categories";
import { getProductsBySlug } from "@/actions/product/get-by-slug";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { priceVariants } from "@/lib/price-variants";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useQueryState, parseAsInteger } from "nuqs";
import { FC } from "react";
import { Filters } from "../../_components/filters";

interface IProps {
  children: React.ReactNode;
}

export const MobileLayout: FC<IProps> = ({ children }) => {
  const [categoryId, setCategoryId] = useQueryState("categoryId");
  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategories,
  });

  const [take, setTake] = useQueryState("take", parseAsInteger);
  const [sortBy] = useQueryState("sortBy" as Prisma.SortOrder);
  const [price, setPrice] = useQueryState("price", parseAsInteger);

  const { data: products } = useQuery({
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
  });

  return (
    <div className="">
      <div className="">
        <p className="font-semibold text-base leading-[162%] uppercase">
          Категории
        </p>

        <Accordion type="multiple" className="flex flex-col gap-5">
          <AccordionItem value="all-categories">
            <AccordionTrigger>
              {categories?.find((category) => category.id === categoryId)
                ?.name ?? "Все комнаты"}
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4">
              <p
                onClick={() => setCategoryId("all-rooms")}
                className="capitalize font-semibold text-sm leading-[157%] text-primary"
              >
                Все комнаты
              </p>
              {categories?.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setCategoryId(category.id)}
                  className=""
                >
                  <p className="capitalize font-semibold text-sm leading-[157%] text-primary">
                    {category.name}
                  </p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Цена</AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4">
              {priceVariants.map((priceVariant) => (
                <div
                  key={priceVariant.id}
                  className="flex justify-between items-center"
                >
                  <p className="text-[--neutral-04] font-semibold text-sm">
                    от{" "}
                    {priceVariant.priceFrom.toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <Checkbox
                    onClick={() => setPrice(priceVariant.priceFrom)}
                    checked={priceVariant.priceFrom === price}
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <Filters />
          </div>
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </div>
  );
};
