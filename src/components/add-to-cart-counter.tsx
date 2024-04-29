"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { FC, useState } from "react";

export const AddToCartCounter: FC = () => {
  const [count, setCount] = useState<number>(1);

  const minusCount = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="flex items-start gap-7 select-none">
      <Minus
        onClick={minusCount}
        className={cn("cursor-pointer", count <= 1 && "cursor-auto")}
      />
      <p className="font-semibold text-base leading-[167%]">{count}</p>
      <Plus onClick={() => setCount(count + 1)} className="cursor-pointer" />
    </div>
  );
};
