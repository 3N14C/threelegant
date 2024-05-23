"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import Image from "next/image";
import { FC } from "react";

export const OrderSummary: FC = () => {
  const { items, totalPrice, shippingType } = useCart();
  const priceWithShipping = totalPrice + shippingType.price;

  return (
    <div className="border border-black rounded-lg p-10  h-fit">
      <p className="text-3xl font-bold tracking-wider mb-5">Ваш заказ</p>

      <ScrollArea
        className={cn("", {
          "h-[550px]": items.length > 3,
        })}
      >
        <div className="flex flex-col gap-10 lg:gap-5">
          {items.map((product) => (
            <div key={product.id} className="flex items-start">
              <div className="flex items-start gap-3">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  className="lg:w-[150px] w-[100px] lg:h-[150px] h-[100px]"
                />

                <div className="flex flex-col gap-3">
                  <p className="font-semibold capitalize lg:text-base text-sm">
                    {product.name}
                  </p>
                  <p className="lg:text-base text-sm">{product.measurements}</p>
                  <p className="lg:text-base text-sm">Кол-во: 1</p>
                </div>

                <p>
                  {product.price.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex flex-col gap-5 pt-2">
        {/* <InputCoupon /> */}
        <div className="flex items-center justify-between">
          <p>Доставка</p>
          <p className="font-medium">
            {shippingType.price.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between font-semibold text-xl">
          <p className="">Итог</p>
          <p className="">
            {priceWithShipping.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
