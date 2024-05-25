"use client";

import { getAllCategories } from "@/actions/categories/get-all-categories";
import { getProductsBySlug } from "@/actions/product/get-by-slug";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useQueryState, parseAsInteger } from "nuqs";
import { FC } from "react";
import { BreadcrumbsImage } from "../../_components/ui/breadcrumbs-image";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { priceVariants } from "@/lib/price-variants";
import { Checkbox } from "@/components/ui/checkbox";
import { Filters } from "../../_components/filters";
import { LoadingMoreButton } from "../../_components/loading-more-button";

interface IProps {
  children: React.ReactNode;
}

export const DesktopLayout: FC<IProps> = ({ children }) => {
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
      <div className="lg:max-w-[1440px] lg:mx-auto">
        <BreadcrumbsImage
          src="/shop-page.jpg"
          title="Каталог"
          subtitle="Спроектируем место, которое вы всегда себе представляли"
          links={[{ title: "Каталог" }]}
        />
      </div>

      <div className="lg:max-w-[1440px] lg:mx-auto mt-[60px] overflow-x-hidden">
        <div className="grid grid-cols-6 items-start">
          <div className="pr-10">
            <div className="flex items-center gap-2 col-span-1">
              <Settings2 />
              <p className="font-semibold text-[20px] leading-[160%]">
                Фильтры
              </p>
            </div>

            <div className="mt-[30px] flex flex-col gap-3">
              <p className="font-semibold text-base leading-[162%] uppercase">
                Категории
              </p>

              <div className="w-fit">
                <p
                  onClick={() => setCategoryId("all-rooms")}
                  className={cn(
                    "capitalize font-semibold text-sm leading-[157%] text-[--neutral-04] cursor-pointer transition-all duration-700",
                    {
                      "text-[--neutral-07]": categoryId?.includes("all-rooms"),
                    }
                  )}
                >
                  все комнаты
                </p>
                <div
                  className={cn(
                    "border-b border-[--neutral-07] opacity-0 transition-all duration-700",
                    {
                      "opacity-100": categoryId?.includes("all-rooms"),
                    }
                  )}
                />
              </div>

              {categories?.map((category) => (
                <div key={category.id} className="w-fit">
                  <p
                    onClick={() => setCategoryId(category.id)}
                    className={cn(
                      "capitalize font-semibold text-sm leading-[157%] text-[--neutral-04] cursor-pointer transition-all duration-700",
                      {
                        "text-[--neutral-07]": categoryId?.includes(
                          category.id
                        ),
                      }
                    )}
                  >
                    {category.name}
                  </p>
                  <div
                    className={cn(
                      "border-b border-[--neutral-07] opacity-0 transition-all duration-700",
                      { "opacity-100": categoryId?.includes(category.id) }
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="mt-[30px] flex flex-col gap-3">
              <p className="uppercase font-semibold text-base leading-[162%]">
                цена
              </p>

              <div className="flex flex-col gap-3">
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
              </div>
            </div>
          </div>

          <div className="col-span-5 w-full">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[20px] leading-[160%] capitalize">
                {
                  categories?.find((category) => category.id === categoryId)
                    ?.name
                }
              </p>

              <Filters />
            </div>
            <div className="mt-10">{children}</div>
          </div>
        </div>

        {products && take && products?.length > take && (
          <div className="mt-[80px] flex justify-center">
            <LoadingMoreButton onClick={() => setTake(take! + 9)} />
          </div>
        )}
      </div>
    </div>
  );
};
