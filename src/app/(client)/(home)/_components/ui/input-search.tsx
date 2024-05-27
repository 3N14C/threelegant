"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FC } from "react";

export const InputSearch: FC = () => {
  return (
    <div className="flex items-center border border-[--neutral-04] rounded-lg px-[15px]">
      <Search size={22} />
      <Input placeholder="Поиск" className="border-0 text-[--neutral-07] text-sm" />
    </div>
  );
};
