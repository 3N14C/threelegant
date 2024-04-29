import { FC } from "react";
import prisma from "@/prisma-client";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import { RatingStars } from "../../../_components/ui/rating-stars";
import { ProductPrice } from "../../../_components/ui/product-price";
import { AddToCartCounter } from "@/components/add-to-cart-counter";
import { WishlistButton } from "@/components/wishlist-button";
import { Button } from "@/components/ui/button";
import { shopParams } from "@/constants/shop-params";

const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: {
      id: id,
    },

    include: {
      category: true,
      offer: true,
    },
  });
};

interface IProps {
  id: string;
}

export const ProductPage: FC<IProps> = async ({ id }) => {
  const product = await getProductById(id);

  return (
    <div className="lg:w-[1440px] lg:mx-auto">
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
                11 reviews
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
              offer={product?.offer?.offer}
              classNamePrice="font-medium text-[28px] leading-[121%] -tracking-[0.02rem]"
              classNameOffer="font-medium text-[20px] leading-[140%]"
            />

            <div className="mt-[50px]">
              <p className="text-base leading-[162%] text-[--neutral-05]">
                Offer expires in
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="mt-[50px] flex flex-col gap-2">
                <p className="text-[--neutral-05] text-base leading-[162%]">
                  Measurements
                </p>
                <p className="font-semibold text-[20px] leading-[160%]">
                  {product?.measurements}
                </p>
              </div>

              <div className="">
                <p className="text-[--neutral-05] text-base leading-[162%]">
                  Choose Color
                </p>
                Colors*
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <AddToCartCounter />
                <WishlistButton />
              </div>
              <Button
                size={"lg"}
                className="w-full py-7 font-medium text-lg leading-[178%] -tracking-[0.02rem]"
              >
                Add to Cart
              </Button>
            </div>

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
      </div>
    </div>
  );
};
