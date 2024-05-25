import prisma from "@/lib/prisma-client";
import Image from "next/image";
import { FC } from "react";
import { LinkUnderline } from "./ui/link-underline";
import { shopParams } from "@/constants/shop-params";

const getCategories = async () => {
  const categories = await prisma.category.findMany({});

  return categories;
};

export const CategoryView: FC = async () => {
  const categories = await getCategories();

  return (
    <div className="grid lg:grid-cols-2 items-center gap-10">
      <div className="">
        {/* СДЕЛАТЬ МАПИНГ ЧЕРЕЗ ЛИСТ ПРОДУКТОВ А НЕ КАТЕГОРИИ */}
        {
          categories?.map((category) => (
            <div
              key={category.id}
              className="text-[--neutral-07] capitalize relative"
            >
              <Image
                src={category.img}
                alt={category.name}
                width={1000}
                height={1000}
                className="lg:w-full w-[310px] lg:h-[765px] h-[380px]"
              />

              <div className="absolute lg:top-10 top-5 left-5">
                <p className="font-[500] text-[34px]">{category.name}</p>

                <LinkUnderline
                  title="Каталог"
                  href={`/shop?categoryId=${category.id}&${shopParams}`}
                />
              </div>
            </div>
          ))[0]
        }
      </div>

      <div className="">
        {categories?.map(
          (category, idx) =>
            idx !== 0 && (
              <div key={category.id} className="relative capitalize">
                <Image
                  src={category.img}
                  alt={category.name}
                  width={1000}
                  height={1000}
                  className="w-full h-[380px] mt-5"
                />

                <div className="absolute bottom-10 left-5">
                  <p className="text-[--neutral-07] capitalize font-[500] text-[34px]">
                    {category.name}
                  </p>

                  <LinkUnderline
                    title="Каталог"
                    href={`/shop?categoryId=${category.id}&${shopParams}`}
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
