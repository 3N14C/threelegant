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

export type ProductWithCreatedAt =
  | (Omit<
      Prisma.ProductGetPayload<{ include: { offer: true } }>,
      "createdAt"
    > & {
      createdAt: string;
    })
  | Prisma.ProductGetPayload<{ include: { offer: true } }>;

interface IProps {
  product: ProductWithCreatedAt;
  orientation?: string;
}

export const ProductCard: FC<IProps> = ({ product, orientation }) => {
  const [hover, setHover] = useState<string | null>(null);

  if (orientation === "table") {
    return (
      <div
        className="w-5/6"
        onMouseEnter={() => setHover(product.id)}
        onMouseLeave={() => setHover(null)}
      >
        <div className="flex items-center gap-10">
          <Image
            src={product.img}
            alt={product.name}
            width={1000}
            height={1000}
            className="w-[260px] h-[350px]"
          />

          <div className="">
            <p className="text-[32px] font-semibold capitalize text-[--neutral-07]">
              {product.name}
            </p>

            <div className="flex items-center gap-2">
              <RatingStars />
              <p className="capitalize text-base leading-[167%] text-[--neutral-07]">
                11 reviews
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <p className="text-[--neutral-05] text-base leading-[162%]">
                Measurements
              </p>
              <p className="font-semibold text-[20px] leading-[160%]">
                {product?.measurements}
              </p>
            </div>

            <div className="mt-8">
              <ProductPrice
                price={product.price}
                offer={product.offer?.offer}
                classNamePrice="font-medium text-[28px] leading-[121%] -tracking-[0.02rem]"
                classNameOffer="font-medium text-[20px] leading-[140%]"
              />
            </div>
          </div>
        </div>

        <Button
          className={cn("w-full opacity-0 transition-all duration-300 py-7", {
            "opacity-100": hover === product.id,
          })}
        >
          Add to Cart
        </Button>
      </div>
    );
  }

  return (
    <div
      className="relative w-fit"
      onMouseEnter={() => setHover(product.id)}
      onMouseLeave={() => setHover(null)}
    >
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.img}
          alt={product.name}
          width={1000}
          height={1000}
          className={cn("w-[260px] h-[350px]", {
            "w-[550px] h-[730px]": orientation === "fluent",
          })}
        />
      </Link>

      <div
        className={cn("opacity-0 transition duration-300 ", {
          "opacity-100": hover === product.id,
        })}
      >
        <div className="absolute top-5 right-4 bg-white rounded-full p-2 shadow-[0_8px_16px_rgba(15,15,15,0.12)] cursor-pointer">
          <Heart />
        </div>

        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full">
          <Button className="w-full">Add to cart</Button>
        </div>
      </div>

      <div className="absolute top-5 left-5 font-[700] text-base flex flex-col gap-[10px]">
        <p className="uppercase text-[--neutral-07] text-center">new</p>

        {product.offer?.offer && (
          <p className="text-[--neutral-01] px-[15px] bg-[--green] rounded-sm">
            -{product.offer?.offer}%
          </p>
        )}
      </div>

      <div className="font-[600] flex flex-col gap-1">
        <RatingStars />
        <p className="text-base capitalize text-[--neutral-07]">
          {product.name}
        </p>

        <ProductPrice price={product.price} offer={product.offer?.offer} />
      </div>
    </div>
  );
};
