"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { priceVariants } from "@/lib/price-variants";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Settings2 } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC } from "react";
import { Filters } from "../_components/filters";
import { LoadingMoreButton } from "../_components/loading-more-button";
import { BreadcrumbsImage } from "../_components/ui/breadcrumbs-image";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/actions/categories/get-all-categories";
import { getProductsBySlug } from "@/actions/product/get-by-slug";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const [categoryId, setCategoryId] = useQueryState("categoryId");
  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const response = await getAllCategories();

      return response.data;
    },
  });

  const [take, setTake] = useQueryState("take", parseAsInteger);
  const [sortBy] = useQueryState("sortBy" as Prisma.SortOrder);
  const [price, setPrice] = useQueryState("price", parseAsInteger);
  // const { data: products } = trpc.getProductsBySlug.useQuery({
  //   categoryId: categoryId || "all-rooms",
  //   price: price || 10,
  //   sortBy: sortBy as Prisma.SortOrder,
  //   take: take || 9,
  // });

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
          title="shop page"
          subtitle="Let's design the place you always imagined"
          links={[{ title: "shop" }]}
        />
      </div>

      <div className="lg:max-w-[1440px] lg:mx-auto mt-[60px] overflow-x-hidden">
        <div className="grid grid-cols-6 items-start">
          <div className="pr-10">
            <div className="flex items-center gap-2 col-span-1">
              <Settings2 />
              <p className="font-semibold text-[20px] leading-[160%]">Filter</p>
            </div>

            <div className="mt-[30px] flex flex-col gap-3">
              <p className="font-semibold text-base leading-[162%] uppercase">
                categories
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
                  all rooms
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
                price
              </p>

              <div className="flex flex-col gap-3">
                {priceVariants.map((priceVariant) => (
                  <div
                    key={priceVariant.id}
                    className="flex justify-between items-center"
                  >
                    <p className="text-[--neutral-04] font-semibold text-sm">
                      от{" "}
                      {priceVariant.priceFrom.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
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
                {categoryId?.replace("-", " ")}
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

export default Layout;
