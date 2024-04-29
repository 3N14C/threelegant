"use client";

import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

export const CategorySkeleton: FC = () => {
  return (
    <div className="grid grid-cols-2 items-center gap-10">
      <Skeleton className="w-full h-[765px] bg-zinc-300" />

      <div className="flex flex-col gap-6">
        <Skeleton className="w-full h-[370px] bg-zinc-300" />
        <Skeleton className="w-full h-[370px] bg-zinc-300" />
      </div>

      {/* <div className="">
          {categories?.map(
            (category, idx) =>
              idx !== 0 && (
                <div key={category.id} className="relative capitalize">
                  <Image
                    src={category.img}
                    alt={category.name}
                    width={1000}
                    height={1000}
                    className="w-[550px] h-[320px] mt-5"
                  />

                  <div className="absolute bottom-0">
                    <p className="text-[--neutral-07] capitalize font-[500] text-[34px]">
                      {category.name}
                    </p>

                    <Link
                      href={"/shop"}
                      className="font-[500] text-base underline underline-offset-8 flex items-center gap-2"
                    >
                      shop now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
          )}
        </div> */}
    </div>
  );
};
