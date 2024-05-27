"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { orderPriceList } from "@/lib/order-price-list";
import { useCart } from "@/store/cart-store";
import { FC, useEffect } from "react";

export const OrderSelect: FC = () => {
  const { shippingType, changeShipping } = useCart();
  const currentOrderPrice = orderPriceList.find(
    (type) => type.id === shippingType.id
  )?.id

  useEffect(() => {
    changeShipping(currentOrderPrice!);
  }, []);

  return (
    <div className="">
      <RadioGroup
        defaultValue={shippingType.id}
        className="flex flex-col gap-5"
        onValueChange={changeShipping}
      >
        {orderPriceList.map((type) => (
          <div
            key={type.id}
            className="flex items-center justify-between border border-black rounded-md p-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value={type.id} />
              <div className="">{type.name}</div>
            </div>

            <p>
              {type.price.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
