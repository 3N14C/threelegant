import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  title: string;
  className?: string;
}

export const Title: FC<IProps> = ({ title, className }) => {
  return (
    <p
      className={cn(
        "font-[500] lg:text-[40px] text-2xl -tracking-[0.01rem] leading-[110%]",
        className
      )}
    >
      {title}
    </p>
  );
};
