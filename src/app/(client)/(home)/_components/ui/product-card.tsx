"use client";

import { Prisma, Product } from "@prisma/client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FC, useState } from "react";
import { RatingStars } from "./rating-stars";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { ProductPrice } from "./product-price";
import { productParams } from "@/constants/product-params";
import { useCart } from "@/store/cart-store";
import { toast } from "sonner";
import { TProduct } from "@/types/product.interface";
import { determineReview } from "@/functions/determine-review";

export type ProductWithCreatedAt = Omit<
  Prisma.ProductGetPayload<{}>,
  "createdAt"
> & {
  createdAt: string;
} & Prisma.ProductGetPayload<{ include: { order: true } }>;

interface IProps {
  product: ProductWithCreatedAt;
  orientation?: string;
}

export const ProductCard: FC<IProps> = ({ product, orientation }) => {
  const [hover, setHover] = useState<string | null>(null);
  const { addItem, items } = useCart();

  const handleAddToCart = (id: string) => {
    if (items.some((item) => item.id === id)) {
      toast.error("Товар уже в корзине");
      return;
    }

    addItem(product as TProduct & ProductWithCreatedAt);
    toast.success("Товар добавлен в корзину");
  };

  if (orientation === "table") {
    return (
      <div className="lg:w-4/6">
        <div
          className=""
          onMouseEnter={() => setHover(product.id)}
          onMouseLeave={() => setHover(null)}
        >
          <Link
            href={`/product/${product.id}?${productParams}`}
            className="flex items-center gap-10"
          >
            <Image
              src={product.img}
              alt={product.name}
              width={1000}
              height={1000}
              className="lg:w-[260px] lg:h-[350px] w-[200px] h-[200px]"
            />

            <div className="">
              <p className="lg:text-[32px] text-base font-semibold capitalize text-[--neutral-07]">
                {product.name}
              </p>

              <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2">
                <RatingStars />
                <p className="text-base leading-[167%] text-[--neutral-07]">
                  {product?.order?.length ?? "0"}{" "}
                  {determineReview(product?.order?.length ?? 0)}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <p className="text-[--neutral-05] text-base leading-[162%]">
                  Размеры
                </p>
                <p className="font-semibold lg:text-[20px] text-base leading-[160%]">
                  {product?.measurements}
                </p>
              </div>

              <div className="mt-8">
                <ProductPrice
                  price={product.price}
                  classNamePrice="font-medium text-[28px] leading-[121%] -tracking-[0.02rem]"
                />
              </div>
            </div>
          </Link>

          <Button
            onClick={() => handleAddToCart(product.id)}
            className={cn(
              "w-full opacity-0 transition-all duration-300 h-12 lg:block hidden",
              {
                "opacity-100": hover === product.id,
              }
            )}
          >
            Добавить в корзину
          </Button>
        </div>

        <Button
          onClick={() => handleAddToCart(product.id)}
          className={cn(
            "w-full lg:opacity-0 opacity-100 transition-all duration-300 lg:py-7 lg:mt-0 mt-4 lg:hidden block",
            {
              "lg:opacity-100": hover === product.id,
            }
          )}
        >
          Добавить в корзину
        </Button>
      </div>
    );
  }

  return (
    <div
      className="relative w-fit flex flex-col items-center lg:block"
      onMouseEnter={() => setHover(product.id)}
      onMouseLeave={() => setHover(null)}
    >
      <Link href={`/product/${product.id}?${productParams}`}>
        <Image
          src={product.img}
          alt={product.name}
          width={1000}
          height={1000}
          className={cn("w-[260px] h-[350px]", {
            "lg:w-[550px] lg:h-[730px] w-[200px] h-[200px]":
              orientation === "fluent",
          })}
        />
      </Link>

      <div
        className={cn("lg:opacity-0 opacity-100 transition duration-300", {
          "lg:opacity-100": hover === product.id,
        })}
      >
        {/* <div className="absolute top-5 right-4 bg-white rounded-full p-2 shadow-[0_8px_16px_rgba(15,15,15,0.12)] cursor-pointer">
          <Heart />
        </div> */}

        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full lg:block hidden">
          <Button
            onClick={() => handleAddToCart(product.id)}
            className="w-full"
          >
            Добавить в корзину
          </Button>
        </div>

        <Button
          size={"sm"}
          onClick={() => handleAddToCart(product.id)}
          className="lg:hidden block text-sm"
        >
          В корзину
        </Button>
      </div>

      <div className="absolute top-5 left-5 font-[700] text-base flex flex-col gap-[10px]">
        <p className="uppercase text-[--neutral-07] text-center">new</p>
      </div>

      <div className="font-[600] flex flex-col gap-1 lg:mt-0 mt-5">
        <RatingStars />
        <p className="text-base capitalize text-[--neutral-07]">
          {product.name}
        </p>

        <ProductPrice price={product.price} />
      </div>
    </div>
  );
};
