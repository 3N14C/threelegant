"use client";

import { Heart } from "lucide-react";
import { FC } from "react";

export const WishlistButton: FC = () => {
  return (
    <div className="cursor-pointer flex items-center gap-2 border border-[--neutral-07] py-[10px] w-full justify-center rounded-lg">
      <Heart />
      <p className="font-medium text-lg leading-[178%] -tracking-[0.02rem] text-[--neutral-07]">
        Wishlist
      </p>
    </div>
  );
};
