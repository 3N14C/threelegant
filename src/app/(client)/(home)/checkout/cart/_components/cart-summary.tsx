"use client";

import { useCart } from "@/store/cart-store";
import { Link } from "next-view-transitions";
import { FC } from "react";
import { OrderSelect } from "./order-select";
import { ButtonLink } from "@/components/ui/button-link";

export const CartSummary: FC = () => {
  const { totalPrice, shippingType } = useCart();
  const priceWithShipping = totalPrice + shippingType.price;

  return (
    <div className="border border-black rounded-md p-5">
      <p>Итог</p>

      <div className="mt-5">
        <OrderSelect />
      </div>

      <div className="flex items-center justify-between mt-10">
        <p className="text-xl font-semibold">Итого:</p>
        <p className="text-xl font-semibold">
          {priceWithShipping.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <ButtonLink href={"/checkout/information"}>К оформлению</ButtonLink>
    </div>
  );
};
