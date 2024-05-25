"use client";

import { getProductById } from "@/actions/product/get-by-id";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/wishlist-button";
import { shopParams } from "@/constants/shop-params";
import { productNavigation } from "@/lib/product-navigation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";
import { ProductPrice } from "../../../_components/ui/product-price";
import { RatingStars } from "../../../_components/ui/rating-stars";
import { determineReview } from "@/functions/determine-review";
import { useCart } from "@/store/cart-store";
import { toast } from "sonner";
import { TProduct } from "@/types/product.interface";
import { ProductWithCreatedAt } from "../../../_components/ui/product-card";

interface IProps {
  id: string;
}

export const ProductPage: FC<IProps> = ({ id }) => {
  const { items, addItem } = useCart();

  const [take] = useQueryState("take", parseAsInteger.withDefault(5));
  const [productPage, setProductPage] = useQueryState(
    "productPage",
    parseAsString
  );

  const { data: product } = useQuery({
    queryKey: ["product-by-id"],
    queryFn: async () => {
      const response = await getProductById({ id, take: take });

      return response;
    },
  });

  const handleAddToCart = (id: string) => {
    if (items.some((item) => item.id === id))
      return toast.error("Товар уже в корзине");

    addItem(product as TProduct & ProductWithCreatedAt);

    toast.success("Товар добавлен в корзину");
  };

  return (
    <div className="">
      <Breadcrumbs
        links={[
          { title: "Shop", href: `/shop?categoryId=all-rooms&${shopParams}` },
          {
            title: product?.category.name,
            href: `/shop?categoryId=${product?.category.id}&${shopParams}`,
          },
          { title: product?.name },
        ]}
      />

      <div className="mt-10">
        <div className="flex justify-between items-center">
          <Image
            src={product?.img || ""}
            alt={product?.name || ""}
            width={1000}
            height={1000}
            className="w-[550px] h-[730px]"
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <RatingStars />
              <p className="capitalize text-[12px] leading-[167%] text-[--neutral-07]">
                {product?.reviews.length}{" "}
                {determineReview(product?.reviews.length ?? 0)}
              </p>
            </div>

            <p className="font-medium text-[40px] leading-[110%] -tracking-[0.01rem] text-[--neutral-07] capitalize">
              {product?.name}
            </p>

            <p className="text-base leading-[162%] text-[--neutral-04] max-w-[510px]">
              {product?.description}
            </p>

            <ProductPrice
              price={product?.price}
              classNamePrice="font-medium text-[28px] leading-[121%] -tracking-[0.02rem]"
            />

            <div className="flex flex-col gap-6">
              <div className="mt-[50px] flex flex-col gap-2">
                <p className="text-[--neutral-05] text-base leading-[162%]">
                  Measurements
                </p>
                <p className="font-semibold text-[20px] leading-[160%]">
                  {product?.measurements}
                </p>
              </div>
            </div>

            <Button
              onClick={() => product?.id && handleAddToCart(product?.id)}
              size={"lg"}
              className="w-full py-7 font-medium text-lg leading-[178%] -tracking-[0.02rem]"
            >
              Добавить в корзину
            </Button>

            <div className="grid grid-cols-2 items-center mt-[50px]">
              <div className="flex flex-col gap-2">
                <p className="uppercase text-[12px] text-[--neutral-04] leading-[167%]">
                  sku
                </p>
                <p className="uppercase text-[12px] text-[--neutral-04] leading-[167%]">
                  category
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[12px] capitalize leading-[167%] text-[--neutral-07]">
                  1117
                </p>
                <p className="text-[12px] capitalize leading-[167%] text-[--neutral-07]">
                  {product?.category.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[50px] flex items-center gap-20">
          {productNavigation.map((nav) => (
            <div
              key={nav.id}
              onClick={() => setProductPage(nav.id)}
              className={cn(
                "text-[--neutral-04] transition duration-300 cursor-pointer",
                {
                  "border-b border-b-[--primary-01] text-[--primary-01]":
                    nav.id === productPage,
                }
              )}
            >
              <p className="text-lg leading-[178%] font-medium -tracking-[0.02em]">
                {nav.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
