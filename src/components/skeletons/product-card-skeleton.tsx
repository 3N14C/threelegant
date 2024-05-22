"use client";

import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

export const ProductCardSkeleton: FC = () => {
  return (
    <div className="">
      <Skeleton className="h-[270px] bg-zinc-300" />
    </div>
  );
};
