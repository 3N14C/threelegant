"use client";

import { Logo } from "@/components/ui/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { InputSearch } from "./input-search";
import { MobileMenuAccordion } from "./mobile-menu-accrodion";
import { CartProductCounter } from "./cart-prodcut-counter";
import { WishlistProductCounter } from "./wishlist-product-counter";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { useSession } from "@/hooks/use-current-session";
import { usePathname } from "next/navigation";

export const MobileBurgerMenu: FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useSession();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
            {user ? (
              <Button
                className="w-full font-medium text-[18px] -tracking-[0.02rem] leading-[178%]"
                size={"lg"}
              >
                <Link href={`/profile/${user.id}/account`} className="">
                  Профиль
                </Link>
              </Button>
            ) : (
              <Button
                className="w-full font-medium text-[18px] -tracking-[0.02rem] leading-[178%]"
                size={"lg"}
              >
                <Link href={"/auth/sign-in"} className="">
                  Вход
                </Link>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
