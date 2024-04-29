"use client";

import { Logo } from "@/components/ui/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { FC, useState } from "react";
import { InputSearch } from "./input-search";
import { MobileMenuAccordion } from "./mobile-menu-accrodion";
import { CartProductCounter } from "./cart-prodcut-counter";
import { WishlistProductCounter } from "./wishlist-product-counter";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export const MobileBurgerMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu size={22} />
      </SheetTrigger>

      <SheetContent side={"left"}>
        <div className="flex flex-col gap-[16px] h-full relative">
          <Logo />

          <div className="">
            <InputSearch />
          </div>

          <div className="">
            <MobileMenuAccordion open={open} setOpen={setOpen} />
          </div>

          <div className="absolute bottom-0 flex flex-col gap-[16px] w-full">
            <div className="flex items-center justify-between">
              <p className="text-[18px] font-medium -tracking-[0.02rem] text-[--neutral-04] leading-[178%]">
                Cart
              </p>
              <Link href={"/cart"}>
                <CartProductCounter />
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[18px] font-medium -tracking-[0.02rem] text-[--neutral-04] leading-[178%]">
                Wishlist
              </p>
              <WishlistProductCounter />
            </div>

            <Button
              className="w-full font-medium text-[18px] -tracking-[0.02rem] leading-[178%]"
              size={"lg"}
            >
              <Link href={"/auth/sign-in"} className="">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
