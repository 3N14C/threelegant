"use client";

import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Search, User } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { CartMenu } from "./ui/cart-menu";
import { MobileBurgerMenu } from "./ui/mobile-burger-menu";
import { shopParams } from "@/constants/shop-params";

export const navbar = [
  {
    id: "home",
    name: "Home",
    href: "/",
  },

  {
    id: "shop",
    name: "Shop",
    href: `/shop?categoryId=all-rooms&${shopParams}`,
  },

  {
    id: "product",
    name: "Product",
    href: "/product",
  },

  {
    id: "contact-us",
    name: "Contact Us",
    href: "/contact-us",
  },
];

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <div className="px-[40px] lg:px-0">
      <div className="flex items-center justify-between my-[20px] lg:w-[1440px] lg:mx-auto">
        <div className="flex items-center gap-5">
          <div className="lg:hidden mt-2">
            <MobileBurgerMenu />
          </div>
          <Logo />
        </div>

        <div className="lg:flex items-center gap-[40px] hidden">
          {navbar.map((nav, idx) => (
            <Link href={nav.href} key={nav.id}>
              <p
                className={cn("text-[--neutral-04] font-[500]", {
                  "text-[--neutral-07]":
                    pathname.includes(nav.id) ||
                    (idx === 0 && pathname === "/"),
                })}
              >
                {nav.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="lg:flex hidden items-center gap-[20px]">
          <Search size={22} />
          <User size={22} />
          <CartMenu />
        </div>

        <div className="lg:hidden">
          <CartMenu />
        </div>
      </div>
    </div>
  );
};
