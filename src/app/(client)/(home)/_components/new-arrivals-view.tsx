import prisma from "@/lib/prisma-client";
import { FC } from "react";
import { ProductCard, ProductWithCreatedAt } from "./ui/product-card";
import { LinkUnderline } from "./ui/link-underline";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { shopParams } from "@/constants/shop-params";
import { TProduct } from "@/types/product.interface";

const getNewArrivalsProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days,
      },
    },
  });

  return products;
};

export const NewArrivals: FC = async () => {
  const products = await getNewArrivalsProducts();

  return (
    <div className="">
      <div className="flex items-end justify-between lg:mx-0 mx-[40px]">
        <p className="font-[500] text-[40px] max-w-[150px] -tracking-[0.01rem] leading-[110%]">
          Новые поступления
        </p>

        <div className="max-[845px]:hidden">
          <LinkUnderline
            title="Каталог"
            href={`/shop?categoryId=all-rooms&${shopParams}`}
          />
        </div>
      </div>

      <ScrollArea className="mt-[50px] w-full whitespace-nowrap" type="hover">
        <div className="flex items-center gap-6 w-max mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product as TProduct & ProductWithCreatedAt}
            />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="m-[40px] lg:hidden">
        <LinkUnderline
          title="Каталог"
          href={`/shop?categoryId=all-rooms&${shopParams}`}
        />
      </div>
    </div>
  );
};
