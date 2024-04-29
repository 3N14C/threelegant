import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  price: number | undefined;
  offer?: number;
  classNamePrice?: string;
  classNameOffer?: string;
}

export const ProductPrice: FC<IProps> = ({
  price,
  offer,
  classNameOffer,
  classNamePrice,
}) => {
  const productPriceWithOffer =
    offer &&
    (price! * (1 - offer / 100)).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  if (offer) {
    return (
      <div className="text-sm flex items-center gap-[12px]">
        <p className={cn("text-[--neutral-07]", classNamePrice)}>
          {productPriceWithOffer}
        </p>
        <p className={cn("text-[--neutral-04] line-through", classNameOffer)}>
          {price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }

  return (
    <p className={cn("text-[--neutral-07] text-sm", classNamePrice)}>
      {price?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      })}
    </p>
  );
};
