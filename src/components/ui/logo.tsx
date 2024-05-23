import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  className?: string;
}

export const Logo: FC<IProps> = ({ className }) => {
  return (
    <p
      className={cn(
        "lg:text-[32px] text-base font-[500] select-none",
        className
      )}
    >
      3legant.
    </p>
  );
};
