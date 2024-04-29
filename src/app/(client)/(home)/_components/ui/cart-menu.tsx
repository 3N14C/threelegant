"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { FC } from "react";
import { CartProductCounter } from "./cart-prodcut-counter";

export const CartMenu: FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <CartProductCounter />
      </SheetTrigger>

      <SheetContent>
        <p className="font-medium text-[28px] text-[--neutral-07] -tracking-[0.02rem] leading-[121%]">
          Cart
        </p>
      </SheetContent>
    </Sheet>
  );
};
