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

export type ProductWithCreatedAt = Omit<
  Prisma.ProductGetPayload<{}>,
  "createdAt"
> & {
  createdAt: string;
};

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
      <Link
        href={`/product/${product.id}?${productParams}`}
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
                classNamePrice="font-medium text-[28px] leading-[121%] -tracking-[0.02rem]"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={() => handleAddToCart(product.id)}
          className={cn("w-full opacity-0 transition-all duration-300 py-7", {
            "opacity-100": hover === product.id,
          })}
        >
          Add to Cart
        </Button>
      </Link>
    );
  }

  return (
    <div
      className="relative w-fit"
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
          <Button
            onClick={() => handleAddToCart(product.id)}
            className="w-full"
          >
            Add to cart
          </Button>
        </div>
      </div>

      <div className="absolute top-5 left-5 font-[700] text-base flex flex-col gap-[10px]">
        <p className="uppercase text-[--neutral-07] text-center">new</p>
      </div>

      <div className="font-[600] flex flex-col gap-1">
        <RatingStars />
        <p className="text-base capitalize text-[--neutral-07]">
          {product.name}
        </p>

        <ProductPrice price={product.price} />
      </div>
    </div>
  );
};
