"use client";

import { useCart } from "@/store/cart-store";
import { Link } from "next-view-transitions";
import { FC } from "react";
import { OrderSelect } from "./order-select";

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

      <Link
        href={"/checkout/information"}
        className="mt-5 bg-primary w-full h-12 px-4 py-2 text-primary-foreground hover:bg-primary/90 gap-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        К оформлению
      </Link>
    </div>
  );
};
