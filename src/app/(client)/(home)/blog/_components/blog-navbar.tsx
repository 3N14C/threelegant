"use client";

import { cn } from "@/lib/utils";
import { parseAsString, useQueryState } from "nuqs";
import { FC, useEffect } from "react";

const navbar = [
  {
    id: "public",
    title: "All Blog",
  },

  {
    id: "featured",
    title: "Featured",
  },
];

export const CategoryNavbar: FC = () => {
  const [category, setCategory] = useQueryState("type", parseAsString);

  return (
    <div className="flex items-center gap-10">
      {navbar.map((nav) => (
        <div key={nav.id}>
          <p
            onClick={() => setCategory(nav.id)}
            className={cn(
              "font-semibold text-[--neutral-04] text-sm leading-[157%] cursor-pointer transition-all duration-700",
              {
                "text-[--neutral-07]": category?.includes(nav.id),
              }
            )}
          >
            {nav.title}
          </p>

          <div
            className={cn(
              "w-full h-[1px] bg-[--neutral-07] opacity-0 transition-all duration-700",
              {
                "opacity-100": category?.includes(nav.id),
              }
            )}
          />
        </div>
      ))}
    </div>
  );
};
