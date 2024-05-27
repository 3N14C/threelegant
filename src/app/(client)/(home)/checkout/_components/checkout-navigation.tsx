"use client";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { shopParams } from "@/constants/shop-params";
import { checkoutNavgaiton } from "@/lib/checkout-navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { Check } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface IProps {}

export const CheckoutNavigation: FC<IProps> = () => {
  const { items } = useCart();

  const pathname = usePathname();

  const currentPage = pathname.slice(10);
  console.log(currentPage);

  const pageTitle = checkoutNavgaiton.find((nav) => nav.id === currentPage);

  if (items.length === 0)
    return (
      <div className="flex flex-col items-center gap-5">
        <p className="text-center font-bold lg:text-5xl text-2xl tracking-wider">
          Ваша корзина пуста
        </p>

        <Image
          src={"/empty-cart.png"}
          alt="empty-cart"
          width={500}
          height={500}
          className=""
        />

        <div className="w-1/2 mx-auto mt-10">
          <ButtonLink
            href={`/shop?categoryId=all-rooms&${shopParams}`}
            className=""
          >
            Перейти в каталог
          </ButtonLink>
        </div>
      </div>
    );

  return (
    <div className="">
      <p className="text-center font-bold text-5xl tracking-wider">
        {pageTitle?.name}
      </p>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:block mt-10">
        <div className="grid grid-cols-3 items-center justify-items-center">
          {checkoutNavgaiton.map((nav, idx) => (
            <div
              key={nav.id}
              className={cn(
                "flex items-center gap-3 justify-center pr-10 pb-2 select-none",
                {
                  "border-b border-black": currentPage.includes(nav.id),
                  "border-b border-[--green]":
                    idx <
                    checkoutNavgaiton.findIndex((nav) =>
                      currentPage.includes(nav.id)
                    ),
                }
              )}
            >
              <div
                className={cn(
                  "rounded-full p-2 bg-[--neutral-04] text-[--neutral-04] text-white",
                  {
                    "bg-[--green]":
                      idx <
                      checkoutNavgaiton.findIndex((nav) =>
                        currentPage.includes(nav.id)
                      ),
                    "px-4 py-2":
                      idx >=
                      checkoutNavgaiton.findIndex((nav) =>
                        currentPage.includes(nav.id)
                      ),
                    "bg-primary": currentPage.includes(nav.id),
                    "px-5 py-2":
                      idx === 0 &&
                      idx >=
                        checkoutNavgaiton.findIndex((nav) =>
                          currentPage.includes(nav.id)
                        ),
                  }
                )}
              >
                {idx <
                checkoutNavgaiton.findIndex((nav) =>
                  currentPage.includes(nav.id)
                ) ? (
                  <Check size={20} className="" />
                ) : (
                  idx + 1
                )}
              </div>

              <p
                className={cn("", {
                  "text-[--green]":
                    idx <
                    checkoutNavgaiton.findIndex((nav) =>
                      currentPage.includes(nav.id)
                    ),
                  "text-primary": currentPage.includes(nav.id),
                })}
              >
                {nav.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE VERSION */}
      <div className="block lg:hidden mt-10">
        <div className="flex items-center gap-3 border-b border-black pb-2">
          <Button disabled className="rounded-full w-10 h-10">
            {currentPage.includes("cart") && 1}
            {currentPage.includes("information") && 2}
            {currentPage.includes("order") && 3}
          </Button>

          <p className="">
            {checkoutNavgaiton.find((nav) => nav.id === currentPage)?.name}
          </p>
        </div>
      </div>
    </div>
  );
};
