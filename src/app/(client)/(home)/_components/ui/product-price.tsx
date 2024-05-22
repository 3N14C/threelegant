import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  price: number | undefined;
  classNamePrice?: string;
}

export const ProductPrice: FC<IProps> = ({ price, classNamePrice }) => {
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
